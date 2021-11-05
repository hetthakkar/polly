interface Props {
  question: {
    description: string;
    qid: string;
    options: {
      description: string;
      id: number;
    }[];
  };
  selectedOptionId?: number;
  onOptionSelected: (qid: string, optionId: number) => void;
  isLoading: boolean;
}

export default function PlayerQuestion({ question, onOptionSelected, selectedOptionId, isLoading }: Props) {
  return <div className="flex flex-col" style={{ width: '80vw' }}>
    <br></br>
    <div className="font-medium text-xl text-center">
      {question.description}
    </div>
    <div className="flex flex-col bg-blue-500 mt-3 font-bold">
      {(question.options).map((option) => (
        <div className={`w-48 mt-2 p-2 rounded-lg text-white ${selectedOptionId ? 'cursor-pointer' : ''}`} style={{ background: option.id === selectedOptionId ? '#000000' : '#0d6efd' }}
        onClick={() => { onOptionSelected(question.qid, option.id) }}>
          {option.description}
        </div>
      ))}
    </div>

  </div>
}