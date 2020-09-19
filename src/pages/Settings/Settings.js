import React, { useState } from "react";
import WarningIcon from "@material-ui/icons/Warning";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DoneIcon from "@material-ui/icons/Done";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Modal from "../../components/Modal/Modal";

import "./Settings.css";

const theme = JSON.parse(localStorage.getItem("theme")) || {
  bgColor: "#E3E3E3",
  fgColor: "#F9F8F8",
  primaryColor: "#D16014",
  fontPrimaryColor: "#080808",
  fontSecondaryColor: "#080808",
};

const allSavedThemes = JSON.parse(localStorage.getItem("savedThemes"));

const Settings = () => {
  const [bgColor, setBgColor] = useState(theme.bgColor);
  const [fgColor, setFgColor] = useState(theme.fgColor);
  const [primaryColor, setPrimaryColor] = useState(theme.primaryColor);
  const [fontPrimaryColor, setFontPrimaryColor] = useState(
    theme.fontPrimaryColor
  );
  const [fontSecondaryColor, setFontSecondaryColor] = useState(
    theme.fontSecondaryColor
  );
  const [modalActive, setModalActive] = useState(false);
  const [savedThemes, setSavedThemes] = useState(allSavedThemes);

  const handleBgColor = (e) => {
    setBgColor(e.target.value);
    document.documentElement.style.setProperty("--clr-bg", e.target.value);
  };

  const handleFgColor = (e) => {
    setFgColor(e.target.value);
    document.documentElement.style.setProperty("--clr-fg", e.target.value);
  };

  const handlePrimaryColor = (e) => {
    setPrimaryColor(e.target.value);
    document.documentElement.style.setProperty("--clr-primary", e.target.value);
    document.documentElement.style.setProperty("--clr-hover", e.target.value);
  };

  const handleFontPrimaryColor = (e) => {
    setFontPrimaryColor(e.target.value);
    document.documentElement.style.setProperty(
      "--clr-txt-primary",
      e.target.value
    );
  };

  const handleFontSecondaryColor = (e) => {
    setFontSecondaryColor(e.target.value);
    document.documentElement.style.setProperty(
      "--clr-txt-secondary",
      e.target.value
    );
  };

  const saveTheme = () => {
    const colors = {
      bgColor,
      fgColor,
      primaryColor,
      fontPrimaryColor,
      fontSecondaryColor,
    };

    localStorage.setItem("theme", JSON.stringify(colors));
  };

  const setDefaultTheme = () => {
    localStorage.removeItem("theme");
    document.documentElement.style.setProperty("--clr-bg", "#E3E3E3");
    document.documentElement.style.setProperty("--clr-fg", "#F9F8F8");
    document.documentElement.style.setProperty("--clr-primary", "#D16014");
    document.documentElement.style.setProperty("--clr-hover", "#D16014");
    document.documentElement.style.setProperty("--clr-txt-primary", "#FFFFFF");
    document.documentElement.style.setProperty(
      "--clr-txt-secondary",
      "#080808"
    );
    setBgColor("#E3E3E3");
    setFgColor("#F9F8F8");
    setPrimaryColor("#D16014");
    setFontPrimaryColor("#FFFFFF");
    setFontSecondaryColor("#080808");
  };

  const addToFavourite = () => {
    const localStorageThemes = JSON.parse(localStorage.getItem("savedThemes"));
    if (localStorageThemes) {
      localStorageThemes.push(
        JSON.stringify({
          bgColor,
          fgColor,
          primaryColor,
          fontPrimaryColor,
          fontSecondaryColor,
        })
      );
      localStorage.setItem("savedThemes", JSON.stringify(localStorageThemes));
      setSavedThemes(localStorageThemes);
    } else {
      const localStorageThemes = [];
      localStorageThemes.push({
        bgColor,
        fgColor,
        primaryColor,
        fontPrimaryColor,
        fontSecondaryColor,
      });
      localStorage.setItem("savedThemes", JSON.stringify(localStorageThemes));
      setSavedThemes(localStorageThemes);
    }
  };

  const deleteFavouriteTheme = (index) => {
    const newSavedThemes = savedThemes.filter((_, i) => index !== i);
    setSavedThemes(newSavedThemes);
    localStorage.setItem("savedThemes", JSON.stringify(newSavedThemes));
  };

  const applyFavouriteTheme = (index) => {
    localStorage.setItem("theme", savedThemes[index]);
  };

  return (
    <div className="Settings">
      <div className="title">
        <h3>Theme</h3>
      </div>
      <div className="row">
        <div className="row-cell">
          <div className="subtitle">
            <p>Use the controls to change interface colors</p>
            <p>It may need a page refresh to work properly</p>
          </div>
          <div className="theme-inputs">
            <div className="color-picker">
              <p>
                background color <span className="bold-span">(#1)</span>
              </p>
              <input type="color" value={bgColor} onChange={handleBgColor} />
            </div>
            <div className="color-picker">
              <p>
                foreground color <span className="bold-span">(#2)</span>
              </p>
              <input type="color" value={fgColor} onChange={handleFgColor} />
            </div>
            <div className="color-picker">
              <p>
                primary color <span className="bold-span">(#3)</span>
              </p>
              <input
                type="color"
                value={primaryColor}
                onChange={handlePrimaryColor}
              />
            </div>
            <div className="color-picker">
              <p>
                primary font color <span className="bold-span">(#4)</span>
              </p>
              <input
                type="color"
                value={fontPrimaryColor}
                onChange={handleFontPrimaryColor}
              />
            </div>
            <div className="color-picker">
              <p>
                secondary font color <span className="bold-span">(#5)</span>
              </p>
              <input
                type="color"
                value={fontSecondaryColor}
                onChange={handleFontSecondaryColor}
              />
            </div>
            <div className="theme-btns">
              <button className="btn-primary" onClick={saveTheme}>
                Save
              </button>
              <button
                className="btn-primary"
                onClick={() => {
                  setModalActive(true);
                }}
              >
                Default
              </button>
              <Tooltip title={<span className="tooltip-txt">Favourite</span>}>
                <IconButton aria-label="delete" onClick={addToFavourite}>
                  <FavoriteIcon style={{ color: primaryColor }} />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="row-cell saved-themes-container">
          <div className="subtitle">
            <p>Your saved themes</p>
            <p>Refresh the page after setting your theme</p>
          </div>
          {savedThemes.length > 0 ? (
            savedThemes.map((theme, index) => {
              return (
                <SavedTheme
                  key={"" + theme.primaryColor + index}
                  colors={theme}
                  deleteFavouriteTheme={() => deleteFavouriteTheme(index)}
                  applyFavouriteTheme={() => applyFavouriteTheme(index)}
                />
              );
            })
          ) : (
            <div className="placeholder">
              Use{" "}
              <FavoriteIcon
                style={{ color: primaryColor, margin: "0 .5rem" }}
              />
              to save your theme
            </div>
          )}
        </div>
      </div>
      {modalActive && (
        <Modal>
          <div className="confirmation-message">
            <p>
              <WarningIcon style={{ marginRight: "1rem" }} />
              Are you sure you want to delete this entry ?
            </p>
            <div className="btn-group">
              <button
                className="btn-primary"
                onClick={() => {
                  setModalActive(false);
                  setDefaultTheme();
                }}
              >
                Yes
              </button>
              <button
                className="btn-primary"
                onClick={() => setModalActive(false)}
              >
                No
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

const SavedTheme = ({ colors, deleteFavouriteTheme, applyFavouriteTheme }) => {
  const parsedTheme = JSON.parse(colors);

  return (
    <>
      <div className="saved-theme">
        <div className="saved-theme-container">
          <div className="saved-theme-info">
            <div className="row-cont">
              <div className="col-cont">
                <p>#1</p>
                <div style={{ backgroundColor: parsedTheme.bgColor }}></div>
              </div>
              <div className="col-cont">
                <p>#2</p>
                <div style={{ backgroundColor: parsedTheme.fgColor }}></div>
              </div>
              <div className="col-cont">
                <p>#3</p>
                <div
                  style={{ backgroundColor: parsedTheme.primaryColor }}
                ></div>
              </div>
              <div className="col-cont">
                <p>#4</p>
                <div
                  style={{ backgroundColor: parsedTheme.fontPrimaryColor }}
                ></div>
              </div>
              <div className="col-cont">
                <p>#5</p>
                <div
                  style={{ backgroundColor: parsedTheme.fontSecondaryColor }}
                ></div>
              </div>
              <div className="row-cont">
                <Tooltip title={<span className="tooltip-txt">Apply</span>}>
                  <IconButton aria-label="delete" onClick={applyFavouriteTheme}>
                    <DoneIcon className="icon" />
                  </IconButton>
                </Tooltip>
                <Tooltip title={<span className="tooltip-txt">Delete</span>}>
                  <IconButton
                    aria-label="delete"
                    onClick={deleteFavouriteTheme}
                  >
                    <DeleteForeverIcon className="icon" />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
