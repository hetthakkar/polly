import axios from 'axios';

interface IFetchQuestionData {
  roomKey: string;
}

export async function fetchQuestionData(params: IFetchQuestionData) {
  const { data } = await axios.post(
    process.env.REACT_APP_API_BASE_URL + 'fetch-question-data',
    params
  );

  return data;

}