class Opponents extends React.Component {
	constructor(props, context) {
		super(props, context);

		// this.handleClick = this.handleClick.bind(this); 
		// this.selected = this.selected.bind(this); 

		this.state = {};
	}

	// handleClick() {
	// 	this.props.handleClick(this.props.index);
	// }

	render() {
		return (
			<div className="opponents">
				{this.props.opponents.map((opponent, index) => {
					let opponentName = (opponent ? opponent.name : "No Opponent Chosen");
					return (
						<Opponent 
							key={index}
							index={index}
							name={opponentName}	
							selected={this.props.selectedOpponent === index}
							handleClick={this.props.handleChange}
						/>
					);	
				})}
			</div>
		);
	}
}