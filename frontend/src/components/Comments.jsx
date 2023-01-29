import { useState, useEffect } from 'react';
import CommentForm from './CommentForm';
import Comment from './Comment';
import {
	getComments as getCommentsApi,
	createComment as createCommentApi,
	updateComment as updateCommentApi,
	deleteComment as deleteCommentApi,
} from '../api';

const Comments = ({ post, commentsUrl, currentUserId }) => {
	const [backendComments, setBackendComments] = useState([]);
	const [activeComment, setActiveComment] = useState(null);
	const rootComments = backendComments.filter(
		(backendComment) => backendComment.parentComment === null
	);
	const [replies, setReplies] = useState([]);

	const addComment = (text, parentId) => {
		createCommentApi(text, parentId).then((comment) => {
			setBackendComments([comment, ...backendComments]);
			setActiveComment(null);
		});
	};

	const updateComment = (text, commentId) => {
		updateCommentApi(text).then(() => {
			const updatedBackendComments = backendComments.map(
				(backendComment) => {
					if (backendComment.id === commentId) {
						return { ...backendComment, body: text };
					}
					return backendComment;
				}
			);
			setBackendComments(updatedBackendComments);
			setActiveComment(null);
		});
	};
	const deleteComment = (commentId) => {
		if (window.confirm('Are you sure you want to remove comment?')) {
			deleteCommentApi().then(() => {
				const updatedBackendComments = backendComments.filter(
					(backendComment) => backendComment.id !== commentId
				);
				setBackendComments(updatedBackendComments);
			});
		}
	};

	const getReplies = (comments, replies) => {
		const filteredReplies = comments.filter((comment) =>
			replies.includes(comment._id)
		);

		console.log(filteredReplies);
		return filteredReplies;
	};

	useEffect(() => {
		setBackendComments(post.comments);
	}, []);

	return (
		<div className='comments'>
			<h3 className='comments-title'>Comments</h3>
			{/* <div className="comment-form-title">Write comment</div> */}
			<CommentForm submitLabel='Write' handleSubmit={addComment} />
			<div className='comments-container'>
				{rootComments.map((rootComment) => (
					<Comment
						key={rootComment._id}
						comment={rootComment}
						// replies={getReplies(
						// 	post.comments,
						// 	post.comments.filter(
						// 		(comment) => comment._id === rootComment._id
						// 	)[0].replies
						// )}
						activeComment={activeComment}
						setActiveComment={setActiveComment}
						addComment={addComment}
						deleteComment={deleteComment}
						updateComment={updateComment}
						currentUserId={currentUserId}
					/>
				))}
			</div>
		</div>
	);
};

export default Comments;
