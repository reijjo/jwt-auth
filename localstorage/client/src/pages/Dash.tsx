import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { User } from "../utils/types";
import authApi from "../api/authApi";
import { useNavigate } from "react-router-dom";

type Props = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

const Dash = ({ user, setUser }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      // Get token from localstorage
      const token = localStorage.getItem("how");

      if (!token) {
        console.log("No token found.");
        setUser(null);
        localStorage.removeItem("how");
        navigate("/");
      }

      try {
        if (token) {
          const res = await authApi.verify(token);

          const validUser = res.user;

          if (validUser) {
            setUser(validUser);
          } else {
            setUser(null);
            localStorage.clear();
            navigate("/");
          }
        }
      } catch (error: unknown) {
        localStorage.clear();
        setUser(null);
        navigate("/");

        if (isAxiosError(error)) {
          console.log(error.response?.data);
        } else {
          console.error("Error checking token", error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, [setUser, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div id="dash">
      <h1>dash</h1>
      <h2>{user?.username}</h2>
    </div>
  );
};

export default Dash;
