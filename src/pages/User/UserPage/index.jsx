import React, { useEffect, useState } from 'react';
import { EditOutlined, InboxOutlined } from '@ant-design/icons';
import { Avatar, Card, Button, Modal, Form, Input, List } from 'antd';
import UserNavbar from '../../../components/UserNavbar';

const { Meta } = Card;

const UserPage = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [requestsModalVisible, setRequestsModalVisible] = useState(false);
  const [editForm] = Form.useForm();

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setLoggedInUser(parsedUser);
    }
  }, []);

  const handleEditClick = () => {
    setEditModalVisible(true);
    editForm.setFieldsValue({
      fullName: loggedInUser.fullName,
      bio: loggedInUser.bio,
      email: loggedInUser.email,
      password: loggedInUser.password,
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
        password: values.password,
        username: values.username,
      };

      localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
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

  return (
    <>
      <UserNavbar />
      {loggedInUser && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Card
            style={{
              width: 500,
            }}
            actions={[
              <EditOutlined key="edit" onClick={handleEditClick} />,
              <Button key="requests" onClick={handleRequestsClick}>
                Requests
              </Button>,
            ]}
          >
            <Meta
               avatar={
                loggedInUser.profilePicture ? (
                  <Avatar style={{width:'10vh', height: '10vh'}} src={loggedInUser.profilePicture} />
                ) : (
                  <Avatar style={{width:'10vh', height: '10vh'}} src="https://static.thenounproject.com/png/5034901-200.png" />
                )
              }
              title={loggedInUser.username}
              description={loggedInUser.bio}
            />
          </Card>
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
              <Form.Item label="Password" name="password">
                <Input.Password />
              </Form.Item>
              <Form.Item label="Username" name="username">
                <Input />
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
              renderItem={(item) => <List.Item><InboxOutlined /> {item}</List.Item>}
            />
          </Modal>
        </div>
      )}
    </>
  );
};

export default UserPage;


// import React, { useEffect } from 'react';
// import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
// import { Avatar, Card } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import UserNavbar from '../../../components/UserNavbar';

// const { Meta } = Card;

// const UserPage = ({ user }) => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user) {
//       navigate('/');
//     }
//   }, [user, navigate]);

//   return (
//     <>
//       <UserNavbar />
//       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
//         <Card
//           style={{
//             width: 500,
//           }}
//           cover={
//             <img
//               alt="example"
//               src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
//             />
//           }
//           actions={[
//             <SettingOutlined key="setting" />,
//             <EditOutlined key="edit" />,
//             <EllipsisOutlined key="ellipsis" />,
//           ]}
//         >
//           <Meta
//             avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
//             title="Card title"
//             description="This is the description"
//           />
//         </Card>
//       </div>
//     </>
//   );
// };

// export default UserPage;
