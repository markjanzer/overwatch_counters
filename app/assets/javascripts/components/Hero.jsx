class Hero extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.handleClick = this.handleClick.bind(this); 
		this.imagePath = this.imagePath.bind(this); 

		this.state = {};
	}

	handleClick() {
		this.props.handleClick(this.props.hero);
	}

	imagePath(hero_image_path) {
		return `/assets/portraits/${hero_image_path}.png`
	}

	render() {
		return (
			<div className={`button-wrapper ${this.props.hero.category}-hero`}>
		    <button 
		    	className="label-font"
					onClick={this.handleClick}
				>	
					<div className={`image-wrapper`}>
						<img src={this.imagePath(this.props.hero.image_path)} className="image"/>
					</div>
					<p className="hero-text">{this.props.hero.name}</p>
				</button>
			</div>
		);	
	}
}
