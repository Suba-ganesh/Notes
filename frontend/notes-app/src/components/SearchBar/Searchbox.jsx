import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const Searchbox = ({ value, onchange, handlesearch, clearsearch }) => {
  return (
    <div className="w-24rem flex items-center border border-gray-300 rounded-lg px-3 py-2" style={{backgroundColor:"#F9FAFB"}}>
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search Notes"
        className="w-full p-2 border-none outline-none bg-transparent" 
        onChange={onchange}
        value={value}
      />


{value && (
        <IoMdClose
          className="text-gray-500 cursor-pointer mt-2 mr-2"
          onClick={clearsearch}
          aria-label="Clear Search"
        />
      )}


      <FaMagnifyingGlass
        className="text-gray-500 cursor-pointer mt-2"
        onClick={handlesearch}
        aria-label="Search"
      />

      
    </div>
  );
};

export default Searchbox;
