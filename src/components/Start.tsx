import { Button } from "@mui/material"
import { useQuestionsStore } from "../store/questions"

const LIMIT_QUESTIONS = 10

export const Start = () => {
  const fetchQuestions = useQuestionsStore(state => state.fetchQuestions)

  const handleStartQuiz = () => {
    fetchQuestions(LIMIT_QUESTIONS)
  }

  return (
    <Button variant='contained' onClick={handleStartQuiz}>
      !Empezar¡
    </Button>
  )
}