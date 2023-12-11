import React, { useState, useEffect, useContext } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Paper,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "antd";
import axios from "axios";
import BASE_URL from "../../services/api/BASE_URL";
import { UserContext } from "../../services/context";
import Swal from "sweetalert2";

const { Search } = Input;

const UserNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]); 
  const [followings, setFollowings] = useState([]);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { setUserFollowings } = useContext(UserContext);
  const [requests, setRequests] = useState([]);
  const [userFollowStatus, setUserFollowStatus] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/users`)
      .then((response) => {
        setUsers(response.data);
        setFollowings(response.data.map(user => user.followings).flat());
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsOpen(open);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUserId");
    navigate("/");
    setUser(null);
  };

  const loggedInUserId = localStorage.getItem("loggedInUserId");

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) &&
      user.id !== loggedInUserId &&
      !user.isAdmin
  );
  const putUser = async (userId, dataToUpdate) => {
    try {
      const response = await axios.put(`${BASE_URL}/users/${userId}`, dataToUpdate);
      return response.data; 
    } catch (error) {
      throw new Error("Error updating user data");
    }
  };

  const handleFollow = async (id, isPublic) => {
    const requestedUser = users.find((x) => x.id === id);
    const request = {
      id: Date.now().toString(),
      userId: users.id,
    };
  
    if (!requestedUser.isPublic) {
      if (!requestedUser.requests.find((x) => x.id === loggedInUserId)) {
        await putUser(requestedUser.id, {
          requests: [...requestedUser.requests, request],
        });
        alert("Request sent");
      } else {
        alert("You already sent a request lately");
      }
    } else {
      if (!requestedUser.followings.find((x) => x.id === loggedInUserId)) {
        const updatedFollowings = [
          ...followings,
          { userId: requestedUser.id, id: Date.now().toString() },
        ];
        setFollowings(updatedFollowings);
  
        const updatedUser = { ...requestedUser, followings: updatedFollowings };
        setUsers(users.map((user) =>
          user.id === requestedUser.id ? updatedUser : user
        ));
  
        await putUser(requestedUser.id, {
          followers: [...requestedUser.followers, request],
        });
        alert("Added to friends");
  
        setUserFollowStatus((prevStatus) => ({
          ...prevStatus,
          [id]: true,
        }));
      } else {
        alert("Already in friends");
      }
    }
  };
  
  

  const handleUnfollow = async (id) => {
    const requestedUser = users.find((x) => x.id === id);

    const updatedFollowings = followings.filter((following) => following.userId !== requestedUser.id);
    setFollowings(updatedFollowings);

    const updatedUser = { ...requestedUser, followings: updatedFollowings };
    setUsers(users.map((user) => (user.id === requestedUser.id ? updatedUser : user)));

    alert("Unfollowed user");
    const updatedFollowers = followers.filter(
      (followedUser) => followedUser.userId !== id
    );
    setFollowers(updatedFollowers);


    const followersArray = [];

    for (let i = 0; i < updatedFollowers.length; i++) {

      followersArray.push({
        id: updatedFollowers[i].id,
        userId: updatedFollowers[i].userId,
      });
    }

    setUser((prevUser) => ({
      ...prevUser,
      followers: followersArray,
    }));

    await putUser(users.id, { followers: followersArray });
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          backgroundColor: "#9154D3",
        }}
      >
        <AppBar position="static" style={{ backgroundColor: "#9154D3" }}>
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton
                edge="start"
                color="inherit"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" style={{ marginRight: "20px" }}>
                User Side Navbar
              </Typography>
            </div>
            <Search
              placeholder="Search..."
              style={{ width: 650, cursor: "progress" }}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Toolbar>
        </AppBar>
        {searchQuery && (
          <div style={{ position: "absolute", width: "100%", zIndex: 1 }}>
            <Paper
              elevation={3}
              style={{
                padding: "10px",
                maxWidth: 650,
                marginLeft: "860px",
                justifyContent: "flex-end",
              }}
            >
              <List>
                {filteredUsers.map((user) => (  
                  <ListItem
                    button
                    key={user.id}
                    component={Link}
                    to={`/details/${user.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      // navigate(`/details/${user.id}`)
                    }}
                  >
                    <ListItemText
                      primary={
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <img
                            src={user.profilePicture}
                            alt={user.username}
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                              marginRight: "10px",
                            }}
                          />
                          {user.username}
                          <button
                            style={{
                              marginLeft: "auto",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              fontSize: "16px",
                              color: "red",
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleFollow(user.id, user.isPublic);
                            }}
                          >
                            {/* follow */}
                            {/* {userFollowStatus[user.id] || "Follow"} */}
                            {userFollowStatus[user.id, user.isPublic] ? 'Requested' : 'Follow'}
                          </button>
                        </div>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </div>
        )}
        <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
          <List style={{ padding: "20px", marginTop: "50px" }}>
            <ListItem button onClick={toggleDrawer(false)}>
              <ListItemText>
                <Link
                  to="/feed"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Feed
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem button onClick={toggleDrawer(false)}>
              <ListItemText>
                <Link
                  to="/userPage"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  My Account
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <ListItemText>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Logout
                </Link>
              </ListItemText>
            </ListItem>
          </List>
        </Drawer>
      </div>
    </>
  );
};

export default UserNavbar;
