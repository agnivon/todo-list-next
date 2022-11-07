import type { NextPage } from 'next'
import TodosContainer from '../components/todos-container'
import TodosInput from '../components/todos-input'
import TodosList from '../components/todos-list'
import TodosToolbar from '../components/todos-toolbar'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <>
      <div className="px-20 py-8">
        <TodosContainer>
          <TodosInput />
          <TodosList />
          <hr className='border-gray-800'/>
          <TodosToolbar />
        </TodosContainer>
      </div>
    </>
  )
}

export default Home
