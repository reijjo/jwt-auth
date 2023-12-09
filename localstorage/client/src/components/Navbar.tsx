import { useNavigate } from "react-router-dom";
import { useEffect, Dispatch, SetStateAction } from "react";
import { isAxiosError } from "axios";
import { User } from "../utils/types";
import authApi from "../api/authApi";

type Props = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

const Navbar = ({ user, setUser }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      // Get token from localstorage
      const token = localStorage.getItem("how");

      if (!token) {
        console.log("No token found.");
        setUser(null);
        localStorage.removeItem("how");
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
      }
    };

    checkToken();
  }, [setUser, navigate]);

  console.log("user", user);

  return (
    <nav>
      {!user ? (
        <div>
          <a onClick={() => navigate("/")}>Homepage</a>
          <a onClick={() => navigate("/dash")}>Dashboard</a>
          <a onClick={() => navigate("/register")}>Register</a>
        </div>
      ) : (
        <div>
          <a onClick={() => navigate("/")}>Homepage</a>
          <a onClick={() => navigate("/dash")}>Dashboard</a>
          {/* <a onClick={() => navigate("/register")}>Register</a> */}
          <a>{user.username}</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
