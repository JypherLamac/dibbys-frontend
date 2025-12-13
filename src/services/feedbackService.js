 
import api from './api';

export const feedbackService = {
  submitFeedback: (feedbackData) => 
    api.post('/feedback/submit_feedback.php', feedbackData),
  
  getFeedback: () => 
    api.get('/feedback/get_feedback.php'),
  
  // Admin function
  deleteFeedback: (feedbackId) => 
    api.post('/admin/delete_feedback.php', { id: feedbackId })
};