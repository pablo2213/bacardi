import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faFileSignature,
} from '@fortawesome/free-solid-svg-icons'
import pdf from '../../assets/BASES Y CONDICIONES - “EL VERANO VA POR DENTRO” 04 julio 2022.pdf'

export default function FormTermsConditions({ inputLegalBases, handlerChangeLegalBases}) {
	return (
		<>
			<input
				type="checkbox"
				name="legalBases"
				id="legalBases"
				value={inputLegalBases}
				onChange={handlerChangeLegalBases}
				className="d-none"
			/>
			<label htmlFor="legalBases" className="d-flex icon-container" title="ACEPTO BASES Y CONDICIONES DEL CONCURSO">
				<FontAwesomeIcon className="icon-parent fa-5x" icon={faFileSignature} />
			</label>
			{/*<label htmlFor="legalBases" className="d-block label-text">ACEPTO BASES Y CONDICIONES DEL CONCURSO</label>*/}
			<p id="legalBasesMessage" className="d-none"></p>
		</>
	)
}