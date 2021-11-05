/*eslint-disable*/
import { AppContext } from '../components/App'
import { useContext, useState } from 'react'
import '../assets/styles/createRoom.css'
import createNewRoom from '../util/createNewRoom'
import { RouteComponentProps } from 'react-router'
import '../assets/styles/loader.css'

export default function CreateRoom({ history }: RouteComponentProps) {
  const { setHostId, name, setName, title, setTitle, setRoomId, setRoomKey, isLoading, setIsLoading } =
    useContext(AppContext)
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
                    <div className="card1 pb-5">
                        <div className="row">
                        <img
    
    src={require('assets/img/poll.jpg').default}
    alt='...'
  />  </div>
                        <div className="row px-3 justify-content-center mt-4 mb-5 border-line"> </div>
                    </div>
                </div>
                    <div className="col-lg-6">
                 <div className="card2 card border-0 px-4 py-5">
                    <div className="row mb-4 px-3">
                        <h6 className="mb-0 mr-4 mt-2">Create your Room in less than 5 seconds! </h6>
                    </div>
                    <div className="row px-3 mb-4">
                        <div className="line"></div>
                    </div>
                    <div className="row px-3">
                       <label className="mb-1"><h6 className="mb-0 text-sm">Host Name</h6></label> 
                        <input
                          id='host_name'
                          type='text'
                          onChange={(event) => {
                            setName(event.target.value)
                          }}
                          className='mb-4'
                          placeholder='Enter you name'
                        ></input>
                    </div>
                
                    <div className="row px-3"> <label className="mb-1">

                        <h6 className="mb-0 text-sm">Room Name</h6>

                        
                        </label> 


                        <input
            id='room_name'
            type='text'
            onChange={(event) => {
              setTitle(event.target.value)
            }}
            className='mb-4'
            placeholder='Enter room name'
          ></input>

                    </div>

                 {/*
                  <div className="row mb-3 px-3"> <button type="submit" className="btn btn-blue text-center">Login</button> </div>
                 */}  

                    <div className='row mb-3 px-3'>
                      {
                        isLoading ? <div className="loader h-6">Loading...</div>
                        : 
                        <div
                        onClick={async () => {
                          setIsLoading(true);
                          try {
                            const { room, token } = await createNewRoom(name, title)
                            console.log(room, token)
                            setHostId(room.hostId)
                            setTitle(title)
                            setRoomId(room.id)
                            setRoomKey(room.key)
                            localStorage.setItem('AUTH_TOKEN', token)
                            localStorage.setItem('roomId', room.id)
                            localStorage.setItem('playerName', name);
                            setIsLoading(false);
                            history.push('/admin-dashboard')
                          } catch (error) {
                            console.log(error);
                          } finally {
                            setIsLoading(false);
                          }
                        }}

                        className="get-started btn btn-primary btn-lg px-4 me-sm-3 hover:shadow-lg ease-linear transition-all duration-150"

                      >
                        Let's get started
                      </div>
                      }
                 </div>
                
                </div>
            </div>
                </div>
            </div>
    </section>



    {/*
      <section className='header relative pt-16 items-center flex h-screen max-h-860-px'>
        <div className='container mx-auto items-center flex flex-wrap'>
          <div className='w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4'>
            <div className='w-2/3 row flex flex-col justify-center items-center'>
              <span className='font-semibold flex flex-col justify-center items-center mb-2 text-center text-4xl font-medium place-content-center mb-12'>
                Create a personal room
              </span>
              <div className='row flex flex-col justify-center items-center'>
                <label className='w-full mb-1 text-2xl font-medium'>
                  Host name
                </label>
                <input
                  id='host_name'
                  type='text'
                  onChange={(event) => {
                    setName(event.target.value)
                  }}
                  className='placeholder-white::placeholder rounded-lg text-white'
                  style={{ backgroundColor: '#4299E1' }}
                  placeholder='Enter you name'
                ></input>
              </div>
              <div className='row flex flex-col justify-center items-center'>
                <br />
                <label className='w-full mb-1 text-2xl font-medium'>
                  Room name
                </label>
                <input
                  id='room_name'
                  type='text'
                  onChange={(event) => {
                    setTitle(event.target.value)
                  }}
                  className='rounded-lg text-white placeholder-white::placeholder'
                  placeholder='Enter room name'
                  style={{ backgroundColor: '#4299E1' }}
                ></input>
              </div>
              <div className='mt-12'>
                {
                  isLoading ? <div className="loader h-6">Loading...</div>
                  : 
                  <div
                  onClick={async () => {
                    setIsLoading(true);
                    try {
                      const { room, token } = await createNewRoom(name, title)
                      console.log(room, token)
                      setHostId(room.hostId)
                      setTitle(title)
                      setRoomId(room.id)
                      setRoomKey(room.key)
                      localStorage.setItem('AUTH_TOKEN', token)
                      localStorage.setItem('roomId', room.id)
                      localStorage.setItem('playerName', name);
                      setIsLoading(false);
                      history.push('/admin-dashboard')
                    } catch (error) {
                      console.log(error);
                    } finally {
                      setIsLoading(false);
                    }
                  }}
                  className={`get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150`}
                >
                  Let's get started
                </div>
                }

                
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

        */}

    </>
  )
}
