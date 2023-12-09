import { FormEvent, ChangeEvent, useState } from "react";
import { Register } from "../utils/types";
import { isAxiosError } from "axios";
import usersApi from "../api/usersApi";

const kone =
  "https://as2.ftcdn.net/v2/jpg/06/42/44/53/1000_F_642445357_jqoy4etVJyooOLafTqS8R0BKk17FItTQ.jpg";

const Register = () => {
  const [regInfo, setRegInfo] = useState<Register>({
    username: "",
    passwd: "",
  });

  // Handle register fields
  const handleRegUser = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setRegInfo((data) => ({
      ...data,
      [name]: value,
    }));
  };

  // Register user
  const regUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const newUser = {
        username: regInfo.username,
        passwd: regInfo.passwd,
      };

      const res = await usersApi.createUser(newUser);
      console.log("res", res);
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        console.log("Error registering user", error.response?.data);
      } else {
        console.log("Error reg user", error);
      }
    }

    console.log("registering", regInfo);
  };

  return (
    <div id="register">
      <h1>HOW TO JWT</h1>
      <div className="my-grid">
        <div className="left-grid">
          <div className="grid-image">
            <img
              src={kone}
              width="100%"
              height="100%"
              style={{ objectFit: "cover", borderRadius: "8px" }}
            />
          </div>
        </div>
        <div className="right-grid">
          <form onSubmit={regUser}>
            <div className="inputs">
              <h2>Register</h2>
              <div className="label-input">
                <label htmlFor="register-username">Username</label>
                <input
                  type="text"
                  placeholder="Username"
                  id="register-username"
                  name="username"
                  value={regInfo.username}
                  onChange={handleRegUser}
                  autoComplete="off"
                />
              </div>
              <div className="label-input">
                <label htmlFor="register-passwd">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  id="register-passwd"
                  name="passwd"
                  value={regInfo.passwd}
                  onChange={handleRegUser}
                  autoComplete="off"
                />
              </div>
              <button className="form-button" type="submit">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
