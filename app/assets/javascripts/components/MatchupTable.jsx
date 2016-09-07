class MatchupTable extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.renderHeroRow = this.renderHeroRow.bind(this);
		this.renderTable = this.renderTable.bind(this);
		this.saveTable = this.saveTable.bind(this);
		this.putMatchupTable = this.putMatchupTable.bind(this);
		this.renderUrl = this.renderUrl.bind(this);
    this.mirrorInputs = this.mirrorInputs.bind(this);
    this.renderTableSettings = this.renderTableSettings.bind(this);
    this.changeMax = this.changeMax.bind(this);
    this.changeIncrementor = this.changeIncrementor.bind(this);

		this.heroSlugs = ["genji", "mccree", "pharah", "reaper", "soldier-76", "tracer", "bastion", "hanzo", "junkrat", "mei", "torbjorn", "widowmaker", "dva", "reinhardt", "roadhog", "winston", "zarya", "ana", "lucio", "mercy", "symmetra", "zenyatta" ];
		this.heroNames = ["Genji", "McCree", "Pharah", "Reaper", "Solider: 76", "Tracer", "Bastion", "Hanzo", "Junkrat", "Mei", "Torbjörn", "Widowmaker", "D.Va", "Reinhardt", "Roadhog", "Winston", "Zarya", "Ana", "Lúcio", "Mercy", "Symmetra", "Zenyatta"];
		this.bsKey = 0;

		this.state = {
			url: undefined,
      // saveState: "disabled"
		}
	}

  mirrorInputs(matchupTable, hero, opponent) {
    let newValue = parseInt(this.refs[hero + "-" + opponent].value) * -1;
    // this.setState({saveState: ""});
    this.refs[opponent + "-" + hero].value = newValue.toString();
  }

	saveTable() {
		let matchupInputs = document.getElementsByClassName("matchup");
		let matchup_table = {};
		for (let i = 0; i < matchupInputs.length; i++) {
			matchup_table[matchupInputs[i].getAttribute('data-hero')] = matchup_table[matchupInputs[i].getAttribute('data-hero')] || {};
			matchup_table[matchupInputs[i].getAttribute('data-hero')][matchupInputs[i].getAttribute('data-opponent')] = parseFloat(matchupInputs[i].value);
		}
		this.putMatchupTable(matchup_table);
    // this.setState({saveState: "disabled"})
	}

  changeMax(value) {
    debugger
  }

  changeIncrementor(value) {
    debugger
  }

	putMatchupTable(matchup_table) {
		let data = {matchup_table: matchup_table};

		$.ajax({
			method: "PUT", 
			url: "/matchup_table",
			data: data,
			datatype: 'json',
			success: (result) => {
				console.log(result);
				this.setState({url: result.url})
			}
		})
	}

  renderTableSettings() {
    return (
      <div>
        <input type="number" name="max" defaultValue="2" onInput={() => this.changeMax(this, value)}/>
        <input type="number" name="incrementor" defaultValue="1" onInput={() => this.changeIncrementor(this, value)}/>
      </div>
    );
  }

	renderTable() {
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
				{this.heroSlugs.map((opponent, index) => {
					this.bsKey += 1;

          if (index === heroIndex) {
            return  (
              <td key={this.bsKey}>
                <p type="number" 
                className="matchup"
                data-hero={hero} 
                data-opponent={opponent} 
                style={{"width": "3em"}}
                value="0">0</p>
              </td> 
            );
          } else {
  					return (
  						<td key={this.bsKey}>
  							<input type="number" 
  							className="matchup"
  							data-hero={hero} 
  							data-opponent={opponent} 
  							style={{"width": "3em"}} 
  							defaultValue="0"
                ref={hero + "-" + opponent}
                onInput={() => this.mirrorInputs(this, hero, opponent)}/>
  						</td> 
  					);
          }
				})}
			</tr>
		);
	}

  renderUrl() {
    if (this.state.url) {
      return (
        <div>
          <p>Your URL is: <a href={`/counters/${this.state.url}`}>{"overwatchcounters.io/counters/" + this.state.url}</a></p>
          <a href={`/counters/${this.state.url}`}>Get Counters</a>
        </div>
      );
    }
  }

	render() {
		return (
			<div>
        {this.renderTableSettings()}
				{this.renderTable()}
				{this.renderUrl()}
				<button onClick={this.saveTable} >Save</button>
			</div>
		);	
	}
}	