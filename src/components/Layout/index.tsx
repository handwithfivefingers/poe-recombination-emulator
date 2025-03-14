import { Link, Outlet } from "react-router";

export const Layout = () => {
  return (
    <div className="container mx-auto min-h-[100svh] flex flex-col gap-2">
      <div className="flex gap-4 py-4">
        <Link to="/" className="text-white font-bold ">
          Home
        </Link>

        <Link to="/feedback" className="text-white font-bold">
          Feedback
        </Link>
      </div>

      <div className="flex ">
        <Outlet />
      </div>

      <div className="mt-auto py-8 border-t border-neutral-500">
        <p className="text-center text-white text-sm ">
          Created by{" "}
          <a
            href="https://github.com/handwithfivefingers"
            target="_blank"
            rel="noreferrer"
            className="text-indigo-400 font-medium"
          >
            Five Finger
          </a>
        </p>
        <p className="font-meidum text-sm">Version: 0.1 (14/03/2025) </p>
      </div>
    </div>
  );
};
