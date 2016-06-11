class Opponent extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.handleClick = this.handleClick.bind(this); 
		this.renderOpponent = this.renderOpponent.bind(this); 
		this.selected = this.selected.bind(this); 
	}

	handleClick() {
		this.props.handleClick(this.props.index);
	}

	imagePath(hero_image_path) {
		return `/assets/portraits/${hero_image_path}.png`
	}

	renderOpponent() {
		if (this.props.opponent) {
			<div className="image-wrapper">
				<Img src={this.imagePath(this.props.hero.image_path)} />
			</div>
			{this.props.hero.name}
		}
	}
	selected() {
		if (this.props.selected) {
			return "selected";
		} else {
			return "";
		}
	}

	render() {
		return (
			<div className="button-wrapper">
		    <button 
					onClick={this.handleClick}
					className={`${this.selected()}`}
				>	
					{this.renderOpponent()}
				</button>
			</div>
		);	
	}
}