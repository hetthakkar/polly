import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react'

interface IQuestionData {
  mcqQuestions: {
    qid: string;
    description: string;
    correctAnswer: number;
    options: {
      id: number,
      description: string;
    }[]
  }[]
}
export interface IContext {
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
  questionData: IQuestionData;
  setQuestionData: Dispatch<SetStateAction<IQuestionData>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
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
  const [questionData, setQuestionData] = useState<IQuestionData>({mcqQuestions: []});
  const [isLoading, setIsLoading] = useState(false);

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
        setRoomKey,
        questionData,
        setQuestionData,
        isLoading,
        setIsLoading
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export { AppContext }
