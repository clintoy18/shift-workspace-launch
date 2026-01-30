import { createContext, useContext, useState } from "react";

export type UserRole = "customer" | "admin" | "cashier";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, role: UserRole) => {
    // Simulate authentication delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock users for demo
    const mockUsers: Record<string, User> = {
      "customer@example.com": {
        id: "1",
        name: "John Customer",
        email: "customer@example.com",
        role: "customer",
      },
      "admin@example.com": {
        id: "2",
        name: "Jane Admin",
        email: "admin@example.com",
        role: "admin",
      },
      "cashier@example.com": {
        id: "3",
        name: "Bob Cashier",
        email: "cashier@example.com",
        role: "cashier",
      },
    };

    const foundUser = mockUsers[email];
    if (foundUser && foundUser.role === role && password === "password") {
      setUser(foundUser);
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
