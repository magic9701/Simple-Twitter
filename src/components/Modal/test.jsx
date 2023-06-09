import React from "react";
import styles from "../../styles/Button.module.scss";

const Button = ({ onClick }) => {
  return (
    <button className={styles.secondaryButton} onClick={onClick}>
      打開
    </button>
  );
};

export default Button;
