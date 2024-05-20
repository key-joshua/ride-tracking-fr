import axios from "axios";
import { variables } from "../helpers";

export const APIsRequests = {
  getHomeServerMsgApi: async () => {
    return await axios.get(variables.HOME_SERVER_API);
  },

  getBusesApi: async () => {
    return await axios.get(variables.HOME_SERVER_API);
  }
};
