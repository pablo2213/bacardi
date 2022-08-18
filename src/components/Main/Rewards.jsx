import rewardLeft from '../../images/reward-left.png'
import rewardRight from '../../images/reward-right.png'

export default function Rewards() {
	return (
		<div className="icons-container">
			<img src={rewardLeft} alt="Recompensas" title="Recompensas" className="img-fluid" />
			<img src={rewardRight} alt="Recompensas" title="Recompensas" className="img-fluid" />
		</div>
	)
	
}