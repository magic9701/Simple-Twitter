<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import styles from "../../styles/TweetInput.module.scss";

export default function TweetInput({
=======
import { useState, useEffect } from "react";
import styles from "../../styles/TweetInput.module.scss";

export default function InputBlock({
  label,
>>>>>>> main
  placeholder,
  value,
  onChange,
  maxLength,
  setIsError,
  textareaHeight,
}) {
  const [errorMessage, setErrorMessage] = useState("");

<<<<<<< HEAD
  // 檢查輸入內容是否符合要求，若不符合顯示 errorMessage
  const checkInput = () => {
    if (value.length > maxLength) {
      setErrorMessage(`輸入不可超過${maxLength}個字！`);
=======
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
>>>>>>> main
    } else {
      setErrorMessage("");
    }
  };

  useEffect(() => {
<<<<<<< HEAD
    checkInput();
  }, [value]);
=======
    if (label === "名稱") {
      checkName();
    } else if (label === "自我介紹") {
      checkDescription();
    }
  }, [value, label]);
>>>>>>> main

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
<<<<<<< HEAD
=======
        <label className={styles.inputLabel} htmlFor={label}>
          {label}
        </label>
>>>>>>> main
        <textarea
          className={`${styles.inputBlock} ${
            errorMessage !== "" ? styles.danger : ""
          }`}
          type="text"
          placeholder={placeholder || ""}
          value={value || ""}
          onChange={(e) => onChange?.(e.target.value)}
<<<<<<< HEAD
=======
          id={label}
>>>>>>> main
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
<<<<<<< HEAD
        ></div>
=======
        >
          {value.length}/{maxLength}
        </div>
>>>>>>> main
      </div>
    </div>
  );
}
