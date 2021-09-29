/*eslint-disable*/
import { AppContext } from '../components/App'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import '../assets/styles/createRoom.css'
import createNewRoomCallback from '../util/createNewRoom'
import PlayerQuestion from '../components/PlayerQuestion'
import { voteMcq } from '../util/voteMcq'

export default function PlayerPlays() {
  const [name, setName] = useState('')
  const { questionData } = useContext(AppContext)

  //   const [, updateState] = useState({});
  //   const forceUpdate = useCallback(() => updateState({}), []);

  //   useEffect(() => {
  //       setTimeout(() => forceUpdate(), 1000);
  //   })

  const playerQuestions =
    questionData &&
    questionData.mcqQuestions &&
    questionData.mcqQuestions.length ? (
      questionData.mcqQuestions.map((mcqQuestion) => {
        return (
          <PlayerQuestion
            key={mcqQuestion.qid}
            question={mcqQuestion}
            onOptionSelected={async (questionId: string, optionId: number) => {
              console.log('User clicked ', questionId, optionId)
              await voteMcq({ questionId, optionId })
            }}
          />
        )
      })
    ) : (
      <></>
    )

  return (
    <>
      <section className='header relative pt-16 items-center flex h-screen max-h-860-px'>
        <div className='container mx-auto items-center flex flex-wrap'>
          <div className='w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4'>
            <div className='flex flex-col justify-center items-center'>
              <div className='font-semibold text-4xl text-blueGray-600'>
                Answer the Questions!
              </div>
              {playerQuestions}
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
