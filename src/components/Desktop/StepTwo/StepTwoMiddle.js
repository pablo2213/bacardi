// import { /*useState, */useEffect } from 'react'
import StepHeader from '../StepHeader'
import StepTitle from '../StepTitle'
import StepDraw from '../StepDraw'
import StepFour from '../StepFour'
/*import StepFiveButtonFooter from './StepFiveButtonFooter'*/
import Premio from './../../../assets/premio.png'

export default function StepTwoMiddle({ setStep }) {
	return (
		<section id="StepTwoMiddle" className="vs-desktop-step-2">
			<StepHeader />
			<div className="content-steptwomiddle">
				<StepTitle
					title="¡FELICITACIONES!"
					classChild="steptwomiddle-title" />
					<StepTitle
						title="YA ESTAS PARTICIPANDO POR UN FIN DE SEMANA EN LA NIEVE CON TUS MEJORES AMIGOS"
						classChild="steptwomiddle-subtitle m-0" 
				/>
			</div>
			<div className="form-row">
				<div className="form-col-2">
					<StepDraw />
				</div>
				<div className="form-col-2">
					<div className="play">
						<StepTitle
							title="AHORA GIRA LA RULETA Y GANA FANTÁSTICOS PREMIOS"
							classChild="steptwomiddle-trititle" 
						/>
						<img src={Premio} alt="" className="img-fluid"/>
					</div>
					<div className="title-container text-center">
						<button className="next-button" onClick={_ => setStep(<StepFour setStep={setStep} />)}>JUGAR</button>
					</div>
				</div>
			</div>
		</section>
	)
}