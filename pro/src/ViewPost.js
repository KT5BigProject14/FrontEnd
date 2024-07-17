import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ViewPost.css';

const ViewPost = () => {
    const { qna_id } = useParams();
    const [post, setPost] = useState(null);
    const [qnaImages, setQnaImages] = useState([]);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingCommentContent, setEditingCommentContent] = useState('');
    const navigate = useNavigate();

    const fetchPostData = () => {
        const token = sessionStorage.getItem('token');
        fetch(`http://localhost:8000/retriever/qna/load_qna/${qna_id}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(response => response.json())
            .then(data => {
                console.log('Fetched post data:', data);
                setPost(data.result.qna);
                setQnaImages(data.result.qna_images || []);
                setComments(data.comment || []); // 댓글이 없을 경우 빈 배열로 초기화
            })
            .catch(error => console.error('Error fetching post data:', error));
    };

    useEffect(() => {
        fetchPostData();
    }, [qna_id]);

    const handleEdit = () => {
        navigate(`/edit-post/${qna_id}`);
    };

    const handleDelete = () => {
        const token = sessionStorage.getItem('token');
        const requestData = {
            email: post.email,
            title: post.title,
            content: post.content,
            qna_id: post.qna_id,
        };

        fetch(`http://localhost:8000/retriever/qna/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(requestData),
        })
        .then(() => navigate('/QnA'))
        .catch(error => console.error('Error deleting post:', error));
    };

    const handleBackToList = () => {
        navigate('/QnA');
    };

    const handleNewCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleAddComment = () => {
        const token = sessionStorage.getItem('token');
        const requestData = {
            qna_id: qna_id,
            content: newComment,
        };

        fetch(`http://localhost:8000/retriever/qna/upload/comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(requestData),
        })
        .then(response => response.json())
        .then(() => {
            setNewComment('');
            fetchPostData(); // 새로운 댓글 추가 후 데이터 다시 가져오기
        })
        .catch(error => console.error('Error adding comment:', error));
    };

    const handleDeleteComment = (commentId) => {
        const token = sessionStorage.getItem('token');
        const commentToDelete = comments.find(comment => comment.comment_id === commentId);
        if (!commentToDelete) {
            console.error('Comment to delete not found');
            return;
        }
        const requestData = {
            qna_id: qna_id,
            content: commentToDelete.content,
            comment_id: commentId,
        };

        fetch(`http://localhost:8000/retriever/qna/comment`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(requestData),
        })
        .then(() => {
            fetchPostData(); // 댓글 삭제 후 데이터 다시 가져오기
        })
        .catch(error => console.error('Error deleting comment:', error));
    };

    const handleEditComment = (commentId) => {
        const commentToEdit = comments.find(comment => comment.comment_id === commentId);
        if (commentToEdit) {
            setEditingCommentId(commentId);
            setEditingCommentContent(commentToEdit.content);
        }
    };

    const handleEditCommentChange = (e) => {
        setEditingCommentContent(e.target.value);
    };

    const handleSaveEditedComment = () => {
        const token = sessionStorage.getItem('token');
        const requestData = {
            qna_id: qna_id,
            content: editingCommentContent,
            comment_id: editingCommentId,
        };

        fetch(`http://localhost:8000/retriever/qna/update/comment`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(requestData),
        })
        .then(response => response.json())
        .then(() => {
            setEditingCommentId(null);
            setEditingCommentContent('');
            fetchPostData(); // 댓글 수정 후 데이터 다시 가져오기
        })
        .catch(error => console.error('Error editing comment:', error));
    };

    if (!post) return <div>Loading...</div>;

    return (
        <div className="view-post-container">
            <h1 className="post-title">{post.title}</h1>
            <div className="post-details">
                <p><strong>작성자:</strong> {post.email}</p>
                <p><strong>작성일:</strong> {new Date(post.created_at).toLocaleString()}</p>
                <p><strong>내용:</strong></p>
                <p>{post.content}</p>
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
                        comment && comment.comment_id && ( // 댓글과 comment_id가 정의되어 있는지 확인
                            <div key={comment.comment_id} className="comment">
                                <p><strong>{comment.email}</strong> ({new Date(comment.created_at).toLocaleString()})</p>
                                {editingCommentId === comment.comment_id ? (
                                    <div className="edit-comment">
                                        <textarea value={editingCommentContent} onChange={handleEditCommentChange} />
                                        <button onClick={handleSaveEditedComment}>확인</button>
                                        <button onClick={() => setEditingCommentId(null)}>취소</button>
                                    </div>
                                ) : (
                                    <>
                                        <p>{comment.content}</p>
                                        {comment.email === sessionStorage.getItem('email') && (
                                            <div className="comment-actions">
                                                <button onClick={() => handleEditComment(comment.comment_id)}>수정</button>
                                                <button onClick={() => handleDeleteComment(comment.comment_id)}>삭제</button>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        )
                    ))}
                    <div className="new-comment">
                        <textarea value={newComment} onChange={handleNewCommentChange} placeholder="댓글을 입력하세요" />
                        <button onClick={handleAddComment}>댓글 추가</button>
                    </div>
                </div>
            </div>
            <button className="edit-button" onClick={handleEdit}>수정하기</button>
            <button className="delete-button" onClick={handleDelete}>삭제하기</button>
            <button className="back-to-list-button" onClick={handleBackToList}>목록보기</button>
        </div>
    );
}

export default ViewPost;
