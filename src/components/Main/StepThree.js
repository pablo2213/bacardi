import StepHeader from './StepHeader'
import StepTitle from './StepTitle'
import StepThreeBody from './StepThreeBody'
import StepThreeButtonFooter from './StepThreeButtonFooter'

export default function StepThree({ setStep }) {
	return (
		<section id="stepThree">
			<StepHeader />
			<StepTitle title="BACARDÍ LLEVA EL VERANO A LA NIEVE" classChild="stepthree-title" />
			<StepThreeBody setStep={setStep} />
			<div className="title-container text-center">
				<button className="next-button" onClick={_ => window.location.reload()}>VOLVER AL INICIO</button>
			</div>
		</section>
	)
}