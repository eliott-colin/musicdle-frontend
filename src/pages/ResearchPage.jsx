import { useState } from "react";
import "../components/researchPage.css";

function ResearchPage() {
  // state
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("RAP/HIP-HOP");

  // mock data
  const categories = ["RAP/HIP-HOP", "ROCK", "POP"];

  const artists = [
    { id: 1, name: "PartyNextDoor" },
    { id: 2, name: "Drake" },
    { id: 3, name: "The Weeknd" },
    { id: 4, name: "Future" },
    { id: 5, name: "Georges Brassens" },
  ];

  const decades = [
    { id: 1, label: "ANNÉES 2000" },
    { id: 2, label: "ANNÉES 90" },
    { id: 3, label: "ANNÉES 80" },
    { id: 4, label: "ANNÉES 70" },
  ];

  const locations = [{ id: 1, label: "BORDEAUX, FRANCE" }];

  return (
    <section className="search-page">
      {/* SEARCH BAR */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher, un artiste, une musique, une playlist"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {/* CATEGORIES */}
      <div className="categories">
        <button>◀</button>

        {categories.map((cat) => (
          <button
            key={cat}
            className={activeCategory === cat ? "active" : ""}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}

        <button>▶</button>
      </div>

      {/* ARTISTS */}
      <h2>ARTISTES</h2>
      <div className="row">
        {artists.map((artist) => (
          <div key={artist.id} className="card">
            <div className="img-placeholder" />
            <p>{artist.name}</p>
          </div>
        ))}
      </div>

      {/* DECADES */}
      <h2>TEMPORALITÉ</h2>
      <div className="row">
        {decades.map((item) => (
          <div key={item.id} className="card">
            <div className="img-placeholder" />
            <p>{item.label}</p>
          </div>
        ))}
      </div>

      {/* LOCATION */}
      <h2>LOCALISATION</h2>
      <div className="row">
        <div className="card large">
          <div className="nav-arrows">◀ ▶</div>
        </div>

        <div className="card large map">
          <div className="map-placeholder">^</div>
          <p>BORDEAUX, FRANCE</p>
        </div>
      </div>
    </section>
  );
}

export default ResearchPage;
