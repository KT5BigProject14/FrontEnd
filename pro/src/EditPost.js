import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditPost.css';

const EditPost = () => {
    const { qna_id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState([]);
    const [qnaEmail, setQnaEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8000/retriever/qna/load_qna/${qna_id}`)
            .then(response => response.json())
            .then(data => {
                const qna = data.result.qna;
                setTitle(qna.title);
                setContent(qna.content);
                setQnaEmail(qna.email);
                setFiles(data.result.qna_images || []); // qna_images 설정
            })
            .catch(error => console.error('Error fetching post data:', error));
    }, [qna_id]);

    const handleFileChange = (e) => {
        setFiles([...files, ...Array.from(e.target.files)]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = sessionStorage.getItem('email');
        const encodedEmail = encodeURIComponent(email);
        const formData = new FormData();
        formData.append('qna_id', qna_id);
        formData.append('email', qnaEmail);
        formData.append('title', title);
        formData.append('content', content);

        files.forEach((file, index) => {
            formData.append(`img`, file);
        });

        fetch(`http://localhost:8000/retriever/qna/update_qna?user_email=${encodedEmail}`, {
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
                        multiple 
                        onChange={handleFileChange} 
                    />
                    <div className="image-preview">
                        {files.map((image, index) => (
                            <img key={index} src={image} alt={`기존 이미지 ${index + 1}`} />
                        ))}
                        {files.map((file, index) => (
                            <img key={index + files.length} src={URL.createObjectURL(file)} alt={`새 이미지 ${index + 1}`} />
                        ))}
                    </div>
                </div>
                <button type="submit" className="submit-button">수정하기</button>
            </form>
        </div>
    );
}

export default EditPost;
