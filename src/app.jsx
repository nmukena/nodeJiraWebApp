/*create-react-app count-down-champ*/
import React, {Component} from 'react'; //import component featuer too
import './App.css';//include css into the component
import {Form, FormControl, Button} from 'react-bootstrap';

//extend Components inherits all default methods
class App extends Component{
	//constructor is essential for local state within the class
	//pass in props argument which is inherited data from parent component
	constructor(props){
		super(props); //super is used so the "this" keyword can be used - super constructor
		this.state = {//declare state which is always object
			deadline: 'Dec 25, 2017'
		} 
	}

	changeDeadline(){
		console.log('state', this.state);
		this.setState({deadline: this.state.newDeadline});
	}

	//never mutate or change state directly this.state.deadline = 'whatever' NEVER DO THIS
	//changeDeadline method is called by button

	render(){
		//MUST have return in a render method
		return(
			<div className="App">
				<div className="App-title">{this.state.deadline}</div>
				<div> 
{/*	props refer to some data within an application, pass data or state from parent to child */}
				</div>
				<Form inline>
					<FormControl
						className="Deadline-input" 
						placeholder='new date'
						onChange={event => this.setState({newDeadline:event.target.value})}
					/>
					{/*onChange takes the event as a parameter and changes the setState */}
					{/*IMPORTANT setState is special and actually adds to this.state */}
					<Button onClick={() => this.changeDeadline()}>
						Submit {/*uses anonomyous function to prevent the loop from crashing*/}
					</Button>
				</Form>
			</div>
		)	
	}
	//render allows us to return any jsx
}

export default App;
//this is a module we are exporting



//STATES are essential for interactivity, each component has it's own local state with respect to the global state
//School has state of number of students and teachers
//each student has their own state of textbooks...etc
