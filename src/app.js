import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import {ToDoListWrapper} from './components';
import AddToDoForm from './AddToDoForm';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';

let todos = [
    {
        id: 1,
        title: 'Write Documentation for Innovator',
        status: 'Not Started'
    },
    {
        id: 2,
        title: 'Train Devs on DevOps',
        status: 'In Progress'
    },
    {
        id: 3,
        title: 'Add Video widget to templates',
        status: 'Done'
    },
    {   
        id: 4,
        title: 'Add service finder to templates',
        status: 'Not Started'
    }
]
/* let model ={
    _sortOrder: 'id',
    todos: [
        {
            id: 1,
            title: 'Write Documentation for Innovator',
            status: 'Not Started'
        },
        {
            id: 2,
            title: 'Train Devs on DevOps',
            status: 'In Progress'
        },
        {
            id: 3,
            title: 'Add Video widget to templates',
            status: 'Done'
        },
        {   
            id: 4,
            title: 'Add service finder to templates',
            status: 'Not Started'
        }
    ]
} */

function reducer(state = {
    _sortOrder: 'id',
    todos 
}, action) {
    function findToDo (item) {
        
        //used for deleting and changing status
        if (!item) {
            throw 'no item provided';
        } 
        let itemIndex = state.todos.findIndex(o => o.id == item);
        if(itemIndex < 0 ) {
            throw 'item not found';
        }
        
        return itemIndex;
        
    }
    function validateStatus (status) {
        if (!Statuses.has(status)) {
            throw `invalid status:  ${status}`;
        }
        return this;
    };
    switch (action.type) {
        case 'DELETE':
            let itemIndex = findToDo(action.item);
            let updatedTodos = state.todos.filter((o, i) => i !== itemIndex );
            return Object.assign({}, state, {todos: updatedTodos});
        case 'SORT':
            return Object.assign({}, state, {_sortOrder: action.sortOrder});
        case 'CHANGE_STATUS':
            validateStatus(action.status);
            itemIndex = findToDo (action.item);
            //assign by value not by reference  - note: shallow copy
            updatedTodos = [...state.todos];
            updatedTodos[itemIndex].status = action.status;
            return Object.assign({}, state, {todos: updatedTodos});
        case 'ADD_TODOS':
            updatedTodos = [...state.todos];
            let maxID = Math.max(...state.todos.map(o => o.id));
            let newToDoObjs = [];
            for(let i=0; i < action.newToDos.length; i++) {
                newToDoObjs.push(
                    {
                        id: maxID + 1,
                        title: action.newToDos[i],
                        status: 'Not Started'
                    }
                );
                maxID = maxID + 1;
            }
            updatedTodos = [...updatedTodos, ...newToDoObjs];
            return Object.assign({}, state, {todos: updatedTodos});
        default:
            return state;
    }
}

let store = Redux.createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

//set has some special functions that make it nice for validation etc.
let Statuses = new Set(['Not Started', 'In Progress', 'Done']);


/* function onSort (newSort) {
    model._sortOrder = newSort;
    render();
}
function onDelete (item) {
    let itemIndex = findToDo(item);
    model.todos.splice(itemIndex, 1);
    render();
}
function onStatusChange(item, status) {

       validateStatus(status);
        let itemIndex = findToDo (item);
        model.todos[itemIndex].status = status;
        render();
} */
function App () {
    return <ToDoListWrapper Statuses={Statuses} />;
}
/* const AddToDoWrapper = withRouter( ({history}) => {
    return <AddToDoForm  />
}) */
/* function addToDos (history, newTodos ) {
    
    if (newTodos) {
        //... spreads the resulting array into individual parameters which is what "max" requires
        //map creates a new array. o represents each item in the old array so o.id returns the id of each object in the original array
        let maxID = Math.max(...model.todos.map(o => o.id));
        let newToDoObjs = [];
        for(let i=0; i < newTodos.length; i++) {
            newToDoObjs.push(
                {
                    id: maxID + 1,
                    title: newTodos[i],
                    status: 'Not Started'
                }
            );
            maxID = maxID + 1;
        }
       
        //... spreads the existing this.todos into individual values for the new array.
        model.todos= [...model.todos, ...newToDoObjs];
        console.log(model.todos);
        history.push('/');
    } else {
        throw "no New Todo to add";
    }
}; */
function render() {
    ReactDOM.render(
        <BrowserRouter>
            <ReactRedux.Provider store={store}>
                <>
                    <Route exact path="/" component={App} />
                    <Route path="/add" component={AddToDoForm} />
                </>
                </ReactRedux.Provider>
        </BrowserRouter>, document.getElementById('todo-app')
    );
}
render();

/* var T = T$().addToDo('Cuddle with the cat', 'Done').deleteToDo('Add service finder to templates').changeStatus('Write Documentation for Innovator', 'In Progress');
$('#add-todo').click(()=> T.addToDo());
//using "on" instead of click/change allows events to be applied to items that are added to the dom later.
$('.current-list').on('click', '.delete-todo', e =>  T.deleteToDo(e));
$('#to-do-sort').change(() =>  T.sortOrder = $('#to-do-sort').val());                         
//target more useful than .currentTarget
$('.current-list').on('change', '.status-todo', e => T.changeStatus(e, e.target.value)); */
/*

[
    {
        title:'Play with Ponies',
        status: 'Not Started'
    },
    {
        title:'Watch Football',
        status: 'Not Started'
    },
    {
        title:'Drink Coffee',
        status: 'Done'
    }
]*/
