import axios from 'axios';
import { SubjectModel } from '../model/SubjectModel';

const API_URL = 'http://localhost:8080'; // Replace with your actual API URL

export const getAllSubjects = async (): Promise<SubjectModel[]> => {
  try {
    const response = await axios.get(`${API_URL}/subject`);
    return response.data;
  } catch (error) {
    console.error('Error fetching subjects:', error);
    throw error;
  }
};