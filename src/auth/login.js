import React, { useState } from 'react';
import authApi from '../api/authApi';
import style from './login.module.css'
import { useNavigate , useLocation , Link} from 'react-router-dom';


 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validator, setValidator] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
 
 
  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const state = location.state; // Lấy thông tin state từ props
      console.log(state);
  
      const response = await authApi.login({ username, password });
      if (response.data.success === true) {
        const tokenLogin = response.data.data;
        localStorage.setItem('login', tokenLogin);
        const previousPath = state?.from || '/'; // Nếu không có state hoặc không có thông tin trước, chuyển hướng về trang chính
        navigate(previousPath);
      } else {
        console.log('Đăng nhập không thành công!'); // Thực hiện hành động nếu đăng nhập không thành công
        setValidator('Đăng Nhập Không thành công')
      }
    } catch (error) {
      console.error('Đã có lỗi xảy ra khi đăng nhập:', error);
      setValidator('Tài Khoản Hoặc Mật Khẩu không đúng');
    }
  };
  
  return (
    <div>
        <div className={style.wrapper}>
        <div className={style.logo}>
            <img src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-bird-symbols-png-logo-0.png" alt=""/>
        </div>
        <div className={`text-center mt-4 ${style.name}`}>
            Login
        </div>
        <p className="text-danger">{validator}</p>
        <form className="p-3 mt-3">
            <div className= {`${style.formfield} d-flex align-items-center`}>
                <span className="far fa-user"></span>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

            </div>
            <div className={`${style.formfield} d-flex align-items-center`}>
                <span className="fas fa-key"></span>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            </div>
         
            <button onClick={handleLogin} className="btn btn-primary rounded-pill w-100 shadow-lg">Login</button>
        </form>
        <div className="text-center fs-6">
            <Link to="/Forgot">Forget password?</Link> or <Link to="/register">Sign up</Link>
        </div>
    </div>
   
    </div>
  );
}

export default Login;
