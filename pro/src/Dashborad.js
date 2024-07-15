import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    const [qnaList, setQnaList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8000/retriever/qna/load_all_qna')
            .then(response => response.json())
            .then(data => setQnaList(data))
            .catch(error => console.error('Error fetching QnA data:', error));
    }, []);

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">게시판</h1>
            <table className="dashboard-table">
                <thead>
                    <tr>
                        <th>QnA ID</th>
                        <th>Title</th>
                        <th>Email</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {qnaList.map(qna => (
                        <tr key={qna.qna_id}>
                            <td>{qna.qna_id}</td>
                            <td>
                                <Link to={`/qna/${qna.qna_id}`}>{qna.title}</Link>
                            </td>
                            <td>{qna.email}</td>
                            <td>{new Date(qna.created_at).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="write-button" onClick={() => navigate('/new-post')}>글쓰기</button>
        </div>
    );
}

export default Dashboard;
