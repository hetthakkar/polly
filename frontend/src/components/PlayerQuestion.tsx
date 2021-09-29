interface Props {
  question: {
    description: string;
    id: string;
  };
  options: {
    description: string;
    id: number;
  }[];
  onOptionSelected: (qid: string, optionId: number) => void;
}

export default function PlayerQuestion({ question, options, onOptionSelected }: Props) {
  return <div className="flex flex-col" style={{ width: '80vw' }}>
    <div className="font-medium text-xl text-center">
      {question.description}
    </div>
    <div className="flex flex-col bg-blue-500 mt-3 font-bold">
      {(options).map((option) => (
        <div className="bg-blue-600 w-48 mt-2 p-2 rounded-lg text-white" style={{ background: '#4299E1' }}
          onClick={() => { onOptionSelected(question.id, option.id) }}>
          {option.description}
        </div>
      ))}
    </div>

  </div>
}