class OverwatchState extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.selectOpponent = this.selectOpponent.bind(this);
		this.addOpponent = this.addOpponent.bind(this);
		this.selectNextOpponent = this.selectNextOpponent.bind(this);
		this.getCounters = this.getCounters.bind(this);

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
		this.setState({selectedOpponent: opponentIndex});
	}

	selectNextOpponent() {
		let selectedOpponent = this.state.selectedOpponent === 5 ? 5 : this.state.selectedOpponent + 1
		this.setState({selectedOpponent: selectedOpponent});
	}

	addOpponent(hero) {
		const opponents = React.addons.update(this.state.opponents, {$splice: [[this.state.selectedOpponent, 1, hero]]})
		this.setState({opponents: opponents});
		this.getCounters(opponents);
		this.selectNextOpponent();
	}

	getCounters(opponents) {
		let filteredOpponents = opponents.filter((opponent) => opponent !== null);
		if (filteredOpponents.length) {
			const opponentAlphaIds = filteredOpponents.map((opponent) => opponent.alpha_id);
			const data = {
				opponentAlphaIds: opponentAlphaIds
			};

			$.ajax({
				url: '/counters',
				data: data,
				success: (result) => {
					console.log(result);
					this.setState({counters: result});
				}
			});
		} else {
			// Break out of method
			return null;
		}
	}

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