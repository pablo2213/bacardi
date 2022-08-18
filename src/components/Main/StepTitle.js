
export default function StepHeader({ title, classChild = '' }) {
	return (
		<div className="title-container text-center">
			<h2 className={classChild}>{title}</h2>
		</div>
	)
}