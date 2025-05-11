import React from "react";

const Signup = () => {
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
            Đăng ký
          </h1>

          <form className="flex flex-col gap-3">
            <div className="flex gap-2">
              <input
                type="Text"
                placeholder="Họ"
                className="w-[155px] p-4 rounded bg-gray-700 text-white"
              />
              <input
                type="Text"
                placeholder="Tên"
                className="w-[155px] p-4 rounded bg-gray-700 text-white"
              />
            </div>
            <select className="p-4 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500">
              <option value="">Chọn giới tính</option>
              <option value="nam">Nam</option>
              <option value="nu">Nữ</option>
              <option value="khong">Không muốn trả lời</option>
            </select>
            <div className="flex gap-4">
              <input
                type="number"
                placeholder="Ngày"
                min="1"
                max="31"
                className="w-24 p-4 rounded bg-gray-700 text-white"
              />
              <input
                type="number"
                placeholder="Tháng"
                min="1"
                max="12"
                className="w-24 p-4 rounded bg-gray-700 text-white"
              />
              <input
                type="number"
                placeholder="Năm"
                className="w-24 p-4 rounded bg-gray-700 text-white"
              />
            </div>

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
              Đăng ký
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
