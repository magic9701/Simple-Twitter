<<<<<<< HEAD
// import React, { useEffect, useState } from "react";
// import { useHistory, useParams } from "react-router-dom";
// import { ReactComponent as BackIcon } from "../../assets/icons/back-arrow-icon.svg";
// import styles from "../../styles/Header.module.scss";
// import { getUserTweetsCount } from "../../api/user";

// const Header = () => {
//   const { userId } = useParams();
//   const history = useHistory();
//   const [tweetCount, setTweetCount] = useState(0);

//   useEffect(() => {
//     if (userId) {
//       getUserTweetsCount(userId)
//         .then((count) => {
//           setTweetCount(count);
//         })
//         .catch((error) => {
//           console.error("Failed to get user's tweet count: ", error);
//         });
//     }
//   }, [userId]);

//   const handleBack = () => {
//     history.push("/main");
//   };

//   return (
//     <div>
//       <div className={styles.header}>
//         <div className={styles.backIcon} onClick={handleBack}>
//           <BackIcon />
//         </div>
//         <p>{userId ? `使用者主頁 - ${userId}` : "首頁"}</p>
//         {userId && <p className={styles.tweetCount}>{`${tweetCount}推文`}</p>}
//       </div>
//     </div>
//   );
// };

// export default Header;
=======
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { ReactComponent as BackIcon } from "../../assets/icons/back-arrow-icon.svg";
import styles from "../../styles/Header.module.scss";
import { getUserTweetsCount } from "../../api/user";

const Header = () => {
  const { userId } = useParams();
  const history = useHistory();
  const [tweetCount, setTweetCount] = useState(0);

  useEffect(() => {
    if (userId) {
      getUserTweetsCount(userId)
        .then((count) => {
          setTweetCount(count);
        })
        .catch((error) => {
          console.error("Failed to get user's tweet count: ", error);
        });
    }
  }, [userId]);

  const handleBack = () => {
    history.push("/main");
  };

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.backIcon} onClick={handleBack}>
          <BackIcon />
        </div>
        <p>{userId ? `使用者主頁 - ${userId}` : "首頁"}</p>
        {userId && <p className={styles.tweetCount}>{` ${tweetCount}推文`}</p>}
      </div>
    </div>
  );
};

export default Header;
>>>>>>> main
