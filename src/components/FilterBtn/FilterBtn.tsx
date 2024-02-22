import React, {useEffect, useState} from 'react'
const  tmpData= [
{
    id:"1",
    name:"cement"
},
{
    id:"2",
    name:"sheet"
},
    {
        id:"1",
        name:"cement"
    },
    {
        id:"2",
        name:"sheet"
    },{
        id:"1",
        name:"cement"
    },
    {
        id:"2",
        name:"sheet"
    },{
        id:"1",
        name:"cement"
    },
    {
        id:"2",
        name:"sheet"
    },{
        id:"1",
        name:"cement"
    },
    {
        id:"2",
        name:"sheet"
    },{
        id:"1",
        name:"cement"
    },
    {
        id:"2",
        name:"sheet"
    },{
        id:"1",
        name:"cement"
    },
    {
        id:"2",
        name:"sheet"
    },
];

export default function FilterBtn() {
    const [stateClick,setBtnOnClicked ]= useState("");
    useEffect(()=>{

        if(stateClick===""){ console.log("null type") }else{ console.log("test")}
    },[stateClick])
    return (
        <div className="container gap-x-3 grid  grid-cols-[min-content,1fr] sm:grid-cols-[min-content,60%] ">
            <span className=" ">Filter:</span>
            <span className="flex gap-x-2  gap-y-2 flex-wrap text-[0.7rem] content-center  uppercase">
            {tmpData?.map((data) => {
                return (
                    <span key={data?.id} onClick={()=>{(stateClick===data?.id)?setBtnOnClicked("") : setBtnOnClicked(data?.id)}}
                          className={`${
                              data?.id === stateClick ? 'bg-sky-200' : 'bg-sky-100'
                          } h-5 border-1 radius px-3 rounded-full flex items-center sm:font-semibold font-medium`}
                    >
                {data.name}
            </span>
                )
            })}
            </span>
        </div>
    )

}
