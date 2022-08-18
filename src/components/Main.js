import { useState, useEffect } from 'react'
import StepOne from './Main/StepOne'
import StepOneD from './Desktop/StepOne'
//import StepFive from './Main/StepFive'
import StepBottle from './Main/StepBottle'
import roulette_bottles_bottom_image from '../images/bottles-bottom.png'

export default function Main() {
	const [step, setStep] = useState(false)
	const [mQuery, setMQuery] = useState({
		matches: Boolean(window.matchMedia("(min-width: 992px)").matches)
	})
	useEffect(_ => {
		let mediaQuery = window.matchMedia("(min-width: 992px)");
		mediaQuery.addListener(setMQuery);
		// this is the cleanup function to remove the listener
		return _ => mediaQuery.removeListener(setMQuery);
	}, [])

	return (
		<>
			<div className="container">
				<div id="contentContainer" className="content-container">
					{
						step === false ?
						(
							mQuery && mQuery.matches ?
							<StepOneD setStep={setStep} /> :
							<StepOne setStep={setStep} />
						) :
						step
					}
					<StepBottle />
				</div>
			</div>

			<div className="roulette-image-container absolute">
				<img src={roulette_bottles_bottom_image} alt="" className="img-fluid" />
			</div>
		</>
	)
}