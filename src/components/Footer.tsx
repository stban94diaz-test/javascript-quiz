import { Button } from '@mui/material'
import { useQuestionsData } from '../hooks/useQuestionsData'

export const Footer = () => {
  const { correct, incorrect, unanswered, reset } = useQuestionsData()

  return (
    <footer style={{ marginTop: '16px' }}>
      <strong>
        {`✅ ${correct} correctas - ❌ ${incorrect} incorrectas - ❓ ${unanswered} sin responder`}
      </strong>
      <div style={{ marginTop: '16px' }}>
        <Button onClick={reset}>
          Resetear juego
        </Button>
      </div>
    </footer>
  )
}