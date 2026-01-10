
import React, { useState } from "react";
import "./RythuBazar.css";
import bazarList from "../RythuBazarData";
import ImageViewer from "../components/image-viewer/ImageViewer";


const RythuBazar = () => {

  const [activeId, setActiveId] = useState(bazarList[0].id);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const activeBazar = bazarList.find(b => b.id === activeId);

  const openViewer = (index) => {
    setActiveImage(index);
    setViewerOpen(true);
  };

  const closeViewer = () => setViewerOpen(false);

  const nextImage = () =>
    setActiveImage((prev) =>
      (prev + 1) % activeBazar.images.length
    );

  const prevImage = () =>
    setActiveImage((prev) =>
      (prev - 1 + activeBazar.images.length) %
      activeBazar.images.length
    );

  return (
    <div className="rythu-page container-1440">

      {/* LEFT – VERTICAL TABS */}
      <div className="rythu-left">
        {bazarList.map((bazar) => (
          <div
            key={bazar.id}
            className={`rythu-tab ${
              activeId === bazar.id ? "active" : ""
            }`}
            onClick={() => setActiveId(bazar.id)}
          >
            <h4>{bazar.title}</h4>
            <p>{bazar.label}</p>
          </div>
        ))}
      </div>

      {/* RIGHT CONTENT */}
      <div className="rythu-right">
        <h2>{activeBazar.title}</h2>

        <p className="rb-desc">{activeBazar.description}</p>

        <div className="info-card">
          <p><strong>Timings:</strong> {activeBazar.time}</p>
          <p>{activeBazar.holiday}</p>
        </div>

        {/* ✅ IMAGES */}
        <div className="rb-images">
          {activeBazar.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={activeBazar.title}
              onClick={() => openViewer(i)}
            />
          ))}
        </div>

        {/* ✅ MAP */}
        <div className="rb-map">
          <iframe
            src={activeBazar.mapUrl}
            loading="lazy"
            allowFullScreen
            title={activeBazar.title}
          />
        </div>

      </div>

      {/* ✅ IMAGE VIEWER */}
      {viewerOpen && (
        <ImageViewer
          images={activeBazar.images}
          activeIndex={activeImage}
          onClose={closeViewer}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </div>
  );
};

export default RythuBazar;
