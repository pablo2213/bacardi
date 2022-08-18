import StepHeader from './StepHeader'
import StepTitle from './StepTitle'
import StepTwoBody from './StepTwoBody'
import StepForm from './StepForm'

export default function StepTwo({ setStep }) {
	return (
		<section id="stepTwo">
			<StepHeader />
			<StepTitle title="BACARDÍ LLEVA EL VERANO A LA NIEVE" classChild="steptwo-title" />
			<StepTwoBody />
			<StepForm setStep={setStep} />
		</section>
	)
}