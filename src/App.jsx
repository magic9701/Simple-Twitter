import "styles/base.scss";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminPage from "pages/AdminPage";
import LoginPage from "pages/LoginPage";
import RegistPage from "pages/RegistPage";
import SettingPage from "pages/SettingPage";
import AdminMainPage from "pages/AdminMainPage";
import AdminUserPage from "pages/AdminUserPage";
import MainPage from "pages/MainPage";
import UserPage from "pages/UserPage";
import ErrorPage from "pages/ErrorPage";
import PostPage from "pages/PostPage";
import FollowingPage from "pages/FollowingPage";
import FollowerPage from "pages/FollowerPage";
import UserReplyPage from "pages/UserReplyPage";
import UserLikePage from "pages/UserLikePage";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="admin" element={<AdminPage />} />
            <Route path="admin/adminMain" element={<AdminMainPage />} />
            <Route path="admin/adminUser" element={<AdminUserPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="regist" element={<RegistPage />} />
            <Route path="setting" element={<SettingPage />} />
            <Route path="main" element={<MainPage />} />
            <Route path="user/:userAccount" element={<UserPage />} />
            <Route path="user/:userAccount/following" element={<FollowingPage />} />
            <Route path="user/:userAccount/follower" element={<FollowerPage />} />
            <Route path="user/:userAccount/userReply" element={<UserReplyPage />} />
            <Route path="user/:userAccount/userLike" element={<UserLikePage />} />
            <Route path="user/:userAccount/post/:postId" element={<PostPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>`
      </BrowserRouter>
    </div>
  );
}

export default App;
