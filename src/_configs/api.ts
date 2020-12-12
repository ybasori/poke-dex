import Axios from "axios";

const instance = Axios.create({
  baseURL: "https://pokeapi.co/api",
  timeout: 7000,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});

const api = {
  getPokemon: ({
    limit,
    offset,
    name,
  }: {
    limit?: number;
    offset?: number;
    name?: string;
  }) => {
    let url = "";
    if (name) {
      url = `/${name}`;
    } else {
      if (limit) {
        url = `${url}${url === "" ? `?` : `&`}limit=${limit}`;
      }
      if (offset) {
        url = `${url}${url === "" ? `?` : `&`}offset=${offset}`;
      }
    }
    return instance.get(`/v2/pokemon${url}`);
  },
};

export default api;
