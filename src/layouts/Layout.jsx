import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav className="flex justify-center bg-gray-700 ">
        <ul className="flex content-center w-2/3 justify-evenly py-5 text-2xl">
          <li className="">
            <Link
              to={"employees"}
              className=" text-gray-700 hover:text-blue-400 dark:text-gray-400"
            >
              Employee
            </Link>
          </li>
          <li className="">
            <Link
              to={"formations"}
              className=" text-gray-700 hover:text-blue-400 dark:text-gray-400"
            >
              Formations
            </Link>
          </li>
          <li className="">
            <Link
              to={"participations"}
              className=" text-gray-700 hover:text-blue-400 dark:text-gray-400"
            >
              Participations
            </Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
