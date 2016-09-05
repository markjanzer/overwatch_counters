class CompiledCounters extends React.Component {
	constructor(props, context) {
		super(props, context);

		// this.getHero = this.getHero.bind(this);

    this.heroSlugs = ["genji", "mccree", "pharah", "reaper", "soldier-76", "tracer", "bastion", "hanzo", "junkrat", "mei", "torbjorn", "widowmaker", "dva", "reinhardt", "roadhog", "winston", "zarya", "ana", "lucio", "mercy", "symmetra", "zenyatta" ];
	}

	componentDidMount() {
		this.iso = new Isotope( '.counters', {
			itemSelector: '.counter',
			layoutMode: 'vertical',
			getSortData: {
				counterScore: '.counterScore parseFloat',
				name: '.name'
			}
		});

		this.iso.arrange({
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
		this.iso.reloadItems();
		this.iso.arrange();
	}

	// getHero(alpha_id) {
	// 	return this.props.orderedHeroes[alpha_id];
	// }

	renderAllCounters() {
    let counterKeys = this.heroSlugs;
    let counters = this.props.counters || {};
		return (
			<div>
				{counterKeys.map((hero, index) => {
					return (
						<div key={index}>
							<Counter
								hero={hero}
								counterScore={counters[hero] || 0}
								handleClick={this.props.selectCounter}
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
				{this.renderAllCounters()}
			</div>
		);
	}
}