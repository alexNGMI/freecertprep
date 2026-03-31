import { useState } from 'react'

export default function QuestionCard({ question, onAnswer, answered, selectedChoice, examMode = false }) {
  const isMultiple = question.type === 'multiple-response'
  const isStatement = question.type === 'statement-block'
  
  // Local state for interactive questions before they are submitted (only used in Quiz Mode)
  const [localMulti, setLocalMulti] = useState(() => 
    isMultiple && !examMode ? [] : []
  )
  const [localStatements, setLocalStatements] = useState(() => 
    question.statements && !examMode ? new Array(question.statements.length).fill(null) : []
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

  const isCorrect = Array.isArray(selectedChoice)
    ? JSON.stringify(selectedChoice) === JSON.stringify(question.correctAnswers)
    : selectedChoice === question.correctAnswer

  return (
    <div className="glass-panel rounded-2xl p-6 md:p-8 space-y-8 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <span className="inline-block text-[11px] font-bold px-3 py-1.5 rounded-lg border border-indigo-500/20 bg-indigo-500/10 text-indigo-300 uppercase tracking-widest shadow-[0_0_15px_-3px_rgba(99,102,241,0.2)]">
          {question.domain}
        </span>
        {isMultiple && <span className="text-xs text-sky-400 font-semibold bg-sky-500/10 px-3 py-1.5 rounded-lg border border-sky-500/20">Select {question.correctAnswers.length}</span>}
        {isStatement && <span className="text-xs text-sky-400 font-semibold bg-sky-500/10 px-3 py-1.5 rounded-lg border border-sky-500/20">Yes / No required</span>}
      </div>
      
      <p className="text-zinc-100 text-xl font-medium leading-relaxed">{question.question}</p>
      
      <div className="space-y-4">
        {/* Render Single Choice or Multiple Response */}
        {!isStatement && question.choices && question.choices.map((choice, index) => {
          const isSelected = isMultiple 
            ? (answered || examMode ? selectedChoice?.includes(index) : localMulti.includes(index)) 
            : selectedChoice === index;
          const isCorrectChoice = isMultiple ? question.correctAnswers.includes(index) : question.correctAnswer === index;
          
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
              key={index}
              disabled={answered}
              onClick={() => isMultiple ? toggleMulti(index) : onAnswer(index)}
              className={`w-full text-left px-6 py-4 rounded-xl border transition-all duration-300 ${style}`}
            >
              <div className="flex items-start">
                <span className={`font-bold mr-4 shrink-0 flex items-center justify-center w-6 h-6 rounded ${isSelected ? 'bg-indigo-500/20 text-indigo-300' : 'bg-zinc-800 text-zinc-500'}`}>
                  {isMultiple ? (isSelected ? '✓' : '') : String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1 mt-0.5 leading-snug text-sm sm:text-base">{choice}</span>
              </div>
            </button>
          )
        })}

        {/* Render Statement Block */}
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
      </div>

      {/* Submit Button for interactive types */}
      {!answered && !examMode && (isMultiple || isStatement) && (
        <div className="pt-4 flex justify-end">
          <button 
            onClick={handleSubmit}
            className="px-8 py-3 rounded-lg text-sm font-semibold bg-indigo-500 text-white shadow-[0_0_20px_-5px_rgba(99,102,241,0.5)] hover:bg-indigo-400 hover:shadow-[0_0_25px_-3px_rgba(99,102,241,0.6)] hover:-translate-y-0.5 transition-all"
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
