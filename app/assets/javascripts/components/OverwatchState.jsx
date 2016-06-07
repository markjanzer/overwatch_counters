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
			opponents: [null, null, null, null, null, null],
			selectedOpponent: 0,
			selectedCounter: null,
			counters: initialCounters
		}
	}

	selectOpponent(opponentIndex) {
		this.setState({selectedOpponent: opponentIndex})
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
			<Opponents
				opponents={this.state.opponents}
				selectedOpponent={this.state.selectedOpponent}
				handleChange={this.selectOpponent}
			/>
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