/*eslint-disable*/
import React, { useState } from "react";
import "../assets/styles/createRoom.css";
// import createNewRoomCallback from "../util/createNewRoom";

export default function EnterRoom() {

    const [name, setName] = useState('')
    return (
        <>
            <section className="relative pt-16 items-center flex h-screen max-h-860-px">
                <div className="container mx-auto items-center flex flex-wrap">
                    <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
                        <div className="flex flex-col justify-center items-center">
                            <img src={require('../assets/img/logo.svg')} alt="" />
                        <h1>
                            
                        </h1>
                        </div>

                        <div className="flex flex-col justify-center items-center">
                            <div className="row flex flex-col justify-center items-center">
                                <br />
                                <span className="w-full mb-2"><label className="text-3xl font-medium">User Name</label></span>
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
                                    // onClick={() => createNewRoomCallback(name)}
                                    className="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                                >
                                    Join Room
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