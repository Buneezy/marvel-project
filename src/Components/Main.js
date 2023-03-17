import React from "react";
import { Card } from "./Card";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export const Main = () => {
  const [url, setUrl] = useState(
    `http://gateway.marvel.com/v1/public/characters?ts=1&apikey=77d5990535d34800e8fbc584007368e1&hash=68119c97d618cf32618d6e7aa03348a7`
  );
  const [item, setItem] = useState();
  const [search, setSearch] = useState("");
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
    const fetch = async () => {
      const res = await axios.get(url);
      setItem(res.data.data.results);
    };
    fetch();
  }, [url]);
  const searchMarvel = () => {
    setUrl(
      `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${search}&ts=1&apikey=77d5990535d34800e8fbc584007368e1&hash=68119c97d618cf32618d6e7aa03348a7`
    );
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
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={searchMarvel}
            />
          </div>
        </div>
        <div className="content">
          {!item ? <p>Not Found</p> : <Card data={item} />}
        </div>
      </div>
    </>
  );
};
