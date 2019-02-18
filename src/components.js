import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';


class ToDoList extends React.Component {
    
    render () {
        const todoArr = this._getToDoList ();
        
        let summaryText = this._setupSummary();
        return (
            <>
            {summaryText}
            <label htmlFor="to-do-sort">Sort By</label>
            <select id="to-do-sort" ref={select => this._newSort = select} onChange={this._HandleChange.bind(this)}>
                <option value="id">Oldest First</option>
                <option value="status">Not Started First</option>
                <option value="title">Alphabetical Order</option>
            </select>
            <ul className="current-list">
            {todoArr}
            
            </ul>
            <p><Link to="/add">Add more To Dos</Link></p>
            </>

        );
    }
    _HandleChange () {
        
       this.props.onSort(this._newSort.value);
           
    }

    
    _getToDoList () {
        this._sortToDoList();
        return this.props.todos.map(todo => <ToDoItem item={todo} key={todo.id} onDelete={this.props.onDelete.bind(this)} onStatusChange={this.props.onStatusChange.bind(this)} Statuses={this.props.Statuses} /> );
    }
    _setupSummary() {
         let total = this.props.todos.length;
        let todosDone = this.props.todos.filter(o => o.status === 'Done').length;
        let todosInProgress = this.props.todos.filter(o => o.status === 'In Progress').length;
        let todosNotStarted = this.props.todos.filter(o => o.status === 'Not Started').length;
        let totalText="";
        if(total < 1) {
           totalText = "No Todos to display"; 
        } else if (total === 1 ) {
            totalText="1 todo";
        } else {
            totalText=`${total} todos`;
        }
        return(<> <h2 className="to-do-total">{totalText}</h2>
            <p className="to-do-breakdown">{todosDone} Done<br /> {todosInProgress} In Progress<br /> {todosNotStarted} Not Started<br /></p></>) 

    };

    _sortToDoList () {
        console.log(this.props.todos);
        this.props.todos.sort((a,b) => {
            
           if(this.props._sortOrder === 'id') {
                a = a.id;
                b = b.id;
               return a<b ? -1 : a>b ? 1 : 0;
            } else if (this.props._sortOrder === 'title'){
                
                a = a.title.toLowerCase();
                b = b.title.toLowerCase();
                return a<b ? -1 : a>b ? 1 : 0;
            } else if (this.props._sortOrder === 'status'){
                
                a = a.status;
                b = b.status;
                //custom sort order for status: Not Started, In Progress, Done
                if (a === 'Not Started') {
                    return -1;
                } 
                if (a === 'Done') {
                    return +1;
                } 
                if (b === 'Not Started') {
                    return +1;
                } 
                if (b === 'Done') {
                    return -1;
                } 
                return a - b;
            }
            
        });
        
    };
    

    
};

class ToDoItem extends React.Component {  
    
    render () {
        let{id, title, status} = this.props.item;
        return( <li className={status.split(' ').join('')} data-id={id}>{title} <select className="status-todo" value={status} ref={select => this._statusTodo = select} onChange={this._handleChange.bind(this, id)}>{this._buildStatus()}</select><input type="button" value="delete" className="delete-todo"  onClick={this._handleClick.bind(this,event, id)} /></li>
        )
    }
    _handleChange( key) {
        let newStatus = this._statusTodo.value;
        this.props.onStatusChange(key, newStatus);
    }
    _handleClick(e, key) {
        e.preventDefault;
        this.props.onDelete(key);
    }
    
    _buildStatus () {
        let statusSelect = [];
        let j = 0;
        for (let i of this.props.Statuses) {
            statusSelect.push(<option key={j} >{i}</option>);
            j++;
        }
        return (statusSelect);
    };
}
function mapStateToProps (state) {
    return {
        _sortOrder: state._sortOrder,
        todos: state.todos
    }
}
function mapDispatchToProps (dispatch) {
    return { 
        //pass the answer into the function and then dispatch it as the second parameter
        onSort: (sortOrder) => {
            dispatch({type: 'SORT', sortOrder});
        },
        onDelete: (item) => {
            dispatch({type: 'DELETE', item})
        },
        onStatusChange: (item, status) => {
            dispatch({type: 'CHANGE_STATUS', item, status})
        }
    }
}
const ToDoListWrapper = connect(mapStateToProps, mapDispatchToProps)(function({_sortOrder, todos, onSort, onDelete, onStatusChange, Statuses}) {
    return <div className="to-do-list">
        <h1>To Do List</h1>
        <ToDoList _sortOrder={_sortOrder} todos={todos} onSort={onSort} onDelete={onDelete} onStatusChange={onStatusChange} Statuses={Statuses} />
    </div>
});

export {ToDoListWrapper};
/*function ToDoForm(props) {
    return<>
        <label htmlFor="new-todo">New To Do:</label>
        <input type="text" id="new-todo" ref={input => this._newTodo = input} />
        <input type="button" value="Add" id="add-todo" onClick={this._HandleClick.bind(this)} />
    </>;
}*/
/* class ToDoForm extends React.Component {
    render () { 
        return(<>
            <label htmlFor="new-todo">New To Do:</label>
            <input type="text" id="new-todo" ref={input => this._newTodo = input} />
            <input type="button" value="Add" id="add-todo" onClick={this._HandleClick.bind(this)} />
        </>);
    
    }
    _HandleClick (e) {
        e.preventDefault;
        this.props.onClick(this._newTodo.value);
    }
} */

