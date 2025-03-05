// Simple mock authentication
const STORAGE_KEY = 'auth_user';

export interface AuthUser {
  id: string;
  email: string;
  created_at: string;
}

export const auth = {
  signIn: (email: string, password: string): Promise<AuthUser> => {
    return new Promise((resolve, reject) => {
      // Simple validation
      if (!email || !password) {
        reject(new Error('Email and password are required'));
        return;
      }

      const user: AuthUser = {
        id: crypto.randomUUID(),
        email,
        created_at: new Date().toISOString(),
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      resolve(user);
    });
  },

  signUp: (email: string, password: string): Promise<AuthUser> => {
    return auth.signIn(email, password); // For demo, signup is same as signin
  },

  signOut: () => {
    localStorage.removeItem(STORAGE_KEY);
  },

  getUser: (): AuthUser | null => {
    const user = localStorage.getItem(STORAGE_KEY);
    return user ? JSON.parse(user) : null;
  },
};