import { useEffect, useState } from 'react'
import {
  CheckCircle2,
  CreditCard,
  Plane,
  Play,
  RotateCcw,
  UserRound,
} from 'lucide-react'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { useProgress } from '../hooks/useProgress'
import { useQuestionStats } from '../hooks/useQuestionStats'
import {
  PART107_CERT_ID,
  PART107_CONTENT_CERTIFICATION,
  PART107_DOMAINS,
  PART107_EXAM_SIZE,
  PART107_PASSING_PERCENT,
  PART107_QUESTIONS,
  PART107_SMART_STUDY_SIZE,
} from '../data/part107'
import { weightedSelect } from '../utils/exam-selection'
import { isAnswerCorrect } from '../utils/scoring'
import { buildWeightedPool } from '../utils/smart-practice'
import { fisherYates, weightedSample } from '../utils/shuffle'

const ACCOUNT_KEY = 'practice107-local-account'
const PREMIUM_KEY = 'practice107-local-exam-unlock'
const EXAM_PRICE = '$5'

function readFlag(key) {
  if (typeof window === 'undefined') return false
  return window.localStorage.getItem(key) === 'true'
}

function shuffleQuestionChoices(question) {
  const shuffled = fisherYates(question.choices.map((choice, index) => ({ choice, index })))
  return {
    ...question,
    choices: shuffled.map((item) => item.choice),
    correctAnswer: shuffled.findIndex((item) => item.index === question.correctAnswer),
  }
}

function buildPracticeSession(excludeQuestionId) {
  const pool = excludeQuestionId
    ? PART107_QUESTIONS.filter(question => question.id !== excludeQuestionId)
    : PART107_QUESTIONS

  return fisherYates(pool)
    .slice(0, 1)
    .map(shuffleQuestionChoices)
}

function buildSmartSession(stats) {
  return weightedSample(buildWeightedPool(PART107_QUESTIONS, stats), PART107_SMART_STUDY_SIZE)
    .map(shuffleQuestionChoices)
}

function buildExamSession() {
  return weightedSelect(PART107_QUESTIONS, PART107_EXAM_SIZE, PART107_DOMAINS, {
    allowedQuestionTypes: ['single-choice'],
    uniqueKey: question => question.question,
  }).map(shuffleQuestionChoices)
}

