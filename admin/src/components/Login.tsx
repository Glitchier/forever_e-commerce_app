import axios from "axios";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { backendUrl } from "../assets/assets";

type props = {
  setToken: React.Dispatch<React.SetStateAction<string>>;
};

const Login = ({ setToken }: props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmitHandler = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const res = await axios.post(backendUrl + "/api/user/admin", {
        email,
        password,
      });
      if (res.data.success) {
        setToken(res.data.token);
      } else {
        toast.error(res.data.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="fixed top-0 left-0 flex justify-center items-center min-h-screen w-full">
      <div className="bg-white/50 shadow-md border rounded-lg px-8 py-6">
        <h1 className="text-2xl font-black tracking-wider mb-4 font-Montserrat">
          Admin Panel
        </h1>
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-2">
          <div className="mb-3 min-w-72">
            <p className="text-sm text-gray-700 font-semibold mb-2">Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="px-3 py-2 rounded w-full border-2"
              type="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-3 min-w-72">
            <p className="text-sm text-gray-700 font-semibold mb-2">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="px-3 py-2 rounded w-full border-2"
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <button
            className="text-sm px-4 py-2 bg-blue text-white rounded active:bg-gray-600"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
