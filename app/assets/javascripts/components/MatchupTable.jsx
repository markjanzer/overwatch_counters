class MatchupTable extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.renderHeroRow = this.renderHeroRow.bind(this);
		this.renderTable = this.renderTable.bind(this);
		this.saveTable = this.saveTable.bind(this);
		this.putMatchupTable = this.putMatchupTable.bind(this);
		this.renderUrl = this.renderUrl.bind(this);
    this.handleInput = this.handleInput.bind(this);
    // this.renderTableSettings = this.renderTableSettings.bind(this);
    // this.changeMax = this.changeMax.bind(this);
    // this.changeIncrement = this.changeIncrement.bind(this);

    // debugger
		this.heroSlugs = ["genji", "mccree", "pharah", "reaper", "soldier-76", "tracer", "bastion", "hanzo", "junkrat", "mei", "torbjorn", "widowmaker", "dva", "reinhardt", "roadhog", "winston", "zarya", "ana", "lucio", "mercy", "symmetra", "zenyatta" ];
		this.heroNames = ["Genji", "McCree", "Pharah", "Reaper", "Solider: 76", "Tracer", "Bastion", "Hanzo", "Junkrat", "Mei", "Torbjörn", "Widowmaker", "D.Va", "Reinhardt", "Roadhog", "Winston", "Zarya", "Ana", "Lúcio", "Mercy", "Symmetra", "Zenyatta"];
		this.bsKey = 0;

    // debugger
		this.state = {
			url: undefined,
      // saveState: "disabled",
      // incrementValue: this.props.matchupTable.increment_value,
      // max: this.props.matchupTable.max,
      incrementValue: 25,
      max: 100

		}
	}

  handleInput(e) {
    let hero = e.target.getAttribute('data-hero');
    let opponent = e.target.getAttribute('data-opponent');
    let newValue;
    if (e.target.value === "") {
      newValue = "";
    } else {
      newValue = parseInt(e.target.value) * -1;
    }
    this.refs[opponent + "-" + hero].value = newValue.toString();
    // this.setState({saveState: ""});
  }

  // changeMax(e) {
  //   this.setState({max: e.target.value})
  // }

  // changeIncrement(e) {
  //   this.setState({increment: e.target.value});
  // }

	saveTable() {
		let matchupInputs = document.getElementsByClassName("matchup");
		let matchups = {};
		for (let i = 0; i < matchupInputs.length; i++) {
			matchups[matchupInputs[i].getAttribute('data-hero')] = matchups[matchupInputs[i].getAttribute('data-hero')] || {};
			matchups[matchupInputs[i].getAttribute('data-hero')][matchupInputs[i].getAttribute('data-opponent')] = parseFloat(matchupInputs[i].value);
		}

    let data = {
      matchups: matchups,
      increment_value: this.state.incrementValue,
      max: this.state.max
    }
		this.putMatchupTable(data);
    // this.setState({saveState: "disabled"})
	}

	putMatchupTable(data) {
		$.ajax({
			method: "PUT", 
			url: "/matchup_table",
			data: {matchup_table: data},
			datatype: 'json',
			success: (result) => {
				console.log(result);
				this.setState({url: result.url})
			}
		})
	}

  // renderTableSettings() {
  //   return (
  //     <div>
  //       <input type="number" name="max" defaultValue="2" onChange={this.changeMax}/>
  //       <input type="number" name="incrementor" defaultValue="1" onChange={this.changeIncrement}/>
  //     </div>
  //   );
  // }

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
                <p 
                  type="number" 
                  className="matchup"
                  data-hero={hero} 
                  data-opponent={opponent} 
                  style={{"width": "3em"}}
                  value="0">0
                </p>
              </td> 
            );
          } else {
            let tabIndex = (index < heroIndex) ? -1 : false; 
  					return (
  						<td key={this.bsKey}>
  							<input 
                  type="number" 
    							className="matchup"
    							data-hero={hero} 
    							data-opponent={opponent} 
    							style={{"width": "3em"}} 
    							defaultValue={this.props.matchupTable.matchups[hero][opponent]}
                  step={this.state.incrementValue}
                  min={this.state.max * -1}
                  max={this.state.max}
                  ref={hero + "-" + opponent}
                  onChange={this.handleInput}
                  tabIndex={tabIndex}
                />
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

  // {this.renderTableSettings()}
  render() {
    return (
      <div>
				{this.renderTable()}
				{this.renderUrl()}
				<button onClick={this.saveTable}>Save</button>
			</div>
		);	
	}
}	