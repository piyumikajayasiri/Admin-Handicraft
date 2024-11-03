import Image from "next/image";
import React from "react";
import NotImplementImage from "../../public/images/oops.png";

const NotImplemented = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Sorry</h1>
      <p className="text-lg mb-4">This page is not yet implemented</p>
      <Image
        src={NotImplementImage}
        alt="Not Implemented"
        width={500}
        height={300}
      />
    </div>
  );
};

export default NotImplemented;
