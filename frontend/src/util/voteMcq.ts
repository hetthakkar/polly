import axios from 'axios';

interface IVoteMcq {
  questionId: string;
  optionId: number;
}

export async function voteMcq(params: IVoteMcq) {
  const { data } = await axios.post(
    process.env.REACT_APP_API_BASE_URL + 'vote-mcq',
    params
  )

  return data;

}