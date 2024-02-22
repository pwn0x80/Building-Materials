const PhotoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white w-12 h-12">
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
  </svg>

)
export const LoaderSkeleton = (props: {}) => {
  return (
    <div className='animate-pulse	 grid gap-9 grid-cols-1 sm:grid-cols-[minmax(140px,1fr)_minmax(120px,1fr)]'>
      <div className='flex items-center justify-center rounded-md bg-gray-300  h-[200px] sm:h-[400px]'>
        <div className='  sm:h-[100%] place-self-center  '>
          {/* <PhotoIcon /> */}
        </div>
      </div>


      <div>
        <div className='min-w-48   my-3 bg-gray-300 rounded-md h-8'></div>
        <div className='w-64  my-3 bg-gray-300 rounded-md h-8 '></div>

        <div className='flex gap-2'>
          <div className='bg-gray-300  w-28  my-3  rounded-md h-8'>
          </div>
          <div className='bg-gray-300  w-28  my-3  rounded-md h-8'>
          </div>
        </div>
        <div className='py-2'>
          <div className='bg-gray-300  w-40  my-3  rounded-md h-8'></div>
          <p className="bg-gray-300 h-64  w-full  my-3  rounded-md">
          </p>

        </div>
      </div>
    </div >

  )
}
