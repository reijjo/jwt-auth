# jwt-auth

How to use json web tokens

# Prerequisite (Basic backend and frontend setup)

## Frontend

- Make project folder
- Make client folder inside the projects folder `npm create vite@latest client` -> `React` -> `TypeScript + SWC`
- Install dependencies `cd client` -> `npm install react-router-dom`
- Types `npm install @types/react-router-dom --save-dev`
- Remove `App.css` file
- `main.tsx` file:

```tsx
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
```

- `App.tsx` file:

```ts
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Dash from "./pages/Dash";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dash" element={<Dash />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
```

- Make folder `pages` inside the `src` folder
- Make files `Dash.tsx`, `Home.tsx`, `Register.tsx` inside the `pages` folder
- `Home.tsx` file:

```ts
const jwtlogo =
  "https://seeklogo.com/images/J/jwt-logo-65D86B4640-seeklogo.com.png";

const Home = () => {
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
          <form>
            <div className="inputs">
              <h2>Login</h2>
              <div className="label-input">
                <label htmlFor="login-username">Username</label>
                <input type="text" placeholder="Username" id="login-username" />
              </div>
              <div className="label-input">
                <label htmlFor="login-passwd">Password</label>
                <input type="passwd" placeholder="Password" id="login-passwd" />
              </div>
              <button className="form-button">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
```

- `Register.tsx` file:

```ts
const kone =
  "https://as2.ftcdn.net/v2/jpg/06/42/44/53/1000_F_642445357_jqoy4etVJyooOLafTqS8R0BKk17FItTQ.jpg";

const Register = () => {
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
          <form>
            <div className="inputs">
              <h2>Register</h2>
              <div className="label-input">
                <label htmlFor="register-username">Username</label>
                <input
                  type="text"
                  placeholder="Username"
                  id="register-username"
                />
              </div>
              <div className="label-input">
                <label htmlFor="register-passwd">Password</label>
                <input
                  type="passwd"
                  placeholder="Password"
                  id="register-passwd"
                />
              </div>
              <button className="form-button">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
```

- `Dash.tsx` file:

```ts
const Dash = () => {
  return (
    <>
      <h1>dash</h1>
    </>
  );
};

export default Dash;
```

- Create `components` folder inside `src` folder
- Make file `Navbar.tsx` inside the `components` folder:

```ts
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav>
      <div>
        <a onClick={() => navigate("/")}>Homepage</a>
        <a onClick={() => navigate("/dash")}>Dashboard</a>
        <a onClick={() => navigate("/register")}>Register</a>
      </div>
    </nav>
  );
};

export default Navbar;
```

## Backend

- Make `server` folder (not inside the `client` folder)
- `npm init -y` inside the `server` folder
- make `.gitignore` file

```
**/node_modules
**/.DS_Store
**/.env
```

- Install TypeScript `npm install typescript --save-dev`
- Add to `package.json` file:

```json
{
  "scripts": {
    "tsc": "tsc"
  }
}
```

- Make `tsconfig.json` file -> `npm run tsc -- --init`
- Comment everything out in `tsconfig.json` and add this:

```json
{
  "compilerOptions": {
    "target": "ES6",
    "outDir": "./build/",
    "module": "commonjs",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true
  }
}
```

- Install express `npm install express` `npm install @types/express --save-dev`
- Install 'nodemon' for TypeScript `npm install --save-dev ts-node-dev`
- Add to `package.json` file:

```json
{
  "scripts": {
    "tsc": "tsc",
    "dev": "ts-node-dev src/index.ts"
  }
}
```

- Make folder `src` just to keep everything clean and make file `index.ts` inside that folder

```ts
import express from "express";
const app = express();
app.use(express.json());

const PORT = 3001;

app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

- `npm run dev` inside the `server` folder to start the server
- Go to `http://localhost:3001/ping` just to see that server works

## More Backend

- Install dependencies `npm install bcryptjs chalk@4 cors dotenv mongoose morgan jsonwebtoken`, `npm install --save-dev @types/bcryptjs @types/cors @types/morgan @types/jsonwebtoken`

