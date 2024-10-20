import axios from "axios";

const apiKey = process.env.REACT_APP_APIKEY;
const baseUrl = process.env.REACT_APP_BASEURL;

export const trending = async (limit = 25) => {
  const trending = await axios.get(`${baseUrl}/trending/all/week?language=en-US?page=1&api_key=${apiKey}`);
  return trending.data.results.slice(0, limit);
};

export const searchMovie = async (q) => {
  const search = await axios.get(`${baseUrl}/search/multi?query=${q}&page=1&api_key=${apiKey}`);
  return search.data;
};

export const fetchData = async (type, category, page = 1) => {
  try {
    const response = await axios.get(`${baseUrl}/${type}/${category}`, {
      params: {
        api_key: apiKey,
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
