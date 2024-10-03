import { siteConfig } from "@/config/site";
import AuthLayout from "@/layouts/auth";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <AuthLayout>
      <div className="h-svh flex gap-5 flex-col items-center justify-center w-full max-w-[350px]">
        <p className="text-black text-[27px] sm:text-[30px] font-semibold">
          Create an account
        </p>

        <form action="" className="w-full flex flex-col gap-3">
          <input
            type="text"
            className="bg-transparent border text-black px-5 outline-none h-[53px] placeholder-gray-500 rounded-md border-gray-300 w-full"
            placeholder="Fullname"
            name=""
            id=""
          />
          <input
            type="email"
            className="bg-transparent border text-black px-5 outline-none h-[53px] placeholder-gray-500 rounded-md border-gray-300 w-full"
            placeholder="Email address"
            name=""
            id=""
          />
          <input
            type="password"
            className="bg-transparent border text-black px-5 outline-none h-[53px] placeholder-gray-500 rounded-md border-gray-300 w-full"
            placeholder="Password"
            name=""
            id=""
          />
          <button className="h-[50px] text-white rounded-lg mt-5 font-semibold bg-[#0F0529] w-full">
            Get Started
          </button>
        </form>
        <p className="text-gray-600 text-sm">
          Already have an account?{" "}
          <Link
            href={siteConfig.sitePaths.signin}
            className="font-semibold text-[#0F0529] underline underline-offset-4"
          >
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
