import { createContext, Dispatch, SetStateAction, useState } from 'react';

interface IContext {
  hostId: string;
  setHostId: Dispatch<SetStateAction<string>>;
}

// @ts-ignore
const AppContext = createContext<IContext>({});

interface Props {
  children: React.ReactElement
}

export default function App({ children }: Props) {

  const [hostId, setHostId] = useState('');
  return (
    <AppContext.Provider value={{ hostId, setHostId }}>
      {children}
    </AppContext.Provider>
  )

}

export {AppContext};