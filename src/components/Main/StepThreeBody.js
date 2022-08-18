import { useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faCirclePlay,
} from '@fortawesome/free-solid-svg-icons'
import StepTwoMiddle from './StepTwoMiddle'
import video from '../../video/secuencia_3.mp4'


export default function StepThreeBody({ setStep }) {
	const $video      = useRef(null)
	// const $playButton = useRef(null)
	const $videoErrorHandler = useRef(null)
	function handlerClick(event) {
		$video.play()
	}
	useEffect(() => {
		if($video) {
			const player = $video.current
			player.volume = .5
			player.play()
			/*if (player.requestFullscreen) {
				player.requestFullscreen()
			}*/
			/*player.addEventListener('ended', event => {
				console.info('Video has ended.');
				setStep(<StepTwoMiddle setStep={setStep} />)
			})*/
			/*player.addEventListener('play', event => {
				$playButton.current.style.display = 'none'
			})*/
			/*player.addEventListener('stalled', event => {
				// $playButton.current.style.display = 'none'
				$videoErrorHandler.querySelector('pre').textContent = 'stalled'
			})
			player.addEventListener('suspend', event => {
				// $playButton.current.style.display = 'none'
				$videoErrorHandler.querySelector('pre').textContent = 'suspend'
			})
			player.addEventListener('waiting', event => {
				// $playButton.current.style.display = 'none'
				$videoErrorHandler.querySelector('pre').textContent = 'waiting'
			})
			player.addEventListener('timeupdate', event => {
				// $playButton.current.style.display = 'none'
				$videoErrorHandler.querySelector('pre').textContent = 'timeupdate'
			})*/
			/*player.addEventListener('waiting', event => {
				// $playButton.current.style.display = 'none'
				$videoErrorHandler.textContent = 'waiting'
			})*/
		}
	}, [])
	return (
		<>
			<div className="video-container">
				<video
					ref={$video}
					className="video-media"
					src={video}
					title="Bacardi con lluvia"
					id="stepThreeVideo"
					autoPlay
					controls={true}
					type='video/mp4'
				/>
				{/*<button ref={$playButton} className="play-button" onClick={handlerClick}>
					<FontAwesomeIcon icon={faCirclePlay} />
				</button>*/}
			</div>
			<div ref={$videoErrorHandler} className="video-error-handler">
				<pre></pre>
			</div>
		</>
	)
}