import React from 'react'

export const Location = (props: {}) => {
  return (
    <div>
    <div className='p-3'>
      <div className='flex gap-4'>
        {/* <div><span>Location </span> </div> */}
        <div>
          <div>pincode</div>
          <input
            placeholder='enter pincode'
            type="text"
            className='p-1 bg-lime-50'
          />
        </div>
        <div>
          <div>Shipping Charge</div>
          <input
            placeholder='enter shipping charge'
            type="text"
            className='p-1 bg-lime-50'
          />
        </div>

      </div>
      <div className='my-2'>
        <button className='text-[white] font-bold bg-green-500 px-4 py-1 rounded drop-shadow-md '>Add</button>
      </div>
    </div>
    </div>
  )
}
