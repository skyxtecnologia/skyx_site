import { createAuthClient } from 'better-auth/react';

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const authClient = createAuthClient({
  baseURL: API_BASE,
});

export async function loginUser(email: string, password: string) {
  return authClient.signIn.email({ email, password });
}

export async function logoutUser() {
  return authClient.signOut();
}

export async function registerUser(name: string, email: string, password: string) {
  return authClient.signUp.email({ name, email, password });
}

export async function getCurrentUser() {
  try {
    const session = await authClient.getSession();
    return session.data ?? null;
  } catch {
    return null;
  }
}
