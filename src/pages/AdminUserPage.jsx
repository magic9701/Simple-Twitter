import styles from "styles/AdminUserPage.module.scss"
import { AdminNav } from "components/Nav/Nav.jsx"
import AdminUserCard from "components/AdminUserCard/AdminUserCard.jsx"
import { useNavigate } from 'react-router-dom';
import { checkAdminPermission } from 'api/auth';
import { useEffect, useState } from "react";
import { adminGetUserList } from "api/admin.js"


export default function AdminUserPage() {
  const navigate = useNavigate();
  const [listOfUser, setListOfUser] = useState(null)

  useEffect(() => {
    //確認管理者登入、token合法
    const checkTokenIsValid = async () => {
      const adminToken = localStorage.getItem("adminToken");
      if (!adminToken) {
        navigate("/admin");
      }
      const result = await checkAdminPermission(adminToken);
      if (!result) {
        navigate("/admin");
      }
      if (result) {
        // 取得用戶資料清單
        const {userList} = await adminGetUserList(adminToken)
        if (userList) {
          setListOfUser(userList)
        } else {
          console.log("No user data available");
        }
      }
    };
    checkTokenIsValid();
  }, [navigate]);

  return(
    <div className={`${styles.adminPageContainer} container mx-auto`}>
      <div className={styles.navContainer}>
        <AdminNav />
      </div>
      <div className={styles.pageContainer}>
        <div className={styles.headerContainer}>
          <h4>使用者列表</h4>
        </div>
        <div className={styles.scrollContainer}>
          <div className={styles.UserCardContainer}>
            {listOfUser &&
              listOfUser.map((user) => (
                <AdminUserCard key={user.id} user={user} />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}