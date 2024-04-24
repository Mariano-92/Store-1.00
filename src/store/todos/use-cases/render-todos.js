import { Todo } from "../models/todo.model";
import { createTodoHTML } from "./create-todo-html";

let element; //Creando esta variable evitamos que cada vez que llamamos o creamos elementos javascript tenga que volver a DOM y leer todo el codigo


/**
 * 
 * @param {String} elementId 
 * @param {Todo} todos 
 */
export const renderTodos = ( elementId, todos = [] ) => {


   if (!element) 
   element = document.querySelector( elementId );

   if ( !element ) throw new Error(`Element ${ elementId } not found`);


   element.innerHTML = ''; //Con esta instruccion purgamos todo el contenido para que no se apilen los TODOs


    todos.forEach( todo => {
        element.append( createTodoHTML(todo) );
        
    });


}