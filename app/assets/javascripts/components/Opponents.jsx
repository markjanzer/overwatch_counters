class Opponents extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {};
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
			</div>
		);
	}
}