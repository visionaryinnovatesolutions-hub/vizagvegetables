
import React, { useState } from "react";
import "./RythuBazarInfo.css";
import ImageViewer from "../image-viewer/ImageViewer";

const bazarList = [
  {
    id: "mvp",
    label: "MVP Colony",
    title: "MVP Rythu Bazar",
    description:
      "The MVP Rythu Bazar in Visakhapatnam (Vizag) is a popular local market located in MVP Colony, offering fresh vegetables, fruits, and flowers directly from farmers at potentially lower prices.",
    time: "6:00 AM - 7:00 PM",
    holiday: "Tuesday Holiday",
    images: [
      "https://content3.jdmagicbox.com/v2/comp/hyderabad/l2/040pxx40.xx40.220125171654.w2l2/catalogue/rythu-bazar-kukatpally-hyderabad-59irncibtd.jpg",
      "https://www.connectingtraveller.com/images/localtip/1630871685images%20(21).jpeg",
      "https://media.andhrajyothy.com/media/2022/20221214/Untitled_3055_55d2d4511c.jpg"
    ],
    mapUrl:
      "https://www.google.com/maps?q=MVP%20Colony%20Rythu%20Bazar&output=embed"
  },
  {
    id: "narasimha",
    label: "Narasimhanagar",
    title: "Narasimhanagar Rythu Bazar",
    description:
      "Narasimhanagar Rythu Bazar serves fresh vegetables and fruits sourced directly from farmers for local residents.",
    time: "6:00 AM - 7:00 PM",
    holiday: "Tuesday Holiday",
    images: [
      "https://content3.jdmagicbox.com/v2/comp/hyderabad/l2/040pxx40.xx40.220125171654.w2l2/catalogue/rythu-bazar-kukatpally-hyderabad-59irncibtd.jpg",
      "https://www.connectingtraveller.com/images/localtip/1630871685images%20(21).jpeg",
      "https://media.andhrajyothy.com/media/2022/20221214/Untitled_3055_55d2d4511c.jpg"
    ],
    mapUrl:
      "https://www.google.com/maps?q=Narasimhanagar%20Rythu%20Bazar&output=embed"
  },
  {
    id: "gajuwaka",
    label: "Gajuwaka",
    title: "Gajuwaka Rythu Bazar",
    description:
      "One of the busiest Rythu Bazars in Vizag, providing affordable daily essentials directly from farmers.",
    time: "6:00 AM - 7:00 PM",
    holiday: "Tuesday Holiday",
    images: [
      "https://content3.jdmagicbox.com/v2/comp/hyderabad/l2/040pxx40.xx40.220125171654.w2l2/catalogue/rythu-bazar-kukatpally-hyderabad-59irncibtd.jpg",
      "https://www.connectingtraveller.com/images/localtip/1630871685images%20(21).jpeg",
      "https://media.andhrajyothy.com/media/2022/20221214/Untitled_3055_55d2d4511c.jpg"
    ],
    mapUrl:
      "https://www.google.com/maps?q=Gajuwaka%20Rythu%20Bazar&output=embed"
  },
  {
    id: "ukkunagaram",
    label: "Ukkunagaram",
    title: "Ukkunagaram Rythu Bazar",
    description:
      "Ukkunagaram Rythu Bazar supports local farmers and provides fresh produce to the surrounding areas.",
    time: "6:00 AM - 7:00 PM",
    holiday: "Tuesday Holiday",
    images: [
      "https://content3.jdmagicbox.com/v2/comp/hyderabad/l2/040pxx40.xx40.220125171654.w2l2/catalogue/rythu-bazar-kukatpally-hyderabad-59irncibtd.jpg",
      "https://www.connectingtraveller.com/images/localtip/1630871685images%20(21).jpeg",
      "https://media.andhrajyothy.com/media/2022/20221214/Untitled_3055_55d2d4511c.jpg"
    ],
    mapUrl:
      "https://www.google.com/maps?q=Ukkunagaram%20Rythu%20Bazar&output=embed"
  },
  {
    id: "gopalapatnam",
    label: "Gopalapatnam",
    title: "Gopalapatnam Rythu Bazar",
    description:
      "A well-known Rythu Bazar serving the northern parts of Vizag city.",
    time: "6:00 AM - 7:00 PM",
    holiday: "Tuesday Holiday",
    images: [
      "https://content3.jdmagicbox.com/v2/comp/hyderabad/l2/040pxx40.xx40.220125171654.w2l2/catalogue/rythu-bazar-kukatpally-hyderabad-59irncibtd.jpg",
      "https://www.connectingtraveller.com/images/localtip/1630871685images%20(21).jpeg",
      "https://media.andhrajyothy.com/media/2022/20221214/Untitled_3055_55d2d4511c.jpg"
    ],
    mapUrl:
      "https://www.google.com/maps?q=Gopalapatnam%20Rythu%20Bazar&output=embed"
  }
];


const RythuBazarInfo = () => {
 
   const [activeId, setActiveId] = useState("mvp");
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
                  alt=""
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
            title="Rythu Bazar Location"
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
