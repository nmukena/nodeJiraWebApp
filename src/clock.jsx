clockimport React, {Component} from 'react';
import './App.css';

class Clock extends Component{
	constructor(props) {
		super(props);
		this.state = {
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 0
		}
	}

/*Every time something is rendered onto or removed is called mounting or unmounting 
React provides special methods for each component based off of these events for us to run code for the app (life cycle hooks)
First hook is a component we will mount before the component completely renders, 
so once we have data we will update state of app so proper stuff gets rendered*/	

	componentWillMount() {
		this.getTimeUntil(this.props.deadline);
	}

	componentDidMount() {
		setInterval(() => (this.getTimeUntil(this.props.deadline)), 1000);
	}

	leading0(num) {
		return num < 10 ? '0' + num : num;
		/* this is ternary - if num is less than 10 return 0+num otherwise return number*/
	}

	getTimeUntil(deadline) {
		const time = Date.parse(deadline) - Date.parse(new Date());
		const seconds = Math.floor((time/1000)%60);
		const minutes = Math.floor((time/1000/60)%60);
		const hours = Math.floor((time/1000*60*60)%24);
		const days = Math.floor(time/(1000*60*60*24));
		this.setState({days, hours, minutes, seconds});
		/*Cannot call setState an infinite amount of times*/
	}

	render() {
		return(
			<div>
				<div>
					<div className="Clock-days">{this.leading0(this.state.days)} days</div>
					<div className="Clock-hours">{this.leading0(this.state.hours)}hours</div>
					<div className="Clock-minutes">{this.leading0(this.state.minutes)}minutes</div>
					<div className="Clock-seconds">{this.leading0(this.state.seconds)} seconds</div>
				</div>
			</div>			
		)
	}
}

export default Clock;