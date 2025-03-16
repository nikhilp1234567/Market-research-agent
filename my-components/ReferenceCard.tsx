import React from "react";

type specifiedTypes = {
  name: string;
  reference: string;
};

function ReferenceCard({ name, reference }: specifiedTypes) {
  return (
    <div className='h-100'>
      <div className='flex h-100 items-center flex-row gap-3'>
        <img src='null' alt='' className='h-5 w-5' />
        {/* need to add a profile img */}
        <h1 className='text-3xl font-bold'>{name}</h1>
      </div>
      <p className='text-xl mt-3 font-extralight'>{reference}</p>
    </div>
  );
}

export default ReferenceCard;
