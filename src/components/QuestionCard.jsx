export default function QuestionCard({ question, onAnswer, answered, selectedChoice }) {
  return (
    <div className="bg-[#1b1b32] rounded-md p-6 space-y-5">
      <span className="inline-block text-xs font-bold px-3 py-1 rounded bg-[#2a2a40] text-[#a5abc4] uppercase tracking-wide">
        {question.domain}
      </span>
      <p className="text-[#f5f6f7] text-lg leading-relaxed">{question.question}</p>
      <div className="space-y-3">
        {question.choices.map((choice, index) => {
          let style = 'border-[#3b3b4f] bg-[#2a2a40] text-[#d0d0d5] hover:border-[#99c9ff] hover:text-[#f5f6f7] hover:scale-[1.01] active:scale-[0.99]'
          if (answered) {
            if (index === question.correctAnswer) {
              style = 'border-[#acd157] bg-[#acd157]/10 text-[#acd157] animate-answer-pop'
            } else if (index === selectedChoice && index !== question.correctAnswer) {
              style = 'border-red-500 bg-red-500/10 text-red-400 animate-answer-pop'
            } else {
              style = 'border-[#2a2a40] bg-[#1b1b32] text-[#3b3b4f]'
            }
          }
          return (
            <button
              key={index}
              id={`quiz-choice-${index}`}
              onClick={() => !answered && onAnswer(index)}
              disabled={answered}
              className={`w-full text-left px-5 py-3.5 rounded border transition-all duration-200 text-sm ${style}`}
            >
              <span className="font-bold mr-3 text-[#a5abc4]">
                {String.fromCharCode(65 + index)}.
              </span>
              {choice}
            </button>
          )
        })}
      </div>
      {answered && (
        <div className={`p-5 rounded text-sm leading-relaxed animate-fade-up ${
          selectedChoice === question.correctAnswer
            ? 'bg-[#acd157]/10 border border-[#acd157]/30 text-[#acd157]'
            : 'bg-red-500/10 border border-red-500/30 text-red-400'
        }`}>
          <p className="font-bold mb-1">
            {selectedChoice === question.correctAnswer ? '✓ Correct!' : '✗ Incorrect'}
          </p>
          <p className="text-[#d0d0d5]">{question.explanation}</p>
        </div>
      )}
    </div>
  )
}
