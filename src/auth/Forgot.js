import React , { useState } from 'react'
import style from './Forgot.module.css'
import authApi from '../api/authApi';

import {  Link} from 'react-router-dom';

function Forgot() {
  const [email, setEmail] = useState('');
  const [validator, setValidator] = useState(''); 

  const handleForgotPassword = async (e) => {
    console.log(email);
    e.preventDefault();
    try {
      const response = await authApi.forgotpassword({ email });
      if (response.data.success === true) {
        alert("đã gửi link tới email của bạn");
      } else {
        setValidator('Email không chính xác');
      }
    } catch (error) {
      setValidator('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
    }

  };
  return (
    <div>
        <div className={style.wrapper}>
        <div className={style.logo}>
            <img src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-bird-symbols-png-logo-0.png" alt=""/>
        </div>
        <div className={`text-center mt-4 ${style.name}`}>
            Nhập email của bạn
        </div>
        <p className="text-danger">{validator}</p>
        <form className="p-3 mt-3">
            <div className= {`${style.formfield} d-flex align-items-center`}>
                <span className="far fa-user"></span>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

            </div>
            <button onClick={handleForgotPassword} className="btn btn-primary rounded-pill w-100 shadow-lg">Quên Mất Khẩu</button>
        </form>
        <div className="text-center fs-6">
            <Link to="/login">Quay Lại Đăng Nhập</Link> or <Link to="/register">Sign up</Link>
        </div>
    </div>
   
    </div>
  )
}

export default Forgot