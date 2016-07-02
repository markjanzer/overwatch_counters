class Opponents extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<div className="small-12 small-centered columns opponents">
				<hr></hr>
				<div>
					<h3 className="overwatch-font">Opponents</h3>
				</div>
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
				<div>
					<button
						className="secondary hollow button clear-button"
						onClick={this.props.clearOpponents}
					>Clear All</button>
				</div>
				<hr></hr>
			</div>
		);
	}
}