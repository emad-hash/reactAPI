import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
let cancelAxios = null;

export const featchWeather = createAsyncThunk(
  "weatherApi/featchWeather",
  async () => {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather?lat=31.963158&lon=35.930359&appid=37278bd37ed3956a111261f0472f48dc",
      {
        cancelToken: new axios.CancelToken((c) => {
          cancelAxios = c;
        }),
      }
    );

    const responsetemp = Math.round(response.data.main.temp - 272.15);
    const min = Math.round(response.data.main.temp_min - 272.15);
    const max = Math.round(response.data.main.temp_max - 272.15);
    const nameCity = response.data.name;
    const description = response.data.weather[0].description;
    const responseIcon = response.data.weather[0].icon;
    // console.log(response);
    return {
      number: responsetemp,
      min,
      max,
      name:nameCity,
      description,
      icon:`https://openweathermap.org/img/wn/${responseIcon}@2x.png`,
    };
  }
);

const weatherApiSlice = createSlice({
  name: "weatherApi",
  initialState: {
    result: "empty",
    weather: {},
    isLoading: false,
  },
  reducers: {
    changeResult: (state, action) => {
      state.result = "changed";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(featchWeather.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(featchWeather.fulfilled, (state, action) => {
        state.isLoading = false;
        state.weather = action.payload;
      })
      .addCase(featchWeather.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { changeResult } = weatherApiSlice.actions;
export default weatherApiSlice.reducer;
