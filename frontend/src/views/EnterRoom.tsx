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


<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container px-5">
                    <a className="navbar-brand" href="/">PollMe</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item"><a className="nav-link active" aria-current="page" href="#!">Home</a></li>
                            <li className="nav-item"><a className="nav-link" href="#contactus">Contact</a></li>
                        </ul>
                    </div>
                </div>
    </nav>


    <section className="py-5 border-bottom" id="features">
            <div className="container px-5 my-5">
                <div className="row gx-5">
               
                    <div className="col-lg-6">
                 <div className="card2 card border-0 px-4 py-5">
                    <div className="row mb-4 px-3">
                        <h6 className="mb-0 mr-4 mt-2">Join your Room to take the survey Poll! </h6>
                    </div>
                    <div className="row px-3 mb-4">
                        <div className="line"></div>
                    </div>
                    <div className="row px-3">
                       <label className="mb-1"><h6 className="mb-0 text-sm">Player Name</h6></label> 
                          <input
                            id='host_name'
                            placeholder='Type your name'
                            type='text'
                            onChange={(event) => {
                              setName(event.target.value)
                            }}
                            className='mb-4'
                          ></input>
                    </div>
                
                    <div className="row px-3"> 
                    <label className="mb-1"><h6 className="mb-0 text-sm">Room Key</h6> </label> 


                

                           <input
                              id='room_key'
                              placeholder='Type the room code'
                              type='text'
                              className='mb-4'
                              onChange={(event) => {
                                setRoomKey(event.target.value)
                              }}
                            />

                    </div>

                 {/*
                  <div className="row mb-3 px-3"> <button type="submit" className="btn btn-blue text-center">Login</button> </div>
                 */}  

                    <div className='row mb-3 px-3'>
                                <div
                                  onClick={async () => {
                                    const data = await enterRoom({ name, roomKey })
                                    localStorage.setItem('AUTH_TOKEN', data.token)
                                    setQuestionData(data.questionData)
                                    history.push('/player-plays')
                                  }}
                                  className="get-started btn btn-primary btn-lg px-4 me-sm-3 hover:shadow-lg ease-linear transition-all duration-150"
                                  >
                                Join Room
                                </div>
                    </div>
                
                </div>
            </div>


            <div className="col-lg-6">
                    <div className="card1 pb-5">
                        <div className="row">
                        <img
    
    src={require('assets/img/join.png').default}
    alt='...'
  />  </div>
                        <div className="row px-3 justify-content-center mt-4 mb-5 border-line"> </div>
                    </div>
                </div>


                </div>
            </div>
    </section>




    </>
  )
}
