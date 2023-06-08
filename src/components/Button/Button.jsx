import styles from "styles/Button.module.scss"

// 登入、註冊、Nav推文、setting儲存
export function PrimaryButton({ onClick, children,}) {
  return (
    <button className={`cursor-point`} onClick={onClick}>
      {children}
    </button>
  )
}

//MainPage、PostModule推文、ReplyModal回覆、UserInfoModal儲存
export function SecondaryButton({ onClick, children,}) {
  return (
    <button className={`cursor-point ${styles.secondaryButton}`} onClick={onClick}>
      {children}
    </button>
  )
}

//未跟隨、編輯個人資料
export function NotActiveButton({ onClick, children,}) {
  return (
    <button className={`cursor-point ${styles.notActiveButton}`} onClick={onClick}>
      {children}
    </button>
  )
}

