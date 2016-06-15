class OverwatchState extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.selectOpponent = this.selectOpponent.bind(this);
		this.addOpponent = this.addOpponent.bind(this);
		this.selectNextOpponent = this.selectNextOpponent.bind(this);
		this.selectCounter = this.selectCounter.bind(this);
		this.getCounters = this.getCounters.bind(this);
		this.renderCounters = this.renderCounters.bind(this);
		this.getHero = this.getHero.bind(this);
		this.getCounterScore = this.getCounterScore.bind(this);
		this.clearOpponents = this.clearOpponents.bind(this);

		this.state = {
			opponents: [null, null, null, null, null, null],
			selectedOpponent: 0,
			counters: this.props.initialCounters,
			selectedCounter: null,
			orderedHeroes: this.props.orderedHeroes
		}
	}

	getCounters(opponents) {
		// Remove null from opponents array and only continue function if opponent exists
		let filteredOpponents = opponents.filter((opponent) => opponent );
		if (!filteredOpponents.length) {
			this.setState({counters: this.props.initialCounters});
			return this.props.initialCounters;
		}
		let arrOfOpponentAlphaIds = filteredOpponents.map((opponent) => opponent.alpha_id);
		let heroMatchups = arrOfOpponentAlphaIds.map((alpha_id) => {
			return this.props.heroMatchups[alpha_id].slice();
		});
		let counters = heroMatchups.reduce((previousArray, currentArray) => {
			currentArray.forEach((counterScore, index) => {
				previousArray[index] = (previousArray[index] + currentArray[index]);
			});
			return previousArray;
		});
		counters = counters.map((counterScore, alpha_id) => {
			return [alpha_id, Math.round((counterScore / filteredOpponents.length) * 100) / 100];
		});
		counters.sort((a, b) => {
			return b[1] - a[1];
		});
		this.setState({counters: counters});
		return counters;
	}

	// this default parameter doesn't seem to be working
	addOpponent(hero=null) {
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

	selectCounter(selectedCounterAlphaId) {
		this.setState({selectedCounter: selectedCounterAlphaId});
	}

	getHero(alpha_id) {
		return this.props.orderedHeroes[alpha_id];
	}

	getCounterScore(alpha_id) {
		for (let i = 0; i < this.state.counters.length; i++) {
			if (alpha_id === this.state.counters[i][0]) {
				return this.state.counters[i][1];
			}
		}
	}

	clearOpponents() {
		const opponents = [null, null, null, null, null, null];
		this.setState({opponents: opponents});
		this.getCounters(opponents);
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
				<button
					onClick={this.addOpponent}
				>No Hero</button>
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
				clearOpponents={this.clearOpponents}
			/>
		);
	}

	flatten(arr) {
		let newArr = arr.reduce((a,b) => {
				return a.concat(b);
			}, []);
		return newArr
	}



	renderSelectedCounter() {
		if (this.state.selectedCounter !== null) {
			return(
				<div className="selectedCounter">
					<div>{this.getHero(this.state.selectedCounter).name}</div>
					<div>{this.getCounterScore(this.state.selectedCounter)}</div>
					<div>
						<h3>Individual Mathchups</h3>
						{this.state.opponents.filter((opponent) => opponent).map((opponent) => {
							return (
								<div
									key={opponent.id}
								>
									<span>{opponent.name} :: {Math.round(this.props.heroMatchups[opponent.alpha_id][this.state.selectedCounter] * 100) / 100}</span>
								</div>
							);
						})}
					</div>
				</div>
			);
		} else {
			return (
				<div className="selectedCounter">
					<span>No Counter Selected</span>
				</div>
			);
		}
	}

	renderCounters() {
		return (
			<ol className="counters">
				{this.state.counters.map((counter) => {
					return (
						<li key={counter[0]}>
							<Counter
								hero={this.getHero(counter[0])}
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

OverwatchState.defaultProps = { initialCounters: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0], [12, 0], [13, 0], [14, 0], [15, 0], [16, 0], [17, 0], [18, 0], [19, 0], [20, 0]]}