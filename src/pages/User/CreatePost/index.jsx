import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Input, Row } from "antd";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import moment from "moment";
import BASE_URL from "../../../services/api/BASE_URL";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { HeartOutlined, CommentOutlined, HeartFilled, DeleteFilled, EditFilled } from "@ant-design/icons";
import { Modal } from "antd";

const Post = () => {
  const [user, setUser] = useState({
    posts: [],
  });
  const [accordionExpanded, setAccordionExpanded] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [postCommentModalMap, setPostCommentModalMap] = useState({});
  const [postComments, setPostComments] = useState({});
  const [editModalVisible, setEditModalVisible] = useState(null);
const [editedPostTitle, setEditedPostTitle] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  const formik = useFormik({
    initialValues: {
      postText: "",
      postImg: "",
    },
    onSubmit: async (values, actions) => {
      actions.resetForm();
      console.log(values);

      const updatedUser = {
        ...user,
        posts: [
          ...(user.posts || []),
          {
            id: Date.now().toString(),
            title: values.postText,
            imgUrl: values.postImg,
            likes: [],
            comments: [],
            createDate: Date.now(),
          },
        ],
      };

      setUser(updatedUser);

      const response = await fetch(`${BASE_URL}/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        throw new Error("Error updating user");
      }
      localStorage.setItem("user", JSON.stringify(user));
      setAccordionExpanded(false);
    },
  });

  const handleLikeClick = (postId) => {
    const updatedPosts = user.posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
        };
      }
      return post;
    });

    setUser((prevUser) => ({
      ...prevUser,
      posts: updatedPosts,
    }));
  };

  const handleLike = (postId) => {
    const updatedPosts = user.posts.map((post) => {
      if (post.id === postId) {
        let updatedLikes = post.likes;
        if (post.isLiked) {
          updatedLikes = updatedLikes.filter((userId) => userId !== user.id);
        } else {
          updatedLikes = [...updatedLikes, user.id];
        }
        return {
          ...post,
          likes: updatedLikes,
          isLiked: !post.isLiked,
        };
      }
      return post;
    });

    setUser((prevUser) => ({
      ...prevUser,
      posts: updatedPosts,
    }));
  };

  const handleCommentClick = (postId) => {
    setPostCommentModalMap((prevMap) => ({
      ...prevMap,
      [postId]: true,
    }));
  };

  const handleComment = (postId) => {
    const updatedComments = {
      ...postComments,
      [postId]: postComments[postId]
        ? [...postComments[postId], commentText]
        : [commentText],
    };

    setPostComments(updatedComments);
    setPostCommentModalMap((prevMap) => ({
      ...prevMap,
      [postId]: false,
    }));
    setCommentText("");
  };

  const handleDeletePost = (postId) => {
    const updatedPosts = user.posts.filter((post) => post.id !== postId);
    setUser((prevUser) => ({
      ...prevUser,
      posts: updatedPosts,
    }));
  };

  const handleEditPostTitleClick = (postId) => {
    const post = user.posts.find((post) => post.id === postId);
    setEditedPostTitle(post.title);
    setEditModalVisible(postId);
  };
  
  const handleSavePostTitle = (postId) => {
    const updatedPosts = user.posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          title: editedPostTitle,
        };
      }
      return post;
    });
  
    setUser((prevUser) => ({
      ...prevUser,
      posts: updatedPosts,
    }));
    setEditModalVisible(null);
  };

  return (
    <>
      <Accordion
        expanded={accordionExpanded}
        onChange={(e, expanded) => setAccordionExpanded(expanded)}
        style={{ width: "100%", margin: "20px auto", borderRadius: "8px" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Add New Post</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
            <Input
              placeholder="Enter post title"
              id="postText"
              name="postText"
              type="text"
              autoComplete="off"
              onChange={formik.handleChange}
              value={formik.values.postText}
              required
              style={{ marginBottom: "10px", width: "100%" }}
            />
            <Input
              placeholder="Enter your picture url"
              id="postImg"
              name="postImg"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.postImg}
              required
              style={{ marginBottom: "10px", width: "100%" }}
            />
            <Button
              type="submit"
              variant="contained"
              style={{
                backgroundColor: "#F15058",
                color: "white",
                fontWeight: "600",
                width: "100%",
              }}
            >
              Post
            </Button>
          </form>
        </AccordionDetails>
      </Accordion>

      <Row
        style={{
          justifyContent: "center",
          margin: "20px auto",
        }}
      >
        {user?.posts.map((post, idx) => {
          const isCommentModalOpen = postCommentModalMap[post.id] || false;
          return (
            <Card
              style={{
                width: "100%",
                margin: "20px 0px",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
              key={idx}
            >
              <Row
                style={{
                  alignItems: "center",
                }}
              >
                <h3
                  style={{
                    marginLeft: "13px",
                  }}
                >
                  {user.username}
                </h3>
              </Row>
              <CardMedia
                component="img"
                height="300"
                image={post.imgUrl}
                alt="image"
                style={{
                  marginTop: "20px",
                  width: "100%",
                  objectFit: "contain",
                }}
              />
              <CardContent>
                <Typography variant="body2" color="text.primary">
                  <h1>{post.title}</h1>
                </Typography>
                <Typography
                  style={{
                    margin: "10px 0px",
                  }}
                  variant="body2"
                  color="text.secondary"
                >
                  Date time:{" "}
                  {moment(post.createDate).format("MMMM Do YYYY, h:mm:ss a")}
                </Typography>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div>
                <Button
                  key={`fav-${post.id}`}
                  onClick={() => handleLikeClick(post.id)}
                  style={{
                    color: post.isLiked ? "#F70000" : "grey",
                    fontSize: "24px",
                    marginRight: "10px",
                  }}
                >
                  {post.isLiked ? <HeartFilled /> : <HeartOutlined />}
                </Button>
                <Button
                  key={`comment-${post.id}`}
                  onClick={() => handleCommentClick(post.id)}
                  style={{
                    color: "grey",
                    fontSize: "24px",
                  }}
                >
                  <CommentOutlined />
                </Button>
                </div>
                <div>
                <Button style={{color: '#870000'}} onClick={() => handleDeletePost(post.id)}>
                <DeleteFilled />
                </Button>
                <Button 
                style={{color: '#F7B900'}}
                onClick={() => handleEditPostTitleClick(post.id)}>
                <EditFilled />
                </Button>
                </div>
                </div>
              </CardContent>
              {/* Comment Modal */}
              <Modal
                title="Comment on Post"
                visible={isCommentModalOpen}
                style={{ width: "50%" }}
                onCancel={() =>
                  setPostCommentModalMap((prevMap) => ({
                    ...prevMap,
                    [post.id]: false,
                  }))
                }
                footer={[
                  <Button
                    key="cancel"
                    onClick={() =>
                      setPostCommentModalMap((prevMap) => ({
                        ...prevMap,
                        [post.id]: false,
                      }))
                    }
                  >
                    Cancel
                  </Button>,
                  <Button
                    key="submit"
                    type="primary"
                    onClick={() => handleComment(post.id)}
                  >
                    OK
                  </Button>,
                ]}
              >
                <Input
                  placeholder="Write your comment"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <div style={{ marginTop: "10px" }}>
                  {postComments[post.id] &&
                    postComments[post.id].map((comment, index) => (
                      <div key={index}>{comment}</div>
                    ))}
                </div>
              </Modal>
               {/* PostEdit modal */}
               <Modal
                  title="Edit Post Title"
                  visible={editModalVisible === post.id}
                  onCancel={() => setEditModalVisible(null)}
                  onOk={() => handleSavePostTitle(post.id)}
                >
                  <Input
                    placeholder="Enter new title"
                    value={editedPostTitle}
                    onChange={(e) => setEditedPostTitle(e.target.value)}
                  />
                </Modal>
            </Card>
          );
        })}
      </Row>
    </>
  );
};

export default Post;
