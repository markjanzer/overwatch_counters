class Hero extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.handleClick = this.handleClick.bind(this); 
		this.imagePath = this.imagePath.bind(this); 

		this.state = {};
	}

	handleClick() {
		this.props.handleClick(this.props.hero.slug);
	}  

	imagePath(hero_image_path) {
		return `/assets/portraits/${hero_image_path}.png`
	}

	render() {
		return (
			<div className={`button-wrapper ${this.props.hero.category}-hero`}>
		    <button 
		    	className="label-font hero-button"
					onClick={this.handleClick}
				>	 
					<div className={`image-wrapper`}>
						<img src={this.imagePath(this.props.hero.slug)} className="image"/>
					</div>
					<p className="hero-text widowmaker">{this.props.hero.name}</p>
				</button>
			</div>
		);	
	}  
}
