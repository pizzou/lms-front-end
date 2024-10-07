import { Skeleton } from "@/components/ui/skeleton";
import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { checkAuthService, loginService, registerService } from "@/services";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
  const [auth, setAuth] = useState({
    authenticate: false,
    user: null,
  });
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false); // For form submission loading

  // Handle user registration
  async function handleRegisterUser(event) {
    event.preventDefault();
    setFormLoading(true); // Show form loading state

    try {
      const data = await registerService(signUpFormData);
      if (data.success) {
        sessionStorage.setItem(
          "accessToken",
          JSON.stringify(data.data.accessToken)
        );
        setAuth({
          authenticate: true,
          user: data.data.user,
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setFormLoading(false); // Stop form loading state
    }
  }

  // Handle user login
  async function handleLoginUser(event) {
    event.preventDefault();
    setFormLoading(true); // Show form loading state

    try {
      const data = await loginService(signInFormData);
      if (data.success) {
        sessionStorage.setItem(
          "accessToken",
          JSON.stringify(data.data.accessToken)
        );
        setAuth({
          authenticate: true,
          user: data.data.user,
        });
      } else {
        setAuth({
          authenticate: false,
          user: null,
        });
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setFormLoading(false); // Stop form loading state
    }
  }

  // Check if user is authenticated
  async function checkAuthUser() {
    const token = sessionStorage.getItem('accessToken');
    if (!token) {
      setLoading(false); // Skip checking auth if no token is present
      return;
    }

    try {
      const data = await checkAuthService();
      if (data.success) {
        setAuth({
          authenticate: true,
          user: data.data.user,
        });
      } else {
        setAuth({
          authenticate: false,
          user: null,
        });
      }
    } catch (error) {
      console.error("Check auth error:", error);
      setAuth({
        authenticate: false,
        user: null,
      });
    } finally {
      setLoading(false); // Stop the loading state
    }
  }

  // Reset authentication state
  function resetCredentials() {
    setAuth({
      authenticate: false,
      user: null,
    });
    sessionStorage.removeItem("accessToken"); // Optionally clear the token
  }

  // Call checkAuthUser on component mount
  useEffect(() => {
    checkAuthUser();
  }, []);

  console.log(auth, "Auth Status");

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
        formLoading, // Expose form loading to children components
      }}
    >
      {loading ? <Skeleton /> : children}
    </AuthContext.Provider>
  );
}
