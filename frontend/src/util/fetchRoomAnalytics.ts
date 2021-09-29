import axios from 'axios';

interface IFetchRoomAnalytics {
  roomId: string
}
export async function fetchRoomAnalytics({roomId}: IFetchRoomAnalytics) {
  
  const { data } = await axios.post(process.env.REACT_APP_API_BASE_URL + 'fetch-analytics', {
    roomId
  },);

  return data;

}