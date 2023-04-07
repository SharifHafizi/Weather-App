import React from "react";
import { iconUrlFromCode } from "../assets/weatherServices/weatherService";

function Forecast({ title, items }) {
  console.log(items);
  return (
    <div>
      <div className="flex items-center justify-start mt-6 pl-6">
        <p className="text-white font-medium uppercase">{title} </p>
      </div>
      <hr className="my-2" />

      <div className="flex flex-row item-center justify-between text-white pl-6 pr-6">
        {items.map((item) => (
          <div className="flex flex-col items-center justify-center">
            <p className="font-light text-sm">{item.title}</p>
            <img
              src={iconUrlFromCode(item.icon)}
              alt=""
              className="w-12 my-1"
            />
            <p className="fornt-medium">{`${item.temp.toFixed()}°`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
