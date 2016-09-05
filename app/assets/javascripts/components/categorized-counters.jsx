class CategorizedCounters extends React.Component {
	constructor(props, context) {
		super(props, context);

    this.heroSlugs = ["genji", "mccree", "pharah", "reaper", "soldier-76", "tracer", "bastion", "hanzo", "junkrat", "mei", "torbjorn", "widowmaker", "dva", "reinhardt", "roadhog", "winston", "zarya", "ana", "lucio", "mercy", "symmetra", "zenyatta" ];
    this.categories = ["offense", "defense", "tank", "support"];
	}

	componentDidMount() {
    for (let i = 0; i < this.categories.length; i++) {
      this[`${this.categories[i]}Iso`] = new Isotope( `.${this.categories[i]}-counters`, {
        itemSelector: '.counter',
        layoutMode: 'vertical',
        getSortData: {
          counterScore: '.counterScore parseFloat',
          name: '.name'
        }        
      });

      this[`${this.categories[i]}Iso`].arrange({
        sortAscending: {
          name: true,
          counterScore: false
        },
        sortBy: ['counterScore', 'name']
      });
    }

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

	renderCategory(category) {
    let categoryCounters = this.heroSlugs.map(hero => this.props.heroes[hero]);
    categoryCounters = categoryCounters.filter(counter => counter.category === category);
    let counters = this.props.counters || {};
		return (
			<div className="small-12 medium-6 large-3 columns">
				<div className="icon-wrapper counter-icon">
					{categoryIcon(category)}
				</div>
				<div className={`${category}-counters`}>
					{categoryCounters.map((counter, index) => {
						return (
							<div 
								key={index}
							>
								<Counter
									hero={counter.slug}
									counterScore={counters[counter.slug] || 0}
									handleClick={this.props.selectCounter}
								/>
							</div>
						);
					})}
				</div>
			</div>
		);
	}

	render() {
		return (
			<div>
        {this.categories.map(category => {
          return this.renderCategory(category);
        })}
			</div>
		);
	}
}