import { Skeleton } from "@/components/ui/skeleton";
import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { checkAuthService, loginService, registerService } from "@/services";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
  const [auth, setAuth] = useState({ authenticate: false, user: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added state to handle errors

  async function handleRegisterUser(event) {
    event.preventDefault();
    
    try {
      const data = await registerService(signUpFormData);
      console.log(data, "Registration response");
  
      if (data.success && data.data?.accessToken) {
        // If registration is successful and accessToken is returned
        sessionStorage.setItem("accessToken", JSON.stringify(data.data.accessToken));
        setAuth({
          authenticate: true,
          user: data.data.user,
        });
      } else {
        // Handle cases where accessToken is not returned (maybe user needs to log in after registration)
        console.log("Registration successful, but no accessToken provided.");
        setAuth({
          authenticate: false,
          user: null,
        });
      }
    } catch (error) {
      console.log("Registration error:", error);
      setAuth({
        authenticate: false,
        user: null,
      });
    }
  }
  

  async function handleLoginUser(event) {
    event.preventDefault();
    try {
      const data = await loginService(signInFormData);
      if (data.success) {
        sessionStorage.setItem("accessToken", JSON.stringify(data.data.accessToken));
        setAuth({ authenticate: true, user: data.data.user });
        setError(null); // Clear any previous errors
      } else {
        setError("Login failed. Please check your credentials."); // Set error message
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please try again.");
    }
  }

  async function checkAuthUser() {
    try {
      const data = await checkAuthService();
      if (data.success) {
        setAuth({ authenticate: true, user: data.data.user });
      } else {
        setAuth({ authenticate: false, user: null });
      }
    } catch (error) {
      console.error("Auth check error:", error);
      setAuth({ authenticate: false, user: null });
    } finally {
      setLoading(false);
    }
  }

  function resetCredentials() {
    setAuth({ authenticate: false, user: null });
  }

  useEffect(() => {
    checkAuthUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
        handleRegisterUser,
        handleLoginUser,
        auth,
        resetCredentials,
        error, // Expose the error state
      }}
    >
      {loading ? <Skeleton /> : children}
    </AuthContext.Provider>
  );
}