export default function Part107() {
  const [account, setAccount] = useState(() => readFlag(ACCOUNT_KEY))
  const [premium, setPremium] = useState(() => readFlag(PREMIUM_KEY))
  const [session, setSession] = useState(null)
  const [completed, setCompleted] = useState(null)
  const [practiceAnsweredIds, setPracticeAnsweredIds] = useState([])
  const [freePromptDismissed, setFreePromptDismissed] = useState(false)
  const [authPrompt, setAuthPrompt] = useState(null)
  const { certStats, recordSession, trackedCount } = useQuestionStats(PART107_CERT_ID)
  const { addQuizResult, addExamResult } = useProgress(PART107_CERT_ID)

  useDocumentMeta({
    title: 'FAA Part 107 Remote Pilot Exam Prep',
    description: 'Simple Part 107 drone exam practice. Practice now, then sign in later for tracking and full UAG simulations.',
    path: '/',
    site: 'practice107.com',
    origin: 'https://practice107.com',
  })

  useEffect(() => {
    if (typeof window !== 'undefined') window.localStorage.setItem(ACCOUNT_KEY, account ? 'true' : 'false')
  }, [account])

  useEffect(() => {
    if (typeof window !== 'undefined') window.localStorage.setItem(PREMIUM_KEY, premium ? 'true' : 'false')
  }, [premium])

  function startSession(mode = 'free', options = {}) {
    if (mode === 'exam' && !PART107_CONTENT_CERTIFICATION.premiumExamReady) {
      setAuthPrompt('examLock')
      return
    }

    const questions = mode === 'exam'
      ? buildExamSession()
      : mode === 'smart'
        ? buildSmartSession(certStats)
        : buildPracticeSession(options.excludeQuestionId)

    setCompleted(null)
    setSession({
      mode,
      questions,
      currentIndex: 0,
      answers: {},
      recordedAnswerIds: [],
      startedAt: 0,
    })
  }

  function chooseAnswer(choiceIndex) {
    setSession((current) => {
      if (!current) return current
      const question = current.questions[current.currentIndex]
      if (current.answers[question.id] !== undefined) return current
      return {
        ...current,
        answers: {
          ...current.answers,
          [question.id]: choiceIndex,
        },
      }
    })
  }

  function advance() {
    if (!session) return
    if (session.mode === 'practice') {
      const currentQuestionId = session.questions[session.currentIndex]?.id
      const nextPracticeAnsweredIds = practiceAnsweredIds.includes(currentQuestionId)
        ? practiceAnsweredIds
        : [...practiceAnsweredIds, currentQuestionId]

      if (nextPracticeAnsweredIds !== practiceAnsweredIds) setPracticeAnsweredIds(nextPracticeAnsweredIds)

      if (!account && !premium && !freePromptDismissed && nextPracticeAnsweredIds.length >= 3) {
        setFreePromptDismissed(true)
        setAuthPrompt('nudge')
        return
      }

      if (account || premium) recordAnsweredSession(session)
      startSession('practice', { excludeQuestionId: currentQuestionId })
      return
    }
    if (session.currentIndex === session.questions.length - 1) {
      finishSession(session)
      return
    }
    setSession({ ...session, currentIndex: session.currentIndex + 1 })
  }

  function finishSession(current = session) {
    if (!current) return
    const answers = answersForSession(current)
    const result = {
      mode: current.mode,
      answers,
      questions: current.questions,
      score: scoreAnswers(answers),
      startedAt: current.startedAt,
      saved: false,
    }
    setCompleted(account || premium ? saveResult(result) : result)
    setSession(null)
  }

  function answersForSession(current) {
    return current.questions.map((question) => {
      const selected = current.answers[question.id]
      return {
        questionId: question.id,
        domain: question.domain,
        objective: question.objective,
        selected,
        correct: isAnswerCorrect(selected, question),
      }
    })
  }

  function recordAnsweredSession(current) {
    if (!current) return current
    const question = current.questions[current.currentIndex]
    if (current.answers[question.id] === undefined) return current
    if (current.recordedAnswerIds?.includes(question.id)) return current
    recordSession(answersForSession(current))
    return {
      ...current,
      recordedAnswerIds: [...(current.recordedAnswerIds || []), question.id],
    }
  }

  function saveResult(result) {
    if (!result || result.saved) return result
    recordSession(result.answers)
    if (result.mode === 'exam') addExamResult({ answers: result.answers })
    else addQuizResult({ domain: result.mode === 'smart' ? 'Smart Study' : 'Free Quiz', answers: result.answers })
    return { ...result, saved: true }
  }

  function loginAndSave() {
    setAccount(true)
    if (session?.mode === 'practice') setSession(recordAnsweredSession(session))
    if (completed && !completed.saved) setCompleted(saveResult(completed))
  }

  function openSignup() {
    setAuthPrompt('signup')
  }

  function closeAuthPrompt() {
    setAuthPrompt(null)
  }

  function completeSignIn() {
    loginAndSave()
    setFreePromptDismissed(true)
    setAuthPrompt(null)
  }

  function continuePracticeFromPrompt() {
    setFreePromptDismissed(true)
    setAuthPrompt(null)
  }

  function unlockExam() {
    if (!PART107_CONTENT_CERTIFICATION.premiumExamReady) {
      setFreePromptDismissed(true)
      setAuthPrompt('examLock')
      return
    }

    setAccount(true)
    setPremium(true)
    if (session?.mode === 'practice') recordAnsweredSession(session)
    if (completed && !completed.saved) saveResult(completed)
    startSession('exam')
  }

  function unlockExamFromPrompt() {
    setFreePromptDismissed(true)
    setAuthPrompt(null)
    unlockExam()
  }

  return (
    <div className="p107">
      <style>{`
        .p107 {
          min-height: 100vh;
          background: #edf3fb;
          color: #06182d;
          font-family: Arial, Helvetica, sans-serif;
        }

        .p107 *,
        .p107 *::before,
        .p107 *::after {
          box-sizing: border-box;
          border-radius: 0 !important;
          letter-spacing: 0;
        }

        .p107 button {
          font: inherit;
          cursor: pointer;
        }

        .p107 button:disabled {
          cursor: not-allowed;
          opacity: 0.45;
        }

        .p107-top {
          border-bottom: 4px solid #b31942;
          background: #0a3161;
          color: #fff;
        }

        .p107-top-inner,
        .p107-shell,
        .p107-quiz {
          max-width: 760px;
          margin: 0 auto;
        }

        .p107-top-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 14px 16px;
        }

        .p107-brand {
          display: flex;
          min-width: 0;
          align-items: center;
          gap: 10px;
          color: #fff;
          text-decoration: none;
        }

        .p107-mark {
          display: grid;
          width: 36px;
          height: 36px;
          flex: 0 0 auto;
          place-items: center;
          border: 1px solid #fff;
          background: #b31942;
        }

        .p107-name {
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 22px;
          font-weight: 900;
          line-height: 1;
        }

        .p107-sub {
          display: block;
          margin-top: 2px;
          font-size: 11px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .p107-login {
          display: inline-flex;
          flex: 0 0 auto;
          align-items: center;
          gap: 7px;
          border: 1px solid #fff;
          background: #fff;
          color: #0a3161;
          padding: 8px 10px;
          font-size: 12px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .p107-shell,
        .p107-quiz {
          padding: 22px 16px;
        }

        .p107-kicker {
          margin: 0 0 10px;
          color: #0a3161;
          font-size: 12px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .p107 h1,
        .p107 h2,
        .p107 h3,
        .p107 p {
          margin: 0;
        }

        .p107-card {
          border: 1px solid #6b7f99;
          background: #fff;
          padding: 22px;
        }

        .p107-landing {
          display: grid;
          gap: 18px;
          margin-top: clamp(72px, 18vh, 150px);
        }

        .p107-title {
          max-width: 620px;
          font-size: clamp(42px, 8vw, 76px);
          font-weight: 900;
          line-height: 0.94;
          text-transform: uppercase;
        }

        .p107-copy {
          max-width: 440px;
          color: #1d2c3d;
          font-size: 18px;
          font-weight: 700;
          line-height: 1.45;
        }

        .p107-primary,
        .p107-secondary,
        .p107-pay {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          border: 1px solid #07111a;
          padding: 13px 18px;
          font-size: 14px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .p107-primary {
          background: #0a3161;
          color: #fff;
        }

        .p107-primary:hover,
        .p107-pay:hover {
          background: #b31942;
        }

        .p107-secondary {
          border-color: #6b7f99;
          background: #fff;
          color: #0a3161;
        }

        .p107-pay {
          background: #b31942;
          color: #fff;
        }

        .p107-note {
          color: #4b5c70;
          font-size: 13px;
          font-weight: 700;
          line-height: 1.45;
        }

        .p107-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .p107-quiz-card {
          border: 1px solid #6b7f99;
          background: #fff;
          padding: 18px;
        }

        .p107-quiz-head {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          border-bottom: 1px solid #9bb3d1;
          padding-bottom: 12px;
          color: #0a3161;
          font-size: 12px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .p107-meter {
          height: 12px;
          margin: 14px 0;
          border: 1px solid #6b7f99;
          background: #fff;
        }

        .p107-meter span {
          display: block;
          height: 100%;
          background: #b31942;
        }

        .p107-evidence {
          margin-bottom: 14px;
          border: 1px solid #9bb3d1;
          background: #f3f7fc;
          padding: 10px;
        }

        .p107-stimulus {
          margin: 0 0 14px;
          border: 1px solid #9bb3d1;
          background: #f3f7fc;
          padding: 10px;
        }

        .p107-stimulus figcaption {
          margin-bottom: 8px;
          color: #0a3161;
          font-size: 12px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .p107-stimulus-frame {
          max-height: min(58vh, 620px);
          overflow: auto;
          border: 1px solid #c7d5e6;
          background: #fff;
        }

        .p107-stimulus img {
          display: block;
          width: 100%;
          min-width: 620px;
          height: auto;
        }

        .p107-evidence-title {
          margin-bottom: 8px;
          color: #0a3161;
          font-size: 12px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .p107-evidence-grid {
          display: grid;
          gap: 6px;
        }

        .p107-evidence-row {
          display: grid;
          grid-template-columns: minmax(150px, 0.32fr) 1fr;
          gap: 8px;
          border: 1px solid #c7d5e6;
          background: #fff;
          padding: 8px;
          font-size: 13px;
        }

        .p107-evidence-row strong,
        .p107-evidence-row span {
          min-width: 0;
          overflow-wrap: anywhere;
        }

        .p107-domain {
          display: inline-block;
          margin-bottom: 12px;
          border: 1px solid #9bb3d1;
          background: #f3f7fc;
          padding: 5px 8px;
          color: #0a3161;
          font-size: 11px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .p107-question {
          font-size: 24px;
          font-weight: 900;
          line-height: 1.2;
        }

        .p107-answers {
          display: grid;
          gap: 8px;
          margin-top: 18px;
        }

        .p107-answer {
          width: 100%;
          border: 1px solid #9bb3d1;
          background: #fff;
          padding: 12px;
          color: #172435;
          text-align: left;
          font-size: 15px;
          font-weight: 700;
          line-height: 1.35;
        }

        .p107-answer:hover,
        .p107-answer.selected {
          border-color: #0a3161;
          background: #f3f7fc;
        }

        .p107-answer.correct {
          border-color: #1f7a3a;
          background: #e7f5ea;
          color: #145126;
        }

        .p107-answer.wrong {
          border-color: #b31942;
          background: #fff1f4;
          color: #7f1730;
        }

        .p107-feedback {
          margin-top: 14px;
          border: 1px solid #9bb3d1;
          background: #f3f7fc;
          padding: 12px;
          color: #1d2c3d;
          font-size: 14px;
          font-weight: 700;
          line-height: 1.5;
        }

        .p107-actions {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          gap: 8px;
          margin-top: 16px;
        }

        .p107-result {
          display: grid;
          gap: 16px;
        }

        .p107-score {
          font-size: 72px;
          font-weight: 900;
          line-height: 0.95;
        }

        .p107-pass {
          color: #0a3161;
          font-weight: 900;
        }

        .p107-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 20;
          display: grid;
          place-items: center;
          background: rgba(6, 24, 45, 0.42);
          padding: 16px;
        }

        .p107-modal {
          width: min(100%, 520px);
          border: 2px solid #07111a;
          background: #fff;
          box-shadow: 7px 7px 0 #0a3161;
        }

        .p107-modal-small {
          width: min(100%, 420px);
        }

        .p107-modal-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          border-bottom: 4px solid #b31942;
          background: #0a3161;
          color: #fff;
          padding: 12px 14px;
        }

        .p107-modal-head h2 {
          font-size: 20px;
          font-weight: 900;
          line-height: 1.1;
          text-transform: uppercase;
        }

        .p107-close {
          border: 1px solid #fff;
          background: #fff;
          color: #0a3161;
          padding: 3px 7px;
          font-size: 18px;
          font-weight: 900;
          line-height: 1;
        }

        .p107-modal-body {
          display: grid;
          gap: 14px;
          padding: 16px;
        }

        .p107-modal-body p {
          color: #1d2c3d;
          font-size: 15px;
          font-weight: 700;
          line-height: 1.45;
        }

        .p107-feature-list {
          display: grid;
          gap: 8px;
        }

        .p107-feature {
          border: 1px solid #9bb3d1;
          background: #f3f7fc;
          padding: 10px;
        }

        .p107-feature strong {
          display: block;
          margin-bottom: 3px;
          color: #0a3161;
          font-size: 13px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .p107-feature span {
          color: #1d2c3d;
          font-size: 14px;
          font-weight: 700;
          line-height: 1.35;
        }

        .p107-modal-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        @media (max-width: 520px) {
          .p107-top-inner {
            padding: 12px 16px;
          }

          .p107-name {
            font-size: 20px;
          }

          .p107-sub {
            font-size: 10px;
          }

          .p107-login {
            padding: 8px;
            font-size: 11px;
          }

          .p107-title {
            font-size: 46px;
          }

          .p107-primary,
          .p107-secondary,
          .p107-pay,
          .p107-modal-actions button {
            width: 100%;
          }

          .p107-modal {
            box-shadow: 4px 4px 0 #0a3161;
          }

          .p107-evidence-row {
            grid-template-columns: 1fr;
          }

          .p107-stimulus img {
            min-width: 560px;
          }
        }
      `}</style>

      <header className="p107-top">
        <div className="p107-top-inner">
          <a className="p107-brand" href="/">
            <span className="p107-mark">
              <Plane size={20} />
            </span>
            <span>
              <span className="p107-name">practice107.com</span>
              <span className="p107-sub">Part 107 practice</span>
            </span>
          </a>
          <button type="button" className="p107-login" onClick={openSignup}>
            <UserRound size={15} />
            Sign In
          </button>
        </div>
      </header>

      {!session && !completed && (
        <main className="p107-shell">
          <section className="p107-card p107-landing">
            <div>
              <p className="p107-kicker">FAA Part 107</p>
              <h1 className="p107-title">Practice 107.</h1>
            </div>
            <p className="p107-copy">Free practice questions for the drone exam.</p>
            <div>
              <button type="button" className="p107-primary" onClick={() => startSession('practice')}>
                <Play size={18} />
                Practice Now
              </button>
            </div>
          </section>
        </main>
      )}

      {session && !completed && (
        <QuizPanel
          session={session}
          onChoose={chooseAnswer}
          onNext={advance}
          onFinish={() => finishSession(session)}
        />
      )}

      {completed && (
        <ResultPanel
          result={completed}
          account={account}
          premium={premium}
          examReady={PART107_CONTENT_CERTIFICATION.premiumExamReady}
          trackedCount={trackedCount}
          onStudy={() => startSession('practice')}
          onLogin={openSignup}
          onSmart={() => startSession('smart')}
          onUnlockExam={unlockExam}
          onExam={() => startSession('exam')}
        />
      )}

      {authPrompt === 'nudge' && (
        <PracticeAuthPrompt
          onSignIn={completeSignIn}
          onCreateAccount={openSignup}
          onContinue={continuePracticeFromPrompt}
          onClose={continuePracticeFromPrompt}
        />
      )}

      {authPrompt === 'signup' && (
        <SignupPanel
          account={account}
          premium={premium}
          price={EXAM_PRICE}
          examReady={PART107_CONTENT_CERTIFICATION.premiumExamReady}
          onCreateAccount={completeSignIn}
          onUnlockExam={unlockExamFromPrompt}
          onClose={closeAuthPrompt}
        />
      )}

      {authPrompt === 'examLock' && (
        <ExamQualityLock
          certification={PART107_CONTENT_CERTIFICATION}
          onCreateAccount={completeSignIn}
          onClose={closeAuthPrompt}
        />
      )}
    </div>
  )
}

