import React, { useEffect, useState } from 'react';
import { getLessonById } from '../../api/ChatBotAPI';
import './LessonDetail.css';
interface Lesson {
  title: string;
  content: string;
  subject: string;
}

const LessonDetail: React.FC = () => {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const lessonId = '7727fbbb-eb3b-4d1e-bf25-d925470ce43e'; // Đặt trực tiếp lessonId

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const lessonData = await getLessonById(lessonId);
        setLesson(lessonData);
      } catch (error) {
        console.error('Error fetching lesson:', error);
      }
    };

    fetchLesson();
  }, [lessonId]);

  if (!lesson) {
    return <div>Loading...</div>;
  }

  return (
    <div className="lesson-container">
      <h1 className="lesson-title">{lesson.title}</h1>
      <div
        className="lesson-content"
        dangerouslySetInnerHTML={{ __html: lesson.content }}
      ></div>
    </div>
  );
};

export default LessonDetail;
