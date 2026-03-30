export default function QuestionCard({ question, onAnswer, answered, selectedChoice }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 space-y-4">
      <span className="inline-block text-xs font-medium px-2 py-0.5 rounded bg-gray-800 text-gray-400">
        {question.domain}
      </span>
      <p className="text-white text-lg leading-relaxed">{question.question}</p>
      <div className="space-y-2">
        {question.choices.map((choice, index) => {
          let style = 'border-gray-700 bg-gray-800/50 text-gray-300 hover:border-gray-600 hover:bg-gray-800'
          if (answered) {
            if (index === question.correctAnswer) {
              style = 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
            } else if (index === selectedChoice && !isCorrect(index, question.correctAnswer)) {
              style = 'border-red-500/50 bg-red-500/10 text-red-400'
            } else {
              style = 'border-gray-800 bg-gray-800/30 text-gray-600'
            }
          }
          return (
            <button
              key={index}
              onClick={() => !answered && onAnswer(index)}
              disabled={answered}
              className={`w-full text-left px-4 py-3 rounded-lg border transition-all text-sm ${style}`}
            >
              <span className="font-medium mr-2">
                {String.fromCharCode(65 + index)}.
              </span>
              {choice}
            </button>
          )
        })}
      </div>
      {answered && (
        <div className={`p-4 rounded-lg text-sm ${
          selectedChoice === question.correctAnswer
            ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
            : 'bg-red-500/10 border border-red-500/30 text-red-300'
        }`}>
          <p className="font-medium mb-1">
            {selectedChoice === question.correctAnswer ? 'Correct!' : 'Incorrect'}
          </p>
          <p className="text-gray-400">{question.explanation}</p>
        </div>
      )}
    </div>
  )
}

function isCorrect(index, correctAnswer) {
  return index === correctAnswer
}
