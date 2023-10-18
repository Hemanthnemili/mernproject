import { useSelector } from "react-redux";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-2 max-w-lg mx-auto">
      <h1 className="text-center my-7 font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          src={currentUser.avatar}
          alt="profilepic"
        />
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="border p-3 rounded-lg"
        />
        <input
          type="email"
          id="email"
          placeholder="example@gmail.com"
          className="border p-3 rounded-lg"
        />
        <input
          type="text"
          placeholder="Password"
          id="password"
          className="border p-3 rounded-lg"
        />
        <button className="p-3 rounded-lg bg-slate-600 hover:opacity-95 text-white disabled:opacity-80">
          Update Data
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-500 cursor-pointer">Delete Account</span>
        <span className="text-red-500 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}

export default Profile;
