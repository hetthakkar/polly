import React, { useState } from "react";
import "../assets/styles/createRoom.css"
import { createNewQuestionsCallback } from "util/createNewQuestions";

export default function Index() {
    const [questionTitle, setQuestionTitle] = useState('')
    const [description, setDescription] = useState('')
    const [option1, setOption1] = useState('')
    const [option2, setOption2] = useState('')
    const [option3, setOption3] = useState('')
    const [option4, setOption4] = useState('')
    return (
        <>
            <section className="header relative pt-16 items-center flex h-screen max-h-860-px">
                <div className="container mx-auto items-center flex flex-wrap">
                    <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
                        <div className="flex flex-col justify-center items-center">
                            <div className="font-semibold text-4xl text-blueGray-600" >
                                Create Your Question
                            </div>
                            <div className="font-semibold text-4xl text-blueGray-600" >
                                <div className="flex flex-col justify-center items-center">

                                    <form className="container flex flex-col justify-center items-center">
                                        <div className="row flex flex-col justify-center items-center">
                                            <br />
                                            <label className="create-room-text flex flex-col justify-center items-center">Title</label>
                                            <input type="text" onChange={(event) => {
                                                setQuestionTitle(event.target.value);
                                            }} className="create-room-input get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"></input>
                                        </div>
                                        <div className="row flex flex-col justify-center items-center">
                                            <br />
                                            <label className="create-room-text flex flex-col justify-center items-center">Description</label>
                                            <input type="text" onChange={(event) => {
                                                setDescription(event.target.value);
                                            }} className="create-room-input get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"></input>
                                        </div>
                                        <div className="row flex flex-col justify-center items-center">
                                            <br />
                                            <label className="create-room-text flex flex-col justify-center items-center">Define possible answers</label>
                                            <input type="text" onChange={(event) => {
                                                setOption1(event.target.value);
                                            }} className="create-room-input get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"></input>
                                            <input type="text" onChange={(event) => {
                                                setOption2(event.target.value);
                                            }} className="create-room-input get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"></input>
                                            <input type="text" onChange={(event) => {
                                                setOption3(event.target.value);
                                            }} className="create-room-input get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"></input>
                                            <input type="text" onChange={(event) => {
                                                setOption4(event.target.value);
                                            }} className="create-room-input get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"></input>
                                        </div>
                                        <div className="row flex flex-col justify-center items-center">
                                            <br />
                                        </div>
                                        <div className="mt-12">
                                            <div
                                                onclick={createNewQuestionsCallback(questionTitle,description,option1,option2,option3,option4)}
                                                target="_blank"
                                                className="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                                            >
                                                Publish
                                            </div>
                                        </div>
                                    </form>
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