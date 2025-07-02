import axios from 'axios';

// تكوين الإعدادات الافتراضية لـ axios
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// خدمة رفع الملفات
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await API.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

// خدمة تلخيص الملف
export const summarizeFile = async (filename, ratio = 0.3) => {
  try {
    const response = await API.post('/summarize', { filename, ratio });
    return response.data;
  } catch (error) {
    console.error('Error summarizing file:', error);
    throw error;
  }
};

// خدمة توليد الأسئلة
export const generateQuestions = async (filename, questionType = 'multiple-choice', numQuestions = 5) => {
  try {
    const response = await API.post('/generate-questions', {
      filename,
      question_type: questionType,
      num_questions: numQuestions,
    });
    return response.data;
  } catch (error) {
    console.error('Error generating questions:', error);
    throw error;
  }
};

// خدمة توليد الخريطة الذهنية
export const generateMindmap = async (filename) => {
  try {
    const response = await API.post('/generate-mindmap', { filename });
    return response.data;
  } catch (error) {
    console.error('Error generating mindmap:', error);
    throw error;
  }
};

