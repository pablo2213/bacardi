import Modal from '../Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faBarcode,
	faMagnifyingGlass,
	faImage,
} from '@fortawesome/free-solid-svg-icons'

export default function FormModal() {
	function handlerClick(event) {
		const button = event.currentTarget
		const target = document.querySelector(button.dataset.target)
		const $body = document.querySelector('body')
		$body.style.overflow = 'hidden'
		target.style.top = `${$body.getBoundingClientRect().y*-1}px`
		target.classList.add('show')
	}
	return (
		<>
			{/*<a className="form-ancle-modal" href="#modalBottleLabel" data-target="#modalBottleLabel" onClick={handlerClick}>Ver donde se encuentran los datos de la botella</a>*/}
			<a className="form-ancle-modal" href="#modalBottleLabel" data-target="#modalBottleLabel" onClick={handlerClick}>
				Ver donde se encuentran los datos de la botella
			</a>
			<Modal id="modalBottleLabel" />
		</>
	)
}