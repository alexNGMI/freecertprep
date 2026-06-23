import { useState, useMemo } from 'react'
import { fisherYates } from '../utils/shuffle'
import { getAnswerProgress, isAnswerCorrect } from '../utils/scoring'
import { RichText, InlineRichText } from './RichText'
import { stripMarkdown } from '../utils/markdown'
import ReportIssueButton from './ReportIssueButton'

export default function QuestionCard({ question, onAnswer, answered, selectedChoice, examMode = false, reviewMode = false, isBookmarked = false, onToggleBookmark = null, certId = 'unknown-cert' }) {
  const isMultiple = question.type === 'multiple-response'
  const isTrueFalse = question.type === 'true-false'
  const isStatement = question.type === 'statement-block'
  const isOrdering = question.type === 'ordering'
  const isPbqMatching = question.type === 'pbq-matching'
  const isMatching = question.type === 'matching' || isPbqMatching
  const isCliOutput = question.type === 'cli-output'
  const isTopologyScenario = question.type === 'topology-scenario'
  const isConfigRepair = question.type === 'config-repair'
  const isSubnettingDrill = question.type === 'subnetting-drill'

  // Shuffle answer choices once per question so correct answer isn't always position B.
  // shuffledChoices is an array of { origIdx, text } — display order is shuffled,
  // but all answer storage/validation uses original indices unchanged.
  // question.choices is a stable reference (comes from JSON) and QuestionCard is
  // remounted per question via `key={question.id}` in the parent, so this memo
  // runs once per mount.
  const shuffledChoices = useMemo(() => {
    if (!question.choices) return []
    const indices = question.choices.map((_, i) => i)
    // In review mode, show original order so correct answer labels are stable
    const ordered = reviewMode ? indices : fisherYates(indices)
    return ordered.map(origIdx => ({ origIdx, text: question.choices[origIdx] }))
  }, [question.choices, reviewMode])

  // Local state for interactive questions before they are submitted (only used in Quiz Mode)
  const [localMulti, setLocalMulti] = useState(() =>
    isMultiple && !examMode ? [] : []
  )
  const [localStatements, setLocalStatements] = useState(() =>
    question.statements && !examMode ? new Array(question.statements.length).fill(null) : []
  )
  // Ordering: array of item indices in the order the user has placed them
  const [localOrder, setLocalOrder] = useState([])
  // Matching: array of selected right-column index per left item (null = unset)
  const [localMatches, setLocalMatches] = useState(() =>
    question.itemsLeft ? new Array(question.itemsLeft.length).fill(null) : []
  )
  const [localSubnetAnswer, setLocalSubnetAnswer] = useState(() => (
    question.asks ? Object.fromEntries(question.asks.map((field) => [field, ''])) : {}
  ))

  const toggleMulti = (index) => {
    if (answered) return
    if (examMode) {
      const current = selectedChoice || [];
      const newSelection = current.includes(index) ? current.filter(i => i !== index) : [...current, index];
      onAnswer(newSelection.sort());
    } else {
      setLocalMulti(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index])
    }
  }

  const setStatement = (index, val) => {
    if (answered) return
    if (examMode) {
      const current = selectedChoice ? [...selectedChoice] : new Array(question.statements?.length).fill(null);
      current[index] = val;
      onAnswer(current);
    } else {
      const newArr = [...localStatements]
      newArr[index] = val
      setLocalStatements(newArr)
    }
  }

  // Ordering: toggle an item into/out of the sequence
  const toggleOrderItem = (index) => {
    if (answered) return
    if (examMode) {
      const current = selectedChoice || []
      const newOrder = current.includes(index)
        ? current.filter(i => i !== index)
        : [...current, index]
      onAnswer(newOrder)
    } else {
      setLocalOrder(prev =>
        prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
      )
    }
  }

  // Matching: set the right-column selection for a left item
  const setMatch = (leftIndex, rightIndex) => {
    if (answered) return
    if (examMode) {
      const current = selectedChoice ? [...selectedChoice] : new Array(question.itemsLeft?.length).fill(null)
      current[leftIndex] = rightIndex === '' ? null : Number(rightIndex)
      onAnswer(current)
    } else {
      setLocalMatches(prev => {
        const next = [...prev]
        next[leftIndex] = rightIndex === '' ? null : Number(rightIndex)
        return next
      })
    }
  }

  const setSubnetField = (field, value) => {
    if (answered) return
    if (examMode) {
      const next = { ...(selectedChoice || {}), [field]: value }
      onAnswer(next)
    } else {
      setLocalSubnetAnswer((prev) => ({ ...prev, [field]: value }))
    }
  }

  const handleSubmit = () => {
    if (isMultiple) onAnswer([...localMulti].sort())
    else if (isStatement) onAnswer(localStatements)
    else if (isOrdering) onAnswer([...localOrder])
    else if (isMatching) onAnswer([...localMatches])
    else if (isSubnettingDrill) onAnswer({ ...localSubnetAnswer })
  }

  const isCorrect = isAnswerCorrect(selectedChoice, question)
  const answerProgress = answered ? getAnswerProgress(selectedChoice, question) : null

  // Derived display state for ordering
  const activeOrder = isOrdering ? ((examMode || answered) ? (selectedChoice || []) : localOrder) : []
  const activeMatches = isMatching ? ((examMode || answered) ? (selectedChoice || new Array(question.itemsLeft?.length).fill(null)) : localMatches) : []
  const activeSubnetAnswer = isSubnettingDrill ? ((examMode || answered) ? (selectedChoice || {}) : localSubnetAnswer) : {}

  // Submit readiness
  const orderingReady = activeOrder.length === question.items?.length
  const matchingReady = activeMatches.every(m => m !== null)
  const subnetReady = (question.asks || []).every((field) => String(activeSubnetAnswer[field] ?? '').trim().length > 0)

  return (
    <div className="glass-panel rounded-2xl p-6 md:p-8 space-y-8 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="inline-block text-[11px] font-bold px-3 py-1.5 rounded-lg border border-indigo-500/50 bg-indigo-500/10 text-indigo-300 uppercase tracking-widest">
            {question.domain}
          </span>
          {question.objectiveId && (
            <span
              title={question.objectiveTitle || undefined}
              className="inline-block rounded-lg border border-white/10 bg-zinc-900/70 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-zinc-400"
            >
              Objective {question.objectiveId}
            </span>
          )}
          {onToggleBookmark && (
            <button
              onClick={() => onToggleBookmark(question.id)}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark this question'}
              className={`p-1.5 rounded-lg border transition-all duration-200 ${
                isBookmarked
                  ? 'border-amber-500/40 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20'
                  : 'border-white/10 bg-transparent text-zinc-600 hover:text-amber-400 hover:border-amber-500/30'
              }`}
            >
              <svg className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
          )}
          <ReportIssueButton certId={certId} question={question} context={reviewMode ? 'review' : examMode ? 'exam' : 'practice'} />
        </div>
        <div className="flex items-center gap-2">
          {isMultiple && <span className="text-xs text-sky-400 font-semibold bg-sky-500/10 px-3 py-1.5 rounded-lg border border-sky-500/20">Select {question.correctAnswers.length}</span>}
          {isTrueFalse && <span className="text-xs text-sky-400 font-semibold bg-sky-500/10 px-3 py-1.5 rounded-lg border border-sky-500/20">True or false</span>}
          {isStatement && <span className="text-xs text-sky-400 font-semibold bg-sky-500/10 px-3 py-1.5 rounded-lg border border-sky-500/20">Yes / No required</span>}
          {isOrdering && <span className="text-xs text-sky-400 font-semibold bg-sky-500/10 px-3 py-1.5 rounded-lg border border-sky-500/20">Click to order ({activeOrder.length}/{question.items?.length})</span>}
          {isPbqMatching && <span className="text-xs text-sky-400 font-semibold bg-sky-500/10 px-3 py-1.5 rounded-lg border border-sky-500/20">PBQ-lite matching</span>}
          {!isPbqMatching && isMatching && <span className="text-xs text-sky-400 font-semibold bg-sky-500/10 px-3 py-1.5 rounded-lg border border-sky-500/20">Match each item</span>}
          {isCliOutput && <span className="text-xs text-sky-400 font-semibold bg-sky-500/10 px-3 py-1.5 rounded-lg border border-sky-500/20">Interpret command output</span>}
          {isTopologyScenario && <span className="text-xs text-sky-400 font-semibold bg-sky-500/10 px-3 py-1.5 rounded-lg border border-sky-500/20">Read the topology</span>}
          {isConfigRepair && <span className="text-xs text-sky-400 font-semibold bg-sky-500/10 px-3 py-1.5 rounded-lg border border-sky-500/20">Repair the config</span>}
          {isSubnettingDrill && <span className="text-xs text-sky-400 font-semibold bg-sky-500/10 px-3 py-1.5 rounded-lg border border-sky-500/20">Subnetting drill</span>}
        </div>
      </div>

      {isCliOutput && (
        <CliOutputPanel question={question} />
      )}
      {isTopologyScenario && (
        <TopologyScenarioPanel question={question} />
      )}
      {isConfigRepair && (
        <ConfigRepairPanel question={question} />
      )}
      {isSubnettingDrill && (
        <SubnettingDrillPanel
          question={question}
          answered={answered}
          activeAnswer={activeSubnetAnswer}
          onChange={setSubnetField}
        />
      )}
      {isPbqMatching && (
        <PbqMatchingPanel question={question} />
      )}
      {!isPbqMatching && question.evidenceArtifacts?.length > 0 && (
        <div className="space-y-3 rounded-2xl border border-emerald-500/20 bg-emerald-950/10 p-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-300">
            Search evidence
          </p>
          {question.evidenceArtifacts.map((artifact, index) => (
            <PbqArtifact key={`${artifact.title}-${index}`} artifact={artifact} />
          ))}
        </div>
      )}

      <RichText text={question.question} className="text-zinc-100 text-xl font-medium leading-relaxed" />

      <div className="space-y-4">
        {/* Single Choice or Multiple Response — uses shuffledChoices for display,
            origIdx for answer storage so validation is unaffected */}
        {!isStatement && !isOrdering && !isMatching && shuffledChoices.map(({ origIdx, text }, displayIdx) => {
          const isSelected = isMultiple
            ? (answered || examMode ? selectedChoice?.includes(origIdx) : localMulti.includes(origIdx))
            : selectedChoice === origIdx;
          const isCorrectChoice = isMultiple ? question.correctAnswers.includes(origIdx) : question.correctAnswer === origIdx;

          let style = 'border-white/5 bg-zinc-900/50 text-zinc-300 hover:border-white/20 hover:bg-zinc-800 hover:text-zinc-100 hover:-translate-y-0.5';

          if (answered) {
            if (isCorrectChoice) {
              style = 'border-emerald-500/50 bg-emerald-500/10 text-emerald-100 animate-answer-pop';
            } else if (isSelected && !isCorrectChoice) {
              style = 'border-rose-500/50 bg-rose-500/10 text-rose-200 animate-answer-pop';
            } else {
              style = 'border-white/5 bg-zinc-900/20 text-zinc-600 opacity-60';
            }
          } else if (isSelected) {
            style = 'border-indigo-500/50 bg-indigo-500/10 text-indigo-100';
          }

          return (
            <button
              key={origIdx}
              disabled={answered}
              onClick={() => isMultiple ? toggleMulti(origIdx) : onAnswer(origIdx)}
              className={`w-full text-left px-6 py-4 rounded-xl border transition-all duration-300 ${style}`}
            >
              <div className="flex items-start">
                <span className={`font-bold mr-4 shrink-0 flex items-center justify-center w-6 h-6 rounded ${isSelected ? 'bg-indigo-500/20 text-indigo-300' : 'bg-zinc-800 text-zinc-500'}`}>
                  {isMultiple ? (isSelected ? '✓' : '') : String.fromCharCode(65 + displayIdx)}
                </span>
                <InlineRichText text={text} className="flex-1 mt-0.5 leading-snug text-sm sm:text-base" />
              </div>
            </button>
          )
        })}

        {/* Statement Block */}
        {isStatement && question.statements && question.statements.map((stmt, index) => {
          const ans = (answered || examMode) ? selectedChoice?.[index] : localStatements[index];
          const correctAns = question.correctAnswers[index];
          let rowStyle = 'border-white/5 bg-zinc-900/50';

          if (answered) {
            if (ans === correctAns) rowStyle = 'border-emerald-500/50 bg-emerald-500/10';
            else rowStyle = 'border-rose-500/50 bg-rose-500/10';
          }

          return (
            <div key={index} className={`flex flex-col md:flex-row justify-between items-start md:items-center px-6 py-4 rounded-xl border transition-all ${rowStyle}`}>
              <InlineRichText text={stmt} className="text-sm sm:text-base text-zinc-200 flex-1 pr-6 leading-relaxed mb-4 md:mb-0" />
              <div className="flex gap-2 w-full md:w-auto">
                <button
                  disabled={answered}
                  onClick={() => setStatement(index, true)}
                  className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-semibold border transition-all ${ans === true ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-white/10 text-zinc-400 hover:border-white/30 hover:bg-zinc-800'} disabled:opacity-50`}
                >
                  Yes
                </button>
                <button
                  disabled={answered}
                  onClick={() => setStatement(index, false)}
                  className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-semibold border transition-all ${ans === false ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-white/10 text-zinc-400 hover:border-white/30 hover:bg-zinc-800'} disabled:opacity-50`}
                >
                  No
                </button>
              </div>
            </div>
          )
        })}

        {/* Ordering */}
        {isOrdering && question.items && (
          <div className="space-y-6">
            {/* Current sequence display */}
            {activeOrder.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">Your sequence</p>
                <div className="space-y-2">
                  {activeOrder.map((itemIndex, seqPos) => {
                    const isCorrectPos = answered && question.correctOrder[seqPos] === itemIndex
                    const isWrongPos = answered && question.correctOrder[seqPos] !== itemIndex
                    return (
                      <div
                        key={seqPos}
                        className={`flex items-center gap-4 px-4 py-3 rounded-xl border transition-all ${
                          answered
                            ? isCorrectPos
                              ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-100'
                              : 'border-rose-500/50 bg-rose-500/10 text-rose-200'
                            : 'border-indigo-500/30 bg-indigo-500/10 text-indigo-100'
                        }`}
                      >
                        <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                          answered
                            ? isCorrectPos ? 'bg-emerald-500/30 text-emerald-300' : 'bg-rose-500/30 text-rose-300'
                            : 'bg-indigo-500/30 text-indigo-300'
                        }`}>{seqPos + 1}</span>
                        <InlineRichText text={question.items[itemIndex]} className="text-sm sm:text-base leading-snug flex-1" />
                        {answered && isWrongPos && (
                          <span className="text-xs text-zinc-400 shrink-0">should be #{question.correctOrder.indexOf(itemIndex) + 1}</span>
                        )}
                        {!answered && (
                          <button
                            onClick={() => toggleOrderItem(itemIndex)}
                            className="shrink-0 text-zinc-500 hover:text-rose-400 transition-colors text-lg leading-none"
                            title="Remove from sequence"
                          >×</button>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Unplaced items */}
            {!answered && (
              <div className="space-y-2">
                <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">
                  {activeOrder.length === 0 ? 'Click items in the correct order' : 'Remaining items'}
                </p>
                <div className="space-y-2">
                  {question.items.map((item, index) => {
                    if (activeOrder.includes(index)) return null
                    return (
                      <button
                        key={index}
                        onClick={() => toggleOrderItem(index)}
                        className="w-full text-left px-6 py-4 rounded-xl border border-white/5 bg-zinc-900/50 text-zinc-300 hover:border-white/20 hover:bg-zinc-800 hover:text-zinc-100 hover:-translate-y-0.5 transition-all duration-200"
                      >
                        <InlineRichText text={item} className="text-sm sm:text-base leading-snug" />
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Show correct order on answered */}
            {answered && (
              <div className="space-y-2">
                <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">Correct order</p>
                <div className="space-y-2">
                  {question.correctOrder.map((itemIndex, seqPos) => (
                    <div key={seqPos} className="flex items-center gap-4 px-4 py-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-zinc-300">
                      <span className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold bg-emerald-500/20 text-emerald-400">{seqPos + 1}</span>
                      <InlineRichText text={question.items[itemIndex]} className="text-sm sm:text-base leading-snug" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Matching */}
        {isMatching && question.itemsLeft && (
          <div className="space-y-3">
            {question.itemsLeft.map((leftItem, leftIndex) => {
              const selected = activeMatches[leftIndex]
              const correct = question.correctMatches[leftIndex]
              const isCorrectMatch = answered && selected === correct
              const isWrongMatch = answered && selected !== correct

              return (
                <div
                  key={leftIndex}
                  className={`flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-4 px-5 py-4 rounded-xl border transition-all ${
                    answered
                      ? isCorrectMatch
                        ? 'border-emerald-500/50 bg-emerald-500/10'
                        : 'border-rose-500/50 bg-rose-500/10'
                      : selected !== null
                        ? 'border-indigo-500/30 bg-indigo-500/5'
                        : 'border-white/5 bg-zinc-900/50'
                  }`}
                >
                  <InlineRichText text={leftItem} className="text-sm sm:text-base text-zinc-200 flex-1 leading-snug" />
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <select
                      disabled={answered}
                      value={selected !== null ? selected : ''}
                      onChange={e => setMatch(leftIndex, e.target.value)}
                      className={`flex-1 sm:w-48 px-3 py-2 rounded-lg text-sm border bg-zinc-900 text-zinc-200 transition-all cursor-pointer disabled:cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500/50 ${
                        answered
                          ? isCorrectMatch
                            ? 'border-emerald-500/50 text-emerald-200'
                            : 'border-rose-500/50 text-rose-200'
                          : selected !== null
                            ? 'border-indigo-500/40'
                            : 'border-white/10'
                      }`}
                    >
                      <option value="">— select —</option>
                      {question.itemsRight.map((rightItem, rightIndex) => (
                        <option key={rightIndex} value={rightIndex}>{stripMarkdown(rightItem)}</option>
                      ))}
                    </select>
                    {answered && isWrongMatch && (
                      <span className="text-xs text-emerald-400 shrink-0 whitespace-nowrap">→ {stripMarkdown(question.itemsRight[correct])}</span>
                    )}
                  </div>
                  {answered && question.componentFeedback?.[leftIndex] && (
                    <div className="w-full border-t border-white/10 pt-3 text-sm">
                      <p className="font-semibold text-zinc-200">
                        Correct action: {question.componentFeedback[leftIndex].action}
                      </p>
                      <p className="mt-1 leading-relaxed text-zinc-400">
                        {question.componentFeedback[leftIndex].why}
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Submit Button for interactive types */}
      {!answered && !examMode && (isMultiple || isStatement || isOrdering || isMatching || isSubnettingDrill) && (
        <div className="pt-4 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={
              (isOrdering && !orderingReady) ||
              (isMatching && !matchingReady) ||
              (isSubnettingDrill && !subnetReady)
            }
            className="px-8 py-3 rounded-lg text-sm font-semibold bg-indigo-500 text-white hover:bg-indigo-400 hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            Submit Answer
          </button>
        </div>
      )}

      {/* Feedback Block */}
      {answered && (
        <div className={`p-6 rounded-xl text-sm sm:text-base leading-relaxed animate-fade-up flex gap-4 ${
          isCorrect
            ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-100'
            : 'bg-rose-500/10 border border-rose-500/30 text-rose-100'
        }`}>
          <div className="shrink-0 mt-0.5">
            {isCorrect ? (
              <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>
          <div>
            <p className="font-bold mb-2">
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </p>
            {answerProgress && answerProgress.total > 1 && (
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-400">
                Component check: {answerProgress.correct}/{answerProgress.total} correct
              </p>
            )}
            <ExplanationReview question={question} />
          </div>
        </div>
      )}
    </div>
  )
}

function ExplanationReview({ question }) {
  const text = question.explanation
  const sections = parseExplanationSections(text)

  if (!sections) {
    return (
      <div className="space-y-3 pr-4">
        <div className="rounded-lg border border-white/10 bg-zinc-950/35 p-3">
          <p className="mb-1 text-[0.68rem] font-bold uppercase tracking-widest text-zinc-400">
            Explanation
          </p>
          <RichText text={text} className="text-zinc-300/90" />
        </div>
        {question.objectiveTitle && (
          <div className="rounded-lg border border-indigo-500/20 bg-indigo-500/5 p-3">
            <p className="mb-1 text-[0.68rem] font-bold uppercase tracking-widest text-indigo-300">
              Review target · Objective {question.objectiveId}
            </p>
            <p className="text-sm leading-relaxed text-zinc-300">
              {question.objectiveTitle}. {question.objectiveReviewPrompt || 'Recheck the evidence in the stem and identify which competing choice addresses a different layer, control, or troubleshooting step.'}
            </p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-3 pr-4">
      {sections.map(({ label, body }) => (
        <div key={label} className="rounded-lg border border-white/10 bg-zinc-950/35 p-3">
          <p className="mb-1 text-[0.68rem] font-bold uppercase tracking-widest text-zinc-400">
            {label}
          </p>
          <RichText text={body} className="text-zinc-300/90" />
        </div>
      ))}
    </div>
  )
}

function parseExplanationSections(text) {
  const labels = ['Why this is right:', 'Why distractors fail:', 'Architecture takeaway:']
  if (!labels.every(label => text.includes(label))) return null

  const firstStart = text.indexOf(labels[0])
  const secondStart = text.indexOf(labels[1])
  const thirdStart = text.indexOf(labels[2])
  if (!(firstStart < secondStart && secondStart < thirdStart)) return null

  return [
    {
      label: 'Why this is right',
      body: text.slice(firstStart + labels[0].length, secondStart).trim(),
    },
    {
      label: 'Why distractors fail',
      body: text.slice(secondStart + labels[1].length, thirdStart).trim(),
    },
    {
      label: 'Architecture takeaway',
      body: text.slice(thirdStart + labels[2].length).trim(),
    },
  ].filter(section => section.body.length > 0)
}

function PbqMatchingPanel({ question }) {
  const pbq = question.pbq || {}
  const evidence = pbq.evidence || []
  const artifacts = pbq.artifacts || []

  return (
    <div className="space-y-4 rounded-2xl border border-amber-500/20 bg-amber-950/10 p-4">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-300">
          {pbq.title || 'Performance-based scenario'}
        </p>
        {pbq.scenario && (
          <p className="text-sm leading-relaxed text-zinc-300">
            {pbq.scenario}
          </p>
        )}
        {pbq.task && (
          <p className="rounded-xl border border-amber-500/15 bg-amber-500/5 px-4 py-3 text-sm font-medium leading-relaxed text-amber-100">
            {pbq.task}
          </p>
        )}
      </div>
      {evidence.length > 0 && (
        <div className="grid gap-3 md:grid-cols-2">
          {evidence.map((group) => (
            <div key={group.title} className="rounded-xl border border-white/10 bg-zinc-950/70 p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                {group.title}
              </p>
              <div className="space-y-2">
                {group.items.map((item) => (
                  <div key={item.label} className="grid grid-cols-[auto_1fr] gap-3 text-sm">
                    <span className="font-semibold text-amber-200">{item.label}</span>
                    <span className="text-zinc-300">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      {artifacts.map((artifact, index) => (
        <PbqArtifact key={`${artifact.title}-${index}`} artifact={artifact} />
      ))}
    </div>
  )
}

function PbqArtifact({ artifact }) {
  if (artifact.type === 'console') {
    return (
      <div className="overflow-hidden rounded-xl border border-white/10 bg-zinc-950">
        <div className="border-b border-white/10 bg-zinc-900/80 px-4 py-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-300">{artifact.title}</p>
        </div>
        <pre className="overflow-x-auto whitespace-pre-wrap px-4 py-4 text-xs leading-relaxed text-zinc-300">
          {artifact.lines.join('\n')}
        </pre>
      </div>
    )
  }

  if (artifact.type === 'table') {
    return (
      <div className="overflow-hidden rounded-xl border border-white/10 bg-zinc-950/80">
        <div className="border-b border-white/10 bg-zinc-900/80 px-4 py-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-300">{artifact.title}</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-xs text-zinc-300">
            <thead className="bg-zinc-900/60 text-zinc-500">
              <tr>
                {artifact.columns.map((column) => (
                  <th key={column} className="px-4 py-2 font-semibold">{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {artifact.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-t border-white/5">
                  {row.map((cell, cellIndex) => (
                    <td key={`${rowIndex}-${cellIndex}`} className="px-4 py-2">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-white/10 bg-zinc-950/70 p-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-amber-300">{artifact.title}</p>
      <ul className="mt-3 space-y-2 text-sm text-zinc-300">
        {artifact.items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="text-amber-300">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function CliOutputPanel({ question }) {
  return (
    <div className="space-y-4 rounded-2xl border border-sky-500/20 bg-sky-950/10 p-4">
      {question.prompt && (
        <p className="text-xs font-semibold uppercase tracking-widest text-sky-300">
          {question.prompt}
        </p>
      )}
      <div className="space-y-3">
        {question.commands?.map((entry, index) => (
          <div key={`${entry.device}-${entry.command}-${index}`} className="overflow-hidden rounded-xl border border-white/10 bg-zinc-950">
            <div className="flex flex-wrap items-center gap-2 border-b border-white/10 bg-zinc-900/80 px-4 py-2">
              {entry.device && (
                <span className="text-[11px] font-bold uppercase tracking-widest text-sky-300">{entry.device}</span>
              )}
              <code className="text-xs text-zinc-300">{entry.command}</code>
            </div>
            <pre className="max-h-80 overflow-auto whitespace-pre-wrap break-words px-4 py-4 text-xs leading-relaxed text-zinc-300">
              {entry.output}
            </pre>
          </div>
        ))}
      </div>
    </div>
  )
}

function TopologyScenarioPanel({ question }) {
  const topology = question.topology || {}
  const nodes = topology.nodes || []
  const links = topology.links || []
  const width = topology.width || 640
  const height = topology.height || 300
  const nodeById = new Map(nodes.map((node) => [node.id, node]))

  return (
    <div className="space-y-4 rounded-2xl border border-cyan-500/20 bg-cyan-950/10 p-4">
      {question.prompt && (
        <p className="text-xs font-semibold uppercase tracking-widest text-cyan-300">
          {question.prompt}
        </p>
      )}
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-zinc-950/80 p-3">
        <svg
          role="img"
          aria-label={topology.label || 'Network topology'}
          viewBox={`0 0 ${width} ${height}`}
          className="min-w-[520px] w-full h-auto"
        >
          <defs>
            <marker id={`arrow-${question.id}`} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L8,4 L0,8 Z" fill="#64748b" />
            </marker>
          </defs>
          {links.map((link, index) => {
            const from = nodeById.get(link.from)
            const to = nodeById.get(link.to)
            if (!from || !to) return null
            const midX = (from.x + to.x) / 2
            const midY = (from.y + to.y) / 2
            return (
              <g key={`${link.from}-${link.to}-${index}`}>
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="#64748b"
                  strokeWidth="3"
                  strokeLinecap="round"
                  markerEnd={link.direction === 'forward' ? `url(#arrow-${question.id})` : undefined}
                />
                {link.label && (
                  <text x={midX} y={midY - 10} textAnchor="middle" className="fill-zinc-400 text-[12px] font-semibold">
                    {link.label}
                  </text>
                )}
              </g>
            )
          })}
          {nodes.map((node) => (
            <g key={node.id}>
              <circle cx={node.x} cy={node.y} r="28" className="fill-zinc-900 stroke-cyan-400/70" strokeWidth="3" />
              <text x={node.x} y={node.y + 4} textAnchor="middle" className="fill-zinc-100 text-[13px] font-bold">
                {node.label || node.id}
              </text>
              {node.kind && (
                <text x={node.x} y={node.y + 46} textAnchor="middle" className="fill-zinc-500 text-[11px] uppercase tracking-wide">
                  {node.kind}
                </text>
              )}
            </g>
          ))}
        </svg>
      </div>
      {question.tables?.map((table) => (
        <div key={table.title} className="overflow-hidden rounded-xl border border-white/10 bg-zinc-950/80">
          <div className="border-b border-white/10 bg-zinc-900/80 px-4 py-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-300">{table.title}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] text-left text-xs text-zinc-300">
              <thead className="bg-zinc-900/60 text-zinc-500">
                <tr>
                  {table.columns.map((column) => (
                    <th key={column} className="px-4 py-2 font-semibold">{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-t border-white/5">
                    {row.map((cell, cellIndex) => (
                      <td key={`${rowIndex}-${cellIndex}`} className="px-4 py-2">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  )
}

function ConfigRepairPanel({ question }) {
  return (
    <div className="space-y-4 rounded-2xl border border-violet-500/20 bg-violet-950/10 p-4">
      {question.scenario && (
        <p className="text-sm leading-relaxed text-zinc-300">
          {question.scenario}
        </p>
      )}
      <div className="overflow-hidden rounded-xl border border-white/10 bg-zinc-950">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-zinc-900/80 px-4 py-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-300">
            {question.configTitle || 'Configuration'}
          </p>
          {question.device && (
            <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">{question.device}</span>
          )}
        </div>
        <pre className="max-h-96 overflow-auto px-4 py-4 text-xs leading-relaxed text-zinc-300">
          {(question.config || []).map((line, index) => (
            <code key={`${line}-${index}`} className="block whitespace-pre-wrap break-words">
              <span className="mr-4 inline-block w-6 select-none text-right text-zinc-600">{index + 1}</span>
              {line}
            </code>
          ))}
        </pre>
      </div>
      {question.notes?.length > 0 && (
        <div className="grid gap-2 sm:grid-cols-2">
          {question.notes.map((note) => (
            <div key={note} className="rounded-lg border border-white/10 bg-zinc-950/60 px-3 py-2 text-xs text-zinc-400">
              {note}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const SUBNET_FIELD_LABELS = {
  network: 'Network address',
  broadcast: 'Broadcast address',
  firstUsable: 'First usable host',
  lastUsable: 'Last usable host',
  hostCount: 'Usable host count',
  mask: 'Subnet mask',
  wildcard: 'Wildcard mask',
}

function SubnettingDrillPanel({ question, answered, activeAnswer, onChange }) {
  return (
    <div className="space-y-4 rounded-2xl border border-emerald-500/20 bg-emerald-950/10 p-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-300">Calculate the subnet</p>
          <p className="mt-2 text-2xl font-bold text-zinc-100">{question.given}</p>
        </div>
        {question.timeTarget && (
          <span className="w-fit rounded-lg border border-white/10 bg-zinc-950/70 px-3 py-1.5 text-xs font-semibold text-zinc-400">
            Target: {question.timeTarget}
          </span>
        )}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {question.asks?.map((field) => {
          const userValue = activeAnswer[field] ?? ''
          const correctValue = question.correct?.[field]
          const fieldCorrect = normalizeSubnetInput(userValue) === normalizeSubnetInput(correctValue)
          return (
            <label key={field} className={`rounded-xl border p-4 transition-colors ${
              answered
                ? fieldCorrect
                  ? 'border-emerald-500/50 bg-emerald-500/10'
                  : 'border-rose-500/50 bg-rose-500/10'
                : 'border-white/10 bg-zinc-950/60'
            }`}>
              <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-zinc-500">
                {SUBNET_FIELD_LABELS[field] || field}
              </span>
              <input
                value={userValue}
                disabled={answered}
                onChange={(event) => onChange(field, event.target.value)}
                className="w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-emerald-400/60 disabled:cursor-default disabled:opacity-80"
                placeholder={field === 'hostCount' ? '30' : '192.168.10.64'}
              />
              {answered && (
                <span className={`mt-2 block text-xs ${fieldCorrect ? 'text-emerald-300' : 'text-rose-200'}`}>
                  Correct: {String(correctValue)}
                </span>
              )}
            </label>
          )
        })}
      </div>
    </div>
  )
}

function normalizeSubnetInput(value) {
  return String(value ?? '').trim().toLowerCase()
}
