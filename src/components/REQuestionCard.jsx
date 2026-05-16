import { useMemo } from 'react'
import { fisherYates } from '../utils/shuffle'
import { isAnswerCorrect } from '../utils/scoring'
import { RichText, InlineRichText } from './RichText'

// Light-theme question card for the Real Estate sister site.
//
// The national real-estate pool is 100% single-choice (matching the real
// PSI exam), so this card only handles single-choice — none of the
// multiple-response / matching / ordering / statement-block branches that
// the IT-cert QuestionCard carries. That keeps it small and lets it speak
// the Redfin/Zillow visual language (white surfaces, rose accent) instead
// of freecertprep's dark theme. Scoring/shuffle logic is shared verbatim.
// Note: REExam passes examMode but single-choice needs no interim state
// (onAnswer fires immediately on click), so it's intentionally not consumed.
export default function REQuestionCard({
  question,
  onAnswer,
  answered,
  selectedChoice,
  reviewMode = false,
  isBookmarked = false,
  onToggleBookmark = null,
}) {
  // Shuffle choices once per mount (parent remounts via key={question.id}).
  // Display order is shuffled but answer storage/validation uses original
  // indices, so correctAnswer stays valid. Review mode keeps original order
  // so the correct-answer label is stable.
  const shuffledChoices = useMemo(() => {
    if (!question.choices) return []
    const indices = question.choices.map((_, i) => i)
    const ordered = reviewMode ? indices : fisherYates(indices)
    return ordered.map((origIdx) => ({ origIdx, text: question.choices[origIdx] }))
  }, [question.choices, reviewMode])

  const isCorrect = isAnswerCorrect(selectedChoice, question)

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-7 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <span className="inline-block text-[11px] font-bold px-3 py-1.5 rounded-lg border border-rose-200 bg-rose-50 text-rose-700 uppercase tracking-widest">
          {question.domain}
        </span>
        {onToggleBookmark && (
          <button
            onClick={() => onToggleBookmark(question.id)}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark this question'}
            className={`p-1.5 rounded-lg border transition-all duration-200 ${
              isBookmarked
                ? 'border-amber-300 bg-amber-50 text-amber-500 hover:bg-amber-100'
                : 'border-slate-200 bg-white text-slate-300 hover:text-amber-500 hover:border-amber-300'
            }`}
          >
            <svg className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        )}
      </div>

      <RichText text={question.question} className="text-slate-900 text-xl font-semibold leading-relaxed" />

      <div className="space-y-3">
        {shuffledChoices.map(({ origIdx, text }, displayIdx) => {
          const isSelected = selectedChoice === origIdx
          const isCorrectChoice = question.correctAnswer === origIdx

          let style =
            'border-slate-200 bg-white text-slate-700 hover:border-rose-300 hover:bg-rose-50/40 hover:-translate-y-0.5'

          if (answered) {
            if (isCorrectChoice) {
              style = 'border-emerald-400 bg-emerald-50 text-emerald-900 animate-answer-pop'
            } else if (isSelected && !isCorrectChoice) {
              style = 'border-rose-400 bg-rose-50 text-rose-800 animate-answer-pop'
            } else {
              style = 'border-slate-200 bg-slate-50 text-slate-400'
            }
          } else if (isSelected) {
            style = 'border-rose-400 bg-rose-50 text-rose-900'
          }

          return (
            <button
              key={origIdx}
              disabled={answered}
              onClick={() => onAnswer(origIdx)}
              className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 ${style}`}
            >
              <div className="flex items-start">
                <span
                  className={`font-bold mr-4 shrink-0 flex items-center justify-center w-7 h-7 rounded-lg text-sm ${
                    answered && isCorrectChoice
                      ? 'bg-emerald-500 text-white'
                      : answered && isSelected
                        ? 'bg-rose-500 text-white'
                        : isSelected
                          ? 'bg-rose-600 text-white'
                          : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {String.fromCharCode(65 + displayIdx)}
                </span>
                <InlineRichText text={text} className="flex-1 mt-0.5 leading-snug text-sm sm:text-base" />
              </div>
            </button>
          )
        })}
      </div>

      {answered && (
        <div
          className={`p-5 rounded-xl text-sm sm:text-base leading-relaxed animate-fade-up flex gap-4 ${
            isCorrect
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
              : 'bg-rose-50 border border-rose-200 text-rose-900'
          }`}
        >
          <div className="shrink-0 mt-0.5">
            {isCorrect ? (
              <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>
          <div>
            <p className="font-bold mb-1.5">{isCorrect ? 'Correct!' : 'Incorrect'}</p>
            <RichText text={question.explanation} className="text-slate-700" />
          </div>
        </div>
      )}
    </div>
  )
}
