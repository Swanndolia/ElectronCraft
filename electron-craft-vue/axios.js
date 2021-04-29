import axios from "axios";
let baseURL = "https://github.com/Swanndolia/ElectronCraft";
const instance = axios.create({
  baseURL: baseURL,
  timeout: 30000,
  headers: {
    //authorizatioons
  },
});
export default instance;
