import { siteConfig } from "@/config/site";
import AuthLayout from "@/layouts/auth";
import Link from "next/link";

const SigninPage = () => {
  return (
    <AuthLayout>
      <div className="h-svh flex gap-5 flex-col items-center justify-center w-full max-w-[350px]">
        <p className="text-black text-[27px] sm:text-[30px] font-semibold">
          Welcome back
        </p>

        <form action="" className="w-full flex flex-col gap-3">
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
            Sign In
          </button>
        </form>
        <p className="text-gray-600 text-sm">
          Don't have an account?{" "}
          <Link
            href={siteConfig.sitePaths.register}
            className="font-semibold text-[#0F0529] underline underline-offset-4"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SigninPage;
