import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [requestsModalVisible, setRequestsModalVisible] = useState(false);
  const [postModalVisible, setPostModalVisible] = useState(false);
  const [posts, setPosts] = useState([]);
  const [userFollowings, setUserFollowings] = useState([])

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loggedInUser,
        setLoggedInUser,
        editModalVisible,
        setEditModalVisible,
        requestsModalVisible,
        setRequestsModalVisible,
        postModalVisible,
        setPostModalVisible,
        posts, 
        setPosts,
        userFollowings,
        setUserFollowings,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
