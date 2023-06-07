import styles from "styles/Button.module.scss"

export function PrimaryButton({ onClick, children,}) {
  return (
    <button className={`cursor-point`} onClick={onClick}>
      {children}
    </button>
  )
}

export function SecondaryButton({ onClick, children,}) {
  return (
    <button className={`cursor-point ${styles.secondaryButton}`} onClick={onClick}>
      {children}
    </button>
  )
}

export function NotActiveButton({ onClick, children,}) {
  return (
    <button className={`cursor-point ${styles.notActiveButton}`} onClick={onClick}>
      {children}
    </button>
  )
}

