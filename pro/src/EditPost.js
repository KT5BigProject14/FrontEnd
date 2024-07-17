import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditPost.css';

const EditPost = () => {
    const { qna_id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [existingImages, setExistingImages] = useState([]);
    const [newFiles, setNewFiles] = useState([]);
    const [deletedImages, setDeletedImages] = useState([]);
    const [qnaEmail, setQnaEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
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
                const qna = data.result.qna;
                setTitle(qna.title);
                setContent(qna.content);
                setQnaEmail(qna.email);
                setExistingImages(data.result.qna_images || []);
            })
            .catch(error => console.error('Error fetching post data:', error));
    }, [qna_id]);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setNewFiles([...newFiles, ...selectedFiles]);
    };

    const handleFileRemove = (fileToRemove) => {
        setNewFiles(newFiles.filter(file => file !== fileToRemove));
    };

    const handleImageRemove = (imageToRemove) => {
        setDeletedImages([...deletedImages, imageToRemove]);
        setExistingImages(existingImages.filter(image => image !== imageToRemove));
    };

    const base64ToBlob = (base64, type = 'image/jpeg') => {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('token');
        const formData = new FormData();
        formData.append('qna_id', qna_id);
        formData.append('email', qnaEmail);
        formData.append('title', title);
        formData.append('content', content);

        newFiles.forEach((file) => {
            formData.append('image', file);
        });

        // 기존 이미지를 항상 formData에 추가 (디코딩 후 Blob으로 변환)
        existingImages.forEach((image, index) => {
            const base64Data = Object.values(image)[0];
            const blob = base64ToBlob(base64Data);
            formData.append('image', blob, `existing_image_${index}.jpg`);
        });

        // 삭제된 이미지를 formData에 추가
        deletedImages.forEach((image) => {
            formData.append('deleted_images', Object.values(image)[0]);
        });

        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        fetch(`http://localhost:8000/retriever/qna/edit`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            },
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
                        {existingImages.map((image, index) => (
                            <div key={index} className="image-item">
                                <img src={`data:image/jpeg;base64,${Object.values(image)[0]}`} alt={`기존 이미지 ${index + 1}`} />
                                <button type="button" onClick={() => handleImageRemove(image)}>삭제</button>
                            </div>
                        ))}
                        {newFiles.map((file, index) => (
                            <div key={index + existingImages.length} className="image-item">
                                <img src={URL.createObjectURL(file)} alt={`새 이미지 ${index + 1}`} />
                                <button type="button" onClick={() => handleFileRemove(file)}>삭제</button>
                            </div>
                        ))}
                    </div>
                </div>
                <button type="submit" className="submit-button">수정하기</button>
            </form>
        </div>
    );
}

export default EditPost;
