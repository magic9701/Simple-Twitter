import { useState, useEffect } from "react";
import styles from "../../styles/UserInput.module.scss";

export default function InputBlock({
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
    if (value.length > maxLength) {
      setErrorMessage(`姓名不能超过${maxLength}个字符！`);
    } else {
      setErrorMessage("");
    }
  };

  // 檢查 description 輸入內容是否符合要求
  const checkDescription = () => {
    if (value.length > maxLength) {
      setErrorMessage(`自我介绍不能超过${maxLength}个字符！`);
    } else if (value.trim() === " ") {
      setErrorMessage("请输入自我介绍内容！");
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
    if (errorMessage !== "") {
      setIsError(true);
    } else {
      setIsError(false);
    }
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
          placeholder={placeholder || ""}
          value={value || ""}
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
          {value.length}/{maxLength}
        </div>
      </div>
    </div>
  );
}
