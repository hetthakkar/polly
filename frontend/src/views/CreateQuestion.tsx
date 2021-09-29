import { useContext, useState } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { createMcqQuestion } from '../util/createMcqQuestion'
import '../assets/styles/createRoom.css'
import { AppContext } from '../components/App';

export default function CreateQuestion({history}: RouteComponentProps) {
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const { roomId } = useContext(AppContext);

  function setOptionIndex(optionValue: string, index: number) {
    let _options = options
    _options[index] = optionValue
    setOptions(_options)
  }

  return (
    <>
      <section className='header relative pt-16 items-center flex h-screen max-h-860-px'>
        <div className='container mx-auto items-center flex flex-wrap'>
          <div className='w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4'>
            <div className='flex flex-col justify-center items-center'>
              <div className='font-semibold text-4xl text-blueGray-600'>
                Create Your Question
              </div>
              <div className='font-semibold text-4xl text-blueGray-600'>
                <div className='flex flex-col justify-center items-center'>
                  <div className='row flex flex-col justify-center items-center'>
                    <label className='create-room-text flex flex-col justify-center items-center'>
                      Title
                    </label>
                    <input
                      type='text'
                      className='create-room-input get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150'
                      onChange={(event) => {
                        setTitle(event.target.value)
                      }}
                    />
                  </div>
                  <div className='row flex flex-col justify-center items-center'>
                    <br />
                    <label className='create-room-text flex flex-col justify-center items-center'>
                      Define possible answers
                    </label>
                    <input
                      type='text'
                      className='create-room-input get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150'
                      onChange={(e) => setOptionIndex(e.target.value, 0)}
                    />
                    <input
                      type='text'
                      className='create-room-input get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150'
                      onChange={(e) => setOptionIndex(e.target.value, 1)}
                    />
                    <input
                      type='text'
                      className='create-room-input get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150'
                      onChange={(e) => setOptionIndex(e.target.value, 2)}
                    />
                    <input
                      type='text'
                      className='create-room-input get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150'
                      onChange={(e) => setOptionIndex(e.target.value, 3)}
                    />
                  </div>
                  <div className='row flex flex-col justify-center items-center'>
                    <br />
                  </div>
                  <div className='mt-12'>
                    <div className='get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150'
                      onClick={async () => {
                        const res = await createMcqQuestion({title, options, roomId})
                        console.log(res);
                        history.push('/admin-dashboard')
                      }}
                    >
                      Publish
                    </div>
                  </div>
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
