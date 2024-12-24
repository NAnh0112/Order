import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import styles from './Login.module.css'; 
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === "admin" && password === "1234") {
      localStorage.setItem('isAdmin', 'true'); 
      navigate("/admin/adminmenu"); // Điều hướng đến adminmenu
    } else {
      navigate("./tan"); 
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.title}>Đăng Nhập</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="username"> Tên đăng nhập: </label>
        <input type="text"  id="username"  className={styles.input}  value={username}  onChange={(e) => setUsername(e.target.value)}  required/>
        <label className={styles.label} htmlFor="password">  Mật khẩu: </label>
        <input type="password" id="password" className={styles.input}  value={password}  onChange={(e) => setPassword(e.target.value)}   required/> 
        <button type="submit" className={styles.button}> Đăng Nhập </button>
      </form>
    </div>
  );
};

export default Login;
