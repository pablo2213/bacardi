// import { /*useState, */useEffect } from 'react'
import StepHeader from './StepHeader'
import StepTitle from './StepTitle'
import StepDraw from './StepDraw'
import StepFour from './StepFour'
import Rewards from './Rewards'
/*import StepFiveButtonFooter from './StepFiveButtonFooter'*/

export default function StepTwoMiddle({ setStep }) {
	return (
		<section id="StepTwoMiddle">
			<StepHeader />
			<div className="text-group-container dark-container">
				<StepTitle
					title="¡FELICITACIONES!"
					classChild="steptwomiddle-title" />
				<StepTitle
					title="YA ESTAS PARTICIPANDO POR UN FIN DE SEMANA EN LA NIEVE CON TUS MEJORES AMIGOS"
					classChild="steptwomiddle-subtitle m-0" />
			</div>
			<StepDraw />
			<div className="text-group-container light-container dark-text dark-shadow">
				<StepTitle
					title="AHORA GIRA LA RULETA Y GANA FANTÁSTICOS PREMIOS"
					classChild="steptwomiddle-trititle" />
				<Rewards />
			</div>
			<div className="title-container text-center">
				<button className="next-button" onClick={_ => setStep(<StepFour setStep={setStep} />)}>JUGAR</button>
			</div>
		</section>
	)
}