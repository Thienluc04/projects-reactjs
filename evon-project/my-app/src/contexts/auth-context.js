import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider(props) {
  const [user, setUser] = useState({
    userID: 1,
    fullName: "Thienluc",
    email: "thienluc@gmail.com",
    avatar:
      "https://images.unsplash.com/photo-1650114125533-7c69a7d9cc6e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80",
  });
  const value = { user, setUser };
  return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth mus be used within a AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
