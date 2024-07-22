const apiFetch = async (url, options = {}) => {
    let accessToken = sessionStorage.getItem('token');  // 세션 스토리지에서 'accessToken'을 읽어옴
  
    // 기본 옵션에 Authorization 헤더 추가
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
        Authorization: `Bearer ${accessToken}`
      },
      credentials: 'include',
      ...options,
    };
  
    let response = await fetch(url, defaultOptions);
  
    // 액세스 토큰이 만료된 경우 (401 에러)
    if (response.status === 401) {
      const newAccessToken = response.headers.get('new-access-token');  // 헤더 이름을 'new-access-token'으로 변경
      console.log(newAccessToken);
      if (newAccessToken) {
        // 새 액세스 토큰을 세션 스토리지에 저장
        sessionStorage.setItem('token', newAccessToken);
        // 새로운 토큰으로 헤더 업데이트
        defaultOptions.headers.Authorization = `Bearer ${newAccessToken}`;
        // 요청 재시도
        response = await fetch(url, defaultOptions);
      } else {
        throw new Error('새 액세스 토큰을 받아오는 데 실패했습니다.');
      }
    }
  
    // 응답 처리
    const data = await response.json();
  
    // 상태 코드와 데이터를 함께 반환
    return {
      status: response.status,
      data
    };
  };
  
  export default apiFetch;
  