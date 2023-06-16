import { useState, useEffect } from "react";
import styles from "../../styles/UserInput.module.scss";

export default function UserInput({
  label,
  placeholder,
  value,
  onChange,
  maxLength,
  setIsError,
  textareaHeight,
}) {
  const [errorMessage, setErrorMessage] = useState("");
  // 檢查 name 輸入內容是否符合要求，若不符合顯示 errorMessage
  const checkName = () => {
    if (value && value.length > maxLength) {
      setErrorMessage(`姓名不能超過 ${maxLength} 個字元！`);
    } else {
      setErrorMessage("");
    }
  };

  // 檢查 description 輸入內容是否符合要求
  const checkDescription = () => {
    if (value && value.length > maxLength) {
      setErrorMessage(`自我介紹不能超過 ${maxLength} 個字元！`);
    } else if (!value || value.trim() === "") {
      setErrorMessage("請輸入自我介紹內容！");
    } else {
      setErrorMessage("");
    }
  };
  useEffect(() => {
    if (label === "名稱") {
      checkName();
    } else if (label === "自我介紹") {
      checkDescription();
    }
  }, [value, label]);

  useEffect(() => {
    setIsError(errorMessage !== "");
  }, [errorMessage]);

  return (
    <div>
      <div className={styles.inputBlockContainer}>
        <label className={styles.inputLabel} htmlFor={label}>
          {label}
        </label>
        <textarea
          className={`${styles.inputBlock} ${
            errorMessage !== "" ? styles.danger : ""
          }`}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          id={label}
          style={{ height: textareaHeight }}
        />
      </div>
      <div className={`${styles.message} small-text-medium`}>
        <div
          className={`${styles.leftMessage} ${
            errorMessage !== "" ? styles.danger : ""
          }`}
        >
          {errorMessage}
        </div>
        <div
          className={`${styles.rightMessage} ${
            errorMessage !== "" ? styles.danger : ""
          }`}
        >
          {value ? `${value.length}/${maxLength}` : ""}
        </div>
      </div>
    </div>
  );
}
