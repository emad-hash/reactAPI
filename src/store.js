import { configureStore } from "@reduxjs/toolkit";
import weatherApiSlice from "./weatherApiSlice";
//TODO: IMPORT THE NEED SLICSE

export default configureStore({
  reducer: {
    weather:weatherApiSlice
  },
});
