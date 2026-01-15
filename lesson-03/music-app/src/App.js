import React, { useEffect, useState } from "react";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");

  //Placeholder function for search
  const search = async () => {
    console.log(`searched clicked for artist ${searchInput}`);
  };

  return (
    <h1>Music App</h1> //This will be replaced
  );
}

export default App;
