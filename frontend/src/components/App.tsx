import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react'

interface IContext {
  hostId: string;
  setHostId: Dispatch<SetStateAction<string>>;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  roomId: string;
  setRoomId: Dispatch<SetStateAction<string>>;
  roomKey: string;
  setRoomKey: Dispatch<SetStateAction<string>>;
}

// @ts-ignore
const AppContext = createContext<IContext>({})

interface Props {
  children: React.ReactElement
}

export default function App({ children }: Props) {
  const [hostId, setHostId] = useState('')
  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [roomId, setRoomId] = useState('')
  const [roomKey, setRoomKey] = useState('');

  useEffect(() => {
    const roomId = localStorage.getItem('roomId');
    if(roomId) setRoomId(roomId);
  })

  return (
    <AppContext.Provider
      value={{
        hostId,
        setHostId,
        name,
        setName,
        title,
        setTitle,
        roomId,
        setRoomId,
        roomKey,
        setRoomKey
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export { AppContext }
