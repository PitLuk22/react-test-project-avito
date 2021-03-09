import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import Spinner from './Spinner';
import Portal from './Portal';
import Modal from './Modal';
import { useData } from './DataContext';

const ImageGrid = () => {
	const [images, setImages] = useState([])
	const [img, setImg] = useState({})
	const [showModal, setShowModal] = useState(false)
	const [loading, setLoading] = useState({
		isLoading: false,
		currentId: null
	})

	const service = useData();

	useEffect(() => {
		service.getAllImages()
			.then(arrayOfImages => setImages(arrayOfImages));
	}, [service])

	const showModalHandler = async (id) => {
		setLoading({ isLoading: true, currentId: id })

		await service.getImage(id)
			.then(img => setImg(img))

		setLoading({ isLoading: false, currentId: null })
		setShowModal(true)
	}

	const closeModalHandler = (e) => {
		if (e.target.dataset.close) {
			setShowModal(false)
		}
	}
	// cancel scroll
	showModal ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'visible'

	return (
		<S.Container>
			<S.Grid>
				{images.map(({ id, url }) => {
					return (
						<S.ImgWrapper key={id}>
							{loading.isLoading && id === loading.currentId && <Spinner pos={'absolute'} />}
							<S.Img src={url} alt={id} onClick={() => showModalHandler(id)} />
						</S.ImgWrapper>
					);
				})}
			</S.Grid>
			{showModal &&
				<Portal>
					<Modal img={img} closeModalHandler={closeModalHandler} />
				</Portal>
			}
		</S.Container>
	)
}

export default ImageGrid

const S = {};
S.Container = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	padding: 20px 30px;
`;
S.Grid = styled.main`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	justify-content: center;
	grid-column-gap: 20px;
	grid-row-gap: 30px;
`;
S.ImgWrapper = styled.div`
	position: relative;
	width: 100%;
`;
S.Img = styled.img`
	width: 100%;
	height:auto;
	cursor: pointer;
`;