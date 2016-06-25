class Counter extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.handleClick = this.handleClick.bind(this); 
		this.imagePath = this.imagePath.bind(this); 
	}

	handleClick() {
		this.props.handleClick(this.props.hero.alpha_id);
	}

	imagePath(hero_image_path) {
		return `/assets/portraits/${hero_image_path}.png`
	}

	render() {
		return (
			<div className="counter">
		    <button 
					onClick={this.handleClick}
				>	
					<div className="image-wrapper">
						<Img src={this.imagePath(this.props.hero.image_path)} className="image"/>
					</div>
					<div className="counterName">{this.props.hero.name}</div>
					<div className="counterScore">{this.props.counterScore}</div>
				</button>
			</div>
		);	
	}
}
