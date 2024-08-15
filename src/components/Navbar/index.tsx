"use client";

import Diamond from "@/icons/Diamond";
import { useEffect } from "react";

const Navbar = () => {
  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById("header");
      const navcontent = document.getElementById("nav-content");
      const navaction = document.getElementById("navAction");
      const toToggle = document.querySelectorAll(".toggleColour");

      if (!header || !navcontent || !navaction || !toToggle) return;

      if (window.scrollY > 10) {
        header.classList.add("bg-white", "shadow");
        navaction.classList.remove("bg-white", "text-gray-800");
        navaction.classList.add("gradient", "text-white");
        navcontent.classList.remove("bg-gray-100");
        navcontent.classList.add("bg-white");

        toToggle.forEach((element) => {
          element.classList.add("text-gray-800");
          element.classList.remove("text-white");
        });
      } else {
        header.classList.remove("bg-white", "shadow");
        navaction.classList.remove("gradient", "text-white");
        navaction.classList.add("bg-white", "text-gray-800");
        navcontent.classList.remove("bg-white");
        navcontent.classList.add("bg-gray-100");

        toToggle.forEach((element) => {
          element.classList.add("text-white");
          element.classList.remove("text-gray-800");
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      id="header"
      className="fixed w-full z-30 top-0 text-white transition-all"
    >
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
        <div className="pl-4 flex items-center">
          <a
            className="toggleColour no-underline hover:no-underline font-bold text-2xl lg:text-4xl text-white transition-all"
            href="#"
          >
            <Diamond className="h-8 fill-white inline  " />
            Gamou
          </a>
        </div>

        <div className="block lg:hidden pr-4">
          <button
            id="nav-toggle"
            className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-800 hover:border-teal-500 appearance-none focus:outline-none"
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>

        <div
          className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 lg:bg-transparent text-black p-4 lg:p-0 z-20 bg-gray-100"
          id="nav-content"
        >
          <ul className="list-reset lg:flex justify-end flex-1 items-center">
            {/* <li className="mr-3">
              <a
                className="inline-block py-2 px-4 text-black font-bold no-underline"
                href="#"
              >
                Entrar
              </a>
            </li> */}
            <li className="mr-3">
              <a
                className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                href="#como-funciona"
              >
                Como funciona
              </a>
            </li>
            <li className="mr-3">
              <a
                className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                href="#vantagens"
              >
                Vantagens
              </a>
            </li>
            <li className="mr-3">
              <a
                className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                href="#precos-e-planos"
              >
                Preços
              </a>
            </li>
          </ul>
          <button
            id="navAction"
            className="mx-auto lg:mx-0 hover:underline font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 bg-white text-gray-800 transition-all"
          >
            Comece Agora
          </button>
        </div>
      </div>

      <hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
    </nav>
  );
};

export default Navbar;
