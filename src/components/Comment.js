import React from 'react';
import styled from 'styled-components';

const Comment = ({ name, comment, date }) => {
	return (
		<S.CommentBlock>
			<div className='title'>
				<span className='name'>{name}</span>
				<span className='date'>{date}</span>
			</div>
			<div>
				<span className='comment'>{comment}</span>
			</div>
		</S.CommentBlock>
	)
}

export default Comment
const S = {};
S.CommentBlock = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding-bottom: 20px;
	box-shadow: 0 0 5px rgba(0,0,0, .2);
	border-radius: 10px; 
	padding: 10px 20px;
	margin-bottom: 10px;
	.title {
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
	}
	.date, .comment, .name {
		font-family: Roboto;
		font-size: 13px;
		line-height: 15px;
		color: #999999;
	}
	.comment {
		color: #000;
		padding-top: 5px;
	}
	.name {
		font-size: 14px;
		font-weight: 600;
		text-transform: capitalize;
	}
`;