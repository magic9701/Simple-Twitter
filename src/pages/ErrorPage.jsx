import styles from "styles/ErrorPage.module.scss"
import { Link } from "react-router-dom";
import {PrimaryButton} from "components/Button/Button.jsx"
import logo from "assets/icons/logo-Icon.svg"
import cat from "assets/icons/catShockPhoto.svg"

export default function ErrorPage() {
  return(
    <div className="container mx-auto">
      <div className={styles.logo}>
        <img src={logo} alt="logo"></img>
      </div>
      <div className={styles.title}>
        <h1>你輸入的頁面不存在</h1>
      </div>
      <div className={styles.catContainer}>
        <img src={cat} alt="cat"></img>
      </div>
      <div className={styles.buttonContainer}>
        <Link to="/login"><div className={styles.buttonOne}><PrimaryButton>回到登入頁面</PrimaryButton></div></Link>
        <Link to="/main"><div className={styles.buttonTwo}><PrimaryButton>回到首頁</PrimaryButton></div></Link>
      </div>
    </div>
  )
}