import { authClient } from './auth-client';

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
}

export async function loginUser(email: string, password: string) {
  return authClient.signIn.email({ email, password });
}

export async function logoutUser() {
  return authClient.signOut();
}

export async function getCurrentUser() {
  try {
    const session = await authClient.getSession();
    return session.data ?? null;
  } catch {
    return null;
  }
}
