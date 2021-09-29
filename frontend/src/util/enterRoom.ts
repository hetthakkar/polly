import axios from 'axios';

interface IEnterRoom {
  name: string;
  roomKey: string;
}

export async function enterRoom(params: IEnterRoom) {
  const { data } = await axios.post(
    process.env.REACT_APP_API_BASE_URL + 'enter-room',
    params
  );

  return data;

}