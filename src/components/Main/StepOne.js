import { useEffect } from 'react'
import StepHeader from './StepHeader'
import StepTitle from './StepTitle'
import StepOneBody from './StepOne/StepOneBody'
import StepOneFooter from './StepOne/StepOneFooter'
import localStorage from '../../services/localstorage'
import { fs_get } from '../../services/api/fs'

export default function StepOne({ setStep }) {
	useEffect(() => {
		const $bacardi = document.querySelector('.Bacardi')
		$bacardi.classList.remove('scale-down-top')
		$bacardi.classList.remove('scale-up-top')
	}, [])
	return (
		<section id="stepOne">
			<StepHeader />
			<StepTitle title="¿ERES MAYOR DE 18 AÑOS?" />
			<StepOneBody setStep={setStep} />
			<StepOneFooter />
		</section>
	)
}