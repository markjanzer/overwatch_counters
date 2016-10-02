class CompiledCounters extends React.Component {
	constructor(props, context) {
		super(props, context);

    this.heroSlugs = ["genji", "mccree", "pharah", "reaper", "soldier-76", "tracer", "bastion", "hanzo", "junkrat", "mei", "torbjorn", "widowmaker", "dva", "reinhardt", "roadhog", "winston", "zarya", "ana", "lucio", "mercy", "symmetra", "zenyatta" ];
    this.incrementLoadedImageCount = this.incrementLoadedImageCount.bind(this);

    this.state = {
      loadedImageCount: 0
    }
	}

	componentDidMount() {
    $('.hero-text').fitText(10, { minFontSize: '10em' });
    $('.opponent-text').fitText(0.5, { minFontSize: '0.5em', maxFontSize: '0.5em' });

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
  }

  // This state change is doing nothing other than promping isotope to re-render or something. Without it, inital load is broken.
  incrementLoadedImageCount() {
    this.setState({loadedImageCount: this.state.loadedImageCount + 1});
  }

  componentDidUpdate(prevProps, prevState) {
    this.iso.reloadItems();
    this.iso.arrange();
    this.iso.layout();
	}

  componentWillUnmount() {
    this.iso.destroy();
  }

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
                imageLoaded={this.incrementLoadedImageCount}
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