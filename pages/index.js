import Link from "next/link";
import { useRef, useState } from "react";
import { useAuth } from "../lib/context";
import { FcGoogle } from "react-icons/fc";

import toast from "react-hot-toast";
import { useRouter } from "next/router";

export default function Home() {
  const emailRef = useRef();
  const router = useRouter();
  const passwordRef = useRef();
  const { currentUser, login, googleLogin } = useAuth();
  const [error, setEroor] = useState("");
  const [loading, setLoading] = useState(false);
  const notify = () => toast.error(error);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setEroor("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      toast.success("Login successful🎉");
      router.push("/sections");
    } catch {
      setEroor("Failed to login");
    }

    setLoading(false);
  }

  return (
    <div className="hero min-h-[90vh]  px-12 bg-base-200">
      {error != "" && notify()}
      <div className="hero-content flex-col lg:flex-row-reverse px-24 lg:gap-[2rem]">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            A web application for creating college and university schedules is
            based on a Python algorithm to process the finished schedule. Login
            to easily create timetables.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                ref={emailRef}
                type="text"
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                ref={passwordRef}
                type="password"
                placeholder="password"
                className="input input-bordered"
              />
              <label className="label">
                <Link href="/forgot">
                  <a className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </Link>
                <Link href="/signUp">
                  <a className="label-text-alt link link-hover">SignUp</a>
                </Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <button
                disabled={loading}
                type="submit"
                className="btn btn-primary  mb-0 mt-0"
              >
                Login
              </button>
            </div>
          </form>
          <div className="divider mt-0">OR</div>
          <button
            disabled={loading}
            onClick={() => googleLogin()}
            className="btn btn-primary mb-4 mx-8"
          >
            <FcGoogle size="28" />
            <span className="px-2">Login with google</span>
          </button>
        </div>
      </div>
    </div>
  );
}
