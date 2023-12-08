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
