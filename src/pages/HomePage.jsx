import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) return;

      try {
        const response = await fetch('http://localhost:5000/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (data.success) {
          setUser(data.data);
        } else {
          // 토큰이 유효하지 않으면 삭제
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div className="home-container">
      {/* 우측 상단 유저 정보 */}
      {user && (
        <div className="user-greeting">
          <span className="greeting-text">{user.name}님 반갑습니다.</span>
          <button className="logout-btn" onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      )}

      <div className="home-content">
        <h1 className="home-title">Shopping Mall</h1>
        <p className="home-subtitle">최고의 쇼핑 경험을 시작하세요</p>
        
        <div className="home-buttons">
          {user ? (
            <button className="btn btn-primary">
              쇼핑 시작하기
            </button>
          ) : (
            <>
              <button 
                className="btn btn-primary"
                onClick={() => navigate('/signup')}
              >
                회원가입
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => navigate('/login')}
              >
                로그인
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;

