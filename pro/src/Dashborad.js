import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    const [qnaList, setQnaList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        fetch('http://localhost:8000/retriever/qna/load/all/qna', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);

                // Extract user_qna array from the data object
                const userQnaList = data.user_qna || [];

                // Sort the user_qna array by created_at in descending order
                const sortedData = userQnaList.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

                // Update the state with the sorted data
                setQnaList(sortedData);
            })
            .catch(error => console.error('Error fetching QnA data:', error));
    }, []);

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">게시판</h1>
            <table className="dashboard-table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Title</th>
                        <th>Email</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {qnaList.map((qna, index) => (
                        <tr key={qna.qna_id}>
                            <td>{index + 1}</td>
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
