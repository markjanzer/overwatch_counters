class CategorizedCounters extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.getHero = this.getHero.bind(this);
		this.getCategoryHeroIds = this.getCategoryHeroIds.bind(this);

		this.state = {
			offense: [],
			defense: [],
			tank: [],
			support: []
		}
	}

	getCategoryHeroIds(category) {
		const categoryHeroes = this.props.orderedHeroes.filter(hero => hero.category === category);
		categoryHeroes.map((hero) => hero.id);
		return categoryHeroes;
	}

	componentDidMount() {
		this.setState({
			offense: this.getCategoryHeroIds("offense"),
			defense: this.getCategoryHeroIds("defense"),
			tank: this.getCategoryHeroIds("tank"),
			support: this.getCategoryHeroIds("support"),
		});

		this.offenseIso = new Isotope( '.offense-counters', {
			itemSelector: '.counter',
			layoutMode: 'vertical',
			getSortData: {
				counterScore: '.counterScore parseFloat',
				name: '.name'
			}
		});		

		this.defenseIso = new Isotope( '.defense-counters', {
			itemSelector: '.counter',
			layoutMode: 'vertical',
			getSortData: {
				counterScore: '.counterScore parseFloat',
				name: '.name'
			}
		});		

		this.tankIso = new Isotope( '.tank-counters', {
			itemSelector: '.counter',
			layoutMode: 'vertical',
			getSortData: {
				counterScore: '.counterScore parseFloat',
				name: '.name'
			}
		});		

		this.supportIso = new Isotope( '.support-counters', {
			itemSelector: '.counter',
			layoutMode: 'vertical',
			getSortData: {
				counterScore: '.counterScore parseFloat',
				name: '.name'
			}
		});

		this.offenseIso.arrange({
			sortAscending: {
				name: true,
				counterScore: false
			},
			sortBy: ['counterScore', 'name']
		});

		this.defenseIso.arrange({
			sortAscending: {
				name: true,
				counterScore: false
			},
			sortBy: ['counterScore', 'name']
		});

		this.tankIso.arrange({
			sortAscending: {
				name: true,
				counterScore: false
			},
			sortBy: ['counterScore', 'name']
		});

		this.supportIso.arrange({
			sortAscending: {
				name: true,
				counterScore: false
			},
			sortBy: ['counterScore', 'name']
		});

		$('.hero-text').fitText(10, { minFontSize: '10em' });
		$('.opponent-text').fitText(0.5, { minFontSize: '0.5em', maxFontSize: '0.5em' });
	}

	componentDidUpdate(prevProps, prevState) {
		this.offenseIso.reloadItems();
		this.offenseIso.arrange();		

		this.defenseIso.reloadItems();
		this.defenseIso.arrange();		

		this.tankIso.reloadItems();
		this.tankIso.arrange();		

		this.supportIso.reloadItems();
		this.supportIso.arrange();
	}

	getHero(alpha_id) {
		return this.props.orderedHeroes[alpha_id];
	}

	renderCategory(category) {
		const categoryCounters = this.props.counters.filter((counter) => this.state[category].includes(counter.id))
		return (
			<div className="small-3 columns">
				{categoryCounters.map((counter) => {
					return (
						<div 
							key={counter[0]}
							className={`${category}-counters`}
						>
							<Counter
								hero={this.getHero(counter[0])}
								counterScore={counter[1]}
								handleClick={this.selectCounter}
							/>
						</div>
					);
				})}
			</div>
		);
	}

	render() {
		return (
			<div>
				{this.renderCategory("offense")}
				{this.renderCategory("defense")}
				{this.renderCategory("tank")}
				{this.renderCategory("support")}
			</div>
		);
	}
}