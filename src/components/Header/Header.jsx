import { NavLink, useLocation } from "react-router-dom";
import styled from "../../styles/Header.module.scss";
import { device } from "../globalStyles";
import { ReactComponent as BackArrowIcon } from "../../assets/icons/back-arrow-icon.svg";
import { useUser } from "../contexts/UserContext";

export default function Header({
  headerText,
  BackArrowIcon,
  user,
  shownUserTweets,
}) {
  const { pathname } = useLocation();
  const { currentUser } = useUser();
  return (
    <div>
      {BackArrowIcon && (
        <NavLink
          to={
            pathname.includes("follow") ? `users/${user.id}/tweets` : "/tweets"
          }
        >
          <BackArrowIcon />
        </NavLink>
      )}
      <div className={user && "small"}>
        {pathname === "/tweets" && (
          <img
            className="user-avatar"
            src={currentUser.avatar}
            alt="user-avatar"
          />
        )}
        <h1>{headerText}</h1>
        <p>
          <span>{shownUserTweets?.length}</span>推文
        </p>
      </div>
    </div>
  );
}
