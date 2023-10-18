import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

function Profile() {
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [percent, setPersent] = useState(0);
  const [fileError, setFileError] = useState(false);
  const [formData, setFormData] = useState({});
  // console.log(file);
  console.log(percent);
  console.log(formData);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (file) {
      handelUpload(file);
    }
  }, [file]);

  const handelUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPersent(Math.round(progress));
      },
      (error) => {
        setFileError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) =>
          setFormData({ ...formData, avatar: downloadUrl })
        );
      }
    );
  };

  return (
    <div className="p-2 max-w-lg mx-auto">
      <h1 className="text-center my-7 font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          ref={fileRef}
          type="file"
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          src={formData.avatar || currentUser.avatar}
          alt="profilepic"
        />
        <p className="text-small self-center">
          {fileError ? (
            <span className="text-red-700"> Error Image Upload</span>
          ) : percent > 0 && percent < 100 ? (
            <span className="text-green-600">{`Uploding ${percent}%`}</span>
          ) : percent === 100 ? (
            <span>Image Successfully Uploaded</span>
          ) : (
            ""
          )}
        </p>
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
