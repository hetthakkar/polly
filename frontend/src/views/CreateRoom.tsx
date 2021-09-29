/*eslint-disable*/
import { AppContext } from '../components/App';
import { useContext, useState } from "react";
import "../assets/styles/createRoom.css";
import createNewRoomCallback from "../util/createNewRoom";
import { RouteComponentProps } from 'react-router';


export default function CreateRoom({history}: RouteComponentProps) {

    const [name, setName] = useState('')
    const { hostId, setHostId } = useContext(AppContext);
    return (
        <>
            <section className="header relative pt-16 items-center flex h-screen max-h-860-px">
                <div className="container mx-auto items-center flex flex-wrap">
                    <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
                        <div className="flex flex-col justify-center items-center">
                        </div>

                        <div className="flex flex-col justify-center items-center">
                            <div className="row flex flex-col justify-center items-center">
                                <br />
                                <label className="create-room-text flex flex-col justify-center items-center">Host Name</label>
                                <input id="host_name" type="text" onChange={(event) => {
                                    setName(event.target.value);
                                }} className="create-room-input get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"></input>
                            </div>
                            <div className="row flex flex-col justify-center items-center">
                                <br />
                                <label className="create-room-text flex flex-col justify-center items-center">Room Name</label>
                                <input id="room_name" className="create-room-input get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"></input>
                            </div>
                            <div className="mt-12">
                                <div
                                    onClick={async () => {
                                        const { room, token } = await createNewRoomCallback(name);
                                        console.log(room, token);
                                        setHostId(room.hostId);
                                        history.push('/');
                                    }}
                                    className="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                                >
                                    Let's get started
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <img
                    className="absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860px"
                    src={require("assets/img/pattern_react.png").default}
                    alt="..."
                />
            </section>
        </>
    );
}