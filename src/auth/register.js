import React, { useState } from 'react'
import style from './register.module.css'
import { MdOutlineEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { GoKey } from "react-icons/go";
import { Link ,useNavigate} from 'react-router-dom';
import authApi from '../api/authApi';
function Register() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setconfirmPassword] = useState('')
    const [email, setEmail] = useState('')
    const [errorMessages, setErrorMessages] = useState([]); // State để lưu trữ các thông báo lỗi
    const [errorPassword, setErrorPassword] = useState('');

    const navigate = useNavigate();
    
    const handleRegister = async (e) => {
        e.preventDefault();
        try{
            if(password !== confirmpassword){
                setErrorPassword("Mật Khẩu Không Khớp");
                return;
            }

            const response = await authApi.register({username: username, password: password , email:email});
            if(response.data.success === true){
                navigate('/login');
            }
            else {
            console.error(response.data);
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.data) {
                const errorData = error.response.data.data;
                console.log(errorData);
                setErrorMessages(errorData);
            } 
          }
    }
  return (
    <div>
      <div className={style.wrapper}>
        <div className={style.logo}>
          <img
            src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-bird-symbols-png-logo-0.png"
            alt=""
          />
        </div>
        <div className={`text-center mt-4 ${style.name}`}>Đăng Ký</div>
        {/* Hiển thị các thông báo lỗi nếu có */}
        {errorMessages && errorMessages.map(errorMessage =>(
            <p className="text-danger px-3">{errorMessage.msg}</p>
        ))}
        <form className="p-3 mt-3">
          <div className={`${style.formfield} d-flex align-items-center`}>
            <span>
              <FaRegUser />
            </span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={`${style.formfield} d-flex align-items-center`}>
            <span>
              <MdOutlineEmail />
            </span>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={`${style.formfield} d-flex align-items-center`}>
            <span>
              <GoKey />
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
           
          </div>
          {errorPassword && <p className="text-danger">{errorPassword}</p>}
          
          <div className={`${style.formfield} d-flex align-items-center`}>
            <span>
              <GoKey />
            </span>
            <input
              placeholder="Nhập Lại Mật Khẩu"
              type="password"
              value={confirmpassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
            />
          </div>
          <button
            onClick={handleRegister}
            className="btn btn-primary rounded-pill w-100 shadow-lg"
          >
            Đăng Ký
          </button>
        </form>
        <div className="text-center fs-6">
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register