import axios from 'axios';
import { UserModel } from '../model/UserModel'; // Điều chỉnh đường dẫn nếu cần
import { UserRank } from '../model/UserRank';


const API_URL = 'http://localhost:8080';

export const getProfileUser = async (userId: string): Promise<UserModel> => {
  try {
    const response = await axios.get(`${API_URL}/user/profile/${userId}`);
    return response.data as UserModel;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const changePassword = async (userId: string, oldPassword: string, newPassword: string): Promise<void> => {
  try {
    await axios.patch(`${API_URL}/user/change-password/${userId}`, {
      oldPassword,
      newPassword
    });
  } catch (error) {
    console.error('Error changing password:', error);
    throw error;
  }
};

export const getUserByResult = async (): Promise<UserRank[]> => {
  try {
    const response = await axios.get(`${API_URL}/user/rank`);
    return response.data as UserRank[];
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const registerUser = async (user: UserModel): Promise<void> => {
  try {
    await axios.post(`${API_URL}/user/create`, user);
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};