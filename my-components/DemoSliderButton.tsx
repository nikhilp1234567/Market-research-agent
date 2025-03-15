import { Button, buttonBaseClasses } from "@mui/material";
import React from "react";

function DemoSliderButton(props: any) {
  return (
    <button className='rounded-[2rem] hover:bg-gray-700 duration-500 border flex flex-1 px-3 py-1 justify-center items-center bg-black text-white font-extralight'>
      {props.text}
    </button>
  );
}

export default DemoSliderButton;
