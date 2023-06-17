import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

//scss
import styles from "styles/Nav.module.scss";

//svg
import { ReactComponent as Logo } from "assets/icons/logo-Icon.svg";
import { ReactComponent as HomepageIcon } from "assets/icons/homepage-Icon.svg";
import { ReactComponent as ProfileIcon } from "assets/icons/profile-Icon.svg";
import { ReactComponent as SettingIcon } from "assets/icons/setting-Icon.svg";
import { ReactComponent as LogoutIcon } from "assets/icons/logout-Icon.svg";

//components
import { PrimaryButton } from "components/Button/Button.jsx";
import TweetModal from "components/Modal/TweetModal.jsx"

//api
import { getUserData } from "api/setting.js"
import { checkUserPermission } from "api/auth.js"


//admin navbar選項的內容
const adminNavItems = [
  { icon: HomepageIcon, name: "推文清單", route: "/admin/adminMain" },
  { icon: ProfileIcon, name: "使用者列表", route: "/admin/adminUser" },
];

//Nav的選項
const NavItem = ({ icon: Icon, name, route }) => {
  const location = useLocation();
  const [isActive, setIsActive] = useState(location.pathname === route);

  return (
    <Link to={route}>
      <div
        className={`${styles.navItem} cursor-point ${
          isActive ? styles.activeNavItem : ""
        }`}
        onClick={() => setIsActive(true)}
      >
        <Icon className={`${styles.icon} ${isActive ? styles.activeIcon : ""}`} />
        <h5 className={styles.itemName}>{name}</h5>
      </div>
    </Link>
  );
};



//Main Navbar
export function MainNav() {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('currentUserAccount'));
  const navigate = useNavigate();
  const location = useLocation();
  const [isActiveHome, setIsActiveHome] = useState(location.pathname === "/main");
  const [isActiveUser, setIsActiveUser] = useState(location.pathname === `/user/${currentUser}`);
  const [isActiveSetting, setIsActiveSetting] = useState(location.pathname === "/setting");
  const [userAvatar, setUserAvatar] = useState('')
  const [userAccount, setUserAccount] = useState('')

  useEffect(() => {
    setCurrentUser(localStorage.getItem('currentUserAccount'));
  }, [navigate]);

  // 登出功能
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUserId');
    localStorage.removeItem('currentUserAccount');
    navigate('/login');
  };

  //點擊推文按鈕，獲得使用者頭貼
  const getAvatar = async () => {
    try {
      const token = localStorage.getItem('token');
      const id = localStorage.getItem('currentUserId');
      const Account = localStorage.getItem('currentUserAccount');
      setUserAccount(Account);
      if (!token) {
        navigate('/login');
      }
      const result = await checkUserPermission(token);
      if (result) {
        const { avatar } = await getUserData(token, id);
        if (avatar) {
          setUserAvatar(avatar);
        }
      }
    } catch (error) {
      console.error('Error occurred while getting avatar:', error);
    }
  };

  //推文功能
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = (event) => {
    if (event.target === event.currentTarget) {
      setModalOpen(false);
    }
  };
  const handleTweetPost= () => {
    openModal();
    getAvatar();
  };

  return (
    <div className={styles.navContainer}>
      <Link to="/main"><Logo className={styles.logo} /></Link>

      {/* 首頁 */}
      <Link to="/main">
        <div
          className={`${styles.navItem} cursor-point ${
            isActiveHome ? styles.activeNavItem : ""
          }`}
          onClick={() => setIsActiveHome(true)}
        >
          <HomepageIcon className={`${styles.icon} ${isActiveHome ? styles.activeIcon : ""}`} />
          <h5 className={styles.itemName}>首頁</h5>
        </div>
      </Link>

      {/* 個人頁面 */}
      <Link to={`/user/${currentUser}`}>
        <div
          className={`${styles.navItem} cursor-point ${
            isActiveUser ? styles.activeNavItem : ""
          }`}
          onClick={() => setIsActiveUser(true)}
        >
          <ProfileIcon className={`${styles.icon} ${isActiveUser ? styles.activeIcon : ""}`} />
          <h5 className={styles.itemName}>個人資料</h5>
        </div>
      </Link>

      {/* 設定頁面 */}
      <Link to="/setting">
        <div
          className={`${styles.navItem} cursor-point ${
            isActiveSetting ? styles.activeNavItem : ""
          }`}
          onClick={() => setIsActiveSetting(true)}
        >
          <SettingIcon className={`${styles.icon} ${isActiveSetting ? styles.activeIcon : ""}`} />
          <h5 className={styles.itemName}>設定</h5>
        </div>
      </Link>

      <PrimaryButton onClick={handleTweetPost}>推文</PrimaryButton>
      <TweetModal isOpen={modalOpen} onClose={closeModal} setModalOpen={setModalOpen} userAvatar={userAvatar} userAccount={userAccount}/>
      <div className={styles.logoutContainer}>
        <Link to="/login">
          <div className={`${styles.navItem} ${styles.logout} cursor-point`} onClick={handleLogout}>
            <LogoutIcon />
            <h5 className={styles.itemName}>登出</h5>
          </div>
        </Link>
      </div>
    </div>
  );
}

//Admin Navbar
export function AdminNav() {
  const navigate = useNavigate()

  //登出功能
  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    navigate('/admin')
  }

  return (
    <div className={styles.navContainer}>
      <Link to="/main"><Logo className={styles.logo} /></Link>
      {adminNavItems.map((item, index) => (
        <NavItem key={index} icon={item.icon} name={item.name} route={item.route} />
      ))}
      <div className={styles.logoutContainer}>
        <Link to="/admin">
          <div className={`${styles.navItem} ${styles.logout} cursor-point`} onClick={handleLogout}>
            <LogoutIcon />
            <h5 className={styles.itemName}>登出</h5>
          </div>
        </Link>
      </div>
    </div>
  );
}