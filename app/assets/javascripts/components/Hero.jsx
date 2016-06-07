class Hero extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.handleClick = this.handleClick.bind(this); 

		this.state = {};
	}

	handleClick() {
		this.props.handleClick(this.props.hero);
	}

	render() {
		return (
			<button 
				onClick={this.handleClick}
			>
			{this.props.hero.name}
			</button>
		);	
	}
}