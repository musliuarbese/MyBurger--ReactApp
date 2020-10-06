import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-my-burger-5a85a.firebaseio.com/",
});

export default instance;
