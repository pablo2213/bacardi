import StepHeader from './StepHeader'
import StepTitle from './StepTitle'
import StepThreeBody from './StepThree/StepThreeBody'
import StepThreeButtonFooter from './StepThree/StepThreeButtonFooter'

export default function StepThree({ setStep }) {
	return (
		<section id="stepThree">
			<StepHeader />
			<StepTitle title="BACARDÍ LLEVA EL VERANO A LA NIEVE" classChild="stepthree-title" />
			<StepThreeBody setStep={setStep} />
			{/*<StepThreeButtonFooter setStep={setStep} />*/}
		</section>
	)
}