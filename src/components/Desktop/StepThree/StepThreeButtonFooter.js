import StepFour from '../StepFour'

export default function StepThreeButtonFooter({ setStep }) {
	return (
		<button onClick={ _ => setStep(<StepFour setStep={setStep} />) }>
			Botón hasta que envíen el vídeo final para avanzar al siguiente paso
		</button>
	)
}