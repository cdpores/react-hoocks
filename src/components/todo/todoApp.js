import { useState } from "react";
import Todo from "./todo";
import "./todoApp.css";

export default function TodoApp() {
    const [title, setTitle] = useState('')
    const [todos, setTodo] = useState([])

    function handleClick(event) {
        event.preventDefault()
        setTitle('Cristian')
    }

    function handleChange(event) {
        const value = event.target.value
        setTitle(value)
    }

    function handleSubmit (event) {
        event.preventDefault()

        const newTodo = {
            id: crypto.randomUUID(),
            title: title,
            completed: false
        }

        const temp = [... todos]
        temp.unshift(newTodo)

        setTodo(temp)
        setTitle('')
    }

    function handleUpdate (id, value) {
        const temp = [... todos]
        const item = temp.find(item => item.id === id)
        item.title = value
        setTodo(temp)
    }

    function handleDelete(id) {
        const temp = todos.filter((item) => item.id !== id)
        setTodo(temp)
    }

    return ( 
        <div className='todoContainer'>
            <h2>Agendar Tarea</h2>

            <form  className="todoCreateForm" onSubmit={handleSubmit}>
                <input onChange={handleChange} className="todoInput" value={title} placeholder="Ingresa la tarea a realizar"/>
                {/* <input type="submit" onClick={handleClick} value="create todo" className="buttonCreate"/> */}
                <input type="submit" onClick={handleSubmit} value="create todo" className="buttonCreate"/>
            </form>

            <div className="todosContainer">
                {
                    todos.map(item => (
                        <Todo item={item} onUpdate={handleUpdate} onDelete={handleDelete} />
                    ))
                }
            </div>
        </div>
    )
}