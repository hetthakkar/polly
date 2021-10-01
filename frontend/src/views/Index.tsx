/*eslint-disable*/
import PlayerQuestion from '../components/PlayerQuestion'
import { Link } from 'react-router-dom'

export default function Index() {
  return (
    <>
          <div className='w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4 text-center'>
            <div className='flex flex-col justify-center items-center'>
              {/* <div className="pt-32 sm:pt-0"> */}
              <div className='font-semibold text-4xl text-blueGray-600 mt-20'>
                Poll me
              </div>
              <div className='font-semibold text-2xl text-blueGray-600'>
                {' '}
                Welcome to the polling app!
              </div>
              <br />
              <Link to='/create-room'>
                <div className='mt-12'>
                  <div
                    className='get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150'
                  >
                    Create your Room
                  </div>
                </div>
              </Link>
              {/* </div> */}
              {/* <PlayerQuestion
                question={{
                  description: 'Which programming language do you like most?',
                  id: 'qid-123',
                }}
                options={[
                  {
                    id: 1,
                    description: 'Yes',
                  },
                  {
                    id: 2,
                    description: 'No',
                  },
                ]}
                onOptionSelected={(qid, oid) => {
                  console.log('Option selected', qid, oid)
                  //TODO Call vote-mcq API
                }}
              /> */}
            </div>
          </div>
{/* 
          <img
          className='absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860px'
          src={require('assets/img/pattern_react.png').default}
          alt='...'
        /> */}
    </>
  )
}
