import React from 'react';
import { Link } from "react-router-dom"
const navigation = [
  {name:'Sheet',href:'/c/sheet', src:'/images/feature_card/asbestorSheet2.jpg'},
  {name:'Cement', href:'/c/cement', src:'/images/feature_card/cement.jpg'}
]
export default function FeatureCard() {
  return (
    <div className={"flex flex-wrap justify-center gap-2 py-3"}>

      {navigation.map((item,key)=>(
      <Link key={key} to={item?.href} className="max-w-[380px] w-[17%] min-w-[250px]   relative">
        <div style={{ boxShadow: '2px 2px 6px #040437' }} className="h-[110px] rounded-lg bg-[#5aa0b5]">
          <img
            className="max-h-[110px] w-full object-cover h-screen rounded-lg"
            src={process.env.PUBLIC_URL + item?.src}
            alt="Feature Image"
          />
        </div>
        <div className="capitalize font-bold absolute bottom-0 left-0  p-1 text-yellow-50">
          <p>{item?.name}</p>
        </div>
      </Link>
      ))}
    </div>
  );
}
