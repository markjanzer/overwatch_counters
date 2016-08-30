class MatchupChart extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.renderHeroRow = this.renderHeroRow.bind(this);
		this.renderChart = this.renderChart.bind(this);
		this.saveChart = this.saveChart.bind(this);
		this.putMatchupChart = this.putMatchupChart.bind(this);
		this.renderUrl = this.renderUrl.bind(this);

		this.heroSlugs = ["genji", "mccree", "pharah", "reaper", "soldier-76", "tracer", "bastion", "hanzo", "junkrat", "mei", "torbjorn", "widowmaker", "dva", "reinhardt", "roadhog", "winston", "zarya", "ana", "lucio", "mercy", "symmetra", "zenyatta" ];
		this.heroNames = ["Genji", "McCree", "Pharah", "Reaper", "Solider: 76", "Tracer", "Bastion", "Hanzo", "Junkrat", "Mei", "Torbjörn", "Widowmaker", "D.Va", "Reinhardt", "Roadhog", "Winston", "Zarya", "Ana", "Lúcio", "Mercy", "Symmetra", "Zenyatta"];
		this.bsKey = 0;

		this.state = {
			url: undefined
		}
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

	saveChart() {
		let matchupInputs = document.getElementsByClassName("matchup");
		let matchup_chart = {};
		for (let i = 0; i < matchupInputs.length; i++) {
			matchup_chart[matchupInputs[i].getAttribute('data-hero')] = matchup_chart[matchupInputs[i].getAttribute('data-hero')] || {};
			matchup_chart[matchupInputs[i].getAttribute('data-hero')][matchupInputs[i].getAttribute('data-opponent')] = parseFloat(matchupInputs[i].value);
		}
		this.putMatchupChart(matchup_chart);
	}

	putMatchupChart(matchup_chart) {
		let data = {matchup_chart: matchup_chart};

		$.ajax({
			method: "PUT", 
			url: "/matchup_chart",
			data: data,
			datatype: 'json',
			success: (result) => {
				console.log(result);
				this.setState({url: result.url})
			}
		})
	}

	renderUrl() {
		if (this.state.url) {
			return (
				<div>
					<p>Your URL is: {"overwatchcounters.io./counters/" + this.state.url}</p>
					<a href={`/counters/${this.state.url}`}>Get Counters</a>
				</div>
			);
		}
	}

	renderChart() {
		return (
			<table>
				<tbody>
					<tr>
						<td>Heroes v Opponents</td>
						{this.heroNames.map((heroName, heroIndex) => <td key={heroIndex}>{heroName}</td>)}
					</tr>
					{this.heroSlugs.map((heroSlug, heroIndex) => this.renderHeroRow(heroSlug, heroIndex))}
				</tbody>
			</table>	
		);
	}

	renderHeroRow(hero, heroIndex) {
		return (
			<tr key={heroIndex}>
				<td> 
					<p>{this.heroNames[heroIndex]}</p>
				</td>
				{this.heroSlugs.map((opponent) => {
					this.bsKey += 1;
					return (
						<td key={this.bsKey}>
							<input type="number" 
							className="matchup"
							data-hero={hero} 
							data-opponent={opponent} 
							style={{"width": "3em"}} 
							defaultValue="0"/>
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
				{this.renderUrl()}
				<button onClick={this.saveChart} >Save</button>
			</div>
		);	
	}
}	