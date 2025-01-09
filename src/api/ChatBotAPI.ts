import axios from "axios";


const API_URL = 'http://localhost:8080/lesson';

export const getLessonById = async (lessonId: string) => {
  try {
    const response = await axios.get(`${API_URL}/${lessonId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching lesson:', error);
    throw error;
  }
};