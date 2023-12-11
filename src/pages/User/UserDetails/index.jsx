import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserByID } from "../../../services/api/users/index.js";
import { Card, Avatar } from "antd";

const UserDetails = () => {
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    if (id) {
      getUserByID(id)
        .then((userData) => {
          setUserDetails(userData);
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    }
  }, [id]);

  return (
    <div>
      {userDetails && (
        <Card style={{ width: 800, fontSize: '18px' }}>
          <Card.Meta
            avatar={
              <Avatar
                src={userDetails.profilePicture}
                alt={userDetails.username}
                style={{width: '100px', height: '100px'}}
              />
            }
            title={userDetails.username} 
            description={userDetails.bio}
          />
          <div style={{ marginTop: 20, display: "flex", justifyContent: "space-around   " }}>
            <p>Posts: {userDetails.posts?.length || 0}</p>
            <p>Followers: {userDetails.followers?.length || 0}</p>
            <p>Following: {userDetails.following?.length || 0}</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default UserDetails;
