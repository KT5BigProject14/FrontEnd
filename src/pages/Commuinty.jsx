import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Dashboard.css';
import writeIcon from '../assets/write-icon.png';
import apiFetch from '../api'; // Fetch 함수 가져오기

const Community = () => {
    const [qnaList, setQnaList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        apiFetch(`${apiUrl}/retriever/community/load/all`, {
            method: 'GET',
            // headers: {
            //     'Authorization': `Bearer ${token}`,
            //     'Content-Type': 'application/json'
            // }
        })
        .then(res => {
            console.log(res);

            // Extract user_qna array from the data object
            const userQnaList = res.data || [];

            // Sort the user_qna array by created_at in descending order
            const sortedData = userQnaList.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

            // Update the state with the sorted data
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
                        <th className="no-column">No</th>
                        <th className="title-column">제목</th>
                        <th>글쓴이</th>
                        <th>작성시간</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((qna, index) => (
                        <tr  key={qna.qna_id || index}>
                            <td className="no-column">{indexOfFirstItem + index + 1}</td>
                            <td className="title-column">
                                <Link to={`/community/${qna.community_id}`} state={{ email: qna.email }}>{qna.title}</Link>
                            </td>
                            <td>{qna.corporation}</td>
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
            <button className="write-button" onClick={() => navigate('/new-community')}>
                글쓰기
                <img src={writeIcon} alt="Write Icon" className="write-icon" />
            </button>
        </div>
    );
}

export default Community;
