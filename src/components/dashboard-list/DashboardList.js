
import React, { useEffect, useMemo, useState } from "react";
import Papa from "papaparse";
import "./DashboardList.css";

/* ================= TREND ICONS ================= */

const TrendUpIcon = () => (
  <svg viewBox="0 0 24 24" className="trend-icon">
    <path
      d="M4 16L10 10L14 14L20 8"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 8H20V14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TrendDownIcon = () => (
  <svg viewBox="0 0 24 24" className="trend-icon">
    <path
      d="M4 8L10 14L14 10L20 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 16H20V10"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ================= CONFIG ================= */

const categories = [
  { key: "all", label: "All" },
  { key: "favorite", label: "Fav" },
  { key: "vegetables", label: "Vegetables" },
  { key: "leafy green", label: "Leafy Green" },
  { key: "fruits", label: "Fruits" },
  { key: "flowers", label: "Flowers" }
];

const REQUIRED_ORDER = {
  TOP1: 1,
  TOP2: 2,
  TOP3: 3,
  BOTTOM: 4
};

const ITEMS_PER_PAGE = 36;
const REFRESH_INTERVAL = 60000; // 60 sec

/* ================= HELPERS ================= */

const getNumber = (price) => {
  if (!price) return null;
  const num = price.toString().match(/\d+(\.\d+)?/);
  return num ? Number(num[0]) : null;
};

const getPriceStatus = (today, yesterday) => {
  if (today == null || yesterday == null) return null;
  if (today > yesterday) return { type: "up", diff: today - yesterday };
  if (today < yesterday) return { type: "down", diff: yesterday - today };
  return { type: "same", diff: 0 };
};

/* ================= COMPONENT ================= */

const DashboardList = () => {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [lastUpdated, setLastUpdated] = useState(null);

  const todayDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "2-digit"
  });

  /* ===== CSV FETCH ===== */
  const fetchCsvData = () => {
    fetch(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vS6oouTaZ4TnXZPfnUeyU5Wk5YJ56nmmenCuw0GMKt137-6nFfxUsIuysPx0onBlP7TM25W7dmz9CuP/pub?output=csv",
      { cache: "no-store" }
    )
      .then((res) => res.text())
      .then((csvText) => {
        const parsed = Papa.parse(csvText, { skipEmptyLines: true });
        const rows = parsed.data.slice(3);

        const formatted = rows.map((row) => ({
          nameTelugu: row[1],
          nameEnglish: row[2],
          favorite: row[3]?.toUpperCase() === "YES",
          required: row[4]?.toUpperCase(),
          category: row[5]?.toLowerCase(),
          todayPrice: row[6],
          yesterdayPrice: row[7],
          image: row[8]
        }));

        const visibleItems = formatted
          .filter((item) => item.required !== "HIDE")
          .sort(
            (a, b) =>
              (REQUIRED_ORDER[a.required] || 99) -
              (REQUIRED_ORDER[b.required] || 99)
          );

        setData(visibleItems);

        // ✅ last updated time
        setLastUpdated(
          new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit"
          })
        );
      })
      .catch((err) => console.error("CSV fetch failed", err));
  };

  /* ===== INITIAL + AUTO REFRESH ===== */
  useEffect(() => {
    fetchCsvData();
    // const interval = setInterval(fetchCsvData, REFRESH_INTERVAL);
    // return () => clearInterval(interval);
  }, []);

  /* ===== FILTER ===== */
  const filteredData = useMemo(() => {
    let list = [...data];

    if (selectedCategory === "favorite") {
      list = list.filter((item) => item.favorite);
    } else if (selectedCategory !== "all") {
      list = list.filter((item) => item.category === selectedCategory);
    }

    if (searchText.trim()) {
      const q = searchText.toLowerCase();
      list = list.filter(
        (item) =>
          item.nameEnglish?.toLowerCase().includes(q) ||
          item.nameTelugu?.toLowerCase().includes(q)
      );
    }

    return list;
  }, [data, selectedCategory, searchText]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  useEffect(() => setPage(1), [selectedCategory, searchText]);

  return (
    <section className="price-section">
      <div className="container-1440">
        <div className="price-header">
          <div className="date">📅 {todayDate}</div>
          <h2>Today’s Vizag Rythu Bazar Prices</h2>
          {lastUpdated && (
            <div className="last-updated">
              {/* Last updated: {lastUpdated} */}
            </div>
          )}
        </div>

        <div className="filter-row">
          <div className="categories">
            {categories.map((cat) => (
              <button
                key={cat.key}
                className={selectedCategory === cat.key ? "active" : ""}
                onClick={() => setSelectedCategory(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search items"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>

        <p className="count">{filteredData.length} Items</p>

        <div className="grid">
          {paginatedData.map((item, index) => {
            const today = getNumber(item.todayPrice);
            const yesterday = getNumber(item.yesterdayPrice);
            const status = getPriceStatus(today, yesterday);

            return (
              <div className="card" key={index}>
                <div className="image-box">
                  <img
                    src={item.image}
                    alt={item.nameEnglish}
                    onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/150?text=No+Image")
                    }
                  />


                  <div className="price-graph">
                      {status && status.type !== "same" && (
                        <span className={`price-change ${status.type}`}>
                          {status.type === "up" ? (
                            <TrendUpIcon />
                          ) : (
                            <TrendDownIcon />
                          )}
                          ₹{status.diff}
                        </span>
                      )}

                      {status && status.type === "same" && (
                        <span className="price-change same"></span>
                      )}
                  </div>
                </div>

                <div className="card-body">
                  <div className="telugu">{item.nameTelugu}</div>


                  <div className="card-body-topsec">

                    <div className="english">{item.nameEnglish}</div>

                    <div className="price-row">
                      <span className="today">₹ {item.todayPrice} <small>Kg</small></span>        
                    </div>

                  </div>

    

                  
                  <div className="yesterday">
                    <span className="yesterday-left">Yesterday</span> 
                    <span className="yesterday-right">₹ {item.yesterdayPrice} <small>Kg</small></span>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                className={page === i + 1 ? "active" : ""}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default DashboardList;
