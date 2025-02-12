import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { IoChatboxOutline, IoHeartOutline, IoBookmarkOutline, IoPlayOutline } from 'react-icons/io5'
import { AiOutlineLike } from 'react-icons/ai'
import './style.css'

const Quickies = forwardRef(({ src, score, comment_count }:{src:string, score:number, comment_count:number}, ref) => {
  const videoRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const icon_size = 18

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        try{
            videoRef.current.play();
            setIsPlaying(true);
        }catch{}
        
      } else {
        try{
            videoRef.current.pause();
            setIsPlaying(false);    
        }catch{}
        
      }
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            try{
                videoRef.current.play();
                setIsPlaying(true);
            }catch{}

            
          } else {
            try{
                videoRef.current.pause();
                setIsPlaying(false);
            }catch{}
            
          }
        });
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div ref={ref as any} className="flex quickie h-full justify-center items-center snap-start w-fit mx-auto bg-gray-950">
      <div className="relative max-sm:w-full w-full h-full">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          loop
          
          onClick={togglePlayPause}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay para play/pause */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          onClick={togglePlayPause}
        >
          {!isPlaying && (
            <div className="text-white text-6xl animate-fade-in">
              <IoPlayOutline />
            </div>
          )}
        </div>

        {/* Botões de interação */}
        <div className="absolute bg-black bg-opacity-30 p-2  rounded-md bottom-4 right-4 flex flex-col space-y-2">
          <button className="text-white">
            <AiOutlineLike size={icon_size}/>
            <span className='text-sm'>{score}</span>
          </button>
          <button className="text-white">
            <IoChatboxOutline size={icon_size}/>
            <span className='text-sm'>{comment_count}</span>
          </button>
          <button className="text-white">
            <IoHeartOutline size={icon_size}/>
          </button>
          <button className="text-white">
            <IoBookmarkOutline size={icon_size}/>
          </button>
        </div>

        
        <div className="absolute bottom-4 left-4 text-white">
          <p className="font-bold text-shadow">Rule 34 artist</p>
          <button className="bg-white text-black px-4 py-1 rounded-full mt-2">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
});

Quickies.displayName = 'Quickies';

export default Quickies;