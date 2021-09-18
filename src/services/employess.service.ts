import axios from "axios";


export const loadEmployees = () => {
  return axios.get("/api/employees");
};
export const loadPublishers = () => {
  return axios.get("/api/publishers");
};
export const loadOffices = () => {
  return axios.get("/api/offices");
};