function PracticeAuthPrompt({
  onSignIn,
  onCreateAccount,
  onContinue,
  onClose,
}) {
  return (
    <div className="p107-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="p107-nudge-title">
      <section className="p107-modal p107-modal-small">
        <div className="p107-modal-head">
          <h2 id="p107-nudge-title">Save your misses?</h2>
          <button type="button" className="p107-close" aria-label="Close sign in prompt" onClick={onClose}>
            x
          </button>
        </div>
        <div className="p107-modal-body">
          <p>
            You have answered 3 practice questions. Sign in or create an account to track weak areas.
          </p>
          <div className="p107-modal-actions">
            <button type="button" className="p107-primary" onClick={onSignIn}>
              Sign In
            </button>
            <button type="button" className="p107-pay" onClick={onCreateAccount}>
              Create Account
            </button>
            <button type="button" className="p107-secondary" onClick={onContinue}>
              Keep Practicing
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

function SignupPanel({
  account,
  premium,
  price,
  examReady,
  onCreateAccount,
  onUnlockExam,
  onClose,
}) {
  return (
    <div className="p107-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="p107-signup-title">
      <section className="p107-modal">
        <div className="p107-modal-head">
          <h2 id="p107-signup-title">Practice with memory.</h2>
          <button type="button" className="p107-close" aria-label="Close sign up" onClick={onClose}>
            x
          </button>
        </div>
        <div className="p107-modal-body">
          <p>
            Free practice stays simple. An account turns it into a study tool.
          </p>

          <div className="p107-feature-list">
            <div className="p107-feature">
              <strong>Track misses</strong>
              <span>Save what you get wrong by ACS area so weak spots do not disappear.</span>
            </div>
            <div className="p107-feature">
              <strong>Smart study</strong>
              <span>Build short sessions from missed and weak Part 107 topics instead of random guessing.</span>
            </div>
            <div className="p107-feature">
              <strong>Full simulation</strong>
              <span>
                {examReady
                  ? 'Unlock 60-question UAG-style exams with the real two-hour, 70% readiness target.'
                  : 'Paid full exams unlock only after the UAG bank is certified against the current FAA/PSI blueprint.'}
              </span>
            </div>
          </div>

          <div className="p107-modal-actions">
            <button type="button" className="p107-primary" onClick={onCreateAccount}>
              {account ? 'Tracking On' : 'Create Account'}
            </button>
            <button type="button" className="p107-pay" onClick={onUnlockExam}>
              {premium && examReady
                ? 'Start Full Exam'
                : examReady
                  ? `Full Sim ${price}`
                  : 'Full Sim In Review'}
            </button>
            <button type="button" className="p107-secondary" onClick={onClose}>
              Not Now
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

function ExamQualityLock({
  certification,
  onCreateAccount,
  onClose,
}) {
  return (
    <div className="p107-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="p107-exam-lock-title">
      <section className="p107-modal">
        <div className="p107-modal-head">
          <h2 id="p107-exam-lock-title">Full sim not for sale yet.</h2>
          <button type="button" className="p107-close" aria-label="Close exam quality notice" onClick={onClose}>
            x
          </button>
        </div>
        <div className="p107-modal-body">
          <p>
            {certification.blocker}
          </p>
          <div className="p107-feature-list">
            {certification.requiredStandard.map((standard) => (
              <div key={standard} className="p107-feature">
                <span>{standard}</span>
              </div>
            ))}
          </div>
          <div className="p107-modal-actions">
            <button type="button" className="p107-primary" onClick={onCreateAccount}>
              Create Account For Tracking
            </button>
            <button type="button" className="p107-secondary" onClick={onClose}>
              Back To Practice
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

function QuizPanel({
  session,
  onChoose,
  onNext,
  onFinish,
}) {
  const question = session.questions[session.currentIndex]
  const selected = session.answers[question.id]
  const answered = selected !== undefined
  const examMode = session.mode === 'exam'
  const practiceMode = session.mode === 'practice'
  const correct = answered ? isAnswerCorrect(selected, question) : false
  const progress = Math.round(((session.currentIndex + 1) / session.questions.length) * 100)
  const label = session.mode === 'exam' ? 'Full exam' : session.mode === 'smart' ? 'Weak areas' : 'Free practice'

  return (
    <main className="p107-quiz">
      <section className="p107-quiz-card">
        {!practiceMode && (
          <div className="p107-quiz-head">
            <span>{label}</span>
            <span>Question {session.currentIndex + 1} / {session.questions.length}</span>
          </div>
        )}

        {!practiceMode && (
          <div className="p107-meter" aria-hidden="true">
            <span style={{ width: `${progress}%` }} />
          </div>
        )}

        {question.stimulus?.type === 'image' && (
          <figure className="p107-stimulus">
            <figcaption>{question.stimulus.title}</figcaption>
            <div className="p107-stimulus-frame">
              <img src={question.stimulus.src} alt={question.stimulus.alt} />
            </div>
          </figure>
        )}

        {question.evidenceArtifacts?.length > 0 && (
          <div className="p107-evidence">
            <p className="p107-evidence-title">{question.evidenceArtifacts[0].title}</p>
            <div className="p107-evidence-grid">
              {question.evidenceArtifacts[0].rows.map(([item, detail]) => (
                <div key={item} className="p107-evidence-row">
                  <strong>{item}</strong>
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {!practiceMode && <span className="p107-domain">{question.domain}</span>}
        <h2 className="p107-question">{question.question}</h2>

        <div className="p107-answers">
          {question.choices.map((choice, index) => {
            const isSelected = selected === index
            const isCorrectChoice = question.correctAnswer === index
            const showFeedback = answered && !examMode
            const stateClass = showFeedback && isCorrectChoice
              ? ' correct'
              : showFeedback && isSelected && !isCorrectChoice
                ? ' wrong'
                : isSelected
                  ? ' selected'
                  : ''
            return (
              <button
                key={`${index}-${choice}`}
                type="button"
                className={`p107-answer${stateClass}`}
                onClick={() => onChoose(index)}
              >
                {choice}
              </button>
            )
          })}
        </div>

        {answered && !examMode && (
          <div className="p107-feedback">
            <strong>{correct ? 'Correct.' : 'Not quite.'}</strong> {question.explanation}
          </div>
        )}

        <div className="p107-actions">
          {!practiceMode && (
            <button type="button" className="p107-secondary" onClick={onFinish}>
              End
            </button>
          )}
          <button type="button" className="p107-primary" disabled={!answered} onClick={onNext}>
            {practiceMode
              ? 'Next random'
              : session.currentIndex === session.questions.length - 1
                ? 'Finish'
                : 'Next'}
            <CheckCircle2 size={17} />
          </button>
        </div>
      </section>
    </main>
  )
}

function ResultPanel({
  result,
  account,
  premium,
  examReady,
  trackedCount,
  onStudy,
  onLogin,
  onSmart,
  onUnlockExam,
  onExam,
}) {
  const passed = result.mode === 'exam' && result.score.percent >= PART107_PASSING_PERCENT

  return (
    <main className="p107-shell">
      <section className="p107-card p107-result">
        <div>
          <p className="p107-kicker">Done</p>
          <h1 className="p107-score">{result.score.percent}%</h1>
          <p className="p107-copy">
            {result.score.correct} / {result.score.total} correct
          </p>
          {result.mode === 'exam' && (
            <p className="p107-pass">
              {passed ? 'Ready target met.' : 'Below the 70% target.'}
            </p>
          )}
        </div>

        <div className="p107-row">
          <button type="button" className="p107-secondary" onClick={onStudy}>
            <RotateCcw size={16} />
            Random question
          </button>

          {!account && (
            <button type="button" className="p107-primary" onClick={onLogin}>
              <UserRound size={16} />
              Sign in + save
            </button>
          )}

          {account && (
            <button type="button" className="p107-secondary" onClick={onSmart}>
              Weak areas
            </button>
          )}

          <button
            type="button"
            className={premium && examReady ? 'p107-primary' : 'p107-pay'}
            onClick={premium && examReady ? onExam : onUnlockExam}
          >
            {premium && examReady ? <Play size={16} /> : <CreditCard size={16} />}
            {premium && examReady
              ? 'Full exam'
              : examReady
                ? `Exam sim ${EXAM_PRICE}`
                : 'Exam sim in review'}
          </button>
        </div>

        <p className="p107-note">
          {account
            ? `Tracking on. ${trackedCount} questions saved.`
            : 'Sign in to track misses and weak areas.'}
        </p>

        {(!premium || !examReady) && (
          <p className="p107-note">
            {examReady
              ? 'Full exam sim is a small one-time unlock.'
              : 'Paid full exam sim is locked until the bank passes premium-quality review.'}
          </p>
        )}
      </section>
    </main>
  )
}

function scoreAnswers(answers = []) {
  const total = answers.length
  const correct = answers.filter((answer) => answer.correct).length
  return {
    total,
    correct,
    percent: total ? Math.round((correct / total) * 100) : 0,
  }
}
