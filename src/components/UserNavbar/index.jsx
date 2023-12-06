import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "antd";

const { Search } = Input;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

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
    localStorage.removeItem("loggedInUser");
    navigate("/");
    // dispatch(sign_out());
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
              placeholder="input search text"
              style={{
                width: 450,
              }}
            />
          </Toolbar>
        </AppBar>
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

export default Navbar;
