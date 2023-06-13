import React, { useState, useEffect } from "react";
import styles from "../../styles/TweetInput.module.scss";

export default function TweetInput({
  placeholder,
  value,
  onChange,
  maxLength,
  setIsError,
  textareaHeight,
}) {
  const [errorMessage, setErrorMessage] = useState("");

  // 檢查輸入內容是否符合要求，若不符合顯示 errorMessage
  const checkInput = () => {
    if (value.length > maxLength) {
      setErrorMessage(`輸入不可超過${maxLength}個字！`);
    } else {
      setErrorMessage("");
    }
  };

  useEffect(() => {
    checkInput();
  }, [value]);

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
        <textarea
          className={`${styles.inputBlock} ${
            errorMessage !== "" ? styles.danger : ""
          }`}
          type="text"
          placeholder={placeholder || ""}
          value={value || ""}
          onChange={(e) => onChange?.(e.target.value)}
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
        ></div>
      </div>
    </div>
  );
}
