class OverwatchState extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.selectOpponent = this.selectOpponent.bind(this);

		let initialCounters = [];
		for (let i = 0; i <= 20; i++) {
			initialCounters.push([i,0]);
		}

		this.state = {
			// overwatchState: this.props.overwatchState
			selectedOpponents: [null, null, null, null, null, null],
			selectedOpponent: 0,
			selectedCounter: null,
			counters: initialCounters
		}
	}

	selectOpponent(alpha_id, opponent_slot) {
		this.setState({selectedOpponentSlot: opponent_slot})
		debugger
	}

	renderHeroes() {
		return (
			<div className="heroes">
				{this.props.orderedHeroes.map((hero) => {
					return (
						<button 
							key={hero.id}
							value={hero.alpha_id}>{hero.name}
						</button>
					); 
				})}
			</div>
		);
	}

	renderOpponents() {
		return (
			<div className="opponents">
				{this.state.selectedOpponents.map((alpha_id, index) => {
					let 
					if (alpha_id !== null) {
						return (
							<button 
								key={index}
								onClick={this.selectOpponent(alpha_id, index)}
							>
								{this.orderedHeroes[alpha_id].name}
							</button>
						);
					} else {
						return (
							<button key={index}>None Selected</button>
						);
					}	
				})}
			</div>
		);
	}

	renderSelectedCounter() {
		let selectedCounter
		if (this.state.selectedCounter !== null) {
			selectedCounter = this.props.orderedHeroes[this.state.selectedCounter].name;
		}
		return (
			<div className="selectedCounter">
				<span>{selectedCounter || "No Counter Selected"}</span>
			</div>
		);
	}

	//
	renderCounters() {
		return (
			<ol className="counters">
				{this.state.counters.map((counter) => {
					return <li key={counter[0]}><button>{this.props.orderedHeroes[counter[0]].name} :: {counter[1]}</button></li>
				})}
			</ol>
		);
	}

	render

	render() {
		return (
			<div>
				{this.renderHeroes()}
				{this.renderOpponents()}
				{this.renderSelectedCounter()}
				{this.renderCounters()}
			</div>
		);
	}
}