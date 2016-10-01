class Counter extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.handleClick = this.handleClick.bind(this); 
		this.imagePath = this.imagePath.bind(this); 
		this.renderCounterScore = this.renderCounterScore.bind(this);

		// this.state = {
		// 	sizing: '1em'
		// }
	}

	// This is a janky fix for isotope rendering with different size initially
	// componentWillReceiveProps(nextProps) {
	//   this.setState({sizing: '0em'});
	// }

	handleClick() {
		this.props.handleClick(this.props.hero);
	}

	imagePath(hero_image_path) {
		return `/assets/portraits/${hero_image_path}.png`
	}

	renderCounterScore() {
		let counterScore = this.props.counterScore;
		let counterScoreWidth = counterScore > 0 ? counterScore/2 : (counterScore/2) * -1;
		let widthStyle = {
			width: `${counterScoreWidth}%`
		}
		if (counterScore >= 0) {
      return (
        <div className="positive-counter-score-container" style={widthStyle}>
          <span className="positive-counter-score counterScore label-font">{this.props.counterScore}</span>
        </div>
      );
		} else {
			return (
				<div className="negative-counter-score-container" style={widthStyle}>
					<span className="negative-counter-score counterScore label-font">{this.props.counterScore}</span>
				</div>
			);
    }
	}

	render() {
		// const counterSizing = {
		// 	padding: this.state.sizing
		// }
		return (
			<div className="counter">
				{this.renderCounterScore()}
		    <button 
		    	className="counter-button"
					onClick={this.handleClick}
				>	
					<div className="counter-image">
						<img src={this.imagePath(this.props.hero)} className=""/>
					</div>
				</button>
			</div>
		);	
	}
}
