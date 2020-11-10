// import React, { useState, useEffect } from "react";
// import ReactLoading from "react-loading";
// import { searchArt } from "../services/curatorService";

// const Search = (props) => {
//   const [isLoading, setLoading] = useState(false);
//   const [isMounted, setMount] = useState(true);
//   const userId = props.user._id;

//   const [artworks, setArtworks] = useState([]);
//   const [apiToken, setApiToken] = useState("");

//   const [query, setQuery] = useState("");

//   useEffect(() => {
//     setApiToken(localStorage.getItem("apiToken"));
//   }, []);

//   const handleInputChange = (e) => {
//     setQuery(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("QUERYL ", query);
//     searchArt({ apiToken, query })
//       .then((response) => {
//         console.log(response);
//       })
//       .catch((err) => console.log(err));
//   };

//   return (
//     <div className="search-page">
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="query"
//           value={query}
//           onChange={handleInputChange}
//         />
//         <button type="submit">Find</button>
//       </form>
//       {isLoading ? (
//         <div className="spinner-card">
//           <ReactLoading type={"spinningBubbles"} color={"#205586"} />
//           <p>
//             <i>Retrieving artworks...</i>
//           </p>
//         </div>
//       ) : (
//         <></>
//       )}
//     </div>
//   );
// };

// export default Search;
