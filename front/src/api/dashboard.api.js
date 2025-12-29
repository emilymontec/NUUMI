import axios from './axios'

export const getDashboardData = async () => {
  const { data } = await axios.get('/dashboard/home')
  return data
}
