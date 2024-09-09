"use client";

import Diamond from "@/icons/Diamond";
import { useEffect, useState, useRef } from "react";
import Button from "../Button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const headerRef = useRef(null);
  const navContentRef = useRef(null);
  const navActionRef = useRef(null);
  const toggleElementsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      ref={headerRef}
      className={`fixed w-full z-30 top-0 transition-all ${
        isScrolled ? "bg-white shadow" : "text-white"
      }`}
    >
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2 relative">
        <div className="pl-4">
          <a
            className={`flex items-center no-underline hover:no-underline font-bold text-2xl lg:text-4xl transition-all ${
              isScrolled ? "text-gray-800" : "text-white"
            }`}
            href="#"
          >
            <Diamond
              className={`h-8 inline fill-current ${
                isScrolled ? "text-gray-800" : "text-white"
              }`}
            />
            Gamou
          </a>
        </div>

        <div className="block lg:hidden pr-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
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
          ref={navContentRef}
          className={`w-full flex-grow lg:flex lg:items-center lg:w-auto ${
            isMenuOpen
              ? "bg-white md:bg-transparent shadow-sm absolute md:relative top-full "
              : "hidden"
          } mt-2 lg:mt-0 text-black p-4 lg:p-0 z-20 rounded-md lg:rounded-none shadow-lg lg:shadow-none`}
        >
          <ul className="list-reset lg:flex justify-end flex-1 items-center">
            <li className="mr-3">
              <a
                className={`inline-block py-2 px-4 no-underline hover:text-gray-800 text-gray-800`}
                href="#como-funciona"
              >
                Como funciona
              </a>
            </li>
            <li className="mr-3">
              <a
                className={`inline-block py-2 px-4 no-underline hover:text-gray-800 text-gray-800`}
                href="#vantagens"
              >
                Vantagens
              </a>
            </li>
          </ul>
          <Button
            variant={isScrolled || isMenuOpen ? "primary" : "light"}
            className="mx-auto"
          >
            <a href="/entrar">Entrar</a>
          </Button>
        </div>
      </div>

      <hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
    </nav>
  );
};

export default Navbar;
