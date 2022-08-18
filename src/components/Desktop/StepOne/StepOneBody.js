import StepTwo from '../StepTwo'

export default function StepHeader({ setStep }) {
	return (
		<div className="stepone-container">
			<div className="button-container">
				{/*<div className="button-content"><button onClick={_ => setStep(StepTwo)}>SI</button></div>*/}
				<div className="button-content"><button onClick={_ => setStep(<StepTwo setStep={setStep} />)}>SI</button></div>
			</div>
			<div className="button-container">
				<div className="button-content"><button onClick={_ => window.location.replace('https://google.com')}>NO</button></div>
			</div>
		</div>
	)
}