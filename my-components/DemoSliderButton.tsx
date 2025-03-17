import { Button, buttonBaseClasses } from "@mui/material";
import React from "react";

interface DemoSliderButtonProps {
  text: string;
  onClick: () => void;
  data?: string | number | boolean;
}

function DemoSliderButton({ text, onClick, data }: DemoSliderButtonProps) {
  return (
    <button 
      onClick={onClick}
      className='rounded-[2rem] hover:bg-gray-700 duration-500 border flex flex-1 px-3 py-1 justify-center items-center bg-black text-white font-extralight'>
      {text}
    </button>
  );
}

export default DemoSliderButton;
