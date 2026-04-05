import { useState, useMemo } from 'react'

export default function QuestionCard({ question, onAnswer, answered, selectedChoice, examMode = false }) {
  const isMultiple = question.type === 'multiple-response'
  const isStatement = question.type === 'statement-block'
  const isOrdering = question.type === 'ordering'
  const isMatching = question.type === 'matching'

  // Shuffle answer choices once per question so correct answer isn't always position B.
  // shuffledChoices is an array of { origIdx, text } — display order is shuffled,
  // but all answer storage/validation uses original indices unchanged.
  const shuffledChoices = useMemo(() => {
    if (!question.choices) return []
    const indices = question.choices.map((_, i) => i)
    // Fisher-Yates shuffle
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]]
    }
    return indices.map(origIdx => ({ origIdx, text: question.choices[origIdx] }))
  }, [question.id]) // re-shuffle only when question changes

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

  const handleSubmit = () => {
    if (isMultiple) onAnswer([...localMulti].sort())
    else if (isStatement) onAnswer(localStatements)
    else if (isOrdering) onAnswer([...localOrder])
    else if (isMatching) onAnswer([...localMatches])
  }

  const isCorrect = Array.isArray(selectedChoice)
    ? JSON.stringify(selectedChoice) === JSON.stringify(question.correctAnswers ?? question.correctOrder ?? question.correctMatches)
    : selectedChoice === question.correctAnswer

  // Derived display state for ordering
  const activeOrder = (examMode || answered) ? (selectedChoice || []) : localOrder
  const activeMatches = (examMode || answered) ? (selectedChoice || new Array(question.itemsLeft?.length).fill(null)) : localMatches

  // Submit readiness
  const orderingReady = activeOrder.length === question.items?.length
  const matchingReady = activeMatches.every(m => m !== null)

  return (
    <div className="glass-panel rounded-2xl p-6 md:p-8 space-y-8 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <span className="inline-block text-[11px] font-bold px-3 py-1.5 rounded-lg border border-indigo-500/20 bg-indigo-500/10 text-indigo-300 uppercase tracking-widest shadow-[0_0_15px_-3px_rgba(99,102,241,0.2)]">
          {question.domain}
        </span>
        {isMultiple && <span className="text-xs text-sky-400 font-semibold bg-sky-500/10 px-3 py-1.5 rounded-lg border border-sky-500/20">Select {question.correctAnswers.length}</span>}
        {isStatement && <span className="text-xs text-sky-400 font-semibold bg-sky-500/10 px-3 py-1.5 rounded-lg border border-sky-500/20">Yes / No required</span>}
        {isOrdering && <span className="text-xs text-sky-400 font-semibold bg-sky-500/10 px-3 py-1.5 rounded-lg border border-sky-500/20">Click to order ({activeOrder.length}/{question.items?.length})</span>}
        {isMatching && <span className="text-xs text-sky-400 font-semibold bg-sky-500/10 px-3 py-1.5 rounded-lg border border-sky-500/20">Match each item</span>}
      </div>

      <p className="text-zinc-100 text-xl font-medium leading-relaxed">{question.question}</p>

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
              style = 'border-emerald-500/50 bg-emerald-500/10 text-emerald-100 animate-answer-pop shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]';
            } else if (isSelected && !isCorrectChoice) {
              style = 'border-rose-500/50 bg-rose-500/10 text-rose-200 animate-answer-pop shadow-[0_0_15px_-5px_rgba(244,63,94,0.3)]';
            } else {
              style = 'border-white/5 bg-zinc-900/20 text-zinc-600 opacity-60';
            }
          } else if (isSelected) {
            style = 'border-indigo-500/50 bg-indigo-500/10 text-indigo-100 shadow-[0_0_15px_-5px_rgba(99,102,241,0.3)]';
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
                <span className="flex-1 mt-0.5 leading-snug text-sm sm:text-base">{text}</span>
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
            if (ans === correctAns) rowStyle = 'border-emerald-500/50 bg-emerald-500/10 shadow-[0_0_15px_-5px_rgba(16,185,129,0.2)]';
            else rowStyle = 'border-rose-500/50 bg-rose-500/10 shadow-[0_0_15px_-5px_rgba(244,63,94,0.2)]';
          }

          return (
            <div key={index} className={`flex flex-col md:flex-row justify-between items-start md:items-center px-6 py-4 rounded-xl border transition-all ${rowStyle}`}>
              <span className="text-sm sm:text-base text-zinc-200 flex-1 pr-6 leading-relaxed mb-4 md:mb-0">{stmt}</span>
              <div className="flex gap-2 w-full md:w-auto">
                <button
                  disabled={answered}
                  onClick={() => setStatement(index, true)}
                  className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-semibold border transition-all ${ans === true ? 'bg-indigo-500 border-indigo-500 text-white shadow-[0_0_15px_-3px_rgba(99,102,241,0.5)]' : 'border-white/10 text-zinc-400 hover:border-white/30 hover:bg-zinc-800'} disabled:opacity-50`}
                >
                  Yes
                </button>
                <button
                  disabled={answered}
                  onClick={() => setStatement(index, false)}
                  className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-semibold border transition-all ${ans === false ? 'bg-indigo-500 border-indigo-500 text-white shadow-[0_0_15px_-3px_rgba(99,102,241,0.5)]' : 'border-white/10 text-zinc-400 hover:border-white/30 hover:bg-zinc-800'} disabled:opacity-50`}
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
                        <span className="text-sm sm:text-base leading-snug flex-1">{question.items[itemIndex]}</span>
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
                        <span className="text-sm sm:text-base leading-snug">{item}</span>
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
                      <span className="text-sm sm:text-base leading-snug">{question.items[itemIndex]}</span>
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
                  className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 px-5 py-4 rounded-xl border transition-all ${
                    answered
                      ? isCorrectMatch
                        ? 'border-emerald-500/50 bg-emerald-500/10'
                        : 'border-rose-500/50 bg-rose-500/10'
                      : selected !== null
                        ? 'border-indigo-500/30 bg-indigo-500/5'
                        : 'border-white/5 bg-zinc-900/50'
                  }`}
                >
                  <span className="text-sm sm:text-base text-zinc-200 flex-1 leading-snug">{leftItem}</span>
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
                        <option key={rightIndex} value={rightIndex}>{rightItem}</option>
                      ))}
                    </select>
                    {answered && isWrongMatch && (
                      <span className="text-xs text-emerald-400 shrink-0 whitespace-nowrap">→ {question.itemsRight[correct]}</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Submit Button for interactive types */}
      {!answered && !examMode && (isMultiple || isStatement || isOrdering || isMatching) && (
        <div className="pt-4 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={
              (isOrdering && !orderingReady) ||
              (isMatching && !matchingReady)
            }
            className="px-8 py-3 rounded-lg text-sm font-semibold bg-indigo-500 text-white shadow-[0_0_20px_-5px_rgba(99,102,241,0.5)] hover:bg-indigo-400 hover:shadow-[0_0_25px_-3px_rgba(99,102,241,0.6)] hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            Submit Answer
          </button>
        </div>
      )}

      {/* Feedback Block */}
      {answered && (
        <div className={`p-6 rounded-xl text-sm sm:text-base leading-relaxed animate-fade-up flex gap-4 ${
          isCorrect
            ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-100 shadow-[0_0_30px_-10px_rgba(16,185,129,0.2)]'
            : 'bg-rose-500/10 border border-rose-500/30 text-rose-100 shadow-[0_0_30px_-10px_rgba(244,63,94,0.2)]'
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
            <p className="text-zinc-300/90 pr-4">{question.explanation}</p>
          </div>
        </div>
      )}
    </div>
  )
}
