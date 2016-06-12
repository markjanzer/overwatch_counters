class OverwatchState extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.selectOpponent = this.selectOpponent.bind(this);
		this.addOpponent = this.addOpponent.bind(this);
		this.selectNextOpponent = this.selectNextOpponent.bind(this);
		this.getCounters = this.getCounters.bind(this);
		this.renderCounters = this.renderCounters.bind(this);

		let initialCounters = [];
		for (let i = 0; i <= 20; i++) {
			initialCounters.push([i,0]);
		}

		this.state = {
			opponents: [null, null, null, null, null, null],
			selectedOpponent: 0,
			counters: initialCounters,
			selectedCounter: null
		}
	}

	getCounters(opponents) {
		// Remove null from opponents array and only continue function if opponent exists
		let filteredOpponents = opponents.filter((opponent) => opponent );
		if (!opponents.length) {
			return null;
		}
		let arrOfOpponentAlphaIds = filteredOpponents.map((opponent) => opponent.alpha_id);
		let heroMatchups = arrOfOpponentAlphaIds.map((alpha_id) => {
			return this.props.heroMatchups[alpha_id];
		});
		counters = heroMatchups.reduce((previousArray, currentArray) => {
			currentArray.forEach((counterScore, index) => {
				previousArray[index] = ((previousArray[index] + currentArray[index]) / 2.0)
			});
			return previousArray;
		});
		counters = counters.map((counterScore, alpha_id) => {
			return [alpha_id, counterScore];
		});
		counters.sort((a, b) => {
			return b[1] - a[1];
		})
		this.setState({counters: counters});
		return counters;
	}

	addOpponent(hero) {
		const opponents = React.addons.update(this.state.opponents, {$splice: [[this.state.selectedOpponent, 1, hero]]})
		this.setState({opponents: opponents});
		this.getCounters(opponents);
		this.selectNextOpponent();
	}

	selectNextOpponent() {
		let selectedOpponent = this.state.selectedOpponent === 5 ? 0 : this.state.selectedOpponent + 1;
		this.setState({selectedOpponent: selectedOpponent});
	}

	selectOpponent(opponentIndex) {
		this.setState({selectedOpponent: opponentIndex});
	}

	selectCounter() {

	}


  // passing hero object to each Hero component
	renderHeroes() {
		return (
			<div className="heroes">	
				{this.props.orderedHeroes.map((hero) => {
					return (
						<Hero 
							key={hero.id}
							hero={hero}
							handleClick={this.addOpponent}
						/>
					); 
				})}
			</div>
		);
	}

	// 
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

	renderCounters() {
		return (
			<ol className="counters">
				{this.state.counters.map((counter) => {
					return (
						<li key={counter[0]}>
							<Counter
								hero={this.props.orderedHeroes[counter[0]]}
								counterScore={counter[1]}
								handleClick={this.selectCounter}
							/>
						</li>
					);
				})}
			</ol>
		);
	}

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