/*eslint-disable*/
import { AppContext } from '../components/App'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import '../assets/styles/createRoom.css'
import createNewRoomCallback from '../util/createNewRoom'
import PlayerQuestion from '../components/PlayerQuestion'
import { voteMcq } from '../util/voteMcq'

export default function PlayerPlays() {
  const [name, setName] = useState('')
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: number
  }>({})
  const { questionData, isLoading, setIsLoading } = useContext(AppContext)

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
      <section className='header relative pt-16 items-center flex h-screen max-h-860-px'>
        <div className='container mx-auto items-center flex flex-wrap'>
          <div className='w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4'>
            <div className='flex flex-col justify-center items-center'>
              <div className='font-semibold text-4xl text-blueGray-600 text-center mb-6'>
                Answer the Questions!
              </div>
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

        <img
          className='absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860px'
          src={require('assets/img/pattern_react.png').default}
          alt='...'
        />
      </section>
    </>
  )
}
