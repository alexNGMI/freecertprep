import { createElement } from 'react'
import { ArrowRight, Bookmark, Brain, CheckCircle2, Layers3, ListChecks, Sparkles } from 'lucide-react'
import { motion as Motion } from 'motion/react'
import { useCert } from '../hooks/useCert'
import { useBookmarks } from '../hooks/useBookmarks'
import { ALL_DOMAINS, BOOKMARKED, SMART_PRACTICE, usePracticeSession } from '../hooks/usePracticeSession'
import QuestionCard from '../components/QuestionCard'
import { StudyHeader } from '../components/StudyHeader'
import { StudyWorkspace } from '../components/StudyWorkspace'
import { Button } from '../components/ui/button'
import { DomainBadge, Surface } from '../components/ui/surface'
import { cn } from '../utils/cn'

const BLOCK_SIZE = 10

export default function Quiz() {
  const cert = useCert()
  const questions = cert.questions
  const { bookmarkedIds, toggle: toggleBookmark, isBookmarked } = useBookmarks(cert.id)
  const {
    activeMode,
    answers,
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
  } = usePracticeSession({ cert, questions, bookmarkedIds, blockSize: BLOCK_SIZE })

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
        description: 'Choose one official exam objective and drill it directly.',
        icon: Layers3,
        accent: cert.color,
        action: () => { setSetupStep(2); setSelectedDomain(certDomains[0]) },
        meta: 'Focused',
      },
    ]

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

        <div className="grid gap-4 lg:grid-cols-3">
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

        {activeMode !== 'domain' && (
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
            <Button id="quiz-try-again-btn" onClick={startQuiz} variant="accent" size="lg" accentColor={isSmartPractice ? '#6366f1' : cert.color}>
              {isSmartPractice ? 'Next Smart Block' : 'New Block'}
            </Button>
            <Button onClick={changeMode} variant="secondary" size="lg">Change Mode</Button>
          </div>
        </Surface>
      </div>
    )
  }

  return (
    <StudyWorkspace
      cert={cert}
      title="Practice Quiz"
      subtitle={currentQuestion.domain}
      modeLabel={isSmartPractice ? 'Smart Practice' : selectedDomain}
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
