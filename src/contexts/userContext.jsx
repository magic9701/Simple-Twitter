import { createContext, useContext, useState } from "react";
// import { followUser, unfollowUser } from "../api/followship";
// import { likeTweet, unLikeTweet } from "../api/like.js";

const UserContext = createContext(null);
const dummyUser = {
  id: 1,
  name: "user125",
  email: "user125@example.com",
  account: "user125",
  introduction: "",
  avatar: "",
  cover: "",
  isAdmin: false,
  createdAt: "2023-03-20T15:44:34.000Z",
  updatedAt: "2023-03-20T15:44:34.000Z",
};
const dummyArray = [1, 2, 3];

function useUser() {
  return useContext(UserContext);
}

function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(dummyUser);
  const [userFollowings, setUserFollowings] = useState(dummyArray);
  const [userLikes, setUserLikes] = useState(dummyArray);

  const handleUserUpdate = (data) => {
    setCurrentUser(data);
  };

  //   const handleFollow = async (id) => {
  //     if (userFollowings.includes(id)) {
  //       await unfollowUser(id);
  //       const newFollowings = userFollowings.filter(
  //         (followingId) => followingId !== id
  //       );
  //       setUserFollowings(newFollowings);
  //     } else {
  //       await followUser(id);
  //       const newFollowings = [...userFollowings, id];
  //       setUserFollowings(newFollowings);
  //     }
  //   };

  //   const handleLike = async (id) => {
  //     if (userLikes.includes(id)) {
  //       await unLikeTweet(id);
  //       const newLikes = userLikes.filter((tweetId) => tweetId !== id);
  //       setUserLikes(newLikes);
  //     } else {
  //       await likeTweet(id);
  //       const newLikes = [...userLikes, id];
  //       setUserLikes(newLikes);
  //     }
  //   };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        userFollowings,
        userLikes,
        setCurrentUser,
        setUserFollowings,
        setUserLikes,
        // handleFollow,
        // handleLike,
        handleUserUpdate,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { useUser, UserProvider };
