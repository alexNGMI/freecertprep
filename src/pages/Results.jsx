import { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useCert } from '../hooks/useCert'
import QuestionCard from '../components/QuestionCard'
import { readinessResult, readinessTarget } from '../utils/readiness'
import { buildExamDebrief } from '../utils/learning-loop'
import { formatLearningTarget, getLearningLoopConfig, getLearningObjectives } from '../utils/learning-loop-config'
import StudyLoopNav from '../components/StudyLoopNav'
import { Button } from '../components/ui/button'
import { Surface } from '../components/ui/surface'

export default function Results() {
  const cert = useCert()
  const learningLoopConfig = getLearningLoopConfig(cert.id)
  const learningObjectives = getLearningObjectives(cert)
  const location = useLocation()
  const { answers, questions: examQuestions } = location.state || {}
  const [reviewMode, setReviewMode] = useState(false)
  const [reviewFilter, setReviewFilter] = useState('all') // 'all', 'incorrect', 'correct'

  if (!answers) {
    return (
      <Surface className="mx-auto max-w-xl p-8 text-center md:p-12">
        <h1 className="text-2xl font-black text-zinc-50">No completed session to review.</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-400">
          Finish a practice or exam session first, then your score and next steps will appear here.
        </p>
        <Button as={Link} to={`/${cert.id}`} variant="primary" className="mt-6">
          Return to Dashboard
        </Button>
      </Surface>
    )
  }

  const correct = answers.filter((a) => a.correct).length
  const total = answers.length
  const pct = Math.round((correct / total) * 100)
  const passed = pct >= cert.passingScore

  const domainMap = {}
  answers.forEach((a) => {
    if (!domainMap[a.domain]) domainMap[a.domain] = { correct: 0, total: 0 }
    domainMap[a.domain].total++
    if (a.correct) domainMap[a.domain].correct++
  })

  const domainResults = Object.entries(domainMap).map(([domain, stats]) => ({
    domain,
    ...stats,
    percentage: Math.round((stats.correct / stats.total) * 100),
  }))

  domainResults.sort((a, b) => a.percentage - b.percentage)
  const debrief = learningLoopConfig && examQuestions
    ? buildExamDebrief(answers, examQuestions, learningObjectives)
    : null
  const incorrect = answers.filter((answer) => !answer.correct)
  const unanswered = answers.filter((answer) => answer.selected === -1).length
  const weakestDomain = domainResults[0]
  const strongestDomain = domainResults[domainResults.length - 1]
  const missedQuestionTypes = examQuestions
    ? incorrect.reduce((counts, answer, index) => {
        const question = examQuestions[index]
        const type = question?.type || 'single-choice'
        counts[type] = (counts[type] || 0) + 1
        return counts
      }, {})
    : {}
  const topMissedType = Object.entries(missedQuestionTypes).sort((a, b) => b[1] - a[1])[0]
  const nextPracticeLink = debrief?.bestNext
    ? `/${cert.id}/quiz?objective=${debrief.bestNext.id}`
    : `/${cert.id}/quiz?mode=missed`
  const nextPracticeLabel = debrief?.bestNext
    ? `Practice ${formatLearningTarget(learningLoopConfig, debrief.bestNext.id)}`
    : 'Review recent misses'
  const retakeGuidance = passed
    ? 'Retake only after you confirm weak domains were not just lucky coverage gaps.'
    : 'Retake after one focused repair block and a short review of missed explanations.'

  return (
    <div className="space-y-12 animate-fade-up pt-4 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-zinc-100 text-center tracking-tight">Readiness Results</h1>
      {learningLoopConfig && <StudyLoopNav cert={cert} current="debrief" />}

      <div className="glass-panel rounded-2xl p-10 text-center max-w-lg mx-auto relative overflow-hidden shadow-2xl">
        <div 
          className="absolute inset-0 opacity-10 blur-3xl pointer-events-none" 
          style={{ backgroundColor: passed ? '#34d399' : '#f43f5e' }} 
        />
        
        <p className="text-sm font-bold tracking-widest uppercase mb-4 text-zinc-500">
          Final Score
        </p>
        <p 
          className="text-8xl font-black mb-6 tracking-tighter"
          style={{ 
            color: passed ? '#34d399' : '#fb7185',
            textShadow: `0 0 40px ${passed ? 'rgba(52,211,153,0.4)' : 'rgba(244,63,94,0.4)'}`
          }}
        >
          {pct}%
        </p>
        <div className="inline-block px-6 py-2 rounded-full border mb-8 bg-zinc-950/50 backdrop-blur-sm" style={{ borderColor: passed ? 'rgba(52,211,153,0.3)' : 'rgba(244,63,94,0.3)' }}>
          <p className="text-lg font-bold uppercase tracking-wider" style={{ color: passed ? '#34d399' : '#fb7185' }}>
            {readinessResult(passed)}
          </p>
        </div>
        <p className="text-zinc-400 font-medium">
          <span className="text-zinc-100 font-bold">{correct}</span> / {total} correct answers &mdash; readiness target is <span className="text-zinc-200">{readinessTarget(cert)}</span>
        </p>
        <p className="mx-auto mt-4 max-w-md text-xs leading-relaxed text-zinc-500">
          This result is a freecertprep readiness signal, not an official vendor score report or scaled-score conversion.
        </p>
      </div>

      <div className="glass-panel rounded-2xl p-8 space-y-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">What to do next</p>
          <h2 className="mt-2 text-2xl font-bold text-zinc-100">
            {passed ? 'Confirm the weak spots before you call it ready.' : 'Repair the miss pattern before another full exam.'}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Your score is useful, but the next move comes from the miss pattern: weakest domain, missed formats, and unanswered questions.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-zinc-900/55 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Weakest area</p>
            <p className="mt-2 font-black text-zinc-100">{weakestDomain?.domain || 'No domain signal yet'}</p>
            <p className="mt-2 text-sm text-zinc-500">
              {weakestDomain ? `${weakestDomain.correct}/${weakestDomain.total} correct on this form.` : 'Take a practice block to create a signal.'}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-zinc-900/55 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Why misses happened</p>
            <p className="mt-2 font-black text-zinc-100">
              {incorrect.length === 0 ? 'No misses recorded' : topMissedType ? formatQuestionType(topMissedType[0]) : 'Concept review'}
            </p>
            <p className="mt-2 text-sm text-zinc-500">
              {incorrect.length === 0
                ? 'Use the review to confirm the form covered enough of the blueprint.'
                : `${incorrect.length} missed, ${unanswered} unanswered. Read explanations before retaking.`}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-zinc-900/55 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Retake rule</p>
            <p className="mt-2 font-black text-zinc-100">{strongestDomain ? 'Repair first, retake second' : 'Build signal first'}</p>
            <p className="mt-2 text-sm text-zinc-500">{retakeGuidance}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button as={Link} to={nextPracticeLink} variant="accent" accentColor={cert.color}>
            {nextPracticeLabel}
          </Button>
          <Button as={Link} to={`/${cert.id}/learning`} variant="secondary">
            Open study plan
          </Button>
          <Button as={Link} to={`/${cert.id}/exam`} variant="ghost">
            Retake when ready
          </Button>
        </div>
      </div>

      <div className="glass-panel rounded-2xl p-8 space-y-8 relative overflow-hidden">
        <h2 className="text-2xl font-bold text-zinc-100">
          Domain Breakdown
          <span className="text-sm font-normal text-zinc-500 ml-3">(Ranked weakest first)</span>
        </h2>
        
        <div className="space-y-6 relative z-10">
          {domainResults.map((d) => {
            const colors = cert.domainColors[d.domain]
            return (
              <div key={d.domain} className="group">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-zinc-300 font-medium text-sm md:text-base flex-1 pr-4">{d.domain}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-zinc-500 text-sm font-medium hidden sm:inline">{d.correct} / {d.total} correct</span>
                    <span
                      className="font-bold text-base px-3 py-1 bg-zinc-900/50 rounded-md border border-white/5"
                      style={{ color: colors?.hex || '#a1a1aa' }}
                    >
                      {d.percentage}%
                    </span>
                  </div>
                </div>
                <div className="h-3 bg-zinc-900/80 rounded-full border border-white/5 overflow-hidden shadow-inner flex">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out flex items-center justify-end"
                    style={{
                      width: `${d.percentage}%`,
                      backgroundColor: colors?.hex || '#3f3f46',
                      boxShadow: colors?.hex ? `0 0 10px ${colors.hex}60` : 'none',
                    }}
                  >
                    <div className="w-10 h-full bg-white/20 blur-sm" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {debrief && (
        <div className="glass-panel rounded-2xl p-8 space-y-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">Exam debrief</p>
            <h2 className="mt-2 text-2xl font-bold text-zinc-100">Turn this attempt into the next study block</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              This form measured {debrief.measuredObjectives} target{debrief.measuredObjectives === 1 ? '' : 's'} and included {debrief.practicalMisses} missed applied question{debrief.practicalMisses === 1 ? '' : 's'}.
            </p>
          </div>
          {debrief.bestNext && (
            <div className="rounded-2xl border border-white/10 bg-zinc-900/55 p-5">
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: cert.color }}>Best next move</p>
              <h3 className="mt-2 text-xl font-black text-zinc-100">
                Repair {formatLearningTarget(learningLoopConfig, debrief.bestNext.id)} before retaking the exam.
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {debrief.bestNext.title} produced {debrief.bestNext.misses} miss{debrief.bestNext.misses === 1 ? '' : 'es'} on this form. Practice this target first, then use the mastery map or case set to confirm the repair.
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <Button as={Link} to={`/${cert.id}/quiz?objective=${debrief.bestNext.id}`} variant="accent" accentColor={cert.color}>
                  Practice this target
                </Button>
                {debrief.practicalMisses > 0 && (
                  <Button as={Link} to={`/${cert.id}/learning/cases`} variant="secondary">
                    Practice applied cases
                  </Button>
                )}
              </div>
            </div>
          )}
          {debrief.appliedSummary?.categories?.length > 0 && (
            <div className="grid gap-3 md:grid-cols-2">
              {debrief.appliedSummary.categories.map(item => (
                <div key={item.category} className="rounded-2xl border border-white/10 bg-zinc-950/45 p-4">
                  <p className="font-bold text-zinc-100">{item.category}</p>
                  <p className="mt-2 text-sm text-zinc-500">
                    {item.correct}/{item.total} correct
                    {item.missed > 0 ? ` - ${item.missed} missed` : ' - clean pass'}
                  </p>
                </div>
              ))}
            </div>
          )}
          {debrief.priorities.length > 0 ? (
            <div className="grid gap-3 md:grid-cols-3">
              {debrief.priorities.map(priority => (
                <Link
                  key={priority.id}
                  to={`/${cert.id}/quiz?objective=${priority.id}`}
                  className="rounded-2xl border border-white/10 bg-zinc-900/55 p-5 transition hover:border-white/20"
                >
                  <p className="text-xs font-bold uppercase tracking-wider" style={{ color: cert.color }}>
                    {formatLearningTarget(learningLoopConfig, priority.id)} · {priority.misses} miss{priority.misses === 1 ? '' : 'es'}
                  </p>
                  <p className="mt-2 font-bold text-zinc-100">{priority.title}</p>
                  <p className="mt-3 text-sm text-zinc-500">{priority.accuracy}% on this form</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5 text-sm font-semibold text-emerald-200">
              No target produced a miss on this form. Use the mastery map to check coverage before treating that as full readiness.
            </p>
          )}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button as={Link} to={`/${cert.id}/learning`} variant="secondary">
              Open Mastery Map
            </Button>
            <Button as={Link} to={`/${cert.id}/learning/cases`} variant="secondary">
              Practice Applied Cases
            </Button>
          </div>
        </div>
      )}

      {/* Review Questions Section */}
      {examQuestions && (
        <div className="space-y-6 pb-12">
          <button
            onClick={() => setReviewMode(prev => !prev)}
            className="w-full px-6 py-4 rounded-xl font-bold text-center border border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 hover:border-amber-400/50 transition-all flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {reviewMode ? 'Hide Question Review' : 'Review All Questions'}
            <svg className={`w-4 h-4 transition-transform duration-300 ${reviewMode ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {reviewMode && (
            <div className="space-y-6 animate-fade-up">
              {/* Filter tabs */}
              <div className="flex gap-2 justify-center">
                {[
                  { key: 'all', label: `All (${answers.length})` },
                  { key: 'incorrect', label: `Incorrect (${answers.filter(a => !a.correct).length})` },
                  { key: 'correct', label: `Correct (${answers.filter(a => a.correct).length})` },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setReviewFilter(key)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all border ${
                      reviewFilter === key
                        ? 'bg-zinc-100 text-zinc-900 border-zinc-100'
                        : 'border-white/10 text-zinc-400 hover:text-zinc-200 hover:border-white/20'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Question list */}
              {examQuestions.map((question, i) => {
                const answer = answers[i]
                if (reviewFilter === 'incorrect' && answer.correct) return null
                if (reviewFilter === 'correct' && !answer.correct) return null

                return (
                  <div key={question.id} className="space-y-2">
                    <div className="flex items-center gap-3 px-2">
                      <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        answer.correct
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}>
                        {i + 1}
                      </span>
                      <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider">{question.domain}</span>
                      {answer.selected === -1 && (
                        <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded">Unanswered</span>
                      )}
                    </div>
                    <QuestionCard
                      question={question}
                      onAnswer={() => {}}
                      answered={true}
                      selectedChoice={answer.selected === -1 ? undefined : answer.selected}
                      reviewMode={true}
                      certId={cert.id}
                    />
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function formatQuestionType(type) {
  return type
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}
