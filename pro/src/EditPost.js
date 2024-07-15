import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditPost.css';

const EditPost = () => {
    const { qna_id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    // const [isSecret, setIsSecret] = useState(false);
    const [file, setFile] = useState(null);
    const [qnaEmail, setQnaEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8000/retriever/qna/load_qna/${qna_id}`)
            .then(response => response.json())
            .then(data => {
                const qna = data.result.qna;
                setTitle(qna.title);
                setContent(qna.content);
                // setIsSecret(qna.is_secret);
                setQnaEmail(qna.email); // qna_email 설정
                // Note: Handle images if needed
            })
            .catch(error => console.error('Error fetching post data:', error));
    }, [qna_id]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = sessionStorage.getItem('email');
        const encodedEmail = encodeURIComponent(email); // email 인코딩
        const formData = new FormData();
        formData.append('qna_id', qna_id);
        formData.append('qna_email', qnaEmail);
        formData.append('title', title);
        formData.append('content', content);
        // formData.append('isSecret', isSecret);
        if (file) {
            formData.append('image', file);
        }

        fetch(`http://localhost:8000/retriever/qna/update_qna?email=${encodedEmail}`, {
            method: 'PUT',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            navigate('/QnA');
        })
        .catch(error => console.error('Error updating post:', error));
    };

    return (
        <div className="editpost-container">
            <h1 className="editpost-title">글 수정하기</h1>
            <form onSubmit={handleSubmit} className="editpost-form">
                <div className="form-group">
                    <label>제목:</label>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required
                    />
                </div>
                <div className="form-group">
                    <label>내용:</label>
                    <textarea 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>이미지 업로드:</label>
                    <input 
                        type="file" 
                        onChange={handleFileChange} 
                    />
                </div>
                <div className="form-group">
                    <label>
                        <input 
                            type="checkbox" 
                            // checked={isSecret} 
                            // onChange={(e) => setIsSecret(e.target.checked)} 
                        /> 비밀글
                    </label>
                </div>
                <button type="submit" className="submit-button">수정하기</button>
            </form>
        </div>
    );
}

export default EditPost;
