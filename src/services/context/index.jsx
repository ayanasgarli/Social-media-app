import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [requestsModalVisible, setRequestsModalVisible] = useState(false);

  return (
    <UserContext.Provider value={{
        user,
        setUser,
        loggedInUser,
        setLoggedInUser,
        editModalVisible,
        setEditModalVisible,
        requestsModalVisible,
        setRequestsModalVisible,
        }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
