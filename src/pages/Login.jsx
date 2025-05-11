import React from "react";

const Login = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <img
        src="https://static-cse.canva.com/blob/1167217/createbanners.jpg"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <div className="bg-black bg-opacity-60 p-10 rounded-lg w-[400px]">
          <h1 className="text-4xl font-bold text-red-600 mb-8 text-center">
            Đăng nhập
          </h1>

          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Email hoặc số điện thoại di động"
              className="p-4 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              className="p-4 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              type="submit"
              className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded"
            >
              Đăng nhập
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-600" />
            <span className="mx-4 text-gray-400">HOẶC</span>
            <div className="flex-grow h-px bg-gray-600" />
          </div>

          <button className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded">
            Sử dụng mã đăng nhập
          </button>

          <div className="flex justify-between items-center mt-6 text-sm text-gray-400">
            <label className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 mr-2 text-red-600 bg-gray-700 border-gray-600 rounded focus:ring-red-500"
              />
              Ghi nhớ tài khoản
            </label>
            <a href="#" className="hover:underline">
              Bạn quên mật khẩu?
            </a>
          </div>

          <p className="mt-8 text-gray-400 text-center text-sm">
            Bạn muốn sử dụng Movie World?{"  "}
            <a href="/signup" className="text-white hover:underline">
              Đăng ký ngay
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
