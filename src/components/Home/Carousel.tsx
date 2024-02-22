import React, { useState, useRef, useEffect, MutableRefObject } from 'react';

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
      <div className="max-w-[57rem]  m-auto relative">
        <div
          style={{ boxShadow: '0px 0px 23px 0px rgba(0,0,0,0.51)' }}
          className="aspect-video no-scrollbar flex rounded-2xl overflow-x-auto scroll-smooth snap-mandatory snap-x"
          onScroll={handleScroll}
          ref={containerRef}

        >
          <img
            ref={(el) => (imageRefs.current[0] = el)}
            id="slider-1"
            className={`flex-[1_0_100%] object-cover backdrop-brightness-50 snap-center`}
            src="https://media.istockphoto.com/id/821134188/photo/construction-iron.jpg?s=2048x2048&w=is&k=20&c=t9mWDX3E51_tPZo593YnumOKJ84yOohMgWykJG67DOA="
            alt="..."
          />
          <img
            ref={(el) => (imageRefs.current[1] = el)}
            id="slider-2"
            className={`flex-[1_0_100%] object-cover rounded-2xl brightness-50 snap-center`}
            src="https://media.istockphoto.com/id/836200296/photo/abstract-pattern-of-aged-pvc-pipe-with-sun-lights.jpg?s=1024x1024&w=is&k=20&c=30OHWqC5rjnVYSwYERmDAqMFc1rH0DeWiVT3FMzkFBI="
            alt="..."
          />
          <img
            ref={(el) => (imageRefs.current[2] = el)}
            id="slider-3"
            className={`flex-[1_0_100%] object-cover rounded-2xl snap-center`}
            src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
            alt="..."
          />
        </div>
        <div className="grid bottom-0 absolute right-0 left-0 grid-template-columns: 1fr 1fr 1fr items-center">
          <div className="flex col-start-2 bg-custom-color">
            {[1, 2, 3].map((index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`m-1 w-2 h-2 rounded-full ${activeSlider === index ? 'bg-blue-600' : 'bg-white'

                  }`}
              //     href={`#slider-${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
