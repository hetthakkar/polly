import axios from 'axios';

interface ICreateMCQQuestion {
  title: string;
  options: string[];
  roomId: string;
  correctAnswer: number;
}
export async function createMcqQuestion(params: ICreateMCQQuestion) {

  console.log(process.env);

  const { data } = await axios.post(
    process.env.REACT_APP_API_BASE_URL + 'create-mcq-question',
    params,
  )


  return data;

}