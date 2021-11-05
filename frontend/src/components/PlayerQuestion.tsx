interface Props {
  question: {
    description: string;
    correctAnswer: number;
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

function getColor(optionId: number, selectedId: number|undefined, correctId:number){
  if(selectedId){
    console.log(optionId)
    console.log(selectedId)
    console.log(correctId)
    if(optionId===selectedId){
      if(optionId===correctId)
        return '#00ff00'
      else
        return '#ff0000'
    }
    else if(correctId===optionId){
      return '#00ff00'
    }
    else
      return '#0d6efd'
  }
  return '#0d6efd'
}

export default function PlayerQuestion({ question, onOptionSelected, selectedOptionId, isLoading }: Props) {
  let isAnswered = false
  return <div className="flex flex-col" style={{ width: '80vw' }}>
      <br></br>
    <div className="font-medium text-xl text-center">
      {question.description}
    </div>
  
    <div className="flex flex-col bg-blue-500 mt-3 font-bold">
      {(question.options).map((option) => (
        <div className={`w-48 mt-2 p-2 rounded-lg text-white ${selectedOptionId ? 'cursor-pointer' : ''}`} style={{ background: getColor(option.id,selectedOptionId,question.options[question.correctAnswer].id) }}
        // <div className={`w-48 mt-2 p-2 rounded-lg text-white ${selectedOptionId ? 'cursor-pointer' : ''}`} style={{ background: option.id === selectedOptionId && selectedOptionId === question.correctAnswer && isAnswered ? '#000000' : '#0d6efd' }}
        // <div className={`w-48 mt-2 p-2 rounded-lg text-white ${selectedOptionId ? 'cursor-pointer' : ''}`} style={{ background:'#0d6efd' }}
          onClick={() => {
            isAnswered=true
            onOptionSelected(question.qid, option.id) 

            }}>
          {option.description}
        </div>
      ))}
    </div>

  </div>
}