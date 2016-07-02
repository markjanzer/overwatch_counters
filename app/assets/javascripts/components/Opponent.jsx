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
			return (
				<div className="image-wrapper">
					<img src={this.imagePath(this.props.opponent.image_path)} className="image" />
					<p className="opponent-text">{this.props.opponent.name}</p>			
				</div>
			);
		} else {
			return (
				<div className="image-wrapper">
					<img src="/assets/empty-opponent" className="image" />
				</div>
			);
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
			<div className="opponent-wrapper">
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