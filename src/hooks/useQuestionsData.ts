import { useQuestionsStore } from '../store/questions'

export const useQuestionsData = () => {
  const questions = useQuestionsStore(store => store.questions)
  const reset = useQuestionsStore(store => store.reset)

  let correct = 0
  let incorrect = 0
  let unanswered = 0

  questions.forEach(question => {
    const { userSelectedAnswer, correctAnswer } = question

    if (userSelectedAnswer === undefined) unanswered++
    else if (userSelectedAnswer === correctAnswer) correct++
    else incorrect++
  })

  return { correct, incorrect, unanswered, reset }
}