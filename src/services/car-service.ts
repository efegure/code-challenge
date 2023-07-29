import axios from 'axios'

export const fetchCars = async function () {
  const response = await axios.get('/cars')
  return response.data.data
}
