import "./App.css";
// import Test from "./Test";

// REACT
// import { useEffect, useState } from "react";

// MATERIAL UI COMPONENTS
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
// EXTERNAL LIBRARIES
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import "moment/min/locales";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { changeResult, featchWeather } from "./weatherApiSlice";
moment.locale("ar");
let cancelAxios = null;
function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => {
    return state.weather.isLoading;
  });
  const temp = useSelector((state) => {
    return state.weather.weather;
  });
  const { t, i18n } = useTranslation();
  const [dateAndTime, setDateAndTime] = useState("");
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
    // dispatch(changeResult());
    dispatch(featchWeather());
    i18n.changeLanguage("ar");
    setDateAndTime(moment().format("MMMM Do YYYY"));
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
                    {isLoading ? (<CircularProgress style={{ color: "white" }} />) : ("") }
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
