import styles from "styles/LoginPage.module.scss"
import { ReactComponent as Logo } from "assets/icons/logo-Icon.svg";
import { Link, useNavigate } from "react-router-dom";
import { PrimaryButton } from "components/Button/Button";
import InputBlock from "components/InputBlock/InputBlock";
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { register, checkUserPermission } from "api/auth.js"

//icon
import redIcon from "assets/icons/red-icon.svg"
import greenIcon from "assets/icons/green-Icon.svg"

export default function RegistPage() {
  const [account, setAccount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [isError, setIsError] = useState(false)
  const navigate = useNavigate()

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
      if (isError === true) {
        Swal.fire({
          position: 'top',
          title: `
            <div class="${styles["my-custom-title"]}">
              <div class="${styles["my-custom-title-text"]}">請檢查輸入內容！</div>
              <div class="${styles["my-custom-title-icon"]}">
                <img src="${redIcon}" alt="cross" class="${styles["my-custom-image"]}" />
              </div>
            </div>
          `,
          timer: 3000,
          showConfirmButton: false,
          customClass: {
            popup: styles['my-custom-popup'],
          }
        })
        return;
      }
      if (account.length === 0 || name.length === 0 || password.length === 0 || email.length === 0 ) {
        Swal.fire({
          position: 'top',
          title: `
            <div class="${styles["my-custom-title"]}">
              <div class="${styles["my-custom-title-text"]}">所有欄位都是必填！</div>
              <div class="${styles["my-custom-title-icon"]}">
                <img src="${redIcon}" alt="cross" class="${styles["my-custom-image"]}" />
              </div>
            </div>
          `,
          timer: 3000,
          showConfirmButton: false,
          customClass: {
            popup: styles['my-custom-popup'],
          }
        })
        return;
      }
      if (password !== checkPassword) {
        Swal.fire({
          position: 'top',
          title: `
            <div class="${styles["my-custom-title"]}">
              <div class="${styles["my-custom-title-text"]}">密碼與確認密碼不相符！</div>
              <div class="${styles["my-custom-title-icon"]}">
                <img src="${redIcon}" alt="cross" class="${styles["my-custom-image"]}" />
              </div>
            </div>
          `,
          timer: 3000,
          showConfirmButton: false,
          customClass: {
            popup: styles['my-custom-popup'],
          }
        })
        return;
      }if (password.length < 8) {
        Swal.fire({
          position: 'top',
          title: `
            <div class="${styles["my-custom-title"]}">
              <div class="${styles["my-custom-title-text"]}">密碼最少須8個字!</div>
              <div class="${styles["my-custom-title-icon"]}">
                <img src="${redIcon}" alt="cross" class="${styles["my-custom-image"]}" />
              </div>
            </div>
          `,
          timer: 3000,
          showConfirmButton: false,
          customClass: {
            popup: styles['my-custom-popup'],
          }
        })
        return;
      }
    
    const { success, message } = await register({
      account,
      name,
      email,
      password,
      checkPassword,
    });

    if (success) {
    //註冊成功提示框
      Swal.fire({
        position: 'top',
        title: `
          <div class="${styles["my-custom-title"]}">
            <div class="${styles["my-custom-title-text"]}">註冊成功！</div>
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
      navigate('/login')
      return;
    } else if (!success) {
      let showMessage = ""
      if (message.includes('This account has already been registered')) {
        showMessage = "account已重複註冊"
      } else if (message.includes('Email has already been registered')) {
        showMessage = "email已重複註冊"
      }
      //註冊失敗提示框
      Swal.fire({
        position: 'top',
        title: `
            <div class="${styles["my-custom-title"]}">
              <div class="${styles["my-custom-title-text"]}">${showMessage}！</div>
              <div class="${styles["my-custom-title-icon"]}">
                <img src="${redIcon}" alt="cross" class="${styles["my-custom-image"]}" />
              </div>
            </div>
          `,
        timer: 2500,
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
          <h3>建立你的帳號</h3>
          <form className={styles.formContainer}>
            <InputBlock 
              label="帳號"
              placeholder="請輸入帳號"
              value={account}
              onChange = {(accountInputValue) => setAccount(accountInputValue)}
              maxLength="50"
              needErrorMessage="true"
              setIsError={setIsError}
            />
            <InputBlock 
              label="名稱"
              placeholder="請輸入名稱"
              value={name}
              onChange = {(nameInputValue) => setName(nameInputValue)}
              maxLength="50"
              needErrorMessage="true"
              setIsError={setIsError}
            />
            <InputBlock 
              label="Email"
              placeholder="請輸入Email"
              value={email}
              onChange = {(emailInputValue) => setEmail(emailInputValue)}
              maxLength="100"
              needErrorMessage="true"
              setIsError={setIsError}
            />
            <InputBlock 
              label="密碼"
              placeholder="請輸入密碼"
              value={password}
              type="password"
              onChange={(passwordInputValue) => setPassword(passwordInputValue)}
              maxLength="20"
              needErrorMessage="true"
              setIsError={setIsError}
            />
            <InputBlock 
              label="密碼確認"
              placeholder="請再次輸入密碼"
              value={checkPassword}
              type="password"
              onChange={(passwordInputValue) => setCheckPassword(passwordInputValue)}
              maxLength="20"
              needErrorMessage="true"
              setIsError={setIsError}
            />
          </form>
          <PrimaryButton onClick={handleClick}>註冊</PrimaryButton>
          <div className={styles.aContainer} style={{justifyContent: "center"}}>
            <Link to="/login"><span className={styles.aLink}>取消</span></Link>
          </div>
        </div>
      </div>
    </div>
  )
}