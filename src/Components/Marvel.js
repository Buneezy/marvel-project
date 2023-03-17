import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
export const Marvel = () => {
  const { id } = useParams();
  const [item, setItem] = useState();
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `http://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=77d5990535d34800e8fbc584007368e1&hash=68119c97d618cf32618d6e7aa03348a7`
      );
      setItem(res.data.data.results[0]);
    };
    fetch();
  }, []);

  return (
    <>
      {!item ? (
        ""
      ) : (
        <div className="box-content">
          <div className="box-right">
            <img
              src={`${item.thumbnail.path}.${item.thumbnail.extension} `}
              alt=""
            />
          </div>
          <div className="box-left">
            <h1>{item.name}</h1>
            <h4>{item.description}</h4>
          </div>
        </div>
      )}
    </>
  );
};
