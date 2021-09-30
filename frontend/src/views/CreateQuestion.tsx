import { useContext, useState } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { createMcqQuestion } from '../util/createMcqQuestion'
import '../assets/styles/createRoom.css'
import { AppContext } from '../components/App';

export default function CreateQuestion({ history }: RouteComponentProps) {
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
            <div className='flex flex-col items-center'>
            <div className="w-3/3 row flex flex-col justify-center items-center">
              <div className='font-semibold text-4xl text-blueGray-600 mt-16'>
                Create Your Question
              </div>
              <div className='flex flex-col justify-center items-center'>
                <div className='row flex flex-col justify-center items-center'>
                  <label className='w-full mb-1 text-2xl font-medium mt-6'>
                    Title
                  </label>
                  <input
                    type='text'
                    className='rounded-lg text-white placeholder-white::placeholder bg-lightBlue-400' placeholder="Type your question.." 
                    onChange={(event) => {
                      setTitle(event.target.value)
                    }}
                  />
                </div>
                <div className='row flex flex-col justify-center items-center'>
                  <br />
                  <label className='flex flex-col justify-center items-center w-full mr-4 text-2xl font-medium mt-6'>
                       Possible answers
                  </label>
                  <input
                    type='text'
                    className='rounded-lg text-white placeholder-white::placeholder bg-lightBlue-400 mt-2' placeholder="a) Define an answer.."
                    onChange={(e) => setOptionIndex(e.target.value, 0)}
                  />
                  <input
                    type='text'
                    className='rounded-lg text-white placeholder-white::placeholder bg-lightBlue-400 mt-2' placeholder="b) Define an answer.."
                    onChange={(e) => setOptionIndex(e.target.value, 1)}
                  />
                  <input
                    type='text'
                    className='rounded-lg text-white placeholder-white::placeholder bg-lightBlue-400 mt-2' placeholder="c) Define an answer.."
                    onChange={(e) => setOptionIndex(e.target.value, 2)}
                  />
                  <input
                    type='text'
                    className='rounded-lg text-white placeholder-white::placeholder bg-lightBlue-400 mt-2' placeholder="d) Define an answer.."
                    onChange={(e) => setOptionIndex(e.target.value, 3)}
                  />
                </div>
                <div className='row flex flex-col justify-center items-center'>
                  <br />
                </div>
                <div className='mt-8'>
                  <div className='get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-12 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150'
                    onClick={async () => {
                      const res = await createMcqQuestion({ title, options, roomId })
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


      </section>
    </>
  )
}
