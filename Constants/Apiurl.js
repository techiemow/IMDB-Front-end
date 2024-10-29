export const apiurl =
  import.meta.env.VITE_LOCAL_URL === "production"
    ? "https://imdb-backend-wbpn.onrender.com"
    : `http://localhost:4000`;


  