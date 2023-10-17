import { AiOutlineSearch } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      });
      const data = await res.json();
      localStorage.removeItem("loginToken");
      navigate("/signin");
      console.log(data);
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between p-3 items-center max-w-6xl mx-auto">
        <Link to="/">
          <h1 className="font-bold, text-sm sm:texl-xl flex flex-wrap">
            RandomName
          </h1>
        </Link>

        <form className="bg-slate-300 flex items-center p-3 rounded-lg">
          <input
            className="bg-transparent border-none outline-none"
            type="text"
            placeholder="Search.."
          />
          <AiOutlineSearch className="text-slate-600" />
        </form>

        <ul className="flex gap-3">
          <Link to="/">
            <li className="hidden sm:inline hover:text-black hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline hover:text-black hover:underline">
              About
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li>Sign In</li>
            )}
          </Link>
        </ul>

        <button onClick={handleLogout}> Logout </button>
      </div>
    </header>
  );
}

export default Header;
