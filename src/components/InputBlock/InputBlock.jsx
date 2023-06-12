import { useState, useEffect } from "react";
import styles from "styles/InputBlock.module.scss"


//需要設定InputBlock height請輸入inputHeight
//需要下方出現紅字提示(如字數限制50字) 請輸入needErrorMessage="true"
  //並且需要輸入maxLength(輸入內容總長限制)
export default function InputBlock({ label, placeholder, value, type, onChange, maxLength, setIsError ,inputHeight, needErrorMessage }) {
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
    const whitespaceRegex = /^\s*$/;

    if (value.length > 50) {
      setErrorMessage("字數上限50字！")
    }else if (whitespaceRegex.test(value) && value.length !== 0) {
      setErrorMessage("請輸入內容！")
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
    }else if (label === "密碼" || label === "密碼確認") {
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
        <label className={styles.inputLabel} htmlFor={label}>{label}</label>
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
        <div className={`${styles.leftMessage} ${errorMessage !== "" ? styles.danger : ""}`}>
          { needErrorMessage && errorMessage }
        </div>
        <div className={`${styles.rightMessage} ${errorMessage !== "" ? styles.danger : ""}`}>
          { needErrorMessage && value.length}{ needErrorMessage && "/" }{ needErrorMessage && maxLength}
        </div>
      </div>
    </div>
  );
}