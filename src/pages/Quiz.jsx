import { createElement } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ArrowRight, Bookmark, Brain, CheckCircle2, History, Layers3, ListChecks, RotateCcw, Sparkles, Target } from 'lucide-react'
import { motion as Motion } from 'motion/react'
import { useCert } from '../hooks/useCert'
import { useBookmarks } from '../hooks/useBookmarks'
import {
  ALL_DOMAINS,
  BOOKMARKED,
  DUE_REVIEW,
  OBJECTIVE_PREFIX,
  RECENT_MISSES,
  SMART_PRACTICE,
  usePracticeSession,
} from '../hooks/usePracticeSession'
import QuestionCard from '../components/QuestionCard'
import { StudyHeader } from '../components/StudyHeader'
import { StudyWorkspace } from '../components/StudyWorkspace'
import { Button } from '../components/ui/button'
import { DomainBadge, Surface } from '../components/ui/surface'
import { cn } from '../utils/cn'
import { getDueReviewQuestions, getRecentMissQuestions } from '../utils/objective-progress'

const BLOCK_SIZE = 10

export default function Quiz() {
  const cert = useCert()
  const questions = cert.questions
  const [searchParams] = useSearchParams()
  const requestedObjective = searchParams.get('objective')
  const requestedMode = searchParams.get('mode')
  const initialSelection = cert.objectives?.some(objective => objective.id === requestedObjective)
    ? `${OBJECTIVE_PREFIX}${requestedObjective}`
    : requestedMode === 'missed'
      ? RECENT_MISSES
      : requestedMode === 'due'
        ? DUE_REVIEW
        : requestedMode === 'bookmarked'
          ? BOOKMARKED
          : SMART_PRACTICE
  const { bookmarkedIds, toggle: toggleBookmark, isBookmarked } = useBookmarks(cert.id)
  const {
    activeMode,
    answers,
    certStats,
    certDomains,
    changeMode,
    currentAnswer,
    currentIndex,
    currentQuestion,
    handleAnswer,
    handleNext,
    isSmartPractice,
    poolQuestions,
    quizStarted,
    selectedDomain,
    sessionQuestions,
    setSelectedDomain,
    setSetupStep,
    setupStep,
    showResult,
    startQuiz,
    trackedCount,
  } = usePracticeSession({ cert, questions, bookmarkedIds, blockSize: BLOCK_SIZE, initialSelection })
  const selectedObjective = selectedDomain.startsWith(OBJECTIVE_PREFIX)
    ? cert.objectives?.find(objective => objective.id === selectedDomain.slice(OBJECTIVE_PREFIX.length))
    : null

  if (!quizStarted) {
    const accentColor = activeMode === 'smart' ? '#6366f1' : cert.color

    if (setupStep === 2) {
      const allDomains = [ALL_DOMAINS, ...certDomains]
      return (
        <div className="mx-auto max-w-5xl space-y-8 animate-fade-up">
          <StudyHeader
            eyebrow="Practice setup"
            title="Choose a domain"
            subtitle="Focus a block on the exact part of the exam you want to sharpen."
            cert={cert}
            onBack={() => { setSetupStep(1); setSelectedDomain(SMART_PRACTICE) }}
            stats={[
              { label: 'Block', value: `${BLOCK_SIZE} Qs`, icon: ListChecks },
              { label: 'Available', value: poolQuestions.length.toLocaleString(), icon: Layers3 },
            ]}
          />

          <Surface className="p-4 md:p-5">
            <div className="grid gap-3 md:grid-cols-2">
              {allDomains.map((domain) => {
                const isSelected = selectedDomain === domain
                const count = domain === ALL_DOMAINS ? questions.length : questions.filter((q) => q.domain === domain).length
                return (
                  <button
                    key={domain}
                    onClick={() => setSelectedDomain(domain)}
                    className={cn(
                      'rounded-2xl border p-5 text-left transition-all duration-200',
                      isSelected
                        ? 'scale-[1.01] text-zinc-950'
                        : 'border-white/10 bg-zinc-900/50 text-zinc-300 hover:border-white/20 hover:bg-zinc-900',
                    )}
                    style={isSelected ? { backgroundColor: cert.color, borderColor: cert.color } : undefined}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-base font-black">{domain}</p>
                        <p className={cn('mt-1 text-sm', isSelected ? 'text-zinc-900/70' : 'text-zinc-500')}>
                          {count.toLocaleString()} questions available
                        </p>
                      </div>
                      <CheckCircle2 className={cn('h-5 w-5', isSelected ? 'text-zinc-950' : 'text-zinc-700')} />
                    </div>
                  </button>
                )
              })}
            </div>
          </Surface>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-zinc-500">{poolQuestions.length.toLocaleString()} questions available. {BLOCK_SIZE} selected randomly each session.</p>
            <Button
              id="start-quiz-btn"
              onClick={startQuiz}
              disabled={poolQuestions.length === 0}
              variant="accent"
              size="lg"
              accentColor={cert.color}
            >
              Start Practice Session
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )
    }

    if (setupStep === 3) {
      return (
        <div className="mx-auto max-w-5xl space-y-8 animate-fade-up">
          <StudyHeader
            eyebrow="Objective practice"
            title="Choose one exam skill"
            subtitle="Build a focused block from one numbered objective instead of an entire domain."
            cert={cert}
            onBack={() => { setSetupStep(1); setSelectedDomain(SMART_PRACTICE) }}
            stats={[
              { label: 'Block', value: `${BLOCK_SIZE} Qs`, icon: ListChecks },
              { label: 'Objectives', value: cert.objectives.length, icon: Target },
            ]}
          />
          <Surface className="p-4 md:p-5">
            <div className="grid gap-3 md:grid-cols-2">
              {cert.objectives.map((objective) => {
                const selection = `${OBJECTIVE_PREFIX}${objective.id}`
                const isSelected = selectedDomain === selection
                const count = questions.filter(question => question.objectiveId === objective.id).length
                return (
                  <button
                    key={objective.id}
                    onClick={() => setSelectedDomain(selection)}
                    className={cn(
                      'rounded-2xl border p-5 text-left transition-all duration-200',
                      isSelected
                        ? 'scale-[1.01] text-zinc-950'
                        : 'border-white/10 bg-zinc-900/50 text-zinc-300 hover:border-white/20 hover:bg-zinc-900',
                    )}
                    style={isSelected ? { backgroundColor: cert.color, borderColor: cert.color } : undefined}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-black uppercase tracking-wider opacity-70">
                          Objective {objective.id} · {objective.domain}
                        </p>
                        <p className="mt-2 text-base font-black">{objective.title}</p>
                        <p className={cn('mt-2 text-sm', isSelected ? 'text-zinc-900/70' : 'text-zinc-500')}>
                          {count} questions available
                        </p>
                      </div>
                      <CheckCircle2 className={cn('h-5 w-5 shrink-0', isSelected ? 'text-zinc-950' : 'text-zinc-700')} />
                    </div>
                  </button>
                )
              })}
            </div>
          </Surface>
          <div className="flex justify-end">
            <Button
              id="start-objective-quiz-btn"
              onClick={startQuiz}
              disabled={!selectedDomain.startsWith(OBJECTIVE_PREFIX) || poolQuestions.length === 0}
              variant="accent"
              size="lg"
              accentColor={cert.color}
            >
              Start Objective Session
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )
    }

    const modes = [
      {
        id: 'smart',
        label: 'Smart Practice',
        description: trackedCount > 0
          ? `Weighted by ${trackedCount} tracked questions and prior misses.`
          : 'Builds a weakness profile as you answer questions.',
        icon: Brain,
        accent: '#6366f1',
        action: () => setSelectedDomain(SMART_PRACTICE),
        meta: 'Adaptive',
      },
      {
        id: 'objective',
        label: 'Objective Focus',
        description: 'Drill one numbered exam skill and measure it separately from the broader domain.',
        icon: Target,
        accent: cert.color,
        action: () => { setSetupStep(3); setSelectedDomain(`${OBJECTIVE_PREFIX}${cert.objectives?.[0]?.id || ''}`) },
        meta: 'Precise',
        hidden: !cert.objectives?.length,
      },
      {
        id: 'missed',
        label: 'Recent Misses',
        description: `${getRecentMissQuestions(questions, certStats).length} previously missed questions ready for another look.`,
        icon: History,
        accent: '#f59e0b',
        action: () => setSelectedDomain(RECENT_MISSES),
        meta: 'Repair',
      },
      {
        id: 'due',
        label: 'Due Review',
        description: `${getDueReviewQuestions(questions, certStats).length} attempted questions are due based on recency and accuracy.`,
        icon: RotateCcw,
        accent: '#22c55e',
        action: () => setSelectedDomain(DUE_REVIEW),
        meta: 'Retention',
      },
      {
        id: 'bookmarked',
        label: 'Bookmarked',
        description: bookmarkedIds.length > 0
          ? `${bookmarkedIds.length} saved question${bookmarkedIds.length === 1 ? '' : 's'} ready for review.`
          : 'Star questions during practice to build your review list.',
        icon: Bookmark,
        accent: cert.color,
        action: () => setSelectedDomain(BOOKMARKED),
        meta: 'Review',
      },
      {
        id: 'domain',
        label: 'Specific Domain',
        description: 'Choose one broad exam domain and drill it directly.',
        icon: Layers3,
        accent: cert.color,
        action: () => { setSetupStep(2); setSelectedDomain(certDomains[0]) },
        meta: 'Focused',
      },
    ].filter(mode => !mode.hidden)

    return (
      <div className="mx-auto max-w-5xl space-y-8 animate-fade-up">
        <StudyHeader
          eyebrow="Practice quiz"
          title="Choose your training mode"
          subtitle="Short, focused sessions with instant feedback and explanations."
          cert={cert}
          stats={[
            { label: 'Block', value: `${BLOCK_SIZE} Qs`, icon: ListChecks },
            { label: 'Tracked', value: trackedCount, icon: Sparkles },
          ]}
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {modes.map(({ id, label, description, icon: Icon, accent, action, meta }) => {
            const isSelected = activeMode === id
            return (
              <Motion.button
                key={id}
                onClick={action}
                whileHover={{ y: -4 }}
                className={cn(
                  'min-h-64 rounded-3xl border p-6 text-left transition-all',
                  isSelected ? 'border-white/20 bg-white/[0.07]' : 'border-white/10 bg-zinc-950/70 hover:border-white/20',
                )}
              >
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border" style={{ color: accent, borderColor: `${accent}45`, backgroundColor: `${accent}12` }}>
                        {createElement(Icon, { className: 'h-6 w-6' })}
                      </div>
                      <DomainBadge color={accent}>{meta}</DomainBadge>
                    </div>
                    <h2 className="mt-6 text-2xl font-black text-zinc-50">{label}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">{description}</p>
                  </div>
                  <div className="mt-8 flex items-center justify-between">
                    <span className="text-sm font-bold" style={{ color: accent }}>{id === 'domain' ? 'Pick domain' : 'Select mode'}</span>
                    {isSelected ? <CheckCircle2 className="h-5 w-5" style={{ color: accent }} /> : <ArrowRight className="h-5 w-5 text-zinc-600" />}
                  </div>
                </div>
              </Motion.button>
            )
          })}
        </div>

        {!['domain', 'objective'].includes(activeMode) && (
          <div className="space-y-4">
            {cert.practiceGuidance && activeMode === 'smart' && (
              <Surface className="p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">SAA review loop</p>
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  {cert.practiceGuidance.map((item, index) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-zinc-900/55 p-4">
                      <p className="text-[10px] font-black uppercase tracking-wider" style={{ color: index === 0 ? '#6366f1' : cert.color }}>
                        Step {index + 1}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-300">{item}</p>
                    </div>
                  ))}
                </div>
              </Surface>
            )}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-zinc-500">
                {activeMode === 'bookmarked' && poolQuestions.length === 0
                  ? 'No bookmarks yet. Star questions during practice to fill this list.'
                  : activeMode === 'smart'
                    ? `${BLOCK_SIZE} questions selected from weighted weak areas.`
                    : `${poolQuestions.length.toLocaleString()} available.`}
              </p>
              <Button
                id="start-quiz-btn"
                onClick={startQuiz}
                disabled={poolQuestions.length === 0}
                variant="accent"
                size="lg"
                accentColor={accentColor}
              >
                Start Practice Session
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    )
  }

  if (showResult) {
    const correct = answers.filter((a) => a.correct).length
    const total = answers.length
    const pct = Math.round((correct / total) * 100)
    const passed = pct >= cert.passingScore

    return (
      <div className="mx-auto max-w-3xl space-y-8 animate-fade-up">
        <StudyHeader
          eyebrow="Session complete"
          title={passed ? 'Strong work.' : 'Good signal.'}
          subtitle={isSmartPractice ? 'Smart Practice stats were updated from this block.' : 'Your practice history now has one more data point.'}
          cert={cert}
          stats={[
            { label: 'Score', value: `${pct}%`, icon: CheckCircle2 },
            { label: 'Correct', value: `${correct}/${total}`, icon: ListChecks },
          ]}
        />
        <Surface className="p-8 text-center md:p-12">
          <p className={cn('text-7xl font-black tracking-tight', passed ? 'text-emerald-400' : 'text-rose-400')}>{pct}%</p>
          <p className="mt-4 text-zinc-400">
            {correct} of {total} correct. {passed ? 'You are trending above the pass mark.' : 'Use the misses as your next study target.'}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            {correct < total && (
              <Button onClick={() => changeMode(RECENT_MISSES)} variant="accent" size="lg" accentColor="#f59e0b">
                Review Recent Misses
                <History className="h-5 w-5" />
              </Button>
            )}
            <Button id="quiz-try-again-btn" onClick={startQuiz} variant="accent" size="lg" accentColor={isSmartPractice ? '#6366f1' : cert.color}>
              {isSmartPractice ? 'Next Smart Block' : 'New Block'}
            </Button>
            <Button onClick={() => changeMode()} variant="secondary" size="lg">Change Mode</Button>
          </div>
        </Surface>
        {cert.objectives && (() => {
          const questionById = new Map(sessionQuestions.map(question => [question.id, question]))
          const missed = answers
            .filter(answer => !answer.correct)
            .map(answer => questionById.get(answer.questionId))
            .filter(Boolean)
          const objectiveCounts = missed.reduce((counts, question) => {
            if (!question.objectiveId) return counts
            counts[question.objectiveId] = (counts[question.objectiveId] || 0) + 1
            return counts
          }, {})
          const recommendations = Object.entries(objectiveCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([objectiveId, misses]) => ({
              ...cert.objectives.find(objective => objective.id === objectiveId),
              misses,
            }))
            .filter(objective => objective.id)

          if (!recommendations.length) return null
          return (
            <Surface className="p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Next study target</p>
              <h2 className="mt-2 text-2xl font-black text-zinc-50">Repair the objectives behind your misses</h2>
              <div className="mt-5 grid gap-3">
                {recommendations.map(objective => (
                  <button
                    key={objective.id}
                    onClick={() => changeMode(`${OBJECTIVE_PREFIX}${objective.id}`)}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-zinc-900/55 p-4 text-left hover:border-white/20"
                  >
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider" style={{ color: cert.color }}>
                        Objective {objective.id} · {objective.misses} miss{objective.misses === 1 ? '' : 'es'}
                      </p>
                      <p className="mt-1 font-bold text-zinc-100">{objective.title}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 shrink-0 text-zinc-500" />
                  </button>
                ))}
              </div>
            </Surface>
          )
        })()}
      </div>
    )
  }

  return (
    <StudyWorkspace
      cert={cert}
      title="Practice Quiz"
      subtitle={currentQuestion.domain}
      modeLabel={isSmartPractice
        ? 'Smart Practice'
        : selectedObjective
          ? `Objective ${selectedObjective.id}: ${selectedObjective.title}`
          : selectedDomain}
      currentIndex={currentIndex}
      total={sessionQuestions.length}
      answeredCount={answers.length}
      footer={currentAnswer && (
        <div className="ml-auto">
          <Button id="quiz-next-btn" onClick={handleNext} variant="accent" size="lg" accentColor={isSmartPractice ? '#6366f1' : cert.color}>
            {currentIndex < sessionQuestions.length - 1 ? 'Next Question' : 'See Results'}
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      )}
    >
      <QuestionCard
        key={currentQuestion.id}
        question={currentQuestion}
        onAnswer={handleAnswer}
        answered={!!currentAnswer}
        selectedChoice={currentAnswer?.selected}
        isBookmarked={isBookmarked(currentQuestion.id)}
        onToggleBookmark={toggleBookmark}
      />
    </StudyWorkspace>
  )
}
