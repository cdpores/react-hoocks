import { useState } from "react"

export default function Todo({item, onUpdate, onDelete}) {
    const [isEdit, setEdit] = useState(false)
    
    function FormEdit() {
        const [newValue, setNewValue] = useState(item.title)

        function handleSubmit(event) {
            event.preventDefault()
        }

        function handleChange(event) {
            const value = event.target.value
            setNewValue(value)
        }

        function handleClickUpdateTodo() {
            onUpdate(item.id, newValue)
            setEdit(false)
        }

        return (
            <form className="todoUpdateForm" onSubmit={handleSubmit}>
                <input type="text" className="todoInput" onChange={handleChange} value={newValue} placeholder="Ingresa la tarea a actualizar"/>
                <button className="button" onClick={handleClickUpdateTodo}>Update</button>
            </form>
        )
    }

    function TodoElemt() {
        return (  
            <div className="todoInfo">
                <span className="todoTitle">{item.title}</span>
                 
                <button className="button" onClick={() => setEdit(true)}>Edit</button> 
                <button className="buttonDelete" onClick={(e) => onDelete(item.id) }>Delete</button>
            </div>
        )
    }

    return (
        <div className="todo">            
            {isEdit ? <FormEdit /> : <TodoElemt />}
        </div>
    )
}