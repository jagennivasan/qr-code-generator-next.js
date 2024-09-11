import React, { useState } from "react";

const logoOptions = [
  { value: null, img: "/x.png" }, // Unselect option
  { value: "/link.png", img: "/link.png" },
  { value: "/location.png", img: "/location.png" },
  { value: "/email.png", img: "/email.png" },
  { value: "/whatsapp.png", img: "/whatsapp.png" },
  { value: "/wifi.png", img: "/wifi.png" },
  { value: "/vcard.png", img: "/vcard.png" },
  { value: "/paypal.png", img: "/paypal.png" },
  { value: "/btc.png", img: "/btc.png" },
  { value: "/scan-me-frame.png", img: "/scan-me-frame.png" },
  { value: "/scanning-qr-code.png", img: "/scanning-qr-code.png" },
  { value: "/menu.png", img: "/menu.png" },
  { value: "/scan-me.png", img: "/scan-me.png" },
  { value: "/menu-fork.png", img: "/menu-fork.png" },
];

const LogoOptions = ({ logo, onLogoSelect, onFileChange }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="mb-3">
        <p className="mb-2 text-sm md:text-base">Upload Logo</p>
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          className="form-control w-full p-1 text-sm md:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
        />
      </div>
      <p className="mb-2 text-sm md:text-base">Or choose from here:</p>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7  gap-2 md:max-w-5xl max-w-[250px] ">
        {logoOptions.map((option) => (
          <div
            key={option.value ? option.value : "unselect"}
            className={`cursor-pointer rounded overflow-hidden ${
              logo === option.value ? "border-2 border-black" : "border"
            } transition duration-200 hover:opacity-80`}
            onClick={() => onLogoSelect(option.value)}
          >
            <img
              src={option.img}
              alt="Logo"
              className="object-cover w-full h-auto max-w-[50px] max-h-[50px] aspect-square"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoOptions;
