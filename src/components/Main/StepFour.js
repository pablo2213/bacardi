import { useState, useEffect } from 'react'
import StepFive from './StepFive'
import { Wheel } from 'react-custom-roulette'
import roulette_img_on_highlight from '../../images/roulette.png'
import roulette_button from '../../images/roulette-button.png'
import roulette_bottles_bottom_image from '../../images/bottles-bottom.png'
import muerciela from '../../images/muerciela.png'
import mainBg from '../../images/main-background.jpg'
import sonidoRuleta from '../../assets/bikeWheel.wav'
import { fs_get } from '../../services/api/fs'

const data = [
	{ option: 'Sorteo', style: { textColor: 'white' } },
	{ option: 'Snowboard', style: { textColor: 'white' } },
	{ option: 'Sorteo', style: { textColor: 'white' } },
	{ option: 'Parlantes', style: { textColor: 'white' } },
	{ option: 'Sorteo', style: { textColor: 'white' } },
	{ option: 'Audifonos', style: { textColor: 'white' } },
	{ option: 'Sorteo', style: { textColor: 'white' } },
	{ option: 'Lentes', style: { textColor: 'white' } },
]
const premio = {
	Snowboard:1,
	Parlantes:3,
	Audifonos:5,
	Lentes:7
}
const arr = {
	29:{
		option: [3,7],
		date: [
			'2022-07-21',
			'2022-07-24'
		]}, 
	30: {
		option: [7,3],
		date: [
			'2022-07-25',
			'2022-07-31'
		]
	}, 
	31:{ option: [5,7],
		date: [
			'2022-08-01',
			'2022-08-07'
		]}, 
	32: {option: [1],
		date: [
			'2022-08-08',
			'2022-08-14'
		]}, 
	33: {option: [3],
		date: [
			'2022-08-15',
			'2022-08-21'
		]}, 
	34: {option: [5],
		date: [
			'2022-08-22',
			'2022-08-28'
		]}, 
	35: {option: [7],
		date: [
			'2022-08-29',
			'2022-08-31'
		]}
}
export default function StepFour({ setStep }) {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [allPremio, setAllPremio] = useState([]);
  const $bottomBottle = document.querySelector('.roulette-image-container.absolute')
  let currentDate = new Date();
  let startDate = new Date(currentDate.getFullYear(), 0, 1);
  var days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
  var weekNumber = Math.ceil(days / 7);
  // const $bacardi = document.querySelector('.Bacardi')
  const $root = document.querySelector('#root')
  /*const $roulleteTimer = document.querySelector('.roulette-timer')
  const $roulleteRewardContainer = document.querySelector('.roulette-reward-container')
  const $roulleteReward = document.querySelector('.roulette-reward')
  const $roulleteButton = document.querySelector('.roulette-button')*/
	const compacta = ($this) => {
		for(var i = 0; i < $this.length; i++){
			if($this[i] === undefined){
				$this.splice(i , 1);
			}
		}
	}
	const handleSpinClick = (event) => {
		//const posibleResults = [0,2,4,6]
		//1 = Snowboard
		//3 = Parlante
		//5 = Audifono
		//7 = Lentes
		const Premio = new Promise((resolve) => {
			resolve(fs_get({dateStart:arr[weekNumber].date[0], dateEnd:arr[weekNumber].date[1]}));
		});
		Premio.then((value) => {
			setAllPremio(value)
			let __options = arr[weekNumber].option;
			allPremio && allPremio.forEach(element => {
				console.info(element.premio)
				if(element.premio !== null && element.premio !== undefined){
					console.info(__options.indexOf(premio[element.premio]))
					if(__options.indexOf(premio[element.premio]) >= 0){
						delete __options[__options.indexOf(premio[element.premio])]
						compacta(__options); 
					}
				}
			});
			const posibleResults = [0,2,4,6]
			//console.info(__options)
			posibleResults.push(...__options);
			//console.info(posibleResults)
			const newPrizeNumber = posibleResults[Math.floor(Math.random() * posibleResults.length)]
			setPrizeNumber(newPrizeNumber)
			setMustSpin(true)
			const $audioRuleta = document.querySelector('#audioRuleta')
			const time = 600
			setTimeout(_ => {
				console.info(time)
				$audioRuleta.play()
			}, time)
			event.currentTarget.disabled = true
		});
	}
	useEffect(() => {
		$bottomBottle.style.display = 'block'
		return () => {
			$bottomBottle.style.display = 'none'
		};
	}, [])
	useEffect(() => {
		$root.style.backgroundImage = 'var(--roulette-main-bg)'
		// $root.style.backgroundPosition = 'center'
		$root.style.backgroundRepeat = 'no-repeat'
		return () => {
			$root.style.backgroundImage = `url(${mainBg})`
			$root.style.backgroundRepeat = 'auto'
		};
	}, [])
	return (
		<section id="stepFour" className="text-center">
			<div className="roulette-container">
				<Wheel
					mustStartSpinning={mustSpin}
					prizeNumber={prizeNumber}
					data={data}
					onStopSpinning={_ => {
						console.info('1', prizeNumber, data[prizeNumber].option);
  					const $audioRuleta = document.querySelector('#audioRuleta')
  					const $bacardi = document.querySelector('.Bacardi')
  					$bacardi.classList.add('scale-down-top')
  					const $rouletteButton = document.querySelector('.roulette-button')
  					$rouletteButton.disabled = false
						$audioRuleta.pause()
						$audioRuleta.currentTime = 0
						setMustSpin(false)
				  	return setTimeout(_ => setStep(<StepFive setStep={setStep} roulette_result={data[prizeNumber].option} />), 600)
						return
						// return
						/*$roulleteTimer.style.width = '100%'
						$roulleteRewardContainer.classList.remove('d-none')
						$roulleteButton.disabled = true*/
						/*let message = `!Felicidades, has ganado un/os ${data[prizeNumber].option}`
						if (data[prizeNumber].option === 'Sorteo')
							message = `¡Felicidades, estás participando en nuestro sorteo!`
						$roulleteReward.textContent = message*/
						/*setTimeout(_ => {
							$bottomBottle.style.display = 'none'
							// $roulleteTimer.style.width = '0'
							// return
							return setStep(<StepFive setStep={setStep} roulette_result={data[prizeNumber].option} />)
						}, 10*1000)*/
						// $bottomBottle.style.display = 'none'
						return setStep(<StepFive setStep={setStep} roulette_result={data[prizeNumber].option} />)
					}}
					/*spinDuration={1}*/
				>
					<img src={roulette_img_on_highlight} alt="" />
				</Wheel>
				<div className="center-spin-container">
					<img className="center-spin" src={muerciela} alt="" />
				</div>
			</div>
			{/*<div className="roulette-reward-container d-none">
				<p className="roulette-reward" />
			</div>
			<div className="roulette-timer-container">
				<div className="roulette-timer" />
			</div>*/}
			<div className="roulette-button-container">
				<button className="roulette-button" onClick={handleSpinClick}>
					<img src={roulette_button} alt="" className="img-fluid" />
				</button>
			</div>
			<div className="roulette-image-container">
				<img src={roulette_bottles_bottom_image} alt="" className="img-fluid" />
			</div>
			<audio id="audioRuleta" src={sonidoRuleta} />
		</section>
	)
}