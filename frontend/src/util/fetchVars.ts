import { Dispatch, SetStateAction, useContext } from 'react';
import { IContext } from '../components/App';

export function fetchVars(setRoomId: Dispatch<SetStateAction<string>>) {
  const roomId = localStorage.getItem('roomId');
  roomId && setRoomId(roomId);
}