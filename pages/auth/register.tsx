import { siteConfig } from "@/config/site";
import AuthLayout from "@/layouts/auth";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

const RegisterPage = () => {
  // Hook
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const fullname = formData.get("fullname");
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullname, email, password }),
    });

    const response = await res.json();

    if (res.ok) {
      // Step 2: Automatically log the user in after registration
      const signInRes = await signIn("credentials", {
        redirect: false, // Step 3: Log the user in, which will create the session
        email,
        password,
      });

      if (signInRes && !signInRes.error) {
        router.push(siteConfig.sitePaths.chatHome);
      } else {
        toast("Login failed after registration");
      }
    } else {
      console.log(response);
      toast(response?.error || "Error during registration");
    }
    setLoading(false);
  };

  return (
    <AuthLayout>
      <div className="h-svh flex gap-5 flex-col items-center justify-center w-full max-w-[350px]">
        <p className="text-black text-[27px] sm:text-[30px] font-semibold">
          Create an account
        </p>

        <form onSubmit={register} className="w-full flex flex-col gap-3">
          <input
            type="text"
            className="bg-transparent border text-black px-5 outline-none h-[53px] placeholder-gray-500 rounded-md border-gray-300 w-full"
            placeholder="Fullname"
            name="fullname"
            required
          />
          <input
            type="email"
            className="bg-transparent border text-black px-5 outline-none h-[53px] placeholder-gray-500 rounded-md border-gray-300 w-full"
            placeholder="Email address"
            name="email"
            required
          />
          <input
            type="password"
            className="bg-transparent border text-black px-5 outline-none h-[53px] placeholder-gray-500 rounded-md border-gray-300 w-full"
            placeholder="Password"
            name="password"
            required
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="h-[50px] text-white rounded-lg mt-5 font-semibold bg-[#0F0529] w-full"
            disabled={loading}
          >
            {loading ? "Registering..." : "Get Started"}
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
