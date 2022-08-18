import { useState, useRef, useEffect } from 'react'
import { validate, format } from 'rut.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faFileContract,
	faFileSignature,
} from '@fortawesome/free-solid-svg-icons'
import fsApi from '../../services/api/fs'
import localStorage from '../../services/localstorage'
import FormModal from './FormModal'
import FormLegalBases from './FormLegalBases'
import FormTermsConditions from './FormTermsConditions'
import StepTwoMiddle from './StepTwoMiddle'
import Modal from './Modal'
import Loader from './Loader'
import pdf from '../../assets/BASES Y CONDICIONES - “EL VERANO VA POR DENTRO” 04 julio 2022.pdf'
/*
<FontAwesomeIcon icon={faBarcode} />
<FontAwesomeIcon icon={faCamera} />
<FontAwesomeIcon icon={faImage} />
<FontAwesomeIcon icon="fa-solid fa-barcode" />
<FontAwesomeIcon icon="fa-solid fa-camera" />
<FontAwesomeIcon icon="fa-regular fa-image" />
*/

const errorHandler = {
	inputFistName: {
		error: true,
		target: 'fistName'
	},
	inputLastName: {
		error: true,
		target: 'lastName'
	},
	inputRut: {
		error: true,
		target: 'rut'
	},
	inputEmail: {
		error: true,
		target: 'email'
	},
	inputPhone: {
		error: true,
		target: 'phone'
	},
	inputNumber: {
		error: true,
		target: 'number'
	},
	inputLegalBases: {
		error: true,
		target: 'legalBasesContainer'
	},
} 

