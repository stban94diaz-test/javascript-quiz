import { Container, Stack, Typography } from '@mui/material'
import './App.css'
import { JavaScriptLogo } from './assets/javaScriptLogo'
import { useQuestionsStore } from './store/questions'
import { Start } from './components/Start'
import { Game } from './components/Game'

function App() {
  const questions = useQuestionsStore(state => state.questions)

  return (
    <main>
      <Container maxWidth='sm'>
        <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
          <JavaScriptLogo />
          <Typography variant='h2' component='h1'>
            JavaScript quizz
          </Typography>
        </Stack>

        {questions.length === 0 ? (<Start />) : (<Game />)}
      </Container>
    </main>
  )
}

export default App
