import { useContext, createContext, useState, useEffect } from "react";

import { useMutation, useQuery } from "@apollo/client";
import { SIGN_IN, SIGN_OUT } from "../graphql/mutations";
import { IS_SIGNED_IN } from "../graphql/queries";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("userData");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);
  const [signIn] = useMutation(SIGN_IN);
  const [signOut] = useMutation(SIGN_OUT);
  const { error, refetch } = useQuery(IS_SIGNED_IN, {
    onCompleted: (data) => {
      if (!data?.isSignedIn) {
        setUser(null);
      }
      setLoading(false);
    },
    onError: () => {
      console.log("error on useQuery");
      setUser(null);
      setLoading(false);
    },
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("userData", JSON.stringify(user));
    } else {
      localStorage.removeItem("userData");
    }
  }, [user]);

  const signInAction = async (username, password) => {
    try {
      const { data } = await signIn({
        variables: { username, password },
      });

      if (data?.signIn) {
        setUser(data.signIn);
        await refetch();
        return { success: true };
      } else {
        return { success: false, message: data?.signIn || "Sign in failed" };
      }
    } catch (err) {
      return { success: false, message: err.message || "Sign in failed" };
    }
  };

  const signOutAction = async () => {
    try {
      const { data } = await signOut();
      if (data?.signOut) {
        setUser(null);
        return { success: true };
      }
      return { success: false };
    } catch (err) {
      console.log("signOutAction Error: ", err);
      return { success: false, message: err.message };
    }
  };

  const authContextValue = {
    user,
    isAuthenticated: Boolean(user),
    signInAction,
    signOutAction,
    loading,
    error,
    refetch,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
