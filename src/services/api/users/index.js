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