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

// type Props = {
//   element: JSX.Element;
//   user: User | null;
//   setUser: Dispatch<SetStateAction<User | null>>;
// };

// const PrivateRoute = ({ element, user, setUser }: Props) => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     let isMounted = true;

//     const checkToken = async () => {
//       const token = localStorage.getItem("how");
//       if (!token) {
//         navigate("/");
//         return;
//       }

//       try {
//         if (token) {
//           const res = await authApi.verify(token);

//           const validUser = res.user;
//           if (validUser && isMounted) {
//             setUser(validUser);
//           } else {
//             localStorage.clear();
//             setUser(null);
//             navigate("/");
//           }
//         }
//       } catch (error: unknown) {
//         localStorage.clear();
//         setUser(null);
//         navigate("/");

//         if (isAxiosError(error)) {
//           console.log(error.response?.data);
//         } else {
//           console.error("Error checking token", error);
//         }
//       }
//     };

//     checkToken();

//     return () => {
//       isMounted = false;
//     };
//   }, [setUser, navigate]);

//   return user ? element : <Navigate to="/" />;
// };
