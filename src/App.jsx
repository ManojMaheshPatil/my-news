import React, { useState } from "react";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      console.log("Search initiated for:", input);
      const API_KEY = "579f79d52ee64795b9e8fdc604aa78d8";
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${input}&sortBy=popularity&apiKey=${API_KEY}`
      );
      const data = await response.json();

      if (data.totalResults === 0) {
        setError("No articles found.");
        setSearchResults([]);
      } else {
        setSearchResults(data.articles);
        setQuery(input);
        setError("");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data. Please try again later.");
    }
  };

  console.log(searchResults);

  return (
    <div id="app" className="bg-zinc-800">
      <div id="title" className=" flex text-xl text-stone-400 justify-center ">
        Welcome to MyNews - your one stop shop for all things news
      </div>
      <p id="start" className="mt-2 flex justify-center text-xl text-stone-400">
        Start Searching
      </p>
      <div className="flex mt-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className=" rounded-[50px] pl-[25px] ml-[620px] text-3xl bg-stone-100 shadow-lg shadow-stone-500/50 "
        />
        <button
          className="ml-[5px] bg-stone-300 rounded-3xl w-20 p-2"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {error && <p>{error}</p>}

      <div>
        {searchResults.length > 0 ? (
          <div id="news" className="results-container">
            {searchResults.map((article, index) => (
              <div
                key={index}
                id="article"
                className="article mt-4 mx-4 rounded-md  bg-zinc-600"
              >
                <h1 className="text-3xl flex justify-center">
                  {article.title}
                </h1>
                <div className="flex justify-center">
                  <img
                    src={article.urlToImage}
                    className="max-w-[500px]"
                    alt="img"
                  />
                </div>
                <h3>Source : {article.source.name}</h3>
                <p className="text-black justify-start ">
                  {article.description}
                </p>
                <a
                  className="flex justify-center"
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="text-zinc-400 ">Read More</button>
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-xl text-red-600 text-center">
            {error || "No articles found."}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
