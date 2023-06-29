/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { IoSearch } from "react-icons/io5";
import { suggest } from "./data";
import "./SearchBar.scss";
import { MdGames } from "react-icons/md";

const SearchBar = ({ styles }) => {
  const timeRef = useRef();

  const [index, setIndex] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    assignInterval();
    return () => clearInterval(timeRef.current);
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [index]);

  // Use to set the text change interval
  const assignInterval = () => {
    timeRef.current = setInterval(() => {
      const label = document.querySelector(".autocomplete__label");
      label.classList.add("animate");
      setTimeout(() => {
        label.classList.remove("animate");
        setIndex((prevIndex) => prevIndex + 1 < suggest.length ? prevIndex + 1 : 0);
      }, 250);
    }, 3000);
  }

  const handleClickOutside = () => {
    const searchBar = document.querySelector(".search-bar");
    if (searchBar.classList.contains("search-bar--focused")) {
      searchBar.classList.remove("search-bar--focused");
    }

    const inputElement = document.querySelector(".autocomplete__wrp > input");
    inputElement.placeholder = "";

    const labelElement = document.querySelector(".autocomplete__label");
    labelElement.setAttribute("data-before", suggest[index]);
    labelElement.setAttribute("data-after", suggest[index + 1 < suggest.length ? index + 1 : 0]);

    if (!timeRef.current) assignInterval();
  };

  const handleSearchBarClicked = (event) => {
    const inputElement = document.querySelector(".autocomplete__wrp > input");
    const labelElement = document.querySelector(".autocomplete__label");
    inputElement.placeholder = suggest[index];
    labelElement.setAttribute("data-after", "");
    labelElement.setAttribute("data-before", "");

    event.currentTarget.classList.add("search-bar--focused");
    clearInterval(timeRef.current);
    timeRef.current = null;
  };

  const handleSieveClicked = () => {
    const arrowElement = document.querySelector(".select__arrow");
    if (arrowElement.classList.contains("icon--active")) {
      arrowElement.classList.remove("icon--active");
    } else arrowElement.classList.add("icon--active");
  }

  return (
    <div className="search-bar" onClick={(e) => handleSearchBarClicked(e)}>
      <form>
        <div className={`search-bar__input`} style={styles}>
          <div className="search-bar__sieve" onClick={() => handleSieveClicked()}>
            <div className="inline-flex">
              <div className="relative">
                <div className="select__container">
                  <span className="select__label">
                    <MdGames className="text-white text-xl" />
                  </span>
                  <div className="select__icon">
                    <TiArrowSortedDown className="select__arrow" />
                  </div>
                  <span className="select__line"></span>
                </div>
                {/* <div className="select__menu">

						</div> */}
              </div>
            </div>
          </div>
          <label
            className="autocomplete__label"
            data-before={suggest[index]}
            data-after={suggest[index + 1 < suggest.length ? index + 1 : 0]}
          >
            <div className="relative p-0">
              <div className="autocomplete__wrp">
                <input
                  type="text"
                  autoComplete="off"
                  className="autocomplete__input"
                  placeholder=""
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                {searchValue !== "" && (
                  <div onClick={() => setSearchValue("")} role="button" className="autocomplete__clear"></div>
                )}
              </div>
              {/* After user typed */}
              <div className="autocomplete__result"></div>
              {/* Show suggestions */}
              <div className="autocomplete__placeholder"></div>
            </div>
          </label>
          <IoSearch className="icon-search" role="button" />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