- Create `.env` file in the `server` folder

```env
# MongoDB
MONGO_URI=your_mongodb_uri

# JWT Secret
JWT_SECRET=secret_for_token

# Server port
PORT=3001
```

- To keep the `index.ts` file clean make `app.ts` file inside the `src` folder:

```ts
import morgan from "morgan";
import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.get("/ping", (_req: Request, res: Response) => {
  console.log("someone pinged here");
  res.send("pong");
});

export { app };
```

- Update `index.ts` file:

```ts
import chalk from "chalk";
import { app } from "./app";
import { config } from "./utils/config";

app.listen(config.PORT, async () => {
  console.log(chalk.cyanBright(`Server running on port ${config.PORT}`));
});
```

## MongoDB Connection

- Create `utils` folder inside `src` folder
- Create `config.ts` file inside `utils` folder:

```ts
import dotenv from "dotenv";
import { Config } from "./types";

dotenv.config();

const PORT = Number(process.env.PORT);

const MONGO_URI = process.env.MONGO_URI;

const JWT_SECRET = String(process.env.JWT_SECRET);

export const config: Config = {
  PORT,
  MONGO_URI,
  JWT_SECRET,
};
```

- Create `types.ts` file inside `utils` folder:

```ts
export type Config = {
  PORT?: number;
  MONGO_URI?: string;
  JWT_SECRET?: string;
};
```

- In `src` folder create `models` folder for MongoDB schemas
- Create `userModel.ts` file in `models` folder:

```ts
import mongoose from "mongoose";

// Create schema
const userSchema = new mongoose.Schema({
  username: String,
  passwd: String,
});

// Modify the returned data
userSchema.set("toJSON", {
  transform: (_document, returnedUser) => {
    returnedUser.id = returnedUser._id.toString();
    delete returnedUser._id;
    delete returnedUser.__v;
  },
});

const UserModel = mongoose.model("User", userSchema);

export { UserModel };
```

- Create `helpers.ts` file in `utils` folder for MongoDB connection:

```ts
import mongoose from "mongoose";
import chalk from "chalk";
import { config } from "./config";

export const connectMongoDB = async () => {
  try {
    console.log(chalk.magentaBright("..."));

    await mongoose.connect(String(config.MONGO_URI));

    console.log(chalk.magentaBright("Connected to MongoDB."));
  } catch (error: unknown) {
    console.log("Error connecting MongoDB", error);
  }
};
```

- Use the function in `app.ts` file:

```ts
// ...
const app = express();

connectMongoDB();

app.use(morgan("dev"));
app.use(cors());
//...
```

## UserController and Route

- Create `controllers` folder inside `src` folder
- `userController.ts` file inside the `controllers` folder to communicate with database:

```ts
import { Request, Response } from "express";
import { UserModel } from "../models/userModel";

// @Route users
// @Method GET
// @What Get all users from database
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    // Gets all the users from database and doesn't return the users passwords to frontend
    const users = await UserModel.find({}).select("-passwd");
    res.status(200).json(users);
  } catch (error: unknown) {
    console.log("Error fetching all users", error);

    // Send status and message and style for InfoMessage component in frontend
    res
      .status(500)
      .send({ message: "Server error fetching all users.", info: "error" });
  }
};
```

- Create `routes` folder inside the `src` folder
- And create `userRoute.ts` file in `routes` folder:

```ts
import express from "express";
import { getAllUsers } from "../controllers/userController";

// Create a router for all the user routes
const userRouter = express.Router();

userRouter.get("/", getAllUsers);

export default userRouter;
```

- Add userRouter to `app.ts`:

```ts
//...
app.get("/ping", (_req: Request, res: Response) => {
  console.log("someone pinged here");
  res.send("pong");
});

// http://localhost:3001/users
app.use("/users", userRouter);

export { app };
//...
```

