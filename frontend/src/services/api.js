import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getSeasons = async () => {
  const response = await API.get("/seasons");
  return response.data;
};

export const getSeasonStatistics = async (season) => {
  const response = await API.get(
    `/seasons/${encodeURIComponent(season)}`
  );

  return response.data;
};

export const getQuestionResult = async (season, questionId) => {
  const response = await API.get(
    `/seasons/${encodeURIComponent(season)}/question/${questionId}`
  );

  return response.data;
};

export default API;