import React from "react";

const UserContext = React.createContext(null);

export const UserProvider = ({ children }) => {
  const [currentMember, setCurrentMember] = React.useState(null);

  // 在使用者驗證成功後，設置當前使用者
  const handleAuthentication = (userData) => {
    setCurrentMember(userData);
  };

  return (
    <UserContext.Provider value={{ currentMember, handleAuthentication }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
