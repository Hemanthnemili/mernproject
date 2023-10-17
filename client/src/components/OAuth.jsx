import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { signInSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handelGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      const res = await fetch("http://localhost:5000/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      console.log(data);
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (e) {
      console.log("Could not sign in with google", e);
    }
  };
  return (
    <button
      onClick={handelGoogle}
      type="button"
      className="text-white bg-red-700 p-3 rounded-lg uppercase hover:opacity-95"
    >
      Continue with Google
    </button>
  );
}

export default OAuth;
