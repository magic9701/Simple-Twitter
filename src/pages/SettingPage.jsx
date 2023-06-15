import styles from "styles/SettingPage.module.scss"
import { useState, useEffect } from 'react';
import InputBlock from "components/InputBlock/InputBlock";
import { PrimaryButton } from "components/Button/Button.jsx"
import { MainNav } from "components/Nav/Nav.jsx"
import Swal from 'sweetalert2';
import { getUserData, resetUserAccount } from "api/setting.js"
import { checkUserPermission } from "api/auth.js"
import { useNavigate } from "react-router-dom";

//icon引入
import greenIcon from "assets/icons/green-Icon.svg"
import redIcon from "assets/icons/red-icon.svg"


export default function SettigPage() {
  const [account, setAccount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [isError, setIsError] = useState(false)
  const navigate = useNavigate()

  useEffect (() => {
    //驗證使用者有有效token，若沒有，轉跳回login
    //驗證通過，自動填入使用者現在的資料到輸入框
    const fillInUserData = async () => {
      const token = await localStorage.getItem('token')
      const id = await localStorage.getItem('currentUserId')
      if (!token) {
        navigate('/login')
      }
      const result = await checkUserPermission(token)
      if (result) {
        const { account, email, name } = await getUserData(token, id)
        setAccount(account)
        setEmail(email)
        setName(name)
      }
    };
    fillInUserData()
  }, [navigate])

  //點擊儲存按鈕
  const handleClick = async () => {
    //前端檢查輸入內容，確定沒有指輸入空格或未輸入內容，isError代表輸入框內容有異常
    if (account.trim().length === 0 || password.trim().length === 0 || email.trim().length === 0 || isError === true) {
      //有異常跳提示框
      Swal.fire({
        position: 'top',
        title: `
          <div class="${styles["my-custom-title"]}">
            <div class="${styles["my-custom-title-text"]}">請確認輸入密碼或資訊正確！</div>
            <div class="${styles["my-custom-title-icon"]}">
              <img src="${redIcon}" alt="fail" class="${styles["my-custom-image"]}" />
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
    const token = await localStorage.getItem('token')
    const id = await localStorage.getItem('currentUserId')
    const { success, message } = await resetUserAccount(
      token,
      id,
      { account, name, email, password, checkPassword }
    )
    if (success) {
      //跳修改成功提示框
      Swal.fire({
        position: 'top',
        title: `
          <div class="${styles["my-custom-title"]}">
            <div class="${styles["my-custom-title-text"]}">修改成功！</div>
            <div class="${styles["my-custom-title-icon"]}">
              <img src="${greenIcon}" alt="success" class="${styles["my-custom-image"]}" />
            </div>
          </div>
        `,
        timer: 2000,
        showConfirmButton: false,
        customClass: {
          popup: styles['my-custom-popup'],
        }
      })
      return;
      
    } else if (!success) {
      //跳修改失敗提示框
      let returnMes = "";
      if (message.includes("Account already exist")) {
        returnMes = "這個帳號有人用過囉!";
      } else if (message.includes("Email already exist")) {
        returnMes = "這個Email有人用過囉!";
      } else {
        returnMes = "修改失敗！請再試一次!"
      }
      Swal.fire({
        position: 'top',
        title: `
          <div class="${styles["my-custom-title"]}">
            <div class="${styles["my-custom-title-text"]}">${returnMes}</div>
            <div class="${styles["my-custom-title-icon"]}">
              <img src="${redIcon}" alt="fail" class="${styles["my-custom-image"]}" />
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
  }

  return(
    <div className={`${styles.settingPageContainer} container mx-auto`}>
      <div className={styles.navContainer}>
        <MainNav></MainNav>
      </div>
      <div className={styles.pageContainer}>
        <div className={styles.headerContainer}>
          <h4>帳戶設定</h4>
        </div>
        <div className={styles.InputContainer}>
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
        </div>
        <div className={styles.saveButton}>
          <PrimaryButton onClick={handleClick}>儲存</PrimaryButton>
        </div>
      </div>
    </div>
  )
}