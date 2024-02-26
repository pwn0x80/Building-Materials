import { useEffect, useState } from "react";
const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-blue-600 w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>

)
const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-blue-600 rotate-180 w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
)
export const Pagination = ({ totalPage, currentPage, setPage }: any) => {
  const currentSelectedPageParam = Number(currentPage);
  const currentSelectedPage = currentSelectedPageParam === 0 ? 1 : currentSelectedPageParam;
  const showCaseNumber = 5;
  const subtract = 3;
  const [numbers, setNumbers] = useState<number[]>([]);
  useEffect(() => {
    calculateNumbers();
  }, [currentSelectedPage, totalPage]);

  const calculateNumbers = () => {
    let numbers: any = [];
    if (currentSelectedPage >= 3 && currentSelectedPage <= totalPage - 2) {
      let skip = Math.abs(subtract - currentSelectedPage)
      for (let i = 1 + skip; i <= skip + showCaseNumber; i++) {
        numbers.push(i);
      }
    } else {
      if (showCaseNumber > currentSelectedPage) {
        for (let i = 1; i <= (showCaseNumber < totalPage ? showCaseNumber : totalPage); i++) {
          numbers.push(i)
        }
      } else {
        let initialValue = (totalPage - (showCaseNumber - 1)) < 1 ? 1 : (totalPage - (showCaseNumber - 1))
        for (let i = initialValue; i <= totalPage; i++) {
          numbers.push(i)
        }
      }
    }
    setNumbers(numbers);
  };

  const onLeftTrigger = () => {
    if (currentSelectedPage <= 1) return;
    setPage({ page: String(currentSelectedPage - 1) })
  }
  const onRightTrigger = () => {
    setPage({ page: String(currentSelectedPage + 1) })
  }



  return (
    <>
      {totalPage != 0 ?
        <div className={`place-content-center justify-self-center flex gap-2 py-20`}>
          <button className={`${currentSelectedPage <= 1 ? "invisible" : "visible"}`} onClick={onLeftTrigger} ><ArrowLeftIcon /></button>
          {numbers.map((pageNumber, key) => {
            return (
              <div
                onClick={() => setPage({ page: String(pageNumber) })}
                key={key} className={`${currentSelectedPage === pageNumber ? "bg-blue-100" : "bg-blue-400 text-white"} rounded-full w-8 bold-[400] text-sm border-2 border-indigo-400/75 
h-8 items-center flex justify-center`}> {pageNumber}</div>
            )
          })}
          <button
            className={`${currentSelectedPage >= totalPage ? "invisible" : "visible"}`}
            onClick={onRightTrigger}><ArrowRightIcon /> </button>
        </div> : ""
      }
    </>

  )
}


