const API_TOKEN = import.meta.env.VITE_API_TOKEN;

export const options = {
  headers: {
    Authorization: `Bearer ${API_TOKEN} `,
  },
};

export const BASE_URL = "https://api.themoviedb.org/3";

export const testAPI = async () => {
  const res = await fetch(`${BASE_URL}/movie/popular`, options);

  const data = await res.json();
  console.log(data);
};

export const searchMovies = async (query) => {
  const res = await fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`,
    options,
  );
  const data = await res.json();
  return data.results;
};
