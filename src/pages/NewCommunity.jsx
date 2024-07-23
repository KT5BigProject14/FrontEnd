import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import returnIcon from '../assets/return-icon.png';
import '../styles/NewPost.css';
import apiFetch from '../api';

const NewCommunity = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles([...files, ...selectedFiles]);
    };

    const handleFileRemove = (fileToRemove) => {
        setFiles(files.filter(file => file !== fileToRemove));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('token');
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        files.forEach((file) => {
            formData.append('images', file);
        });

        console.log('Form data entries:');
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        apiFetch(`${apiUrl}/retriever/community/upload`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        })
        .then(response => {
            console.log('Success:', response.data);
            navigate('/Community');
        })
        .catch(error => console.error('Error:', error));
    };

    return (
        <div className="newpost">
            <div className="newpost-container">
                <h1 className="newpost-title">새 글쓰기</h1>
                <form onSubmit={handleSubmit} className="newpost-form">
                    <div className="newpost-group">
                        <label>제목</label>
                        <input 
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            required
                        />
                    </div>
                    <div className="newpost-group">
                        <label>내용</label>
                        <textarea 
                            value={content} 
                            onChange={(e) => setContent(e.target.value)} 
                            required
                        ></textarea>
                    </div>
                    <div className="newpost-group">
                        <label>이미지 업로드</label>
                        <input 
                            type="file" 
                            multiple 
                            onChange={handleFileChange} 
                        />
                        <div className="image-preview">
                            {files.map((file, index) => (
                                <div key={index} className="image-item">
                                    <img src={URL.createObjectURL(file)} alt={`미리보기 ${index + 1}`} />
                                    <button type="button" onClick={() => handleFileRemove(file)}>X</button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button type="submit" className="newpost-submit-button">작성하기</button>
                </form>
                <button className="newpost-write-button" onClick={() => navigate('/Community')}>
                    {/* 되돌아가기 */}
                    <img src={returnIcon} alt="Return Icon" className="newpost-return-icon" />
                </button>
            </div>
        </div>
    );
}

export default NewCommunity;
