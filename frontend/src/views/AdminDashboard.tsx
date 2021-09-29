/*eslint-disable*/
import { AppContext } from '../components/App'
import { Button } from '../components/Button'
import { useContext, useEffect, useState } from 'react'
import '../assets/styles/createRoom.css'
import createNewRoom from '../util/createNewRoom'
import { RouteComponentProps } from 'react-router'
import { fetchRoomAnalytics } from '../util/fetchRoomAnalytics'

export default function AdminDashboard({ history }: RouteComponentProps) {
  const { hostId, setHostId, name, setName, title, setTitle, roomId } =
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
    </>
  )
}
