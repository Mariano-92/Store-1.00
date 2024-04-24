//Esta importacion me sirve para crear nuevas instancias de la 
//class Todo
import { Todo } from "./todos/models/todo.model";

export const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}

const state = {
    todos: [
        new Todo('Piedra del alma'),
        new Todo('Piedra del espacio'),
        new Todo('Piedra del tiempo'),
        new Todo('Piedra del poder'),
        new Todo('Piedra de la realidad'),
        
    ],
    filter: Filters.All,
}

const initStore = () => {
    //console.log(state); //Con este console podemos ver el estado de la tarea en el store
    loadStore();
    console.log('InitStore 🥑')
}

//Cuando aun no tenemos definido el uso de alguna funcion normalmente tiramos un error
//con throw new erro --> not implemented


const loadStore = () => {
    if ( !localStorage.getItem('state') ) return; //Si es null no hace nada
    
    //El operador parse() convierte en legible el codigo que no lo es
    const { todos = [], filter = Filters.All } = JSON.parse( localStorage.getItem('state') );
    state.todos = todos;
    state.filter = filter;
    
}

const saveStateToLocalStorage = () =>{
//Con este metodo de JSON que se encuentra ya en el navegador va a serializar a un STRING lo que sea que le mandemos como referencia, en este caso el STATE
    localStorage.setItem('state', JSON.stringify(state) );

}

const getTodos = ( filter = Filters.All ) => {
    switch( filter ){
        case Filters.All:
            return [...state.todos];
        case Filters.Completed:
            return state.todos.filter( todo => todo.done );
        case Filters.Pending:
            return state.todos.filter( todo => !todo.done );
        default:
            throw new Error(`Option ${ filter } is not valid`);
    }

}

/**
 * 
 * @param {String} description 
 */
const addTodo = ( description ) => {
   if ( !description ) throw new Error('Description is required');
    state.todos.push( new Todo(description) );
    
    saveStateToLocalStorage();
}

/**
 * 
 * @param {String} todoId 
 */
const toggleTodo = ( todoId ) => {
    
    state.todos = state.todos.map( todo => {//El operador map nos regresa un nuevo arreglo con el contenido del viejo arreglo
        if( todo.id === todoId ){
            todo.done = !todo.done;
        }
        return todo;//Recordar siempre hacer el return, en este caso, del TODO con el operador map()
    });
    
    saveStateToLocalStorage();
}

const deleteTodo = ( todoId ) => {
    state.todos = state.todos.filter( todo => todo.id !== todoId );
    
    saveStateToLocalStorage();
}

const deleteCompleted = () => {
    state.todos = state.todos.filter( todo => !todo.done );
    
    saveStateToLocalStorage();
}


/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = ( newFilter = Filters.All ) => {
    state.filter = newFilter;
    
    saveStateToLocalStorage();
}


const getCurrentFilter = () => {
    return state.filter;
}






//Esta exportacion por defecto es para que el usuario solo pueda usar
//los objetos que nosotros expongamos

export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
    
}


