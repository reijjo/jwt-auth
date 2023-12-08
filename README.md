# jwt-auth

How to use json web tokens

## Prerequisite (Basic backend and frontend setup)

### Frontend

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

### Backend

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

## Local Storage

### Backend

- Install dependencies `npm install bcryptjs chalk@4 cors dotenv mongoose morgan`, `npm install --save-dev @types/bcryptjs @types/cors @types/morgan`

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
