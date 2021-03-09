import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const Portal = ({ children, className = 'portal', el = 'div' }) => {
	const [container] = useState(document.createElement(el))

	container.classList.add(className)

	useEffect(() => {
		document.body.appendChild(container)
		return () => {
			document.body.removeChild(container)
		}
	}, [container])

	return ReactDOM.createPortal(children, container)
}

export default Portal;