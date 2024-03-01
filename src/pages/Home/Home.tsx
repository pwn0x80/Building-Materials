import FeatureCard from '@components/FeatureCard/FeatureCard'
import { Carousel } from '@components/Home/Carousel'
import ScrollCard from '@components/ScrollCard/ScrollCard'
import React from 'react'

export const Home = (props: {}) => {
 
  return (
    <div className='pb-12'>
      <Carousel />
      <FeatureCard />
      <ScrollCard />
      {/* TODO create separate component */}
      <div className='py-12 flex justify-center items-center'>
        <img src={"https://files.catbox.moe/m8o16n.png"} />
      </div>

    </div>
  )
}
