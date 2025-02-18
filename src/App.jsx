import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Footer from './components/Footer';

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)

  
  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos")) 
      setTodos(todos)
    }
  }, [])
    const saveToLS = (a=todos) => {
    localStorage.setItem("todos", JSON.stringify(a))
  }

  const toggleFinished = (e) => {
    setShowFinished(!showFinished)
  }
  
  


  const handleEdit = (e, id)=>{ 
    let t = todos.filter(i=>i.id === id) 
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos) 
    saveToLS()
  }

  const handleDelete= (e, id)=>{  
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    console.log(newTodos)
    setTodos(newTodos) 
    saveToLS(newTodos)
  }

  const handleAdd= ()=>{
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    setTodo("") 
    todos.push({id: uuidv4(), todo, isCompleted: false})
    saveToLS()
  }
  
  const handleChange= (e)=>{ 
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => { 
    let id = e.target.name;  
    let index = todos.findIndex(item=>{
      return item.id === id;
    }) 
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }
  
  return (
    <>
      <Navbar />
      <div className="container mx-auto my-10 rounded-3xl p-5 pb-20 md:w-1/2 w-[85%] drop-shadow-2xl text-white shadow-2xl">
        <div className="addTodo my-3">
          <h2 className='text-lg font-bold my-2'>Add a Todo</h2>
          <div className="flex">
          <input onChange={handleChange} value={todo} type="text" className='w-3/4 p-2 rounded-lg text-black' />
          <button className='btn mx-5 px-5 py-2' disabled={todo.length<3} onClick={handleAdd}>Save</button>
          </div>
        </div>
        <input  id='show' onClick={toggleFinished} type="checkbox" checked={showFinished} className='w-[15px] h-[15px]' /> 
        <label htmlFor="show"> Show Finished</label>
        <h2 className='text-2xl text-white font-bold h-12 flex items-center justify-center bg-[#4e4e4e] my-4 rounded-lg '>Your Todos</h2>
        <div className="todos flex flex-col gap-4 justify-between md:w-full w-[90%] items-center px-4a">
          {todos.length === 0 && <div>No Todos to display</div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex w-[85%] justify-between">
              <div className="flex gap-5 items-center w-[80%] md:w-[70%] m-0 h-auto">
                <span className='m-0 p-0 h-[18px]'>
                <input name={item.id} type="checkbox" checked={item.isCompleted} onClick={handleCheckbox} className='w-[18px] h-[18px]' />
                </span>
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons w-[20%] md:w-[20%] flex h-full items-center">
                <button className='btn mx-1 h-[25px]' onClick={(e) => { handleEdit(e, item.id) }}><CiEdit /></button>
                <button className='btn mx-1 h-[25px]' onClick={(e) => { handleDelete(e, item.id) }}><MdDelete /></button>
              </div>
            </div>

          })}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App
