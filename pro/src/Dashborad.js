import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Dashboard.css';
import writeIcon from './assets/write-icon.png';

const Dashboard = () => {
    const [qnaList, setQnaList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
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

                const userQnaList = data.user_qna || [];

                const sortedData = userQnaList.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

                setQnaList(sortedData);
            })
            .catch(error => console.error('Error fetching QnA data:', error));
    }, []);

    // 페이지 변경 핸들러
    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id));
    };

    // 현재 페이지에 해당하는 항목들
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = qnaList.slice(indexOfFirstItem, indexOfLastItem);

    // 페이지 번호 계산
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(qnaList.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="dashboard-container">
            <table className="dashboard-table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>제목</th>
                        <th>글쓴이</th>
                        <th>작성시간</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((qna, index) => (
                        <tr key={qna.qna_id}>
                            <td>{indexOfFirstItem + index + 1}</td>
                            <td className="title-cell">
                                <Link to={`/qna/${qna.qna_id}`}>{qna.title}</Link>
                            </td>
                            <td>{qna.email}</td>
                            <td>{new Date(qna.created_at).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                {pageNumbers.map(number => (
                    <button key={number} id={number} onClick={handleClick} className={`page-number ${currentPage === number ? 'active' : ''}`}>
                        {number}
                    </button>
                ))}
            </div>
            <button className="write-button" onClick={() => navigate('/new-post')}>
                글쓰기
                <img src={writeIcon} alt="Write Icon" className="write-icon" />
            </button>
        </div>
    );
}

export default Dashboard;
