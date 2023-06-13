import styles from "styles/LoginPage.module.scss"
import { ReactComponent as Logo } from "assets/icons/logo-Icon.svg";
import { Link, useNavigate } from "react-router-dom";
import { PrimaryButton } from "components/Button/Button";
import InputBlock from "components/InputBlock/InputBlock";
import { useState, useEffect } from 'react';
import { login, checkUserPermission } from "api/auth.js"
import Swal from 'sweetalert2';


//icon引入
import greenIcon from "assets/icons/green-Icon.svg"
import redIcon from "assets/icons/red-icon.svg"

//登入頁面
export default function LoginPage() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false)
  const navigate = useNavigate()
  
  useEffect (() => {
    console.log(isError)
  },[isError])

  useEffect(() => {
    const checkUserTokenIsValid = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const result = await checkUserPermission(token);
      if (result) {
        navigate('/main');
      }
    };

    checkUserTokenIsValid();
  }, [navigate]);

  const handleClick = async () => {
    if (account.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    const { success, token, currentUserId, currentUserAccount , message } = await login({
      account,password
    })

    if (success) {
      localStorage.setItem('token', token)
      localStorage.setItem('currentUserId', currentUserId)
      localStorage.setItem('currentUserAccount', currentUserAccount)
      //登入成功提示框
      Swal.fire({
        position: 'top',
        title: `
          <div class="${styles["my-custom-title"]}">
            <div class="${styles["my-custom-title-text"]}">登入成功！</div>
            <div class="${styles["my-custom-title-icon"]}">
              <img src="${greenIcon}" alt="Success" class="${styles["my-custom-image"]}" />
            </div>
          </div>
        `,
        timer: 1000,
        showConfirmButton: false,
        customClass: {
          popup: styles['my-custom-popup'],
        }
      })
      navigate('/main')
      return;
    } else if (!success) {
      //登入失敗提示框
      Swal.fire({
        position: 'top',
        title: `
            <div class="${styles["my-custom-title"]}">
              <div class="${styles["my-custom-title-text"]}">${message === "Not a valid account" ? "帳號不存在" : message}！</div>
              <div class="${styles["my-custom-title-icon"]}">
                <img src="${redIcon}" alt="cross" class="${styles["my-custom-image"]}" />
              </div>
            </div>
          `,
        timer: 1000,
        showConfirmButton: false,
        customClass: {
          popup: styles['my-custom-popup'],
        }
      });
    }
  }


  return(
    <div className="container mx-auto">
      <div className={`${styles.loginDiv} mx-auto`}>
        <div className={`${styles.loginContainer}`}>
          <Link to="/main"><Logo className={styles.logo} /></Link>
          <h3>登入 Alphitter</h3>
          <form className={styles.formContainer}>
            <InputBlock 
              label="帳號"
              placeholder="請輸入帳號"
              value={account}
              onChange = {(accountInputValue) => setAccount(accountInputValue)}
              setIsError={setIsError}
            />
            <InputBlock 
              label="密碼"
              placeholder="請輸入密碼"
              value={password}
              type="password"
              onChange={(passwordInputValue) => setPassword(passwordInputValue)}
              setIsError={setIsError}
            />
          </form>
          <PrimaryButton onClick={handleClick}>登入</PrimaryButton>
          <div className={styles.aContainer}>
            <Link to="/regist"><span className={styles.aLink}>註冊</span></Link>
            <div>・</div>
            <Link to="/admin"><span className={styles.aLink}>後台登入</span></Link>
          </div>
        </div>
      </div>
    </div>
  )
}