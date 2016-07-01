class Counter extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.handleClick = this.handleClick.bind(this); 
		this.imagePath = this.imagePath.bind(this); 
		this.renderCounterScore = this.renderCounterScore.bind(this);
	}

	handleClick() {
		this.props.handleClick(this.props.hero.alpha_id);
	}

	imagePath(hero_image_path) {
		return `/assets/portraits/${hero_image_path}.png`
	}

	renderCounterScore() {
		const counterScore = this.props.counterScore;
		const counterScoreWidth = counterScore > 0 ? counterScore/2 : (counterScore/2) * -1
		const widthStyle = {
			width: `${counterScoreWidth}%`
		}
		if (counterScore > 0) {
			return (
				<div className="positive-counter-score-container" style={widthStyle}>
					<span className="positive-counter-score counterScore label-font">{this.props.counterScore}</span>
				</div>
			);
		} else if (counterScore < 0) {
			return (
				<div className="negative-counter-score-container" style={widthStyle}>
					<span className="negative-counter-score counterScore label-font">{this.props.counterScore}</span>
				</div>
			);
		}
	}

	// <div className="counterName">{this.props.hero.name}</div>
	render() {
		return (
			<div className="counter">
				{this.renderCounterScore()}
		    <button 
		    	className="counter-button"
					onClick={this.handleClick}
				>	
					<div className="counter-image">
						<img src={this.imagePath(	this.props.hero.image_path)} className=""/>
					</div>
				</button>
			</div>
		);	
	}
}
