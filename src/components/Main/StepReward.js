import snowboard_image from '../../images/snowboard.png'
import parlantes_image from '../../images/bass.png'
import audifonos_image from '../../images/headphones.png'
import lentes_image from '../../images/glasses.png'
/*import StepRewardBody from './StepRewardBody'*/
/*import StepRewardButtonFooter from './StepRewardButtonFooter'*/

export default function StepReward({ reward }) {
	switch(reward) {
		case 'Snowboard':
			return (
				<div className="reward-container">
					<div className="reward-content">
						<div className="img-content">
							<img src={snowboard_image} alt="" className="img-fluid snowboard" />
						</div>
						<p className="reference-text snowboard"><span>*Fotografía referencial</span></p>
						<div className="text-content">
							<p className="fw-bold snowboard">Te enviaremos a un e-mail con las instrucciones para canjear tus tabla de Snowboard.</p>
							<p className="remember snowboard">Recuerda guardar tu botella para hacer válido el premio.</p>
						</div>
					</div>
				</div>
			)
		case 'Parlantes':
			return (
				<div className="reward-container">
					<div className="reward-content">
						<img src={parlantes_image} alt="" className="img-fluid parlantes" />
						<p className="reference-text"><span>*Fotografía referencial</span></p>
						<p className="fw-bold">Te enviaremos a un e-mail con las instrucciones para canjear tu Parlante Bluetooth.</p>
						<p className="remember">Recuerda guardar tu botella para hacer válido el premio.</p>
					</div>
				</div>
			)
		case 'Audifonos':
			return (
				<div className="reward-container">
					<div className="reward-content">
						<img src={audifonos_image} alt="" className="img-fluid audifonos" />
						<p className="reference-text"><span>*Fotografía referencial</span></p>
						<p className="fw-bold">Te enviaremos a un e-mail con las instrucciones para canjear tus Audifonos Bluetooth.</p>
						<p className="remember">Recuerda guardar tu botella para hacer válido el premio.</p>
					</div>
				</div>
			)
		case 'Lentes':
			return (
				<div className="reward-container">
					<div className="reward-content">
						<img src={lentes_image} alt="" className="img-fluid lentes" />
						<p className="reference-text"><span>*Fotografía referencial</span></p>
						<p className="fw-bold">Te enviaremos a un e-mail con las instrucciones para canjear tus lentes de sol.</p>
						<p className="remember">Recuerda guardar tu botella para hacer válido el premio.</p>
					</div>
				</div>
			)
		default:
			return(<></>)
	}
}