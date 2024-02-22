import React, { useState } from 'react'
import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";
import useSWRMutation from 'swr/mutation'
const LoadingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 animate-spin">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>

)
async function createNewCategory(url: string, { arg }: { arg: any }) {
  const { body } = arg
  try {
    const data = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(body)
    }).then((data) => data.json());
    return data;
  } catch (err) {
    throw new Error("Something went wrong try again")
  }
}
function fallbackRender({ error, resetErrorBoundary }: any) {
  return (
    <div role="alert">
      <pre style={{ color: "red" }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  );
}

export const AddCategory = (props: {}) => {

  return (
    <>
      <ErrorBoundary
        fallbackRender={fallbackRender}
        onReset={(details) => {
          console.log(details)
        }}
      >
        <AddNewCategory />
      </ErrorBoundary>
    </>
  )
}
const AddNewCategory = () => {
  const { trigger, isMutating, data, error } = useSWRMutation(`${process.env.REACT_APP_API_BASE_URL}admin/addCategory`, createNewCategory, {});
  const [ctyState, setCty] = useState("");
  const { showBoundary } = useErrorBoundary();
  if (error) {
    showBoundary({ message: 'retriving error' });
  }

  return (
    <div className='px-3 py-2 grid gap-3'>
      <div className='font-extrabold text-3xl capitalize'>
        category
      </div>
      <form className='flex gap-x-2' onSubmit={async (data) => {
        data.preventDefault()
        await trigger({ body: { cty: ctyState } })
      }}>
        <input onChange={(event) => setCty(event.target.value)} name="cty" className='bg-blue-100 h-8' placeholder='enter category' type="text" />
        <button disabled={isMutating} type='submit' className='px-3 bg-red-600 rounded-md  text-[white] font-bold py-1'>
          {isMutating == false ? 'Add' : <LoadingIcon />} </button>
      </form>
      {isMutating==false? data?.status == "error" ? <div className='text-red-500 font-bold'>{data?.message}</div> : <div className='text-blue-700 font-bold'>{data?.message}</div>:""}
    </div>
  )
}
