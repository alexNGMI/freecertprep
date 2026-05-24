/**
 * Check if a user's answer is correct for any question type.
 *
 * - single-choice: selectedChoice (int) === question.correctAnswer (int)
 * - multiple-response: sorted array match against question.correctAnswers
 * - statement-block: boolean array match against question.correctAnswers
 * - ordering: index array match against question.correctOrder
 * - matching: index array match against question.correctMatches
 * - subnetting-drill: object field match against question.correct
 */
export function isAnswerCorrect(selectedChoice, question) {
  if (question.type === 'subnetting-drill') {
    if (!selectedChoice || typeof selectedChoice !== 'object' || Array.isArray(selectedChoice)) return false
    return (question.asks || []).every((field) =>
      normalizeSubnetAnswer(selectedChoice[field]) === normalizeSubnetAnswer(question.correct?.[field])
    )
  }

  if (Array.isArray(selectedChoice)) {
    const expected = question.correctAnswers ?? question.correctOrder ?? question.correctMatches
    return JSON.stringify(selectedChoice) === JSON.stringify(expected)
  }
  return selectedChoice === question.correctAnswer
}

function normalizeSubnetAnswer(value) {
  return String(value ?? '').trim().toLowerCase()
}
