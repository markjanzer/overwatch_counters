class MatchupTable extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.renderHeroRow = this.renderHeroRow.bind(this);
		this.renderTable = this.renderTable.bind(this);
		this.saveTable = this.saveTable.bind(this);
    this.clearTable = this.clearTable.bind(this);
		this.putMatchupTable = this.putMatchupTable.bind(this);
		this.renderUrl = this.renderUrl.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.renderOpponentColumnLabel = this.renderOpponentColumnLabel.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.renderFailedSave = this.renderFailedSave.bind(this);
    // this.renderTableSettings = this.renderTableSettings.bind(this);
    // this.changeMax = this.changeMax.bind(this);
    // this.changeIncrement = this.changeIncrement.bind(this);

		this.heroSlugs = ["genji", "mccree", "pharah", "reaper", "soldier-76", "tracer", "bastion", "hanzo", "junkrat", "mei", "torbjorn", "widowmaker", "dva", "reinhardt", "roadhog", "winston", "zarya", "ana", "lucio", "mercy", "symmetra", "zenyatta" ];
		// this.heroNames = ["Genji", "McCree", "Pharah", "Reaper", "Solider: 76", "Tracer", "Bastion", "Hanzo", "Junkrat", "Mei", "Torbjörn", "Widowmaker", "D.Va", "Reinhardt", "Roadhog", "Winston", "Zarya", "Ana", "Lúcio", "Mercy", "Symmetra", "Zenyatta"];
    this.shortenedHeroNames= ["Genji", "MCree", "Phar", "Reap", "Solider", "Trace", "Bast", "Hanzo", "Junk", "Mei", "Torb", "Widow", "D.Va", "Rein", "Road", "Winst", "Zarya", "Ana", "Lúcio", "Mercy", "Sym", "Zeny"];
		this.bsKey = 0;

		this.state = {
			url: undefined,
      // saveState: "disabled",
      // incrementValue: this.props.matchupTable.increment_value,
      // max: this.props.matchupTable.max,
      incrementValue: 25,
      max: 100,
      failedSave: false,
		}
	}

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize();
  }

  handleResize() {
    this.setState({windowWidth: window.innerWidth});
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

  clearTable() {
    let matchupInputs = document.getElementsByClassName("matchup");
    for (let i = 0; i < matchupInputs.length; i++) {
      matchupInputs[i].value = "0";
    }
  }

	saveTable() {
		let matchupInputs = document.getElementsByClassName("matchup");
		let matchups = {};
		for (let i = 0; i < matchupInputs.length; i++) {
			matchups[matchupInputs[i].getAttribute('data-hero')] = matchups[matchupInputs[i].getAttribute('data-hero')] || {};
			matchups[matchupInputs[i].getAttribute('data-hero')][matchupInputs[i].getAttribute('data-opponent')] = parseFloat(matchupInputs[i].value);
		}
    let splitUrl = window.location.href.split("/")
    let originalHash = splitUrl[splitUrl.length - 1];

    let data = {
      matchups: matchups,
      increment_value: this.state.incrementValue,
      max: this.state.max,
      originalHash: originalHash
    }
    
		this.putMatchupTable(data);
	}

	putMatchupTable(data) {
		$.ajax({
			method: "PUT", 
			url: "/matchup_table",
			data: {matchup_table: data},
			datatype: 'json',
			success: (result) => {
				console.log(result);
				this.setState({
          url: result.url,
          failedSave: false
        })
			}, 
      error: (xhr) => {
        console.log(xhr)
        console.log(xhr.status)
        if (xhr.status === 406) {
          this.setState({failedSave: true})
        }
      }
		})
	}

  renderFailedSave() {
    if (this.state.failedSave) {
      return (
        <div className="callout alert save-warning">
          <p>You have not changed the matchup table!</p>
        </div>
      );
    }
  }

  // renderTableSettings() {
  //   return (
  //     <div>
  //       <input type="number" name="max" defaultValue="2" onChange={this.changeMax}/>
  //       <input type="number" name="incrementor" defaultValue="1" onChange={this.changeIncrement}/>
  //     </div>
  //   );
  // }

  renderSizeWarning() {
    if (this.state.windowWidth <= 768) {
      return (
        <div className="callout warning">
          <p>This page is better suited for larger screens</p>
        </div>
      );
    }
  }

	renderTable() {
		return (
			<table>
				<tbody>
					<tr>
						<td><button className="help-button"><span className="help-button-text">?</span></button></td>
						{this.renderOpponentColumnLabel()}
					</tr>
					{this.heroSlugs.slice(0, 11).map((heroSlug, heroIndex) => this.renderHeroRow(heroSlug, heroIndex))}
          <tr>
            <td></td>
            {this.renderOpponentColumnLabel()}
          </tr>
          {this.heroSlugs.slice(11).map((heroSlug, heroIndex) => this.renderHeroRow(heroSlug, heroIndex + 11))}
				</tbody>
			</table>	
		);
	}

  renderOpponentColumnLabel() {
    return this.shortenedHeroNames.map((heroName, heroIndex) => <td className="opponent-column-label" key={heroIndex}>{heroName}</td>);
  }

  renderHeroRow(hero, heroIndex) {
    return (
      <tr key={heroIndex}>
        <td> 
          <p className="hero-row-label">{this.shortenedHeroNames[heroIndex]}</p>
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

  // Change this before deployment
  renderUrl() {
    if (this.state.url) {
      return (
        <div>
          <p className="create-matchups-link center-text">Your Counter Calculator:</p> 
          <p className="create-matchups-link center-text"><a href={`/${this.state.url}`}>{"overwatchcounters.io/" + this.state.url}</a></p>
        </div>
      );
    }
  }

  // {this.renderTableSettings()}
  render() {
    return (
      <div className="side-margin">
        {this.renderSizeWarning()}
				{this.renderTable()}
				{this.renderUrl()}
        <div className="row">
          {this.renderFailedSave()}
          <div className="small-10 columns">
    				<a className="expanded button table-button" onClick={this.saveTable}  ><button>Save</button></a>
          </div>
          <div className="small-2 columns">
            <a className="expanded button alert table-button" onClick={this.clearTable}><button className="no-outline-button">Clear All Table Data</button></a>
          </div>
        </div>
			</div>
		);	
	}
}	