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
