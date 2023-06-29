import { useState } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { colorArray } from "./colorArray";
import "./ColorPicker.scss";

const ColorPicker = ({
  color,
  setColor,
  setTextColor,
  unsetTextColor,
  type,
  editor,
}) => {
  const [recentlyUsedColors, setRecentlyUsedColors] = useState([]);
  const [paletteState, setPaletteState] = useState(true);

  const updateUsedColors = (choseColor) => {
    if (!recentlyUsedColors) {
      setRecentlyUsedColors([choseColor]);
    } else {
      if (recentlyUsedColors.contains(choseColor)) {
        setRecentlyUsedColors([...recentlyUsedColors, choseColor]);
      }
    }
  };

  return (
    <div className="color-picker-container">
      <div className="color-picker-header">
        <div className="flex items-center justify-between mb-[6px]">
          <p className="color-picker-header--title">
            {paletteState ? "Palette" : "Color Picker"}
          </p>
          <MdOutlineKeyboardArrowRight
            onClick={() => setPaletteState((prev) => !prev)}
            className="color-picker--icon-arrow"
          />
        </div>
        <div className="color-line"></div>
      </div>
      {paletteState ? (
        <>
          <p className="color-picker-header--title thinner-font-weight">
            Color
          </p>
          <div className="color-box__list">
            {colorArray.map((colorCode, index) =>
              index === 0 ? (
                <div
                  className={
                    type === "text"
                      ? !editor.isActive("textStyle")
                        ? "color-box__item color-box__item--active"
                        : "color-box__item"
                      : !editor.isActive("highlight")
                      ? "color-box__item color-box__item--default"
                      : "color-box__item"
                  }
                  key={index}
                  style={{
                    backgroundColor:
                      type === "text"
                        ? "rgba(0, 0, 0, 0.85)"
                        : "rgb(255, 255, 255)",
                  }}
                  onClick={() => {
                    unsetTextColor();
                  }}
                >
                  <span className="color-box__item--line"></span>
                </div>
              ) : (
                <span
                  key={index}
                  className={
                    type === "text"
                      ? editor.isActive("textStyle", { color: colorCode })
                        ? "color-box__item color-box__item--active"
                        : "color-box__item"
                      : editor.isActive("highlight", { color: colorCode })
                      ? "color-box__item color-box__item--active"
                      : "color-box__item"
                  }
                  style={{ backgroundColor: colorCode }}
                  onClick={() => {
                    setColor(colorCode);
                    setTextColor(colorCode);
                    // updateUsedColors(colorCode);
                  }}
                ></span>
              )
            )}
          </div>
        </>
      ) : (
        <>
          <HexColorPicker className="" color={color} onChange={setColor} />
          {/* <input type="color" /> */}
        </>
      )}
      <div className="color-line"></div>
      <div className="color-input-container">
        <span
          className={
            color === "#ffffff"
              ? "color-box__item color-box__item--default"
              : "color-box__item"
          }
          style={{ backgroundColor: color }}
        ></span>
        <HexColorInput
          className="color-picker-input"
          color={color}
          onChange={setColor}
        />
        <span className="confirm-color" onClick={() => setTextColor()}>
          Ok
        </span>
      </div>
    </div>
  );
};

export default ColorPicker;
