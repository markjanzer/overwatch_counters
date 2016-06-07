class Opponent extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.handleClick = this.handleClick.bind(this); 
		this.selected = this.selected.bind(this); 

		this.state = {};
	}

	handleClick() {
		this.props.handleClick(this.props.index);
	}

	selected() {
		if (this.props.selected) {
			return "selected";
		} else {
			return "";
		}
	}

	render() {
		return (
			<button 
				className={`${this.selected()}`}
				onClick={this.handleClick}
			>
			{this.props.name}
			</button>
		);	
	}
}