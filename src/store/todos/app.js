import html from './app.html?raw';
import todoStore, { Filters } from '../todo.store';
import { renderTodos, renderPending } from './use-cases';


const elementIDs = {
    clearCompletedButton: '.clear-completed',
    TodoList: '.todo-list', //Con esta constante apuntamos al elemento HTML donde vamos a renderizar nuestros TODOs
    NewTodoInput: '#new-todo-input', 
    TodoFilters: '.filtro',
    PendingCountLabel: '#pending-count',
}

/**
 * 
 * @param {String} elementID 
 */
export const App = ( elementId ) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos( elementIDs.TodoList, todos );
        updatePendingCount();
    }

    const updatePendingCount = () => {
        renderPending( elementIDs.PendingCountLabel );

    }






    // Cuando la funcion App() se llama
    (()=>{
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append( app );
        displayTodos();
    })();



    // Referencias HTML
    const newDescriptionInput = document.querySelector( elementIDs.NewTodoInput );
    const todoListUL = document.querySelector( elementIDs.TodoList );
    const clearCompletedButton = document.querySelector( elementIDs.clearCompletedButton );
    const filtersLIs = document.querySelectorAll( elementIDs.TodoFilters );



    //Listeners
    newDescriptionInput.addEventListener('keyup', ( event ) => { //Con el 'keyup' evaluamos cuando se aprieta y se suelta una tecla
       //console.log( event );//Haciendo la impresion del evento podemos acceder a los detalles de lo que esta sucediendo
       //console.log( event.target );//Nos muestra el elemento HTML
       //console.log( event.target.value );//Nos muestra el valor final del input 

       if ( event.keyCode !== 13) return; //Aca decimos si cualquier tecla es diferente de enter (keyCode = 13) no continuar, si es enter continuar
       if ( event.target.value.trim().length === 0 ) return;//El operador trim() quita los espacios al inicio y al fin de un string, y aca decimos que si lo que se manda es igual a 0, no hacer nada 
        
       todoStore.addTodo( event.target.value ); //De esta manera agregamos el valor de la caja de texto
       displayTodos();//Llamando a esta funcion renderizamos el TODO nuevo 
       event.target.value = '';//Finalmente igualando el evento a un string vacio, dejamos la caja de texto vacia para que se puedan ingresar nuevos datos
    });

    todoListUL.addEventListener('click', ( event ) => {
        const element = event.target.closest('[data-id]');//Con esta sintaxis hacemos que el evento click busque el data atribut mas cercano al que hacemos referencia, el elemento padre de la lista
        //console.log(element.getAttribute('data-id'));//Con esta impresion conseguimos extrar el ID del elemento para luego poder realizar el toggle
        todoStore.toggleTodo( element.getAttribute('data-id'));//Haciendo el llamado de la funcion toggle y apuntado al id realizamos la accion
        displayTodos();
    });

    todoListUL.addEventListener('click', ( event ) => {
        //console.log(event.target.className);//Con className obtenemos el nombre de una clase
        const isDestroyElement = event.target.className === 'destroy';//Aqui creamos un valor booleano que indica si debe o no destruirlo
        const element = event.target.closest('[data-id]');
        if ( !element || !isDestroyElement ) return;   //Si el elemento no existo o no estoy haciendo click entonces que no haga nada
        todoStore.deleteTodo( element.getAttribute('data-id'));
        displayTodos();
    
    });

    clearCompletedButton.addEventListener( 'click', () => {
        todoStore.deleteCompleted();
        displayTodos();
    });


    filtersLIs.forEach( element => {

        element.addEventListener('click', (element) => {
            filtersLIs.forEach( el => el.classList.remove('selected') );
            element.target.classList.add('selected');

            switch( element.target.text ){
                case 'Todos':
                    todoStore.setFilter( Filters.All )
                break;
                case 'Pendientes':
                    todoStore.setFilter( Filters.Pending )    
                break;
                case 'Completados':
                    todoStore.setFilter( Filters.Completed )
                break;
            }
            displayTodos();
        });
    });

}