export default function StepForm({ setStep }) {
	const [inputFistName, setInputFistName]     = useState('')
	const [inputLastName, setInputLastName]     = useState('')
	const [inputRut, setInputRut]               = useState('')
	const [inputEmail, setInputEmail]           = useState('')
	const [inputPhone, setInputPhone]           = useState('')
	const [inputNumber, setInputNumber]         = useState('')
	const [inputLegalBases, setInputLegalBases] = useState(false)
	const [mQuery, setMQuery] = useState({
		matches: Boolean(window.matchMedia("(max-width: 449px)").matches)
	})
	const $modal = useRef(null)
	const [stateErrorHandler, setStateErrorHandler] = useState(errorHandler)
	/*const $modal = `
		<div className="modal-group">
			<Loader />
			<p className="modal-text">Tus datos están siendo guardados</p>
		</div>
	`*/
	const $body = document.querySelector('body')

	function handlerSubmit(event) {
		event.preventDefault()
		const $messageElement = document.getElementById('formErrorHandler')
		if (errorHandlerFunc()) {
			setMessageOnChangeInput($messageElement, 'Debes tener todos los campos correctos', 'alert-danger')
			return false
		}
		setMessageOnChangeInput($messageElement, '', 'd-none')
		// se abre modal con spin loader
		const target = document.getElementById('modalForm')
		$body.style.overflow = 'hidden'
		target.style.top = `${$body.getBoundingClientRect().y*-1}px`
		target.classList.add('show')
		ifFormApproves(target)
	}

	function errorHandlerFunc() {
		let error = false
		for (const prop in errorHandler) {
			if (errorHandler[prop].error === true) {
				setStateOnValidateInputError(errorHandler[prop].target)
				error = true
			}
		}
		return error
	}

	function ifFormApproves(modal) {
		 /**
		 * ELIMINAR BLOQUE AL SUBIR
		 */
		/*console.info('ELIMINAR BLOQUE AL SUBIR');
		setStep(<StepTwoMiddle setStep={setStep} />)
		return*/
		/**
		 * ELIMINAR BLOQUE AL SUBIR
		 */
		const formData = new FormData()
		formData.append("nombre", inputFistName)
		formData.append("apellido", inputLastName)
		formData.append("cifnif", inputRut)
		formData.append("email", inputEmail)
		formData.append("telefono", inputPhone)
		formData.append("observaciones", inputNumber)
		const data = fsApi(formData)
		data.then(result => {
			if (result.error) {
				// se inserta error de guardado en el spin loader
				modal.querySelector('#loaderModal').style.display = 'none'
				modal.querySelector('.modal-text').textContent = 'Ha ocurrido un error al guardar tus datos, recuerda que el código de barras no puede estar repetido.'
				modal.addEventListener('click', function (event) {
					$body.style.overflow = 'auto'
					modal.classList.remove('show')
				})
				return false
			}
			const newStore = localStorage('form')
			newStore.setExpiryTime(1)
			newStore.set(result.data)
			// se inserta mensaje de que los datos han sido guardados en el spin loader
			modal.classList.remove('show')
			$body.style.overflow = 'auto'
			setStep(<StepTwoMiddle setStep={setStep} />)

		})
	}

	function handlerChangeFistName(event) {
		const value = event.target.value
		errorHandler.inputFistName.error = true
		setInputFistName(value)
		// const $messageElement = document.getElementById(`${event.target.id}Message`)
		if (value.length > 2) {
			errorHandler.inputFistName.error = false
			setStateOnChangeInputSuccess(errorHandler.inputFistName.target, 'OK', 'alert-success')
			return false
		}
		setStateOnChangeInputError(errorHandler.inputFistName.target, 'El nombre debe contener al menos 3 caracteres', 'alert-danger')
	}
	function handlerChangeLastName(event) {
		const value = event.target.value
		errorHandler.inputLastName.error = true
		setInputLastName(value)
		// const $messageElement = document.getElementById(`${event.target.id}Message`)
		if (value.length > 2) {
			errorHandler.inputLastName.error = false
			setStateOnChangeInputSuccess(errorHandler.inputLastName.target, 'OK', 'alert-success')
			return false
		}
		setStateOnChangeInputError(errorHandler.inputLastName.target, 'El apellido debe contener al menos 3 caracteres', 'alert-danger')
	}
	function handlerChangeRut(event) {
		const value = format(event.target.value)
		errorHandler.inputRut.error = true
		setInputRut(value)
		// const $messageElement = document.getElementById(`${event.target.id}Message`)
		if (validate(value)) {
			errorHandler.inputRut.error = false
			setStateOnChangeInputSuccess(errorHandler.inputRut.target, 'OK', 'alert-success')
			return false
		}
		setStateOnChangeInputError(errorHandler.inputRut.target, 'RUT no válido', 'alert-danger')
	}
	function handlerChangeEmail(event) {
		const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]{2,}$/
		const value = event.target.value
		errorHandler.inputEmail.error = true
		setInputEmail(value)
		// const $messageElement = document.getElementById(`${event.target.id}Message`)
		if (value.match(validRegex)) {
			errorHandler.inputEmail.error = false
			setStateOnChangeInputSuccess(errorHandler.inputEmail.target, 'OK', 'alert-success')
			return false
		}
		setStateOnChangeInputError(errorHandler.inputEmail.target, 'El formato de correo no es correcto', 'alert-danger')
	}
	function handlerChangePhone(event) {
		// const validRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
		const validRegex = /^(9|2){1}[0-9]{8}$/im
		errorHandler.inputPhone.error = true
		const value = event.target.value
		setInputPhone(value)
		// const $messageElement = document.getElementById(`${event.target.id}Message`)
		if (value.match(validRegex)) {
			errorHandler.inputPhone.error = false
			setStateOnChangeInputSuccess(errorHandler.inputPhone.target, 'OK', 'alert-success')
			return false
		}
		setStateOnChangeInputError(errorHandler.inputPhone.target, 'El número telefónico debe de tener el siguiente formato 912345678 ó 212345678', 'alert-danger')
	}
	function handlerChangeNumber(event) {
		const validRegex = /^[a-zA-Z0-9]{17,20}$/
		errorHandler.inputNumber.error = true
		const value = event.target.value
		setInputNumber(value)
		// const $messageElement = document.getElementById(`${event.target.id}Message`)
		if (value.match(validRegex)) {
			errorHandler.inputNumber.error = false
			setStateOnChangeInputSuccess(errorHandler.inputNumber.target, 'OK', 'alert-success')
			return false
		}
		setStateOnChangeInputError(errorHandler.inputNumber.target, 'El código debe contener entre 17 y 20 caracteres alfanuméricos', 'alert-danger')
	}
	function handlerChangeLegalBases(event) {
		// console.info(event.target, event.currentTarget)
		errorHandler.inputLegalBases.error = true
		const value = event.target.checked
		setInputLegalBases(value)
		// const $messageElement = document.getElementById(`${event.target.id}Message`)
		if (value) {
			errorHandler.inputLegalBases.error = false
			setStateOnChangeInputSuccess(errorHandler.inputLegalBases.target, 'OK', 'alert-success')
			return false
		}
		setStateOnChangeInputError(errorHandler.inputLegalBases.target, 'NOT OK', 'alert-danger')
	}

	function setStateOnValidateInputError($element) {
		$element = document.getElementById($element)
		$element.classList.remove('success')
		$element.classList.add('error')
		$element.classList.remove('animation-blink')
		setTimeout(_ => $element.classList.add('animation-blink'), 200)
		
		console.info('setStateOnValidateInputError')
		setStateErrorHandler(errorHandler)
	}

	function setStateOnChangeInputSuccess($element) {
		$element = document.getElementById($element)
		$element.classList.remove('error')
		$element.classList.add('success')
		setStateErrorHandler(errorHandler)
	}

	function setStateOnChangeInputError($element) {
		$element = document.getElementById($element)
		$element.classList.remove('success')
		$element.classList.add('error')
		// $element.classList.remove('animation-blink')
		// $element.classList.add('animation-blink')
		setStateErrorHandler(errorHandler)
	}

	function setMessageOnChangeInput($element, message, className) {
		$element.textContent = message
		$element.removeAttribute('class')
		$element.classList.add(className)
		setStateErrorHandler(errorHandler)
	}

	/*useEffect(() => {
		setStep(<StepForm setStep={setStep} />)
	}, [<StepForm />])*/
	useEffect(_ => {
		let mediaQuery = window.matchMedia("(max-width: 449px)");
		mediaQuery.addListener(setMQuery);
		// this is the cleanup function to remove the listener
		return _ => mediaQuery.removeListener(setMQuery);
	}, [])

	return (
		<div className="form-container">
			<div className="form-content">
				<form onSubmit={handlerSubmit}>
					<div className="form-row">
						<div className="form-col">
							<div className="form-control">
								<label htmlFor="fistName">NOMBRE</label>
								<input placeholder="NOMBRE" type="text" name="fistName" id="fistName" value={inputFistName} onChange={handlerChangeFistName} />
								<p id="fistNameMessage" className="d-none"></p>
							</div>
						</div>
						<div className="form-col">
							<div className="form-control">
								<label htmlFor="lastName">APELLIDO</label>
								<input placeholder="APELLIDO" type="text" name="lastName" id="lastName" value={inputLastName} onChange={handlerChangeLastName} />
								<p id="lastNameMessage" className="d-none"></p>
							</div>
						</div>
						<div className="form-col">
							<div className="form-control">
								<label htmlFor="rut">RUT</label>
								<input placeholder="RUT" type="text" name="rut" id="rut" value={inputRut} onChange={handlerChangeRut} />
								<p id="rutMessage" className="d-none"></p>
							</div>
						</div>
						<div className="form-col">
							<div className="form-control">
								<label htmlFor="email">E-MAIL</label>
								<input placeholder="E-MAIL" type="text" name="email" id="email" value={inputEmail} onChange={handlerChangeEmail} />
								<p id="emailMessage" className="d-none"></p>
							</div>
						</div>
						<div className="form-col">
							<div className="form-control">
								<label htmlFor="phone">TELÉFONO</label>
								<input placeholder="TELÉFONO" type="text" name="phone" id="phone" value={inputPhone} onChange={handlerChangePhone} />
								<p id="phoneMessage" className="d-none"></p>
							</div>
						</div>
						<div className="form-col">
							<div className="form-control">
								<label htmlFor="number">N° DE LOTE Y FECHA DE BOTELLA</label>
								<input placeholder="N° DE LOTE Y FECHA DE BOTELLA" type="text" name="number" id="number" value={inputNumber} onChange={handlerChangeNumber} />
								<p id="numberMessage" className="d-none"></p>
							</div>
						</div>
					</div>
					{
						mQuery && mQuery.matches ?
						<>
							<div className="form-row display-smaller">
								<div className="form-col text-center">
									<FormModal />
								</div>
								<div className="form-col text-center">
									<FormLegalBases />
								</div>
								<div className="form-col">
									<div id="legalBasesContainer" className="form-control checkbox text-center d-flex">
										{/*<FormTermsConditions value={inputLegalBases} onChange={handlerChangeLegalBases} />*/}
										<input
											type="checkbox"
											name="legalBases"
											id="legalBases"
											value={inputLegalBases}
											onInput={handlerChangeLegalBases}
										/>
										<label htmlFor="legalBases" className="d-flex" title="ACEPTO BASES Y CONDICIONES DEL CONCURSO">
											ACEPTO BASES Y CONDICIONES DEL CONCURSO
										</label>
										{/*<label htmlFor="legalBases" className="d-block label-text">ACEPTO BASES Y CONDICIONES DEL CONCURSO</label>*/}
										<p id="legalBasesMessage" className="d-none"></p>
									</div>
								</div>
								<div className="form-col text-center">
									<p className="fs-mini text-center"><span>Recuerda guardar tu botella para hacer válido el premio</span></p>
								</div>
								<div className="form-col text-center">
									<input type="submit" name="formSubmit" id="formSubmit" value="PARTICIPAR" />
								</div>
								<div className="form-col text-center">
									<input type="hidden" value={stateErrorHandler} />
									<p id="formErrorHandler" className="d-none"></p>
								</div>
							</div>
						</> :
						<>
							<div className="form-row display-bigger">
								<div className="form-col text-center">
									<FormModal />
								</div>
								<div className="form-col text-center">
									<FormLegalBases />
								</div>
								<div className="form-col">
									<div id="legalBasesContainer" className="form-control checkbox text-center">
										<input
											type="checkbox"
											name="legalBases"
											id="legalBases"
											value={inputLegalBases}
											onInput={handlerChangeLegalBases}
											/*className="d-none"*/
										/>
										<label htmlFor="legalBases" className="d-block">ACEPTO BASES Y CONDICIONES DEL CONCURSO</label>
										<p id="legalBasesMessage" className="d-none"></p>
									</div>
								</div>
								<div className="form-col text-center">
									<p className="fs-mini text-center"><span>Recuerda guardar tu botella para hacer válido el premio</span></p>
								</div>
								<div className="form-col text-center">
									<input type="submit" name="formSubmit" id="formSubmit" value="PARTICIPAR" />
								</div>
								<div className="form-col text-center">
									<input type="hidden" value={stateErrorHandler} />
									<p id="formErrorHandler" className="d-none"></p>
								</div>
							</div>
						</>
					}

				</form>
				<div ref={$modal} id="modalContainer">
					<Modal id="modalForm" onclick={_ => ''}>
						<div className="modal-group">
							<Loader id="loaderModal" />
							<p className="modal-text">Tus datos están siendo guardados</p>
						</div>
					</Modal>
				</div>
			</div>
		</div>
	)
}