- Test with Postman that the route works `GET request to http://localhost:3001/users` and it should return empty array
- Create register controller in `userController.ts`:

```ts
export const register = async (req: Request, res: Response) => {
  const { username, passwd } = req.body;

  // If empty field
  if (!username || !passwd) {
    return res
      .status(400)
      .json({ message: "No empty fields, thanks.", info: "error" });
  }

  // Check if username already exists
  try {
    const existingUsername = await UserModel.findOne({ username });

    if (existingUsername) {
      return res
        .status(400)
        .json({ message: "Username already exists.", info: "warning" });
    }
  } catch (error: unknown) {
    console.log("Error checking duplicate users", error);
    return res
      .status(500)
      .json({ message: "Server error checking duplicates", info: "error" });
  }

  // Hash the user password
  const saltRounds = 10;
  const hashPasswd = await bcrypt.hash(passwd, saltRounds);

  // Save user to database
  try {
    const newUser = new UserModel({
      username,
      passwd: hashPasswd,
    });

    const savedUser = await newUser.save();

    return res.status(201).json({
      message: `User '${savedUser.username}' created!`,
      info: "success",
    });
  } catch (error: unknown) {
    console.log("Error creating user", error);
    return res
      .status(500)
      .json({ message: "Server error creating user", info: "error" });
  }
};
```

- Add register controller to `userRoute.ts`:

```ts
//...
userRouter.get("/", getAllUsers);
userRouter.post("/", register);

export default userRouter;
```

- Test the route with Postman `POST request to http://localhost:3001/users`, add body type JSON in Postman and the body

```json
{
  "username": "testiukko",
  "passwd": "salasana"
}
```

- Then try again with the same body. Should return message that user already exists
- And then `GET request to http://localhost:3001/users` should return the user that just created

# Local Storage

## AuthController and Route

- First add couple of types in the `types.ts` file:

```ts
export type Login = {
  username: string;
  passwd: string;
};

export type User = {
  id: string;
  username: string;
  passwd: string;
};
```

- Create `authController.ts` in `controllers` folder:

```ts
import { Request, Response } from "express";
import { UserModel } from "../models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Login, User } from "../utils/types";
import { config } from "../utils/config";

// @Route auth/login
// @Method POST
// @What Login user
export const login = async (req: Request, res: Response) => {
  const { username, passwd } = req.body as Login;

  // If empty field
  if (!username || !passwd) {
    return res
      .status(400)
      .json({ message: "No empty fields thanks.", info: "error" });
  }

  // Find user from database
  let loginUser: User | null;

  try {
    loginUser = await UserModel.findOne({ username });
  } catch (error: unknown) {
    console.log("Server error on finding user", error);
    return res
      .status(500)
      .json({ message: "Error finding user", info: "error" });
  }

  if (!loginUser) {
    return res.status(404).json({ message: "User not found.", info: "error" });
  }

  // Is password ok?
  const okPasswd = await bcrypt.compare(passwd, loginUser.passwd);
  if (!okPasswd) {
    return res
      .status(400)
      .json({ message: "Invalid username / password.", info: "error" });
  }

  // Create token
  const userToken = {
    id: loginUser.id,
    username: loginUser.username,
  };

  const token = jwt.sign(userToken, String(config.JWT_SECRET), {
    expiresIn: 60 * 60,
  });

  return res
    .status(200)
    .json({ token, loginUser, message: "Logged in!", info: "success" });
};
```

- Create `authRoute.ts` in `routes` folder:

```ts
import express from "express";
import { login } from "../controllers/authContoller";

const authRouter = express.Router();

authRouter.post("/login", login);

export default authRouter;
```

- Add authRouter in `app.ts`:

```ts
// ...
app.use("/users", userRouter);
app.use("/auth", authRouter);

export { app };
```

- Test the `http://localhost:3001/auth/login` route with Postman
- `POST` request and the body is:

```json
{
  "username": "testiukko",
  "passwd": "salasana"
}
```

- Should return token, loginUser, message and info
- Try with empty field, with non-existing user and with wrong password to see that you get the right responses

