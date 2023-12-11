import axios from "axios";
import BASE_URL from "../BASE_URL";

// get all
export const getAllUsers = async() => {
    let users;
    await axios.get(`${BASE_URL}/users`)
    .then((res)=>{
        users = res.data;
    })
    return users; 
}

// get userByID 
export const getUserByID = async(id)=>{
    let user;
    await axios.get(`${BASE_URL}/users/${id}`)
    .then((res)=>{
        user = res.data;
    })
    return user;
}

// post user
export const postUser = async(payload)=>{
    let newUser;
    await axios.post(`${BASE_URL}/users`, payload)
    .then((res)=>{
        newUser = res.data;
    })
    return newUser;
}

//Put user
export const updateUseryByIDPut = async (id, updatedData) => {
    let updatedCategory;
    await axios.put(`${BASE_URL}/users/${id}`, updatedData)
        .then((response) => {
            updatedCategory = response.data;
        })
        .catch((error) => {
            console.error('Error updating user:', error);
        });
    return updatedCategory;
}

// Updating password put
export const updateUserPassword = async (userId, newPassword) => {
    try {
      const response = await axios.put(`${BASE_URL}/users/${userId}`, {
        password: newPassword,
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating password for user ${userId}: `, error);
      return null;
    }
  };

// Add post 
  export const addPostToUser = async (userId, postData) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/${userId}/posts`, postData);
      return response.data;
    } catch (error) {
      console.error(`Error adding post to user ${userId}: `, error);
      return null;
    }
  };
  
