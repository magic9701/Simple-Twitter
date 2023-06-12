import "styles/base.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPage from "pages/AdminPage";
import LoginPage from "pages/LoginPage";
import RegistPage from "pages/RegistPage";
import SettingPage from "pages/SettingPage";
import AdminMainPage from "pages/AdminMainPage";
import AdminUserPage from "pages/AdminUserPage";
import MainPage from "pages/MainPage";

// import React, { useState } from "react";
// import Button from "../src/components/Modal/test";
// import Modal from "../src/components/Modal/TweetModal";

// const App = () => {
//   const [modalOpen, setModalOpen] = useState(false);

//   const openModal = () => {
//     setModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//   };

//   return (
//     <div>
//       <Button onClick={openModal} />
//       <Modal isOpen={modalOpen} onClose={closeModal} />
//     </div>
//   );
// };

// export default App;

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="admin" element={<AdminPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="regist" element={<RegistPage />} />
          <Route path="setting" element={<SettingPage />} />
          <Route path="admin/adminMain" element={<AdminMainPage />} />
          <Route path="admin/adminUser" element={<AdminUserPage />} />
          <Route path="main" element={<MainPage />} />
          <Route path="*" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
