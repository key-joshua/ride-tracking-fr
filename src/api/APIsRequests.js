import axios from "axios";
import { variables } from "../helpers";

export const APIsRequests = {
  getServerApi: async () => {
    return await axios.get(variables.HOME_SERVER_API);
  },

  getLocationsApi: async () => {
    return await axios.get(variables.GET_LOCATIONS_API);
  },

  getBusesApi: async () => {
    return await axios.get(variables.GET_BUSES_API);
  },
};
