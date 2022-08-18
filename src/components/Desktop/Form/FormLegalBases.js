import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faMagnifyingGlass,
	faFileContract,
} from '@fortawesome/free-solid-svg-icons'
import pdf from '../../../assets/BASES Y CONDICIONES - “EL VERANO VA POR DENTRO” 04 julio 2022.pdf'

export default function FormLegalBases() {
	return (
		<>
			<p id="legalBasesDocumentIcon" className="m-0">
				<a className="icon-container" href={pdf} target="_blank" rel="noreferrer">
					<FontAwesomeIcon className="icon-parent glass" icon={faMagnifyingGlass} />
					<FontAwesomeIcon className="icon-child" icon={faFileContract} />
				</a>
			</p>
		</>
	)
}