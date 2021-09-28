import { createContext, useState } from 'react';

const MyContext = createContext();

export default function App({ children }) {

  const [hostId, setHostId] = useState('egsrg');
  return (
    <MyContext.Provider value={{ hostId, setHostId }}>
      {children}
    </MyContext.Provider>
  )

}

export {MyContext};