import Link from "next/link";
import { useRef, useState } from "react";
import { useAuth } from "../lib/context";

import toast from "react-hot-toast";

export default function Home() {
  const emailRef = useRef();

  const { resetPassword } = useAuth();
  const [error, setEroor] = useState("");
  const [loading, setLoading] = useState(false);
  const notify = () => toast.error(error);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setEroor("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      toast.success("Check your inbox");
    } catch {
      setEroor("Failed to sendß");
    }

    setLoading(false);
  }

  return (
    <div className="hero min-h-[90vh]  px-12 bg-base-200">
      {error != "" && notify()}
      <div className="hero-content flex-col lg:flex-row-reverse px-24 lg:gap-[2rem]">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Rest Password</h1>
          <p className="py-6">
            A web application for creating college and university schedules is
            based on a Python algorithm to process the finished schedule. Enter
            your email to receive reset password link
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
                <Link href="/">
                  <a className="label-text-alt link link-hover">Login</a>
                </Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <button
                disabled={loading}
                type="submit"
                className="btn btn-primary"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
