import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="bg-white py-5">
      <div className="max-w-7xl mx-auto px-5">
        <Image src="/logo.png" alt="vivid" width={150} height={66} />
      </div>
    </div>
  );
};

export default Header;
