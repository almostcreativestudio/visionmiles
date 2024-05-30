import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#1E1E3B] py-5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-5">
        <Image src="/logo.png" alt="vivid" width={150} height={66} />
        <p className="text-white">
          © 2023 Vivid Machines. All rights reserved.{" "}
          <a
            className="underline"
            target="_blank"
            href="https://www.vivid-machines.com/privacy-policy"
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
