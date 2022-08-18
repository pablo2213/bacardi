import StepHeader from './StepHeader'
import StepTitle from './StepTitle'
import StepTwoBody from './StepTwo/StepTwoBody'
import StepForm from './StepForm'

export default function StepTwo({ setStep }) {
	return (
		<section id="stepTwo" className="vs-desktop-content">
			<StepHeader />
			<StepTitle title="BACARDÍ LLEVA EL VERANO A LA NIEVE" classChild="steptwo-title" />
			<StepTwoBody />
			<StepForm setStep={setStep} />
		</section>
	)
}