import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Shopping Mall</h1>
        <p className="home-subtitle">최고의 쇼핑 경험을 시작하세요</p>
        
        <div className="home-buttons">
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/signup')}
          >
            회원가입
          </button>
          <button className="btn btn-secondary">
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

