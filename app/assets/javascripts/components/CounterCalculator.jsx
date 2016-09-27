class CounterCalculator extends React.Component {
	constructor(props, context) {
		super(props, context);

    this.realName = this.realName.bind(this);
		this.selectOpponent = this.selectOpponent.bind(this);
		this.addOpponent = this.addOpponent.bind(this);
		this.selectNextOpponent = this.selectNextOpponent.bind(this);
		this.selectCounter = this.selectCounter.bind(this);
		this.removeSelectedCounter = this.removeSelectedCounter.bind(this);
		// this.getCounters = this.getCounters.bind(this);
		this.renderCounters = this.renderCounters.bind(this);
		// this.renderHeroCategory = this.renderHeroCategory.bind(this);
		// this.getHero = this.getHero.bind(this);
		// this.getCounterScore = this.getCounterScore.bind(this);
		this.clearOpponents = this.clearOpponents.bind(this);
		this.renderSelectedCounter = this.renderSelectedCounter.bind(this);
		this.switchCounterRender = this.switchCounterRender.bind(this);
		this.renderSwitchCounterRenderButton = this.renderSwitchCounterRenderButton.bind(this);

    this.categorizedHeroes = {
  		offense: ["genji", "mccree", "pharah", "reaper", "soldier-76", "tracer"],
  		defense: ["bastion", "hanzo", "junkrat", "mei", "torbjorn", "widowmaker"],
  		tank: ["dva", "reinhardt", "roadhog", "winston", "zarya"],
  		support: ["ana", "lucio", "mercy", "symmetra", "zenyatta"],
    }

    // this.heroSlugs = ["genji", "mccree", "pharah", "reaper", "soldier-76", "tracer", "bastion", "hanzo", "junkrat", "mei", "torbjorn", "widowmaker", "dva", "reinhardt", "roadhog", "winston", "zarya", "ana", "lucio", "mercy", "symmetra", "zenyatta" ];
    // this.heroNames = ["Genji", "McCree", "Pharah", "Reaper", "Solider: 76", "Tracer", "Bastion", "Hanzo", "Junkrat", "Mei", "Torbjörn", "Widowmaker", "D.Va", "Reinhardt", "Roadhog", "Winston", "Zarya", "Ana", "Lúcio", "Mercy", "Symmetra", "Zenyatta"];
    this.matchups = this.props.matchupTable.matchups


    // this.props.matchupTable
		this.state = {
			opponents: [null, null, null, null, null, null],
			selectedOpponent: null,
      // counters: this.props.initialCounters,
			counters: null,
			selectedCounter: null,
			countersByCategory: false,
		}
	}

	componentWillMount() {
		let heroes = Object.keys(this.matchups);
    this.heroes = {};
		for (let i = 0; i < heroes.length; i++) {
      this.heroes[heroes[i]] = {};
      this.heroes[heroes[i]].slug = heroes[i];
      this.heroes[heroes[i]].name = this.realName(heroes[i]);
		}

    for (key in this.categorizedHeroes) {
      for (let i = 0; i < this.categorizedHeroes[key].length; i++) {
        this.heroes[this.categorizedHeroes[key][i]].category = key;
      }
    }

	}

  componentDidMount() {
    let heroNodes = document.getElementsByClassName('hero-button');
    for (let i = 0; i < heroNodes.length; i++) {
      heroNodes[i].addEventListener('click', function(){
        heroNodes[i].classList.add('hero-animate');
      })

      heroNodes[i].addEventListener('animationend', function(){
        heroNodes[i].classList.remove('hero-animate');
      })
    }

    let matchupTableLink = document.getElementsByClassName('create-matchups-link')[0];
    if (this.props.matchupTable.url) {
      matchupTableLink.href = `/matchup_tables/${this.props.matchupTable.url}`;
    }
  }

  realName(slug) {
    switch(slug) {
    case "mccree":
      return "McCree";
    case "soldier-76":
      return "Solider: 76";
    case "dva":
      return "D.Va";
    case "torbjorn":
      return "Torbjörn";
    case "lucio":
      return "Lúcio";
    case "widowmaker":
      return "Widow";
    default:
      return slug.charAt(0).toUpperCase() + slug.slice(1);
    }
  }

	getCounters(opponents) {
		// Remove null from opponents array and only continue function if opponent exists
		let filteredOpponents = opponents.filter(opponent => opponent);
		if (!filteredOpponents.length) {
			this.setState({counters: null});
			return null
		}

    let heroMatchups = filteredOpponents.map(hero => this.matchups[hero.slug]);
    let counters = {};
    for (let i = 0; i < heroMatchups.length; i++) {
      for (let key in heroMatchups[i]) {
        counters[key] = counters[key] || 0;
        counters[key] += parseFloat(heroMatchups[i][key]);
      }
    }
    // Grabbing hero matchups in reverse and returning negative value might be faster than
    // searching through every hero for each of the opponents and preseverving only those values? Not sure,
    // but it seems dangerous.
    for (let key in counters) {
      counters[key] = Math.round(counters[key] / filteredOpponents.length) * -1;
    }
		this.setState({counters: counters});
		return counters;
	}

	addOpponent(hero=null) {
    if (hero) {
      hero = this.heroes[hero];
    }
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

  clearOpponents() {
    const opponents = [null, null, null, null, null, null];
    this.setState({opponents: opponents});
    this.getCounters(opponents);
  }

  selectCounter(selectedCounterSlug) {
    this.setState({selectedCounter: selectedCounterSlug});
  }

  removeSelectedCounter() {
    this.setState({selectedCounter: null});
  }

  switchCounterRender() {
   this.setState({countersByCategory: !this.state.countersByCategory});
  }
  
  // getHero(alpha_id) {
  //  return this.props.orderedHeroes[alpha_id];
  // }

  // getCounterScore(alpha_id) {
  //  for (let i = 0; i < this.state.counters.length; i++) {
  //    if (alpha_id === this.state.counters[i][0]) {
  //      return this.state.counters[i][1];
  //    }
  //  }
  // }

	renderHeroes() {
		return (
			<div className="expanded row heroes">	
				<div className="small-12 centered columns">
					<h3 className="centered select-opponents-font">Select Your Opponents</h3>
				</div>
				{this.renderHeroCategory("offense")}
				{this.renderHeroCategory("defense")}
				{this.renderHeroCategory("tank")}
				{this.renderHeroCategory("support")}
				<div className="small-12 columns no-hero-container">
					<button
						className="secondary hollow button no-hero-button small"
        	  onClick={this.addOpponent.bind(this, null)}
          >No Hero</button>
        </div>
      </div>
    );
  }

	renderHeroCategory(category) {
    let categoryHeroes = []; 
    for (key in this.heroes) {
      if (this.heroes[key].category === category) {
        categoryHeroes.push(this.heroes[key]);
      }
    }
		return (
			<div className="small-12 medium-6 large-3 columns">
				<div className="icon-wrapper">
					{categoryIcon(category)}
				</div>
				<div>
					{categoryHeroes.map((hero, index) => {
						return (
							<Hero 
								key={index}
								hero={hero}
								handleClick={this.addOpponent}
							/>
						); 
					})}
				</div>
			</div>
		);
	}

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

// 	flatten(arr) {
// 		let newArr = arr.reduce((a,b) => {
// 				return a.concat(b);
// 			}, []);
// 		return newArr
// 	}

	renderSwitchCounterRenderButton () {
		let buttonText
		if (this.state.countersByCategory) {
			buttonText = "Sort as List";
		} else {
			buttonText = "Sort by Category";
		}
		return (
			<button
				className="switch-counter-render-button hollow button small"
				onClick={this.switchCounterRender}
			>{buttonText}</button>
		);
	}

	renderSelectedCounter() {
		if (this.state.selectedCounter !== null) {
			return(
				<div className="row relative">
					<div className="small-12 columns selected-counter">
						<h5 className="overwatch-font">{this.heroes[this.state.selectedCounter].name}</h5>
						<h5 className="overwatch-font">{this.state.counters[this.state.selectedCounter]}</h5>
						<div>
							<h5 className="label-font">Individual Mathchups</h5>
							{this.state.opponents.filter((opponent) => opponent).map((opponent, index) => {
                console.log(opponent);
								return (
									<div
										key={index}
									>
										<span>{opponent.name} :: {Math.round(this.matchups[opponent.slug][this.state.selectedCounter]) * -1}</span>
									</div>
								);
							})}
						</div>
						<button 
							className="secondary hollow button tiny"
							onClick={this.removeSelectedCounter}
						>
							Deselect Counter
						</button>
					</div>
					{this.renderSwitchCounterRenderButton()}
				</div>
			);
		} else {
			return (
				<div className="row selected-counter relative">
					<span className="label-font">No Counter Selected</span>
					{this.renderSwitchCounterRenderButton()}
				</div>
			);
		}
	}

	renderCounters() {
		if (this.state.countersByCategory) {
			return (
				<div className="row counters">
					<CategorizedCounters 
						counters={this.state.counters}
						heroes={this.heroes}
						selectCounter={this.selectCounter}
					/>
				</div>
			);
		} else {
			return (
				<div className="row counters">
					<CompiledCounters 
						counters={this.state.counters}
						selectCounter={this.selectCounter}
					/>
				</div>
			);
		}
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