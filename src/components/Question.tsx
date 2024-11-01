import { Card, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

import { type Question as Qtn } from '../types.d'
import { useQuestionsStore } from '../store/questions'
import confetti from 'canvas-confetti'

interface QuestionProps {
  info: Qtn
}

const getBGColor = (info: Qtn, answerIndex: number) => {
  const { userSelectedAnswer, correctAnswer } = info

  if (userSelectedAnswer === correctAnswer) confetti()

  if (userSelectedAnswer == null) return 'transparent'
  if (answerIndex === correctAnswer) return 'green'
  if (answerIndex === userSelectedAnswer) return'red'

  return 'transparent'
}

export const Question = ({ info }: QuestionProps) => {
  const selectAnswer = useQuestionsStore(state => state.selectAnswer)

  const createHandleSelectAnswer = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex)
  }

  return (
    <Card variant='outlined' sx={{ textAlign: 'left', p: 2, bgcolor: '#222', mt: 4 }}>
      <Typography variant='h5'>
        {info.question}
      </Typography>

      {Boolean(info.code.trim()) && (
        <SyntaxHighlighter language="javascript" style={gradientDark} showLineNumbers>
          {info.code}
        </SyntaxHighlighter>
      )}

      <List sx={{ bgcolor: '#333' }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton
              disabled={info.userSelectedAnswer !== undefined}
              onClick={createHandleSelectAnswer(index)}
              sx={{
                bgcolor: getBGColor(info, index),
              }}
            >
              <ListItemText primary={answer} primaryTypographyProps={{
                sx: { textAlign: 'center', fontWeight: '500' }
              }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  )
}