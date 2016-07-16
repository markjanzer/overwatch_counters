class Opponents extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<div className="row opponents">
				<hr></hr>
				{this.props.opponents.map((opponent, index) => {
					return (
						<div 
							className="small-4 medium-2 columns"
							key={index}
						>
							<Opponent 
								index={index}
								opponent={opponent}	
								selected={this.props.selectedOpponent === index}
								handleClick={this.props.handleChange}
							/>
						</div>
					);	
				})}
				<div>
					<button
						className="secondary hollow button clear-button small"
						onClick={this.props.clearOpponents}
					>Clear All</button>
				</div>
				<hr></hr>
			</div>
		);
	}
}