import FeatureCard from '@components/FeatureCard/FeatureCard'
import { Carousel } from '@components/Home/Carousel'
import ScrollCard from '@components/ScrollCard/ScrollCard'
import React from 'react'

export const Home = (props: {}) => {
 
  return (
    <div>
      <Carousel />
      <FeatureCard />
      <ScrollCard />

    </div>
  )
}
