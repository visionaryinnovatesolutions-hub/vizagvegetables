
import React, { useState } from "react";
import "./RythuBazarInfo.css";
import ImageViewer from "../image-viewer/ImageViewer";
import bazarList from "../../RythuBazarData";

const RythuBazarInfo = () => {

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
    <section className="rb-section" id="rythu">
      <div className="container-1440">

        <div className="rbsection-header">
          <h2>Rythubazar info</h2>
        </div>

        {/* TABS */}
        <div className="rb-tabs">
          {bazarList.map(item => (
            <button
              key={item.id}
              className={activeId === item.id ? "active" : ""}
              onClick={() => setActiveId(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="rb-content">
          {/* LEFT */}
          <div className="rb-left">
            <p className="rb-desc">{activeBazar.description}</p>
            <div className="rb-meta">
              <p><strong>Times:</strong></p>
              <p>{activeBazar.time}</p>
              <p>{activeBazar.holiday}</p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="rb-right">
            <div className="rb-images">
              {activeBazar.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={activeBazar.title}
                  className={i === 0 ? "big" : ""}
                  onClick={() => openViewer(i)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* MAP */}
        <div className="rb-map">
          <iframe
            src={activeBazar.mapUrl}
            loading="lazy"
            allowFullScreen
            title={activeBazar.title}
          />
        </div>

      </div>

      {/* IMAGE VIEWER */}
      {viewerOpen && (
        <ImageViewer
          images={activeBazar.images}
          activeIndex={activeImage}
          onClose={closeViewer}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </section>
  );
};

export default RythuBazarInfo;
