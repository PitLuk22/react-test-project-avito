import React, { useEffect, useState } from 'react';
import Form from './Form';
import Comment from './Comment';
import styled from 'styled-components';
import cross from '../img/cross.png';
import { useData } from './DataContext';

const Modal = ({ img, closeModalHandler }) => {
	const service = useData();
	const [comments, setComments] = useState([])

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const updateComments = () => {
		service.getComments()
			.then(item => {
				const newArr = item.filter(comment => comment.imgID === img.id)
				setComments(newArr)
			})
	}

	useEffect(() => {
		updateComments()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<S.Overlay onClick={closeModalHandler} data-close>
			<S.Dialog>
				<S.ImgWrapper>
					<img src={img.url} alt={img.id} />
				</S.ImgWrapper>
				<Form id={img.id} updateComments={updateComments} />
				<S.Comments>
					{comments.map(item => {
						return <Comment key={item.id} {...item} />
					})}
				</S.Comments>
				<S.Close src={cross} alt="close" data-close />
			</S.Dialog>
		</S.Overlay >
	)
}

export default Modal
const S = {};
S.Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: rgba(0,0,0, .8);
	display: flex;
	justify-content: center;
	align-items: center;
`;
S.Dialog = styled.div`
	position: relative;
	display: grid;
	grid-template-columns: 1.5fr 1fr;
  	grid-template-rows: auto;
	grid-template-areas: 
		'image comments'
		'form comments'
	;
	width: 70%;
	background-color: #fff;
	padding: 30px;
	@media(max-width: 992px ) {
		min-width: 90%;
	}
	@media(max-width: 576px ) {
		min-width: 100%;
		height: 100vh;
		grid-template-areas: 
		'image image'
		'comments comments'
		'form form'
		;
		grid-template-columns: 1fr;
  		grid-template-rows: auto 1fr 2fr;
		padding: 0;
		overflow: scroll;
	}
`;
S.ImgWrapper = styled.div`
	grid-area: image;
	position: relative;
	max-width: 100%;
	padding-top: 66.25%;
	img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}
`;
S.Comments = styled.div`
	grid-area: comments;
	padding: 10px 10px 10px 20px;
	justify-content: start;
	max-height: 520px;
	overflow: scroll;
	@media(max-width: 576px ) {
		padding: 20px;
		max-height: 100%;
		overflow: visible;
	}
`;
S.Close = styled.img`
	position: absolute;
	top: 10px;
	right: 10px;
	width: 20px;
	cursor: pointer;
`;
