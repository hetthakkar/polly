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
    (async function () {
      const data = await fetchRoomAnalytics({ roomId });
      console.log(data);
    })();
  });

  return (
    <>
      <section className='header relative pt-16 items-center flex h-screen max-h-860-px'>
        <div className='container mx-auto items-center flex flex-wrap'>
          <div className='w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4'>
            <div className="w-2/3 row flex flex-col justify-center items-center">
              <span className='font-semibold flex flex-col justify-center items-center mb-2 items-center text-4xl font-medium place-content-center -mt-24'>
                Hello {name},
              </span>
              <span className='font-semibold flex flex-col justify-center items-center items-center text-4xl font-medium place-content-center '>
                Welcome to your personal room
              </span>

              {/* //TODO! List questions with stats */}

              <div
                className='mt-12 get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150'
                onClick={() => {
                  history.push('/create-questions');
                }}
              >
                Create a question!
              </div>

              <div className="row flex flex-col justify-center items-center mt-10 w-full mb-1 text-3xl font-medium">
                Share your personal room
              </div>
              <span>
                <div className="flex flex-row">
                  <div>{process.env.REACT_APP_FRONT_END_BASE_URL + '/enter-room?code=' + roomKey}</div>
                  <div className="ml-3 cursor-pointer border-2 text-gray-400	" onClick={() => {
                    navigator.clipboard.writeText(process.env.REACT_APP_FRONT_END_BASE_URL + '/enter-room?code=' + roomKey);
                  }} >  Copy  </div>
                </div>
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
