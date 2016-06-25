class Opponents extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<div className="opponents">
				{this.props.opponents.map((opponent, index) => {
					return (
						<Opponent 
							key={index}
							index={index}
							opponent={opponent}	
							selected={this.props.selectedOpponent === index}
							handleClick={this.props.handleChange}
						/>
					);	
				})}
				<button
					onClick={this.props.clearOpponents}
				>Clear</button>
			</div>
		);
	}
}