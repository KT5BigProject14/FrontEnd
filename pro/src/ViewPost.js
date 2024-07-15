import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ViewPost.css';

const ViewPost = () => {
    const { qna_id } = useParams();
    const [post, setPost] = useState(null);
    const [qna_images, setQnaImages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8000/retriever/qna/load_qna/${qna_id}`)
            .then(response => response.json())
            .then(data => {
                console.log('Fetched post data:', data); // 데이터 확인용 로그
                setPost(data.result.qna);
                console.log('Fetched images:', data.result.qna_images); // 이미지 데이터 확인용 로그
                setQnaImages(data.result.qna_images); // 이미지 설정
            })
            .catch(error => console.error('Error fetching post data:', error));
    }, [qna_id]);

    const handleEdit = () => {
        navigate(`/edit-post/${qna_id}`);
    };

    const handleDelete = () => {
        const email = sessionStorage.getItem('email');
        const encodedEmail = encodeURIComponent(email); // email 인코딩
        const requestData = {
            email: post.email,
            title: post.title,
            content: post.content,
            qna_id: qna_id,
        };
    
        fetch(`http://localhost:8000/retriever/qna/delete_qna?email=${encodedEmail}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData),
        })
        .then(() => navigate('/QnA'))
        .catch(error => console.error('Error deleting post:', error));
    };

    const handleBackToList = () => {
        navigate('/QnA');
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
                {qna_images && qna_images.length > 0 && (
                    <div className="post-images">
                        {qna_images.map((image, index) => (
                            <img key={index} src={`data:image/jpeg;base64,${Object.values(image)[0]}`} alt={`Post image ${index + 1}`} className="post-image" />
                        ))}
                    </div>
                )}
            </div>
            <button className="edit-button" onClick={handleEdit}>수정하기</button>
            <button className="delete-button" onClick={handleDelete}>삭제하기</button>
            <button className="back-to-list-button" onClick={handleBackToList}>목록보기</button>
        </div>
    );
}

export default ViewPost;
