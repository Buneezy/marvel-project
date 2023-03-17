import React from "react";
import { Cards } from "./Cards";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export const Main = () => {
  const [items, setItems] = useState();

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
    } else {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
    }
  }, [isDarkMode]);
  useEffect(() => {
    const url =
      "http://gateway.marvel.com/v1/public/characters?ts=1&apikey=77d5990535d34800e8fbc584007368e1&hash=68119c97d618cf32618d6e7aa03348a7";
    const fetch = async () => {
      const res = await axios.get(url);
      setItems(res.data.data.results);
    };
    fetch();
  }, []);

  const searchMarvel = (search) => {
    let url = "";
    if (search === "") {
      url =
        "http://gateway.marvel.com/v1/public/characters?ts=1&apikey=77d5990535d34800e8fbc584007368e1&hash=68119c97d618cf32618d6e7aa03348a7";
    } else {
      url = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${search}&ts=1&apikey=77d5990535d34800e8fbc584007368e1&hash=68119c97d618cf32618d6e7aa03348a7`;
    }
    const fetch = async () => {
      const res = await axios.get(url);
      setItems(res.data.data.results);
    };
    fetch();
  };
  return (
    <>
      <div className={isDarkMode ? "header" : "header1"}>
        <div>
          <div className="container">
            <span style={{ color: isDarkMode ? "grey" : "yellow" }}>☀︎</span>

            <div className="switch-checkbox" id="btn">
              <label className="switch">
                <input
                  type="checkbox"
                  onChange={() => setIsDarkMode(!isDarkMode)}
                />

                <span className="slider round"> </span>
              </label>
            </div>
            <span style={{ color: isDarkMode ? "#c96dfd" : "grey" }}>☽</span>
          </div>

          <div className="bg">
            <img src="./images/marvel-logo.png" alt="logo"></img>
          </div>
          <div className="search-bar">
            <img src="./images/logo-search.jpg" alt="logo"></img>
            <input
              type="search"
              placeholder="Search Hero"
              className="search"
              onChange={(e) => searchMarvel(e.target.value)}
            />
          </div>
        </div>
        <div className="content">
          {!items ? <p>Not Found</p> : <Cards data={items} />}
        </div>
      </div>
    </>
  );
};
