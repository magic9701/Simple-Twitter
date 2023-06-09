import { useState, useEffect } from "react";
import styles from "styles/InputBlock.module.scss"

export default function InputBlock({ label, placeholder, value, type, onChange, maxLength, setIsError,inputHeight }) {
  const [errorMessage, setErrorMessage] = useState("")
  
  //檢查account輸入內容是否符合要求，若不符合顯示errorMessage
  const checkAccount = () => {
    const accountRegex = /^[a-zA-Z0-9]+$/;

    if (value.length > 50) {
      setErrorMessage("字數上限50字！")
    }else if (value.length > 0 && !accountRegex.test(value)) {
      setErrorMessage("只能使用英文字母、數字！")
    }else {
      setErrorMessage("");
    }
  }

  //檢查password輸入內容是否符合要求
  const checkPassword = () => {
    if (value.length > 20) {
      setErrorMessage("字數上限20字！")
    }else if (value.includes(" ")) {
      setErrorMessage("不可使用空格！")
    }else{
      setErrorMessage("");
    }
  }

  //檢查name
  const checkName = () => {
    if (value.length > 50) {
      setErrorMessage("字數上限50字！")
    }else {
      setErrorMessage("");
    }
  }

  //檢查description
  const checkDescription = () => {
    const whitespaceRegex = /^\s*$/;

    if (value.length > 160) {
      setErrorMessage("字數超出上限！")
    }else if (whitespaceRegex.test(value) && value.length !== 0) {
      setErrorMessage("請輸入內容！")
    }else {
      setErrorMessage("");
    }
  }

  useEffect(() => {
    if (label === "帳號") {
      checkAccount();
    }else if (label === "密碼") {
      checkPassword();
    }else if (label === "名稱") {
      checkName()
    }else if (label === "自我介紹") {
      checkDescription()
    }
  }, [value, label]);


  //若errorMessage存在，setIsError為true，父層設定 const [isError, setIsError] = useState(false)
  //如果isError === true就執行防止表單送出
  useEffect(() => {
    if (errorMessage !== "") {
      setIsError(true)
    } else {
      setIsError(false)
    }
  }, [errorMessage])


  return (
    <div>
      <div className={styles.inputBlockContainer}>
        <label className={styles.inputLabel} for={label}>{label}</label>
        {/* ${styles.danger} */}
        <input className={`${styles.inputBlock} ${errorMessage !== "" ? styles.danger : ""}`}
          type={type || 'text'} 
          placeholder={placeholder || ''} 
          value={value || ''}
          onChange={(e) => onChange?.(e.target.value)}
          id={label}
          style={{ height: inputHeight }}
        />
      </div>
      <div className={`${styles.message} small-text-medium`}>
        {/* ${styles.danger} */}
        <div className={`${styles.leftMessage} ${errorMessage !== "" ? styles.danger : ""}`}>
          {errorMessage}
        </div>
        {/* ${styles.danger} */}
        <div className={`${styles.rightMessage} ${errorMessage !== "" ? styles.danger : ""}`}>
          {value.length}/{maxLength}
        </div>
      </div>
    </div>
  );
}