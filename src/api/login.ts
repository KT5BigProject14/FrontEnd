import { EmailLoginRequestType } from '../@types/login';
import apiClient from './';

const loginApi = {
  endPoint: {
    emailLogin: '/retriever/users/login',
  },
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },

  emailLogin: async (body: EmailLoginRequestType) => {
    const { data } = await apiClient.post(loginApi.endPoint.emailLogin, {
      body,
    });

    return data;
  },
};

export default loginApi;
