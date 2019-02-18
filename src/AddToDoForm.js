import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class AddToDoForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            newToDos: [],
            tempToDo: ''
        }
    }
    onFieldChange() {
        this.setState({
            [event.target.id]: event.target.value,
        })
    }
    _HandleClick(){
        this.setState((prevState) => {
            return {
                newToDos: prevState.newToDos.concat(prevState.tempToDo),
                tempToDo: ''
            }
        })
    }
    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.newToDos);
        this.props.addToDos(this.state.newToDos);
    }
    render() {
        return <div>
            <h1>Add To Do</h1>
            <p>To Dos: {this.state.newToDos.join(', ')}</p><form onSubmit={this.handleSubmit.bind(this)}>
            <label htmlFor="new-todo">New To Do:</label>
        <input type="text" id="tempToDo" value={this.state.tempToDo} onChange={this.onFieldChange.bind(this)} />
        <input type="button" value="Add" id="add-todo" onClick={this._HandleClick.bind(this)} />
        <input type="submit" value="Done" id="done"/>
        </form>
        </div>
    }
}
function mapDispatchToProps(dispatch, props) {
    return{
        addToDos: (newToDos) => {
            dispatch({type: 'ADD_TODOS', newToDos});
            props.history.push('/');
        }
    }

}
export default withRouter(connect(() => {return{}}, mapDispatchToProps)(AddToDoForm));