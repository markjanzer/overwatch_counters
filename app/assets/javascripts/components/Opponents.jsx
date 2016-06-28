class Opponents extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<div className="opponents">
				<hr></hr>
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
					className="secondary hollow button"
					onClick={this.props.clearOpponents}
				>Clear All</button>
				<hr></hr>
			</div>
		);
	}
}