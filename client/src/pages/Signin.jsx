import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [loginData, setLoginData] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.id]: e.target.value,
    });
    console.log(loginData);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();
      console.log(data);
      localStorage.setItem("loginToken", JSON.stringify(data));
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className=" p-3 max-w-lg mx-auto">
      <h1 className="text-center text-3xl font-semibold my-7">Login</h1>
      <form onSubmit={handleLogin} className=" flex flex-col gap-4">
        <input
          className="border p-3 rounded-lg"
          type="email"
          placeholder="example@gmail.com"
          id="email"
          onChange={handleChange}
        />
        <input
          className="border p-3 rounded-lg"
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
        />
        <button
          className="bg-slate-700 rounded-lg p-3 text-white uppercase hover:opacity-95 disabled:opacity-80"
          type="submit"
        >
          LogIn
        </button>
      </form>
    </div>
  );
}

export default Signin;
