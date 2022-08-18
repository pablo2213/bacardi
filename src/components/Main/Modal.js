import { useRef, useEffect } from 'react'
import bottleLabel from '../../images/bottle-label.png'

export default function Modal({ id, children, onclick }) {
	const $modal = useRef(document.getElementById(id))
	if (onclick === undefined)
		onclick = handlerClickModal
	/*if (children !== undefined)
		console.info(children)*/
	function handlerClickModal(event) {
		const $body = document.querySelector('body')
		$body.style.overflow = 'auto'
		$modal.current.classList.remove('show')
	}

	useEffect(() => {
		return () => {
			const $body = document.querySelector('body')
			$body.style.overflow = 'auto'
		};
	}, [])
	return (
		<div ref={$modal} id={id} className="modal-container" onClick={onclick}>
			<div className="modal-content">
				<div className="modal-body">
					{ 
						children === undefined ?
						<img src={bottleLabel} alt="Donde encontrar la etiqueta de la botella" title="Donde encontrar la etiqueta de la botella" className="img-fluid" /> :
						children
					}
				</div>
			</div>
		</div>
	)
}