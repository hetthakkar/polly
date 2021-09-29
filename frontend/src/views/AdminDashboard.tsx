/*eslint-disable*/
import { AppContext } from '../components/App'
import { useContext, useEffect, useState } from 'react'
import '../assets/styles/createRoom.css'
import createNewRoom from '../util/createNewRoom'
import { RouteComponentProps } from 'react-router'
import { fetchRoomAnalytics } from '../util/fetchRoomAnalytics'

export default function AdminDashboard({ history }: RouteComponentProps) {
  const { hostId, setHostId, name, setName, title, setTitle, roomId, roomKey } =
    useContext(AppContext)

  useEffect(() => {
    (async function() {
      const data = await fetchRoomAnalytics({roomId});
      console.log(data);
    })();
  });

  return (
    <>
      <div>Hello {name}</div>
      <div>Welcome to {title} your personal room</div>

      {/* //TODO! List questions with stats */}

      <div
        className='text-white text-center cursor-pointer'
        style={{ background: '#4299E1', width: '80vw' }}
        onClick={() => {
          history.push('/create-questions');
        }}
      >
        Create a question!
      </div>

      <div className="mt-10">
        Share your personal room
      </div>
      <span>
        <div className="flex flex-row">
          <div>{process.env.REACT_APP_FRONT_END_BASE_URL + '/enter-room?code=' + roomKey}</div>
          <div className="ml-3 cursor-pointer" onClick={() => {
            navigator.clipboard.writeText(process.env.REACT_APP_FRONT_END_BASE_URL + '/enter-room?code=' + roomKey);
          }} >Copy link url</div>
        </div>
      </span>

    </>
  )
}
