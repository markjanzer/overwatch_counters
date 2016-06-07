class Opponents extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {};
	}

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