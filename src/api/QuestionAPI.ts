import axios from 'axios';
import { QuestionModel } from '../model/QuestionModel';

const API_URL = 'http://localhost:8080'; // Replace with your actual API URL

export const getQuestionsByQuizId = async (quizId: string): Promise<QuestionModel[]> => {
  try {
    const response = await axios.get(`${API_URL}/question/${quizId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};