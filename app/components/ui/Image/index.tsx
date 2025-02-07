'use client'
import { useEffect, useState } from "react";

interface CustomImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  placeholderSrc?: string;
}

export default function CustomImage({ src, placeholderSrc, ...props }: CustomImageProps) {
  const [currentSrc, setCurrentSrc] = useState(placeholderSrc || src);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!placeholderSrc) return; // Se não tiver placeholder, não precisa trocar a imagem

    const img = new Image();
    img.src = src as string;

    img.onload = () => {
      setCurrentSrc(src as string);
      setLoaded(true);
    };
  }, [src, placeholderSrc]);

  return (
    <img
      {...props}
      src={currentSrc}
      className={`custom-image ${props.className || ""} ${loaded ? "loaded" : ""}`}
      
    />
  );
}
