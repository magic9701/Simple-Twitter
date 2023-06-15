import styles from "styles/AdminTweetCard.module.scss"
import {adminDeleteTweet} from "api/admin.js"
import Swal from 'sweetalert2';

//icon引入
import greenIcon from "assets/icons/green-Icon.svg"
import redIcon from "assets/icons/red-icon.svg"
import defaultAvatar from "assets/icons/default-avatar.svg";
import { ReactComponent as Cross } from "assets/icons/cross-gray.svg";

export default function AdminTweetCard( {tweetInfo} ) {
  const { id, createdAt, description } = tweetInfo
  const { avatar, name, account } = tweetInfo.User

  //只顯示前50個字
  const fiftyWords = description.slice(0, 50)

  //距今多久的發文，時間轉換
  const createdAtTime = new Date(createdAt);
  const currentTime = new Date();
  const timeDiff = currentTime.getTime() - createdAtTime.getTime();
  const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
  const secondsDiff = Math.floor(timeDiff / 1000);
  let timeAgo = ""

  if (secondsDiff < 60) {
    timeAgo = `${secondsDiff} 秒前`;
  } else if (secondsDiff < 3600) {
    const minutesDiff = Math.floor(secondsDiff / 60);
    timeAgo = `${minutesDiff} 分钟前`;
  } else if (hoursDiff >= 24) {
    timeAgo = `${Math.floor(hoursDiff / 24)} 天前`;
  } else {
    timeAgo = `${hoursDiff} 小时前`;
  }

  //刪除功能
  const handleDelete = async () => {
    const adminToken = localStorage.getItem("adminToken");
    const deleteFunction = async () => {
      const { success } = await adminDeleteTweet(adminToken, id)
        if (success) {
        //顯示刪除成功
        Swal.fire({
          position: 'top',
          title: `
            <div class="${styles["my-custom-title"]}">
              <div class="${styles["my-custom-title-text"]}">刪除貼文成功!</div>
              <div class="${styles["my-custom-title-icon"]}">
                <img src="${greenIcon}" alt="success" class="${styles["my-custom-image"]}" />
              </div>
            </div>
          `,
          timer: 1500,
          showConfirmButton: false,
          customClass: {
            popup: styles['my-custom-popup'],
          }
        })
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }if (!success) {
        //顯示刪除失敗
        Swal.fire({
          position: 'top',
          title: `
            <div class="${styles["my-custom-title"]}">
              <div class="${styles["my-custom-title-text"]}">刪除貼文失敗!</div>
              <div class="${styles["my-custom-title-icon"]}">
                <img src="${redIcon}" alt="fail" class="${styles["my-custom-image"]}" />
              </div>
            </div>
          `,
          timer: 1500,
          showConfirmButton: false,
          customClass: {
            popup: styles['my-custom-popup'],
          }
        })
      }
    }

    Swal.fire({
      title: `<span class="${styles["my-custom-buttonTitle"]}">確定要刪除推文嗎?</span>`,
      showDenyButton: true,
      confirmButtonText: `<span class="${styles["my-custom-buttonConfirm"]}">刪除</span>`,
      denyButtonText: `<span class="${styles["my-custom-buttonDeny"]}">取消</span>`,
      denyButtonColor: "#E6ECF0",
      confirmButtonColor: "#FF6600",
    }).then((result) => {
      if (result.isConfirmed) {
          deleteFunction()
        }else if (result.isDenied) {

        }
      })
  } 

  return (
    <div className={styles.tweetCardContainer}>
      <div className={styles.avatarContainer}>
        {/* avatar自訂或預設 */}
        {avatar !== null ? (
          <img className={styles.userAvatart} src={avatar} alt="userAvatar" />
        ) : (
          <img className={styles.userAvatartDefault}src={defaultAvatar} alt="defaultAvatar" />
        )}
      </div>
      <div className={styles.information}>
        <div className={styles.topInfo}>
          <h6 className={styles.name}>{name}</h6>
          <h6 className={styles.userId}>{`@${account}・${timeAgo}`}</h6>
          <div className="cursor-point" onClick={handleDelete}>
            <Cross className={styles.cross}></Cross>
          </div>
        </div>
        <div className={styles.botInfo}>
          {fiftyWords}
        </div>
      </div>
    </div>
  )
}