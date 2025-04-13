import React, { useEffect } from "react";
import "./App.css";
import axios from "./api/axios";

function App() {
  useEffect(() => {
    axios.get("/").then((response) => {
      console.log(response.data);
    });
  }, []);
  return (
    <>
      <div>Hello</div>
      <button>Click</button>
    </>
  );
}

export default App;
