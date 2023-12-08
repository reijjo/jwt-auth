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
