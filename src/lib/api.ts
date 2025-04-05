import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

interface UserData {
  id: string;
  username: string;
  bio: string | null;
  avatar_url: string | null;
}

export async function signup(email: string, password: string, username: string) {
  const csrfToken = await getCsrfToken();
  const response = await api.post('/auth/signup', { email, password, username }, {
    headers: { 'X-CSRF-Token': csrfToken },
  });
  return response.data;
}

export async function verifyEmail(email: string, token: string) {
  const csrfToken = await getCsrfToken();
  const response = await api.post('/auth/verify', { email, token }, {
    headers: { 'X-CSRF-Token': csrfToken },
  });
  return response.data;
}

export async function signin(email: string, password: string) {
  const csrfToken = await getCsrfToken();
  const response = await api.post('/auth/signin', { email, password }, {
    headers: { 'X-CSRF-Token': csrfToken },
  });
  return response.data as { user: UserData; expires_at: number };
}

export async function refresh() {
  const csrfToken = await getAuthenticatedCsrfToken();
  const response = await api.post('/auth/refresh', {}, {
    headers: { 'X-CSRF-Token': csrfToken },
  });
  return response.data as { user: UserData; expires_at: number };
}

export async function signout() {
  const csrfToken = await getAuthenticatedCsrfToken();
  await api.post('/auth/signout', {}, {
    headers: { 'X-CSRF-Token': csrfToken },
  });
}

export async function getProfile() {
  const response = await api.get('/auth/profile');
  return response.data as UserData;
}

export async function getCsrfToken() {
  const response = await api.get('/auth/public-csrf');
  return response.data.csrfToken as string;
}

export async function getAuthenticatedCsrfToken() {
  const response = await api.get('/auth/csrf-token');
  return response.data.csrfToken as string;
}