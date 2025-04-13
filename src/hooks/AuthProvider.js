import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useMutation, useLazyQuery } from "@apollo/client";
import { SIGN_IN, SIGN_OUT } from "../graphql/mutations";
import { IS_SIGNED_IN } from "../graphql/queries";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingInitialAuth, setLoadingInitialAuth]=useState(true);
  const navigate = useNavigate();

  const [signIn] = useMutation(SIGN_IN);
  const [signOut] = useMutation(SIGN_OUT);
  const [
    isSignedIn,
    {
      loading: loading_isSignedIn,
      error: error_isSignedIn,
    },
  ] = useLazyQuery(IS_SIGNED_IN);

  useEffect(() => {
    const checkAuthStatus = async () => {
      setLoadingInitialAuth(true);
      try {
        const { data } = await isSignedIn();
        if (data?.isSignedIn?.user) {
          setUser(data.isSignedIn.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Error checking sign-in status:", err);
        setUser(null);
      } finally {
        setLoadingInitialAuth(false);
      }
    };

    checkAuthStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signInAction = async (data) => {
    try {
      const res = await signIn({
        variables: {
          username: data.username,
          password: data.password,
        },
      });
      if (res.data?.signIn) {
        setUser(res.data.signIn);
        navigate("/home");
        return;
      }
      throw new Error(res.errors?.[0]?.message || "Sign-in failed");
    } catch (err) {
      console.error("Sign-in error:", err);
      throw err;
    }
  };

  const signOutAction = async () => {
    try {
      const res = await signOut();
      if (res.data?.signOut) {
        setUser(null);
        navigate("/signin");
        return;
      }
      throw new Error(res.errors?.[0]?.message || "Sign-out failed");
    } catch (err) {
      console.log("signOutAction Error: ", err);
      throw err;
    }
  };

  const isAuthenticated = () => !!user;

  const authContextValue = {
    user,
    signInAction,
    signOutAction,
    isAuthenticated,
    loadingInitialAuth,
    loading_isSignedIn,
    error_isSignedIn,
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
