import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [curState, setCurState] = useState<string>("login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (curState === "sign up") {
        const res = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (res.data.success) {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
        } else {
          toast.error(res.data.message);
        }
      } else {
        const res = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (res.data.success) {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (error) {
      const err = error as AxiosError;
      console.log(err);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 mt-14 mx-auto gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="font-Montserrat uppercase text-3xl">{curState}</p>
        <hr className="h-[2px] w-8 bg-blue" />
      </div>
      {curState === "login" ? null : (
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-800 rounded"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
      )}
      <input
        type="email"
        className="w-full px-3 py-2 border border-gray-800 rounded"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
      />
      <input
        type="password"
        className="w-full px-3 py-2 border border-gray-800 rounded"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required
      />
      <div className="w-full flex justify-between text-sm">
        <p className="cursor-pointer hover:underline">Forgot Password?</p>
        {curState === "login" ? (
          <p
            className="cursor-pointer hover:underline"
            onClick={() => setCurState("sign up")}
          >
            Create Account
          </p>
        ) : (
          <p
            className="cursor-pointer hover:underline"
            onClick={() => setCurState("login")}
          >
            Login Here
          </p>
        )}
      </div>
      <button
        type="submit"
        className="bg-blue text-white px-8 py-2 mt-4 rounded font-Montserrat"
      >
        {curState === "login" ? "Login" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
