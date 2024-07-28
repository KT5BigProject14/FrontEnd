import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import '../styles/ViewPost.css';
import apiFetch from '../api';

const ViewCommunity = () => {
    const { community_id } = useParams();
    const location = useLocation();
    const [post, setPost] = useState(null);
    const [qnaImages, setQnaImages] = useState([]);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingCommentContent, setEditingCommentContent] = useState('');
    const [email, setEmail] = useState(location.state?.email || ''); // Retrieve email from location state
    const navigate = useNavigate();
    const role = sessionStorage.getItem('role'); // Retrieve role from sessionStorage
    const apiUrl=import.meta.env.VITE_API_BASE_URL;

    const fetchPostData = () => {
        const token = sessionStorage.getItem('token');
        apiFetch(`${apiUrl}/retriever/community/load/${community_id}`,
            {
                method: 'GET',
            }
        )
            .then(response => {
                console.log('Fetched post data:', response.data);
                const data = response.data;
                setPost(data.result.community);
                setQnaImages(data.result.community_images || []);
                setComments(data.comment || []);
            })
            .catch(error => console.error('Error fetching post data:', error));
    };

    useEffect(() => {
        fetchPostData();
    }, [community_id]);

    const handleEdit = () => {
        navigate(`/edit-community/${community_id}`);
    };

    const handleDelete = () => {
        const token = sessionStorage.getItem('token');
        const requestData = {
            email: post.email,
            title: post.title,
            content: post.content,
            community_id: post.community_id,
        };

        apiFetch(`${apiUrl}/retriever/community/delete`, {
            method: 'DELETE',
            body: JSON.stringify(requestData),
        })
        .then((res) => navigate('/community'))
        .catch(error => console.error('Error deleting post:', error));
    };

    const handleBackToList = () => {
        navigate('/Community');
    };

    const handleNewCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleAddComment = () => {
        const token = sessionStorage.getItem('token');
        const requestData = {
            community_id: community_id,
            content: newComment,
        };

        apiFetch(`${apiUrl}/retriever/community/upload/comment`, {
            method: 'POST',
            body: JSON.stringify(requestData),
        })
        .then(() => {
            setNewComment('');
            fetchPostData();
        })
        .catch(error => console.error('Error adding comment:', error));
    };

    const handleDeleteComment = (commentId) => {
        const token = sessionStorage.getItem('token');
        console.log("콘솔", commentId, comments)
        const commentToDelete = comments.find(comment => comment.community_comment_id === commentId);
        console.log(commentToDelete)
        if (!commentToDelete) {
            console.error('Comment to delete not found');
            return;
        }
        const requestData = {
            community_id: community_id,
            email: commentToDelete.email,
            content: commentToDelete.content,
            community_comment_id: commentToDelete.community_comment_id,
        };
        console.log(requestData);

        apiFetch(`${apiUrl}/retriever/community/delete/comment`, {
            method: 'DELETE',
            body: JSON.stringify(requestData),
        })
        .then(() => {
            fetchPostData();
        })
        .catch(error => console.error('Error deleting comment:', error));
    };

    const handleEditComment = (commentId) => {
        const commentToEdit = comments.find(comment => comment.community_comment_id === commentId);
        if (commentToEdit) {
            setEditingCommentId(commentToEdit.community_comment_id);
            setEditingCommentContent(commentToEdit.content);
            setEmail(commentToEdit.email)
        }
    };

    const handleEditCommentChange = (e) => {
        setEditingCommentContent(e.target.value);
    };

    const handleSaveEditedComment = () => {
        const token = sessionStorage.getItem('token');
        const requestData = {
            community_id: community_id,
            email: email,
            content: editingCommentContent,
            community_comment_id: editingCommentId,
        };

        apiFetch(`${apiUrl}/retriever/community/update/comment`, {
            method: 'PUT',
            body: JSON.stringify(requestData),
        })
        .then(() => {
            setEditingCommentId(null);
            setEditingCommentContent('');
            fetchPostData();
        })
        .catch(error => console.error('Error editing comment:', error));
    };

    if (!post) return <div>Loading...</div>;

    return (
        <div className="view-post">
            <div className="view-post-container">
                <div className="post-header">
                    <h1 className="post-title">{post.title}</h1>
                    <div className="post-meta">
                        <p><strong>작성자:</strong> {post.corporation}</p>
                        <p><strong>작성일:</strong> {new Date(post.created_at).toLocaleString()}</p>
                    </div>
                </div>
                <div className="post-details">
                    <p><strong>내용:</strong></p>
                    <p className="post-content">{post.content}</p>
                    {qnaImages.length > 0 && (
                        <div className="post-images">
                            {qnaImages.map((image, index) => (
                                <img key={index} src={`data:image/jpeg;base64,${Object.values(image)[0]}`} alt={`Post image ${index + 1}`} className="post-image" />
                            ))}
                        </div>
                    )}
                    <div className="post-comments">
                        <h2>댓글</h2>
                        {comments.map((comment) => (
                            comment && comment.community_comment_id && (
                                <div key={comment.community_comment_id} className="comment">
                                    <div className="comment-header">
                                        <p><strong>{comment.corporation}</strong> ({new Date(comment.created_at).toLocaleString()})</p>
                                        { comment.is_my_post == true || role == 'admin'  ? (
                                            <div className="comment-actions">
                                                <button onClick={() => handleEditComment(comment.community_comment_id)}>수정</button>
                                                <span>||</span>
                                                <button onClick={() => handleDeleteComment(comment.community_comment_id)}>삭제</button>
                                            </div>
                                        ) : null}
                                    </div>
                                    {editingCommentId === comment.community_comment_id ? (
                                        <div className="edit-comment">
                                            <textarea value={editingCommentContent} onChange={handleEditCommentChange} className="edit-comment-textarea" />
                                            <button onClick={handleSaveEditedComment} className="comment-save-button">확인</button>
                                            <button onClick={() => setEditingCommentId(null)} className="comment-cancel-button">취소</button>
                                        </div>
                                    ) : (
                                        <p>{comment.content}</p>
                                    )}
                                </div>
                            )
                        ))}
                        <div className="new-comment">
                            <textarea value={newComment} onChange={handleNewCommentChange} placeholder="댓글을 입력하세요" />
                            <button onClick={handleAddComment}>입력</button>
                        </div>
                    </div>
                    {post.is_my_post == true || role == 'admin'  ? (
                    <div className="post-actions">
                        <button className="edit-button" onClick={handleEdit}>수정하기</button>
                        <button className="delete-button" onClick={handleDelete}>삭제하기</button>
                        <button className="back-to-list-button" onClick={handleBackToList}>목록보기</button>
                    </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default ViewCommunity;
