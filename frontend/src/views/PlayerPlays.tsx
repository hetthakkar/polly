/*eslint-disable*/
import { AppContext } from '../components/App'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import '../assets/styles/createRoom.css'
import createNewRoomCallback from '../util/createNewRoom'
import {fetchQuestionData} from '../util/fetchQuestionData'
import PlayerQuestion from '../components/PlayerQuestion'
import { voteMcq } from '../util/voteMcq'

export default function PlayerPlays() {
  const [name, setName] = useState('')
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: number
  }>({})
  const { questionData, isLoading, setIsLoading, roomKey, setQuestionData} = useContext(AppContext)

  //   const [, updateState] = useState({});
  //   const forceUpdate = useCallback(() => updateState({}), []);
    const refreshQuestionData = async () => {
      const data = await fetchQuestionData({roomKey})
      console.log(data)
      setQuestionData(data.questionData)
    }
    useEffect(() => {
        setInterval(async () => await refreshQuestionData(), 5000);
    },[])

  const playerQuestions =
    questionData &&
    questionData.mcqQuestions &&
    questionData.mcqQuestions.length ? (
      questionData.mcqQuestions.map((mcqQuestion) => {
        return (
          <PlayerQuestion
            key={mcqQuestion.qid}
            question={mcqQuestion}
            isLoading={isLoading}
            selectedOptionId={selectedOptions[mcqQuestion.qid]}
            onOptionSelected={async (questionId: string, optionId: number) => {
              if (selectedOptions[questionId]) {
                return
              }
              let t: { [key: string]: number } = {}
              t[questionId] = optionId
              console.log({ questionId: optionId })

              setIsLoading(true)
              try {
                await voteMcq({ questionId, optionId })
                setSelectedOptions({
                  ...selectedOptions,
                  ...t,
                })
              } catch (error) {
                console.log(error)
              } finally {
                setIsLoading(false)
              }
            }}
          />
        )
      })
    ) : (
      <></>
    )

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
                        {playerQuestions}
                        {isLoading ? (
        <span className='mt-5'>
          <div className='loader'>Loading...</div>
        </span>
      ) : (
        <span></span>
      )}
                        </div>
                    </div>
                </div>


                <div className="col-lg-6">
                        <div className="card2 card border-0 px-4 py-5">
                            <div className="row">
                            <img
                              src={require('assets/img/pattern_react.png').default}
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
