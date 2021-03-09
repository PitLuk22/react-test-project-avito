import React from 'react';
import { useForm } from "react-hook-form";
import styled from 'styled-components';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useData } from './DataContext';

const schema = yup.object().shape({
	name: yup
		.string()
		.matches(/^([^0-9]*)$/, 'Your name should not contain numbers')
		.required('Your name is reauired'),
	comment: yup
		.string()
		.max(100, 'Your comment should not exceed 100 characters')
		.required('Comment is required')
})

const Form = ({ id, updateComments }) => {

	const service = useData();

	const { register, handleSubmit, errors } = useForm({
		mode: 'all',
		resolver: yupResolver(schema)
	});

	const onSubmit = (data, e) => {
		service.postComments(data, id)
			.then(res => console.log(res))
			.catch(error => console.error(error))
			.finally(() => {
				updateComments()
				e.target.reset()
			})
	}

	return (
		<S.Form onSubmit={handleSubmit(onSubmit)}>
			<S.FormControl>
				<input
					type="text"
					name='name'
					placeholder='Your name'
					ref={register} />
				{errors.name && <S.Error>{errors.name.message}</S.Error>}
			</S.FormControl>
			<S.FormControl>
				<input
					type="text"
					name='comment'
					placeholder='Your comment'
					ref={register} />
				{errors.comment && <S.Error>{errors.comment.message}</S.Error>}
			</S.FormControl>
			<S.Button>Leave a comment</S.Button>
		</S.Form>
	)
}

export default Form
const S = {};
S.Form = styled.form`
	grid-area: form;
	margin-top: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	@media(max-width: 576px ) {
		padding: 20px;
	}
`;
S.Button = styled.button`
	width: 100%;
	background-color: #4997D0;
	text-align: center;
	color: #fff;
	margin-bottom: 0;
	padding: 8px 11px;
	border: 1px solid #CCCCCC;
	border-radius: 3px;
	font-size:13px;
	border: none;
	cursor: pointer;
`;
S.FormControl = styled.div`
	position: relative;
	width: 100%;
	padding-bottom: 20px;
	input {
		width: 100%;
		padding: 8px 11px;
		border: 1px solid #CCCCCC;
		border-radius: 3px;
		font-size:13px;
		color: #747474;
	}
`;
S.Error = styled.span`
	position: absolute;
	bottom: 3px;
	left: 0;
	color: red;
	font-size: 13px;
`;