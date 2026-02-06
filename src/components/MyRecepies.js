import React, { useEffect, useState } from "react";
import myRecepies from "../data/my-recepies.json";
import TYPES from "../data/types.json";
import Bubble from "./Bubble";
import "./MyRecepies.css";

const MyRecepies = ({ loadRecipe, reset }) => {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedBuff, setSelectedBuff] = useState(null);

  useEffect(() => {
    if (selectedBuff && selectedType) {
      let sandwiches = myRecepies
        .slice(0, -1)
        .filter((item) => item.title === selectedBuff)[0].sandwiches;
      let sandwich = sandwiches.filter(
        (sandwich) => sandwich.type === selectedType
      )[0];

      if (sandwich.note) {
        alert(sandwich.note);
        setSelectedType(null);
        return;
      }
      loadRecipe(sandwich.recepie);
    }
  }, [selectedBuff, selectedType]);
  return (
    <div className="MyRecepies">
      <div>
        <h4>Select type:</h4>
        <div className="MyRecepies__grid">
          {TYPES.sort().map((type) => (
            <Bubble
              key={type}
              isType
              label={type}
              onClick={() => setSelectedType(type)}
              selected={selectedType === type}
            />
          ))}
        </div>
      </div>
      <div>
        <h4>Select buff :</h4>
        <div className="MyRecepies__grid">
          {myRecepies.slice(0, -1).map((buff) => (
            <div
              key={buff.title}
              className={`MyRecepies__buff ${
                selectedBuff === buff.title ? "is-selected" : ""
              }`}
              onClick={() => setSelectedBuff(buff.title)}
            >
              <h2 className="MyRecepies__buff__title">{buff.title}</h2>
              {buff.note && (
                <div className="MyRecepies__buff__note">{buff.note}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {(selectedBuff || selectedType) && (
        <button
          className="MyRecepies__button"
          onClick={() => {
            setSelectedBuff(null);
            setSelectedType(null);
            reset();
          }}
        >
          Reset
        </button>
      )}
    </div>
  );
};

export default MyRecepies;
