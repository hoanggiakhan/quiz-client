import axios from 'axios';
import { QuizModel } from '../model/QuizModel';
import { ResultModel } from '../model/ResultModel';

const API_URL = 'http://localhost:8080'; // Replace with your actual API URL

export const getAllQuizzes = async (): Promise<QuizModel[]> => {
  try {
    const response = await axios.get(`${API_URL}/quiz`);
    return response.data;
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    throw error;
  }
};


export const getAllQuizzesByUser = async (userId: string): Promise<QuizModel[]> => {
  try {
    const response = await axios.get(`${API_URL}/quiz/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    throw error;
  }
};

export const startQuiz = async (userId: string, quizId: string): Promise<void> => {
  try {
    const response = await axios.patch(`${API_URL}/quiz/${userId}/${quizId}`);
    // Có thể log thông tin phản hồi nếu cần
    console.log('Quiz started successfully:', response.data);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};

export const quizSubmit = async (userId: string, quizId: string, result: ResultModel): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/quiz/${userId}/${quizId}`, result);
    console.log('Quiz submitted successfully:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};

export const saveResult = async (userId: string, quizId: string, result: ResultModel): Promise<void> => {
  console.log("Calling saveResult:", userId, quizId, result); // Log theo dõi
  try {
    const response = await axios.post(`${API_URL}/result/${userId}/${quizId}`, result);
    console.log("Result saved successfully:", response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};
