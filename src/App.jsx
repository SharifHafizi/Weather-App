import "./App.css";
import { UilHeart, UilEye } from "@iconscout/react-unicons";

import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TempratureAndDetails from "./components/TempratureAndDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./assets/weatherServices/weatherService";
import { useEffect, useState } from "react";
import countapi from "countapi-js";

function App() {
  const [query, setQuery] = useState({ q: "stavanger" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  const [count, setCount] = useState(null);
  const [color, setColor] = useState("white");
  const handleIncrease = () => {
    //With these lines of codes bellow we can follow or get real number of likes from visitors.
    countapi.visits("start").then((result) => {
      // console.log(result.value); //Check if the result works as intended.
      setCount(result.value);
    });
    // setCount((count) => count + 1);
    setColor("red");
  };

  const [visit, setVisit] = useState();
  useEffect(() => {
    //With lines of codes we can see real visitor number per visit or page refresh.
    countapi.visits("new").then((result) => {
      // console.log(result.value); //Check if the result works as intended.
      setVisit(result.value);
    });
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await getFormattedWeatherData({ ...query, units }).then(
        (data) => {
          setWeather(data);
        }
      );
    };
    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return " from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";
    return "from-yellow-700 to-orange-700";
  };

  return (
    <div className="  bg-[url('C:\Users\deltaker\Desktop\Kodehode\vite-react\Weather-app\src\img\pic1.jpg')] bg-cover">
      <div
        className={`mx-auto max-w-screen-md mt-4 py-5 ox-32 
      bg-gradient-to-br h-fit shadow-xl
     shadow-gray-400 ${formatBackground()}`}
      >
        <TopButtons setQuery={setQuery} />
        <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
        {weather && (
          <div>
            <TimeAndLocation weather={weather} />
            <TempratureAndDetails weather={weather} />
            <Forecast title="hourly forecast" items={weather.hourly} />
            <Forecast title="daily forecast" items={weather.daily} />
            <div className="flex flex-row items-center justify-around font-light text-white py-8">
              <button
                className="transition ease-out hover:scale-125"
                onClick={handleIncrease}
              >
                <UilHeart color={color} />
                {count}
              </button>
              <div>
                <UilEye />
                {visit}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
