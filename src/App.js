import "./App.css";
// import Test from "./Test";

// REACT
// import { useEffect, useState } from "react";

// MATERIAL UI COMPONENTS
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";

// EXTERNAL LIBRARIES
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import "moment/min/locales";
import { useTranslation } from "react-i18next";
moment.locale("ar");
// import { useTranslation } from "react-i18next";
let cancelAxios = null;
function App() {
  const { t, i18n } = useTranslation();
  const [dateAndTime, setDateAndTime] = useState("");
  const [temp, setTemp] = useState({
    name: "",
    number: null,
    description: "",
    min: null,
    max: "",
  });
  const [locale, setLocale] = useState("ar");

  const direction = locale == "ar" ? "rtl" : "ltr";
  // ======== EVENT HANDLERS ========= //
  function handleLanguageClick() {
    if (locale == "en") {
      setLocale("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");
    } else {
      setLocale("en");
      i18n.changeLanguage("en");
      moment.locale("en");
    }

    setDateAndTime(moment().format("MMMM Do YYYY"));
  }
  useEffect(() => {
    i18n.changeLanguage("ar");
  }, []);
  useEffect(() => {
    setDateAndTime(moment().format("MMMM Do YYYY"));
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=31.963158&lon=35.930359&appid=37278bd37ed3956a111261f0472f48dc",
        {
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios = c;
          }),
        }
      )
      .then(function (response) {
        const responsetemp = Math.round(response.data.main.temp - 272.15);
        const min = Math.round(response.data.main.temp_min - 272.15);
        const max = Math.round(response.data.main.temp_max - 272.15);
        const nameCity = response.data.name;
        const description = response.data.weather[0].description;
        const responseIcon = response.data.weather[0].icon;

        setTemp({
          name: nameCity,
          number: responsetemp,
          description: description,
          min: min,
          max: max,
          icon: `https://openweathermap.org/img/wn/${responseIcon}@2x.png`,
        });
      })
      .catch(function (error) {
        // handle error
        // console.log(error);
      });

    return () => {
      cancelAxios();
    };
  }, []);
  return (
    <div className="App">
      <Container maxWidth="sm">
        {/* CONTENT CONTAINER */}
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {/* CARD */}
          <div
            dir={direction}
            style={{
              width: "100%",
              background: "rgb(28 52 91 / 36%)",
              color: "white",
              padding: "10px",
              borderRadius: "15px",
              boxShadow: "0px 11px 1px rgba(0,0,0,0.05)",
            }}
          >
            {/* CONTENT */}
            <div>
              {/* CITY & TIME */}
              <div
                style={{
                  display: "flex",
                  alignItems: "end",
                  justifyContent: "start",
                }}
                dir={direction}
              >
                <Typography
                  variant="h2"
                  style={{
                    marginRight: "20px",
                    fontWeight: "600",
                  }}
                >
                  {t(temp.name)}
                </Typography>

                <Typography variant="h5" style={{ marginRight: "20px" }}>
                  {dateAndTime}
                </Typography>
              </div>
              {/* == CITY & TIME == */}

              <hr />

              {/* CONTAINER OF DEGREE + CLOUD ICON */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                {/* DEGREE & DESCRIPTION */}
                <div>
                  {/* TEMP */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h1" style={{ textAlign: "right" }}>
                      {temp.number}
                    </Typography>

                    <img src={temp.icon} />
                  </div>
                  {/*== TEMP ==*/}

                  <Typography variant="h6">{t(temp.description)}</Typography>

                  {/* MIN & MAX */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h5>
                      {t("min")}: {temp.min}
                    </h5>
                    <h5 style={{ margin: "0px 5px" }}>|</h5>
                    <h5>
                      {t("max")}: {temp.max}
                    </h5>
                  </div>
                </div>
                {/*== DEGREE & DESCRIPTION ==*/}

                <CloudIcon
                  style={{
                    fontSize: "200px",
                    color: "white",
                  }}
                />
              </div>
              {/*= CONTAINER OF DEGREE + CLOUD ICON ==*/}
            </div>
            {/* == CONTENT == */}
          </div>
          {/*== CARD ==*/}

          {/* TRANSLATION CONTAINER */}
          <div
            dir={direction}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "end",
              marginTop: "20px",
            }}
          >
            <Button
              style={{ color: "white" }}
              variant="text"
              onClick={handleLanguageClick}
            >
              {locale == "en" ? "Arabic" : "إنجليزي"}
            </Button>
          </div>
          {/*== TRANSLATION CONTAINER ==*/}
        </div>
        {/*== CONTENT CONTAINER ==*/}
      </Container>
    </div>
  );
}

export default App;
