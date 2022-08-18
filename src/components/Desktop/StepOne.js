import StepHeader from './StepHeader'
import StepTitle from './StepTitle'
import StepOneBody from './StepOne/StepOneBody'
import StepOneFooter from './StepOne/StepOneFooter'

export default function StepOneD({ setStep }) {
	return (
		<section id="stepOne">
			<StepHeader />
			<StepTitle title="¿ERES MAYOR DE 18 AÑOS?" />
			<StepOneFooter />
			<StepOneBody setStep={setStep} />
		</section>
	)
}