import { useContext, useState } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { createMcqQuestion } from '../util/createMcqQuestion'
import '../assets/styles/createRoom.css'
import { AppContext } from '../components/App'
import '../assets/styles/loader.css'

export default function CreateQuestion({ history }: RouteComponentProps) {
  const [title, setTitle] = useState('')
  const [options, setOptions] = useState(['', '', '', ''])
  const { roomId, isLoading, setIsLoading } = useContext(AppContext)

  function setOptionIndex(optionValue: string, index: number) {
    let _options = options
    _options[index] = optionValue
    setOptions(_options)
  }

  return (
    <>
    </>
  )
}