### Verify token middleware

- Make `middleware.ts` file in `utils` folder:

```ts
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "./config";
import { User } from "./types";

// For the req.user
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const verifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.header("Authorization")?.split(" ")[1];

  // If there is no token
  if (!token) {
    res
      .status(401)
      .json({ message: "Unauthorized - Missing token", info: "error" });
    return;
  }

  try {
    const decoded = jwt.verify(token, String(config.JWT_SECRET)) as User;
    req.user = decoded;

    next();
  } catch (error: unknown) {
    console.error("Error verifying token", error);
    res
      .status(401)
      .json({ message: "Unauhtorized - Invalid token", info: "error" });
  }
};
```

- Use the `verifyJWT` middleware in `userRoute.ts`:

```ts
import express from "express";
import { getAllUsers, register } from "../controllers/userController";
import { verifyJWT } from "../utils/middleware";

// Create a router for all the user routes
const userRouter = express.Router();

userRouter.get("/", verifyJWT, getAllUsers);
userRouter.post("/", register);

export default userRouter;
```

- Now try to make `GET request to http://localhost:3001/users` and you should get an error
- You have to first login with Postman `POST http://localhost:3001/auth/login`, and copy the token from the response
- Now add the token in Auth page in Postman settings -> Type = Bearer Token and add the token there and try to get the users again

- Create controller to `authController.ts` file:

```ts
// @Route auth/verify
// @Method GET
// @What verify token
export const verify = async (req: Request, res: Response) => {
  res.status(200).json({ message: "Valid Token!", user: req.user });
};
```

- Add it to `authRoute.ts` and use the `verifyJWT` middleware on it:

```ts
// ...
authRouter.post("/login", login);
authRouter.get("/verify", verifyJWT, verify);

export default authRouter;
```

## Frontend

- Install dependencies `npm install axios`
- Create `api` folder inside `src` folder and make `usersApi.tsx` file:

```tsx
import axios from "axios";
import { Register } from "../utils/types";

const baseURL = "http://localhost:3001/users";

const getAllUsers = async () => {
  const res = await axios.get(`${baseURL}`);
  return res.data;
};

const createUser = async (user: Register) => {
  const res = await axios.post(`${baseURL}`, user);
  return res.data;
};

const usersApi = {
  getAllUsers,
  createUser,
};

export default usersApi;
```

- Create `utils` folder inside the `src` folder and create `types.tsx` file:

```tsx
export type Config = {
  PORT?: number;
  MONGO_URI?: string;
  JWT_SECRET?: string;
};

export type Login = {
  username: string;
  passwd: string;
};

export type Register = {
  username: string;
  passwd: string;
};

export type LoginUser = {
  id: string;
  username: string;
  passwd: string;
};

export type User = {
  id: string;
  username: string;
};
```

- Update `Register.tsx` file:

```tsx
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
```

- Update `Home.tsx` file:

```tsx
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
```

- Update `Dash.tsx` file:

```tsx
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
```

- Update `Navbar.tsx` file:

```tsx
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
```

- Update `App.tsx`:

```tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { User } from "./utils/types";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Dash from "./pages/Dash";
import authApi from "./api/authApi";

const App = () => {
  const [user, setUser] = useState<User | null>(null);

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
          }
        }
      } catch (error: unknown) {
        localStorage.clear();
        setUser(null);
        if (isAxiosError(error)) {
          console.log(error.response?.data);
        } else {
          console.error("Error checking token", error);
        }
      }
    };

    checkToken();
  }, [setUser]);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        {/* <Route
          path="/dash"
          element={
            <PrivateRoute element={<Dash />} user={user} setUser={setUser} />
          }
        /> */}
        <Route path="/dash" element={<Dash user={user} setUser={setUser} />} />
        <Route path="*" element={<Home setUser={setUser} />} />
      </Routes>
    </Router>
  );
};

export default App;
```

## And now you wont be able to go to /dash route if you arent logged in
