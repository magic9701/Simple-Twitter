import styles from "styles/Nav.module.scss";
//Icon引入
import { ReactComponent as Logo } from "assets/icons/logo-Icon.svg";
import { ReactComponent as HomepageIcon } from "assets/icons/homepage-Icon.svg";
import { ReactComponent as ProfileIcon } from "assets/icons/profile-Icon.svg";
import { ReactComponent as SettingIcon } from "assets/icons/setting-Icon.svg";
import { ReactComponent as LogoutIcon } from "assets/icons/logout-Icon.svg";
//components或 其他
import { PrimaryButton } from "components/Button/Button.jsx";
import { Link, useLocation } from 'react-router-dom';
import { useState } from "react";


//main navbar選項的內容
const mainNavItems = [
  { icon: HomepageIcon, name: "首頁", route: "/main" },
  { icon: ProfileIcon, name: "個人資料", route: "/:UserId" },
  { icon: SettingIcon, name: "設定", route: "/setting" },
];

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
  return (
    <div className={styles.navContainer}>
      <Link to="/main"><Logo className={styles.logo} /></Link>
      {mainNavItems.map((item, index) => (
        <NavItem key={index} icon={item.icon} name={item.name} route={item.route} />
      ))}
      <PrimaryButton>推文</PrimaryButton>
      <div className={styles.logoutContainer}>
        <Link to="/login">
          <div className={`${styles.navItem} ${styles.logout} cursor-point`}>
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
  return (
    <div className={styles.navContainer}>
      <Link to="/main"><Logo className={styles.logo} /></Link>
      {adminNavItems.map((item, index) => (
        <NavItem key={index} icon={item.icon} name={item.name} route={item.route} />
      ))}
      <div className={styles.logoutContainer}>
        <Link to="/login">
          <div className={`${styles.navItem} ${styles.logout} cursor-point`}>
            <LogoutIcon />
            <h5 className={styles.itemName}>登出</h5>
          </div>
        </Link>
      </div>
    </div>
  );
}