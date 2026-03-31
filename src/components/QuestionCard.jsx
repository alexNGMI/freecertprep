import { useState } from 'react'

export default function QuestionCard({ question, onAnswer, answered, selectedChoice, examMode = false }) {
  const isMultiple = question.type === 'multiple-response'
  const isStatement = question.type === 'statement-block'
  
  // Local state for interactive questions before they are submitted (only used in Quiz Mode)
  const [localMulti, setLocalMulti] = useState([])
  const [localStatements, setLocalStatements] = useState(() => 
    question.statements ? new Array(question.statements.length).fill(null) : []
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

  const handleSubmit = () => {
    if (isMultiple) onAnswer([...localMulti].sort())
    else if (isStatement) onAnswer(localStatements)
  }

  // Determine if answer is correct for the feedback block
  const isCorrect = Array.isArray(selectedChoice)
    ? JSON.stringify(selectedChoice) === JSON.stringify(question.correctAnswers)
    : selectedChoice === question.correctAnswer

  return (
    <div className="bg-[#1b1b32] rounded-md p-6 space-y-5">
      <div className="flex justify-between items-center">
        <span className="inline-block text-xs font-bold px-3 py-1 rounded bg-[#2a2a40] text-[#a5abc4] uppercase tracking-wide">
          {question.domain}
        </span>
        {isMultiple && <span className="text-xs text-[#99c9ff] font-bold">Select {question.correctAnswers.length}</span>}
        {isStatement && <span className="text-xs text-[#99c9ff] font-bold">Yes / No required</span>}
      </div>
      
      <p className="text-[#f5f6f7] text-lg leading-relaxed">{question.question}</p>
      
      <div className="space-y-3">
        {/* Render Single Choice or Multiple Response */}
        {!isStatement && question.choices.map((choice, index) => {
          const isSelected = isMultiple 
            ? (answered || examMode ? selectedChoice?.includes(index) : localMulti.includes(index)) 
            : selectedChoice === index;
          const isCorrectChoice = isMultiple ? question.correctAnswers.includes(index) : question.correctAnswer === index;
          
          let style = 'border-[#3b3b4f] bg-[#2a2a40] text-[#d0d0d5] hover:border-[#99c9ff] hover:text-[#f5f6f7] hover:scale-[1.01] active:scale-[0.99]';
          
          if (answered) {
            if (isCorrectChoice) {
              style = 'border-[#acd157] bg-[#acd157]/10 text-[#acd157] animate-answer-pop';
            } else if (isSelected && !isCorrectChoice) {
              style = 'border-red-500 bg-red-500/10 text-red-400 animate-answer-pop';
            } else {
              style = 'border-[#2a2a40] bg-[#1b1b32] text-[#3b3b4f]';
            }
          } else if (isSelected) {
            style = 'border-[#99c9ff] bg-[#99c9ff]/10 text-[#99c9ff]';
          }

          return (
            <button
              key={index}
              disabled={answered}
              onClick={() => isMultiple ? toggleMulti(index) : onAnswer(index)}
              className={`w-full text-left px-5 py-3.5 rounded border transition-all duration-200 text-sm ${style}`}
            >
              <span className="font-bold mr-3 text-[#a5abc4]">
                {isMultiple ? (isSelected ? '☑' : '☐') : String.fromCharCode(65 + index) + '.'}
              </span>
              {choice}
            </button>
          )
        })}

        {/* Render Statement Block */}
        {isStatement && question.statements.map((stmt, index) => {
          const ans = (answered || examMode) ? selectedChoice?.[index] : localStatements[index];
          const correctAns = question.correctAnswers[index];
          let rowStyle = 'border-[#3b3b4f] bg-[#2a2a40]';
          
          if (answered) {
            if (ans === correctAns) rowStyle = 'border-[#acd157] bg-[#acd157]/10';
            else rowStyle = 'border-red-500 bg-red-500/10';
          }

          return (
            <div key={index} className={`flex flex-col sm:flex-row justify-between items-center px-4 py-3 rounded border ${rowStyle}`}>
              <span className="text-sm text-[#d0d0d5] flex-1 pr-4">{stmt}</span>
              <div className="flex gap-2 mt-3 sm:mt-0">
                <button
                  disabled={answered}
                  onClick={() => setStatement(index, true)}
                  className={`px-4 py-1.5 rounded text-sm font-bold border ${ans === true ? 'bg-[#99c9ff] text-[#0a0a23] border-[#99c9ff]' : 'border-[#3b3b4f] text-[#a5abc4] hover:border-[#99c9ff]'} disabled:opacity-50`}
                >
                  Yes
                </button>
                <button
                  disabled={answered}
                  onClick={() => setStatement(index, false)}
                  className={`px-4 py-1.5 rounded text-sm font-bold border ${ans === false ? 'bg-[#99c9ff] text-[#0a0a23] border-[#99c9ff]' : 'border-[#3b3b4f] text-[#a5abc4] hover:border-[#99c9ff]'} disabled:opacity-50`}
                >
                  No
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Submit Button for interactive types */}
      {!answered && !examMode && (isMultiple || isStatement) && (
        <div className="pt-2 flex justify-end">
          <button 
            onClick={handleSubmit}
            className="px-6 py-2 rounded text-sm font-bold bg-[#99c9ff] text-[#0a0a23] hover:opacity-90 transition-all"
          >
            Submit Answer
          </button>
        </div>
      )}

      {/* Feedback Block */}
      {answered && (
        <div className={`p-5 rounded text-sm leading-relaxed animate-fade-up ${
          isCorrect
            ? 'bg-[#acd157]/10 border border-[#acd157]/30 text-[#acd157]'
            : 'bg-red-500/10 border border-red-500/30 text-red-400'
        }`}>
          <p className="font-bold mb-1">
            {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
          </p>
          <p className="text-[#d0d0d5]">{question.explanation}</p>
        </div>
      )}
    </div>
  )
}
