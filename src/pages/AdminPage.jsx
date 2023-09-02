import styles from "styles/LoginPage.module.scss"
import { ReactComponent as Logo } from "assets/icons/logo-Icon.svg";
import { Link, useNavigate } from "react-router-dom";
import { PrimaryButton } from "components/Button/Button";
import InputBlock from "components/InputBlock/InputBlock";
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { adminLogin, checkAdminPermission } from "api/admin"
//icon引入
import greenIcon from "assets/icons/green-Icon.svg"
import redIcon from "assets/icons/red-icon.svg"

export default function AdminPage() {
  const [ account, setAccount ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ isError, setIsError ] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const checkTokenIsValid = async () => {
      const adminToken = localStorage.getItem('adminToken');
      if (!adminToken) {
        return;
      }
      const result = await checkAdminPermission(adminToken);
      if (result) {
        navigate('/admin/adminMain');
      }
    };

    checkTokenIsValid();
  }, [navigate]);

  //點擊登入按鈕
  const handleClick = async () => {
    if (account.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    const { success, adminToken, message } = await adminLogin({
      account,password
    })

    if (success) {
      localStorage.setItem('adminToken', adminToken)
      
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
      navigate('/admin/adminMain')
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
          <h3>後台登入</h3>
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
            <Link to="/login"><span className={styles.aLink}>前台登入</span></Link>
          </div>
        </div>
      </div>
    </div>
  )
}