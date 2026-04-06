/**
 * Check if a user's answer is correct for any question type.
 *
 * - single-choice: selectedChoice (int) === question.correctAnswer (int)
 * - multiple-response: sorted array match against question.correctAnswers
 * - statement-block: boolean array match against question.correctAnswers
 * - ordering: index array match against question.correctOrder
 * - matching: index array match against question.correctMatches
 */
export function isAnswerCorrect(selectedChoice, question) {
  if (Array.isArray(selectedChoice)) {
    const expected = question.correctAnswers ?? question.correctOrder ?? question.correctMatches
    return JSON.stringify(selectedChoice) === JSON.stringify(expected)
  }
  return selectedChoice === question.correctAnswer
}
