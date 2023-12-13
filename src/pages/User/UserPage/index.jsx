import React, { useEffect, useContext, useState } from "react";
import { getUserByID, updateUserPassword } from "../../../services/api/users";
import { UserContext } from "../../../services/context/index";
import { v4 as uuidv4 } from "uuid";
import {
  EditOutlined,
  LockOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Button, Modal, Form, Input, List } from "antd";
import UserNavbar from "../../../components/UserNavbar";
import Post from "../CreatePost";
import { Helmet } from "react-helmet";


const { Meta } = Card;

const UserPage = () => {
  const {
    loggedInUser,
    setLoggedInUser,
    editModalVisible,
    setEditModalVisible,
    requestsModalVisible,
    setRequestsModalVisible,
    postModalVisible,
    setPostModalVisible,
  } = useContext(UserContext);

  const [editForm] = Form.useForm();
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [passwordForm] = Form.useForm();
  const loggedInUserId = localStorage.getItem("loggedInUserId");

  useEffect(() => {
    if (loggedInUserId) {
      getUserByID(loggedInUserId)
        .then((userData) => {
          setLoggedInUser(userData);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [setLoggedInUser, loggedInUserId]);

  const handleEditClick = () => {
    setEditModalVisible(true);
    editForm.setFieldsValue({
      fullName: loggedInUser.fullName,
      bio: loggedInUser.bio,
      email: loggedInUser.email,
      username: loggedInUser.username,
    });
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
  };

  const handleSaveChanges = () => {
    editForm.validateFields().then((values) => {
      const updatedUser = {
        ...loggedInUser,
        fullName: values.fullName,
        bio: values.bio,
        email: values.email,
        username: values.username,
      };

      localStorage.setItem("loggedInUserId", loggedInUserId);
      setLoggedInUser(updatedUser);
      setEditModalVisible(false);
    });
  };

  const handleRequestsClick = () => {
    setRequestsModalVisible(true);
  };

  const handleRequestsModalCancel = () => {
    setRequestsModalVisible(false);
  };

  const handlePasswordEditClick = () => {
    setPasswordModalVisible(true);
  };

  const handlePasswordModalCancel = () => {
    setPasswordModalVisible(false);
  };

  const handleSavePasswordChanges = async () => {
    passwordForm.validateFields().then(async (values) => {
      if (
        !values.currentPassword ||
        !values.newPassword ||
        !values.confirmNewPassword
      ) {
        return;
      }
      const userId = loggedInUser.id;

      if (values.newPassword === values.confirmNewPassword) {
        const newPassword = values.newPassword;
        const updatedUser = await updateUserPassword(userId, newPassword);

        if (updatedUser) {
          setPasswordModalVisible(false);
          passwordForm.resetFields();
        }
      }
    });
  };

  const handlePostClick = () => {
    setPostModalVisible(true);
  };

  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>User Home</title>
        <link rel="icon" href="https://i.pinimg.com/originals/e9/87/e2/e987e2450f2a3b0fcddc6049db9278b7.png" />
      </Helmet>
      <UserNavbar />
      {loggedInUser && (
        <>
          <div style={{ width: 600 }}>
            <Card
              style={{
                width: "100%",
                margin: "20px 0",
              }}
              actions={[
                <Button key="edit" onClick={handleEditClick}>
                  <EditOutlined />
                </Button>,
                <Button key="password" onClick={handlePasswordEditClick}>
                  <LockOutlined />
                </Button>,
                <Button key="requests" onClick={handleRequestsClick}>
                  Requests
                </Button>,
              ]}
            >
              <Meta
              style={{fontSize: '18px'}}
                avatar={
                  loggedInUser.profilePicture ? (
                    <Avatar
                      style={{ width: "12vh", height: "12vh" }}
                      src={loggedInUser.profilePicture}
                    />
                  ) : (
                    <Avatar
                      style={{ width: "10vh", height: "10vh" }}
                      src="https://static.thenounproject.com/png/5034901-200.png"
                    />
                  )
                }
                title={loggedInUser.username}
                description={loggedInUser.bio}
              />
              <div style={{ display: "flex", justifyContent: "space-evenly", fontSize: '18px' }}>
                <p style={{ marginRight: "20px" }}>
                  Posts: {loggedInUser?.posts?.length || 0}
                </p>
                <p style={{ marginRight: "20px" }}>
                  Followers: {loggedInUser?.followers?.length || 0}
                </p>
                <p>Followings: {loggedInUser?.followings?.length || 0}</p>
              </div>
            </Card>

          </div>
          <Post/>
          {/* Edit Profile Modal */}
          <Modal
            title="Edit Profile"
            visible={editModalVisible}
            onCancel={handleEditModalCancel}
            footer={[
              <Button key="save" type="primary" onClick={handleSaveChanges}>
                Save Changes
              </Button>,
              <Button key="cancel" onClick={() => setEditModalVisible(false)}>
                Cancel
              </Button>,
            ]}
          >
            <Form form={editForm} layout="vertical">
              <Form.Item label="Full Name" name="fullName">
                <Input maxLength={150} />
              </Form.Item>
              <Form.Item label="Bio" name="bio">
                <Input.TextArea maxLength={150} rows={4} />
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input type="email" />
              </Form.Item>
              <Form.Item label="Username" name="username">
                <Input />
              </Form.Item>
            </Form>
          </Modal>
          {/* Password Modal */}
          <Modal
            title="Change Password"
            visible={passwordModalVisible}
            onCancel={handlePasswordModalCancel}
            footer={[
              <Button
                key="save"
                type="primary"
                onClick={handleSavePasswordChanges}
              >
                Save Changes
              </Button>,
              <Button key="cancel" onClick={handlePasswordModalCancel}>
                Cancel
              </Button>,
            ]}
          >
            <Form form={passwordForm} layout="vertical">
              <Form.Item
                label="Current Password"
                name="currentPassword"
                rules={[
                  {
                    required: true,
                    message: "Please enter your current password",
                  },
                ]}
              >
                <Input type="password" />
              </Form.Item>
              <Form.Item
                label="New Password"
                name="newPassword"
                rules={[
                  { required: true, message: "Please enter a new password" },
                  { min: 5, message: "Password must be at least 5 characters" },
                  {
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, and one digit",
                  },
                ]}
              >
                <Input type="password" />
              </Form.Item>
              <Form.Item
                label="Confirm New Password"
                name="confirmNewPassword"
                dependencies={["newPassword"]}
                rules={[
                  {
                    required: true,
                    message: "Please confirm your new password",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("The two passwords do not match")
                      );
                    },
                  }),
                ]}
              >
                <Input type="password" />
              </Form.Item>
            </Form>
          </Modal>
          {/* Requests Modal */}
          <Modal
            title="Requests"
            visible={requestsModalVisible}
            onCancel={handleRequestsModalCancel}
            footer={[
              <Button key="back" onClick={handleRequestsModalCancel}>
                Close
              </Button>,
            ]}
          >
            <List
              header={<div>Incoming Requests</div>}
              bordered
              // dataSource={[]}
              renderItem={(item) => (
                <List.Item>
                  <InboxOutlined /> {item}
                </List.Item>
              )}
            />
          </Modal>
        </>
      )}
    </>
  );
};

export default UserPage;
