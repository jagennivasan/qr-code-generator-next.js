"use client";

import { useState } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import { IoClose } from "react-icons/io5";

const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="space-y-2 transition-all duration-300">
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded overflow-hidden shadow-sm md:w-full w-[400px]"
        >
          <button
            onClick={() => toggleAccordion(index)}
            className="w-full  flex items-center justify-between px-4 py-3 text-left bg-gray-100 hover:bg-gray-200 focus:outline-none transition duration-200 "
          >
            <span className="text-sm md:text-base font-medium">
              {item.title}
            </span>
            <span className="text-lg md:text-xl">
              {activeIndex === index ? <IoClose /> : <IoIosArrowDropdown />}
            </span>
          </button>
          <div
            className={`transition-[max-height] duration-300 ease-in-out ${
              activeIndex === index ? "" : "max-h-0"
            } overflow-hidden`}
          >
            <div className="px-4 py-3 bg-white text-gray-700 text-sm md:text-base">
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
