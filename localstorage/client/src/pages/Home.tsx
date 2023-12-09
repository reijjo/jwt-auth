import {
  useState,
  ChangeEvent,
  FormEvent,
  Dispatch,
  SetStateAction,
} from "react";
import { isAxiosError } from "axios";
import { Login, User } from "../utils/types";
import authApi from "../api/authApi";
import { useNavigate } from "react-router-dom";

const jwtlogo =
  "https://seeklogo.com/images/J/jwt-logo-65D86B4640-seeklogo.com.png";

type Props = {
  // user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

const Home = ({ setUser }: Props) => {
  const [logInfo, setLogInfo] = useState<Login>({
    username: "",
    passwd: "",
  });

  const navigate = useNavigate();

  // Handle login fields
  const handleLogUser = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setLogInfo((data) => ({
      ...data,
      [name]: value,
    }));
  };

  // Login user
  const logUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const user: Login = {
        username: logInfo.username,
        passwd: logInfo.passwd,
      };

      const res = await authApi.login(user);

      if (res.token) {
        localStorage.setItem("how", res.token);
      }

      if (res.loginUser) {
        setUser(res.loginUser);
      }

      // Clear the login fields
      setLogInfo({
        username: "",
        passwd: "",
      });

      // Navigate to /dash
      navigate("/dash");

      navigate;
      console.log("res", res);
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        console.log("Error logging user", error.response?.data);
      } else {
        console.log("Error log user", error);
      }
    }
  };

  return (
    <div id="home">
      <h1>HOW TO JWT</h1>
      <div className="my-grid">
        <div className="left-grid">
          <div className="grid-image">
            <img
              src={jwtlogo}
              width="100%"
              height="100%"
              style={{ objectFit: "cover", borderRadius: "8px" }}
            />
          </div>
        </div>
        <div className="right-grid">
          <form onSubmit={logUser}>
            <div className="inputs">
              <h2>Login</h2>
              <div className="label-input">
                <label htmlFor="login-username">Username</label>
                <input
                  type="text"
                  placeholder="Username"
                  id="login-username"
                  name="username"
                  value={logInfo.username}
                  onChange={handleLogUser}
                  autoComplete="off"
                />
              </div>
              <div className="label-input">
                <label htmlFor="login-passwd">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  id="login-passwd"
                  name="passwd"
                  value={logInfo.passwd}
                  onChange={handleLogUser}
                  autoComplete="off"
                />
              </div>
              <button className="form-button" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
