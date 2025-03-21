import React from "react";

type specifiedTypes = {
  name: string;
  reference: string;
};

function ReferenceCard({ name, reference }: specifiedTypes) {
  return (
    <div className='min-h-full p-6 flex flex-col'>
      <div className='flex h-100 items-center flex-row gap-3'>
        <img src='/images/profile.png' alt='' className='h-8 w-8' />
        <h1 className='text-3xl font-bold'>{name}</h1>
      </div>
      <p className='text-xl mt-3 font-extralight'>{reference}</p>
    </div>
  );
}

export default ReferenceCard;
