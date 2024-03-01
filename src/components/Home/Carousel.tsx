import React, { useState, useRef, useEffect, MutableRefObject } from 'react';
import Slider from "@components/Carousel/Carousel"

export const Carousel: React.FC = () => {
  const [activeSlider, setActiveSlider] = useState<number>(1);
  const imageRefs = useRef<[HTMLImageElement | null, HTMLImageElement | null, HTMLImageElement | null]>([null, null, null]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleDotClick = (sliderNumber: number) => {
    setActiveSlider(sliderNumber);
    if (containerRef.current) {



      var elem = document.getElementById("slider-" + sliderNumber);
      if (elem !== null) {
        containerRef.current.scrollBy(elem.getBoundingClientRect().left, 0)
      }
    }
  };


  const handleScroll = () => {
    if (containerRef.current) {
      const scrollPosition = containerRef.current.scrollLeft;
      const sliderWidth = containerRef.current.clientWidth;
      const newActiveSlider = Math.round(scrollPosition / sliderWidth) + 1;
      setActiveSlider(newActiveSlider);


    }
  };
  return (
    <div className="container pt-[58px]">
      <Slider
         img={[ 
         "https://files.catbox.moe/grwdtn.jpeg", 
          // "https://files.catbox.moe/y91mab.jpg",
          "https://media.istockphoto.com/id/836200296/photo/abstract-pattern-of-aged-pvc-pipe-with-sun-lights.jpg?s=1024x1024&w=is&k=20&c=30OHWqC5rjnVYSwYERmDAqMFc1rH0DeWiVT3FMzkFBI=",
          // "https://flowbite.com/docs/images/carousel/carousel-1.svg",
          // "https://media.istockphoto.com/id/821134188/photo/construction-iron.jpg?s=2048x2048&w=is&k=20&c=t9mWDX3E51_tPZo593YnumOKJ84yOohMgWykJG67DOA=",
        ]}
      />
    </div>
  );
};
