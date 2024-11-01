import { create } from 'zustand'
import { type Question } from '../types'
import { devtools, persist } from 'zustand/middleware'

interface State {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => Promise<void>
  selectAnswer: (questionId: number, answerIndex: number) => void
  goNextQuestion: () => void
  goPreviousQuestion: () => void
  reset: () => void
}

export const useQuestionsStore = create<State>()(devtools(persist((set, get) => {
  return {
    questions: [],
    currentQuestion: 0,

    fetchQuestions: async (limit) => {
      const res = await fetch('/data.json')
      const json = await res.json()

      const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
      set({ questions })
    },

    selectAnswer: (questionId, answerIndex) => {
      const { questions } = get()

      const newQuestions = structuredClone(questions)
      const questionIndex = newQuestions.findIndex(q => q.id === questionId)
      const questionInfo = newQuestions[questionIndex]
      const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex

      // Update state
      newQuestions[questionIndex] = {
       ...questionInfo,
        userSelectedAnswer: answerIndex,
        isCorrectUserAnswer
      }
      set({ questions: newQuestions })
    },

    goNextQuestion: () => {
      const { currentQuestion, questions } = get()
      const nextQuestionIndex = (currentQuestion + 1)

      if (nextQuestionIndex < questions.length) {
        set({ currentQuestion: nextQuestionIndex })
      }
    },

    goPreviousQuestion: () => {
      const { currentQuestion } = get()
      const previousQuestionIndex = (currentQuestion - 1)

      if (previousQuestionIndex >= 0) {
        set({ currentQuestion: previousQuestionIndex })
      }
    },

    reset: () => {
      set({ questions: [], currentQuestion: 0 })
    }
  }
}, {
  name: 'questions'
})))
