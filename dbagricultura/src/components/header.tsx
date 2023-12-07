"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "@/assets/price.webp";

const Header = () => {
  return (
    <header>
      <nav className="header p-4 ">
        <div className="container mx-auto ">
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-12">
            <div className="md:col-span-2">
              <Link
                href="/"
                className="text-white text-xl font-semibold"
              >
                <Image className="logo-img" src={logo} alt="img" />
              </Link>
            </div>
            <div className="md:col-span-10 flex flex-row content-center items-center md:justify-center justify-end">
              <div className="flex flex-row content-center items-center justify-center">
                <div className="md:hidden">

                </div>
              </div>
              <div className="hidden md:flex space-x-5 justify-center gap-5">
                <Link href="/" className="primary-highlight-text">
                  Inicio
                </Link>
                <Link href="/ingenieros" className="primary-highlight-text">
                  Ingenieros
                </Link>
                <Link href="/plantacion" className="primary-highlight-text">
                  Plantacion
                </Link>
                <Link href="/products" className="primary-highlight-text">
                  Productos
                </Link>
                <Link href="/contact" className="primary-highlight-text">
                  Contacto
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
