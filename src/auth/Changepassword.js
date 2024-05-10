import React, { useState } from 'react'
import style from './Changepassword.module.css'
import { Link ,useNavigate} from 'react-router-dom';
import authApi from '../api/authApi';

function Changepassword() {

    const [email, setEmail] = useState('')
    const [newpassword, setnewPassword] = useState('')
    const [otp, setOTP] = useState('')
    const [errorMessages, setErrorMessages] = useState([]); // State để lưu trữ các thông báo lỗi
    const [errorPassword, setErrorPassword] = useState('');
    const navigate = useNavigate();

    const hanlderChange = async (e) => {
        e.preventDefault();
        try{
            const response = await authApi.resetpassword({email: email, newPassword: newpassword , otp:otp});
            if(response.data.success === true){
                navigate('/login');
            }
            else {
            console.error(response.data);
            }
        } catch (error) {
          if (
            error.response &&
            error.response.data &&
            error.response.data.data
          ) {
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
           
            <input
            placeholder='Email'
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={`${style.formfield} d-flex align-items-center`}>
          
            <input
            placeholder='Mật Khẩu'
              type="password"
              value={newpassword}
              onChange={(e) => setnewPassword(e.target.value)}
            />
           
          </div>
          {errorPassword && <p className="text-danger">{errorPassword}</p>}
          
          <div className={`${style.formfield} d-flex align-items-center`}>
           
            <input
              placeholder=" mã OTP"
              type="text"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
            />
          </div>
          <button
            onClick={hanlderChange}
            className="btn btn-primary rounded-pill w-100 shadow-lg"
          >
            Đổi Mật Khẩu
          </button>
        </form>
        <div className="text-center fs-6">
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  )
}

export default Changepassword