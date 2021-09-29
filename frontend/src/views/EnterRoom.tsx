/*eslint-disable*/
import { AppContext } from '../components/App'
import React, { useContext, useEffect, useState } from 'react'
import '../assets/styles/createRoom.css'
import { enterRoom } from '../util/enterRoom'
import { RouteComponentProps, useLocation } from 'react-router'
// import createNewRoomCallback from "../util/createNewRoom";

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

export default function EnterRoom({ history, location }: RouteComponentProps) {
  const query = useQuery()
  const { name, setName, roomKey, setRoomKey, setQuestionData } =
    useContext(AppContext)

  useEffect(() => {
    const ans = query.get('code')
    console.log(ans)
    if (ans) {
      setRoomKey(ans)
      const roomKeyTextField = document.getElementById('room_key')
      if (roomKeyTextField) {
        //   @ts-ignore
        roomKeyTextField.value = ans
      }
    }
  })

  return (
    <>
      <section className='relative pt-16 items-center flex h-screen max-h-860-px'>
        <div className='container mx-auto items-center flex flex-wrap'>
          <div className='w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4'>
            <div className='flex flex-col justify-center items-center'>
              <span className='flex flex-col justify-center items-center mb-2 items-center text-4xl font-medium place-content-center mb-12'>
                Enter personal room
              </span>

              <div className='row flex flex-col justify-center items-center'>
                <br />
                <span className='w-full mb-1'>
                  <label className='text-3xl font-medium'>User Name</label>
                </span>
                <div className='container row flex flex-col justify-center items-center'>
                  <input
                    id='host_name'
                    placeholder='Type your username'
                    type='text'
                    onChange={(event) => {
                      setName(event.target.value)
                    }}
                    className='bg-gradient-to-l placeholder-current::placeholder border-r-0 border-t-0 border-l-0'
                  ></input>
                </div>
              </div>
              <div className='row flex flex-col justify-center items-center mt-4'>
                <br />
                <span className='w-full mb-1'>
                  <label className='w-full mb-2 text-3xl font-medium '>
                    Room
                  </label>
                </span>
                <input
                  id='room_key'
                  placeholder='Type the room code'
                  type='text'
                  className='border-r-0 border-t-0 border-l-0 placeholder-current::placeholder'
                  onChange={(event) => {
                    setRoomKey(event.target.value)
                  }}
                />
              </div>
              <div className='mt-12'>
                <div
                  onClick={async () => {
                    const data = await enterRoom({ name, roomKey })
                    localStorage.setItem('AUTH_TOKEN', data.token)
                    setQuestionData(data.questionData)
                    history.push('/player-plays')
                  }}
                  className='get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150'
                >
                  Join Room
                </div>
              </div>
            </div>
          </div>
        </div>

        <img
          className='absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860px'
          src={require('assets/img/pattern_react.png').default}
          alt='...'
        />
      </section>
    </>
  )
}
