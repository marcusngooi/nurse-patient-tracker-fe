import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useLazyQuery } from "@apollo/client";
import { SIGN_IN, SIGN_OUT } from "../graphql/mutations";
import { IS_SIGNED_IN } from "../graphql/queries";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [signIn] = useMutation(SIGN_IN);
  const [signOut] = useMutation(SIGN_OUT);
  const [
    isSignedIn,
    { loading_isSignedIn, error_isSignedIn, data_isSignedIn },
  ] = useLazyQuery(IS_SIGNED_IN);

  const signInAction = async (data) => {
    try {
      const res = await signIn({
        variables: {
          username: data.username,
          password: data.password,
        },
      });
      if (res.data) {
        setUser(res.data.signIn);
        navigate("/home");
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  const signOutAction = async () => {
    const res = await signOut();
    if (res.data.signOut) {
      setUser(null);
      navigate("/signin");
    }
    throw new Error(res.message);
  };

  const authContextValue = {
    user,
    signInAction,
    signOutAction,
    isSignedIn,
    loading_isSignedIn,
    error_isSignedIn,
    data_isSignedIn,
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
