import { /*useState, */useEffect } from 'react'
import { fs_put } from '../../services/api/fs'
import localStorage from '../../services/localstorage'
import StepHeader from './StepHeader'
import StepTitle from './StepTitle'
import StepReward from './StepReward'
import StepDraw from './StepDraw'
import StepThree from './StepThree'
/*import StepFiveBody from './StepFiveBody'*/
/*import StepFiveButtonFooter from './StepFiveButtonFooter'*/

export default function StepFive({ setStep, roulette_result }) {
	// const $bottomBottle = document.querySelector('.roulette-image-container.absolute')
	// const $bacardi = document.querySelector('.Bacardi')
	const isSorteo = roulette_result === 'Sorteo'
	const newStore = localStorage('form')
	console.info(roulette_result)

	const handlerTimeOut = _ => {
		/**
		 * DESCOMENTAR ESTE BLOQUE
		 */
		// console.info('DESCOMENTAR ESTE BLOQUE')
		const urlencoded = new URLSearchParams();
		urlencoded.append("premio", roulette_result);

		const data = fs_put(urlencoded, newStore.get().codformularioregistro)
		data.then(result => console.info(result))
		/**
		 * DESCOMENTAR ESTE BLOQUE
		 */
	}

	useEffect(_ => {
		const timeOut = setTimeout(handlerTimeOut, 1*1000)
		const $bacardi = document.querySelector('.Bacardi')
		$bacardi.classList.add('scale-up-top')
		return _ => {
			clearTimeout(timeOut)
		};
	}, [])
	return (
		<section id="stepFive">
			<StepHeader />
			{
				isSorteo ?
				(
					<>
						<StepTitle
							title="¡NO TE DESANIMES!"
							classChild="stepfive-title m-0" />
						<StepTitle
							title="Ya estas participando por un fin de semana junto a tus mejores amigos en la nieve."
							classChild="stepfive-subtitle m-0" />
						<StepDraw />
					</>
				) :
				(
					<>
						<StepTitle title="¡FELICIDADES! ¡GANASTE!" classChild="stepfive-title winner" />
						<StepReward reward={roulette_result} />
					</>
				)
			}
			<StepTitle title="INGRESA UNA NUEVA BOTELLA BACARDI CARTA ORO O AÑEJO Y SIGUE PROBANDO TU SUERTE" classChild="stepfive-subtitle-2" />
			{/*<div className="title-container text-center">
				<p className="final-text">INGRESA UNA NUEVA BOTELLA BACARDI CARTA ORO O AÑEJO Y SIGUE PROBANDO TU SUERTE</p>
			</div>*/}
			<div className="title-container text-center">
				<button className="next-button" onClick={_ => window.location.reload()}>SIGUE PARTICIPANDO</button>
			</div>
			<div className="title-container text-center">
				<button className="next-button modified" onClick={_ => setStep(<StepThree setStep={setStep} />)}>VER RECETAS DE COCTELERÍA</button>
			</div>
			{/*<StepFiveBody setStep={setStep} />*/}
			{/*<StepFiveButtonFooter setStep={setStep} />*/}
		</section>
	)
}