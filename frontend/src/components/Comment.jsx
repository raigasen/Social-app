import { useState } from 'react';
import moment from 'moment';
import CommentForm from './CommentForm';
import { Avatar, Box, Button, Typography } from '@mui/joy';
import { Grid, IconButton, Paper, Stack } from '@mui/material';
import Share from './Share';
import { useAxios } from '../utils/apiCalls';

const Comment = ({
	comment,
	// replies,
	setActiveComment,
	activeComment,
	updateComment,
	deleteComment,
	addComment,
	parentId = null,
	currentUserId,
}) => {
	const isEditing =
		activeComment &&
		activeComment.id === comment.id &&
		activeComment.type === 'editing';
	const isReplying =
		activeComment &&
		activeComment.id === comment.id &&
		activeComment.type === 'replying';

	const canDelete = currentUserId === comment.userId;

	const canEdit = currentUserId === comment.userId;
	const replyId = parentId ? parentId : comment.id;
	const createdAt = new Date(comment.createdAt).toLocaleDateString();
	const [nestedReplies, setNestedReplies] = useState([]);

	const { operation, data } = useAxios();

	// const getReplies = () => {
	// 	const payload = {
	// 		comment: comment._id,
	// 	};

	// 	operation('comments/replies', payload).then(() => console.log(data));
	// };

	return (
		<div key={comment.id} className='comment'>
			<Stack direction='row' spacing={2}>
				<Avatar />

				<Stack spacing={2}>
					<Stack direction='row' spacing={2}>
						<Typography component='strong'>
							{comment.user.firstName} {comment.user.lastName}
						</Typography>
						<Typography>
							{moment(comment.created).fromNow()}
						</Typography>
					</Stack>

					<Stack direction='column' spacing={2}>
						{!isEditing && (
							<div className='comment-text'>
								{comment.commentTitle}
							</div>
						)}
						{isEditing && (
							<CommentForm
								submitLabel='Update'
								hasCancelButton
								initialText={comment.body}
								handleSubmit={(text) =>
									updateComment(text, comment.id)
								}
								handleCancel={() => {
									setActiveComment(null);
								}}
							/>
						)}

						<Stack direction='row' spacing={2}>
							<div
								className='comment-action'
								onClick={() =>
									setActiveComment({
										id: comment.id,
										type: 'replying',
									})
								}>
								{' '}
								Reply
							</div>

							<div
								className='comment-action'
								onClick={() => deleteComment(comment.id)}>
								Delete
							</div>

							<div
								className='comment-action'
								onClick={() =>
									setActiveComment({
										id: comment.id,
										type: 'editing',
									})
								}>
								Edit
							</div>

							<Share label='Share' />
						</Stack>

						{isReplying && (
							<CommentForm
								submitLabel='Reply'
								handleSubmit={(text) =>
									addComment(text, replyId)
								}
							/>
						)}
					</Stack>
					{/* {replies.length > 0 && (
						<Stack direction='row' spacing={2}>
							{replies.map((reply) => (
								<Comment
									comment={reply}
									key={reply.id}
									setActiveComment={setActiveComment}
									activeComment={activeComment}
									updateComment={updateComment}
									deleteComment={deleteComment}
									addComment={addComment}
									parentId={comment.id}
									replies={nestedReplies}
									currentUserId={currentUserId}
								/>
							))}
						</Stack>
					)} */}
				</Stack>
			</Stack>
		</div>
	);
};

export default Comment;
