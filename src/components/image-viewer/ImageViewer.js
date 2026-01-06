
import React, { useEffect } from "react";
import "./ImageViewer.css";

const ImageViewer = ({ images, activeIndex, onClose, onPrev, onNext }) => {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "auto";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div className="iv-overlay">
      <button className="iv-close" onClick={onClose}>✕</button>

      <button className="iv-nav left" onClick={onPrev}>❮</button>

      <img
        src={images[activeIndex]}
        alt="Rythu Bazar"
        className="iv-image"
      />

      <button className="iv-nav right" onClick={onNext}>❯</button>
    </div>
  );
};

export default ImageViewer;
