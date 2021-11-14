import axios from "axios";

const API_KEY = "18426896-fe41a223570e8075df6a95c49";

const fetchImagesWithQuery = (query, page = 1) => {
  return axios
    .get(
      `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
    )
    .then((res) => res.data.hits);
};

export default fetchImagesWithQuery;
