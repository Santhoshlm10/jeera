import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { registerUser } from "../apis/server";

const Register = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleRegisterUser = async () => {
    let res = await registerUser({
      data: { email: "admin@gmail.comm", password: "admin123" },
    });
    if (res.status === 201) {
      let data = await res.json();
      setToken(data.token);
      navigate("/", { replace: true });
    }
  };

  // setTimeout(() => {
  //   handleLogin();
  // }, 3 * 1000);

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">
          Register
        </h2>

        <div className="mx-auto max-w-lg rounded-lg border">
          <div className="flex flex-col gap-4 p-4 md:p-8">
            <div>
              <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
                Email
              </label>
              <input
                name="email"
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              />
            </div>

            <div>
              <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
                Password
              </label>
              <input
                name="password"
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              />
            </div>

            <button
              onClick={handleRegisterUser}
              className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base"
            >
              Register
            </button>
          </div>

          <div className="flex items-center justify-center bg-gray-100 p-4">
            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700"
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
