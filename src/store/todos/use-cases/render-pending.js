import todoStore, { Filters } from "../../todo.store";

let element;
/**
 * 
 * @param {String} elementId 
 */

//Si no existe el elemento entonces que lo busque por el elementId, si aun no existe hacemos el throw
export const renderPending = ( elementId ) => {
    if( !element )
    element = document.querySelector( elementId );
if ( !element )
    throw new Error(`Element ${ elementId } not found`);
element.innerHTML = todoStore.getTodos( Filters.Pending ).length;

}