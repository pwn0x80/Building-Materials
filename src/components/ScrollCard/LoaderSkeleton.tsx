import React from 'react'
const PhotoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white w-12 h-12">
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
  </svg>
)
export const LoaderSkeleton = (props: {}) => {
  const skeletons = Array.from({ length: 6 }, (_, index) => (
    <div key={index} className='flex-[1_0_100%] border-2 border-solid snap-center min-w-[125px] max-w-[250px] rounded overflow-hidden shadow-lg'>
      <div className='relative bg-gray-200 min-h-56 flex items-center justify-center mb-4'>
        <PhotoIcon />
      </div>
      <div className="animate-pulse px-6 py-4">
        <div className="mb-2 min-h-[55px]">
          <div className="w-36 my-3 bg-gray-300 h-6 rounded-md"></div>
          <div className="w-32 bg-gray-300 h-6 rounded-md"></div>
        </div>
      </div>
    </div>
  ));

  return <>{skeletons}</>;
};
