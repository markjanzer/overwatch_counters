class OverwatchCounters extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.renderHeroRow = this.renderHeroRow.bind(this);
		this.renderChart = this.renderChart.bind(this);

		this.heroSlugs = ["genji", "mccree", "pharah", "reaper", "soldier-76", "tracer", "bastion", "hanzo", "junkrat", "mei", "torbjorn", "widowmaker", "dva", "reinhardt", "roadhog", "winston", "zarya", "ana", "lucio", "mercy", "symmetra", "zenyatta" ];
		this.heroNames = ["Genji", "McCree", "Pharah", "Reaper", "Solider: 76", "Tracer", "Bastion", "Hanzo", "Junkrat", "Mei", "Torbjörn", "Widowmaker", "D.Va", "Reinhardt", "Roadhog", "Winston", "Zarya", "Ana", "Lúcio", "Mercy", "Symmetra", "Zenyatta"];
	}

	// realName(slug) {
	// 	switch(slug) {
 //    case "mccree":
 //      return "McCree";
 //    case "soldier-76":
 //      return "Solider: 76";
 //    case "dva":
 //      return "D.Va";
 //    case "torbjorn":
 //      return "Torbjörn";
 //    case "lucio":
 //      return "Lúcio";
 //    default:
	// 		return slug.charAt(0).toUpperCase() + slug.slice(1);
	// 	}
	// }

	renderChart() {
		return (
			<table>
				<tbody>
					<tr>
						<td>Heroes v Opponents</td>
						{this.heroNames.map(heroName => <td>{heroName}</td>)}
					</tr>
					{this.heroSlugs.map((heroSlug, heroIndex) => this.renderHeroRow(heroSlug, heroIndex))}
				</tbody>
			</table>	
		);
	}

	renderHeroRow(hero, heroIndex) {
		return (
			<tr>
				<td> 
					<p>{this.heroNames[heroIndex]}</p>
				</td>
				{this.heroSlugs.map((opponent) => {
					return (
						<td>
							<input type="number" data-hero={hero} data-opponent={opponent} style={{"width": "3em"}}/>
						</td>
					);
				})}
			</tr>
		);
	}

	render() {
		return (
			<div>
				{this.renderChart()}
			</div>
		);	
	}
}