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
    this.toggleHelp = this.toggleHelp.bind(this);
    // this.renderTableSettings = this.renderTableSettings.bind(this);
    // this.changeMax = this.changeMax.bind(this);
    // this.changeIncrement = this.changeIncrement.bind(this);

		this.heroSlugs = ["genji", "mccree", "pharah", "reaper", "soldier-76", "tracer", "bastion", "hanzo", "junkrat", "mei", "torbjorn", "widowmaker", "dva", "reinhardt", "roadhog", "winston", "zarya", "ana", "lucio", "mercy", "symmetra", "zenyatta" ];
		// this.heroNames = ["Genji", "McCree", "Pharah", "Reaper", "Solider: 76", "Tracer", "Bastion", "Hanzo", "Junkrat", "Mei", "Torbjörn", "Widowmaker", "D.Va", "Reinhardt", "Roadhog", "Winston", "Zarya", "Ana", "Lúcio", "Mercy", "Symmetra", "Zenyatta"];
    this.shortenedHeroNames= ["Genji", "MCree", "Phar", "Reap", "Solider", "Trace", "Bast", "Hanzo", "Junk", "Mei", "Torb", "Widow", "D.Va", "Rein", "Road", "Winst", "Zarya", "Ana", "Lúcio", "Mercy", "Sym", "Zeny"];
		this.bsKey = 0;

		this.state = {
			id: undefined,
      // saveState: "disabled",
      // incrementValue: this.props.matchupTable.increment_value,
      // max: this.props.matchupTable.max,
      incrementValue: 25,
      max: 100,
      failedSave: false,
      displayHelp: false
		}
	}

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  // Not sure why this works in componentDidUpdate and not in componentDidMount
  componentDidUpdate() {
    document.getElementsByClassName('matchup')[1].focus();
  }

  handleResize() {
    this.setState({windowWidth: window.innerWidth});
  }

  toggleHelp() {
    this.setState({displayHelp: !this.state.displayHelp});
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
    let originalId = splitUrl[splitUrl.length - 1];

    let data = {
      matchups: matchups,
      increment_value: this.state.incrementValue,
      max: this.state.max,
      originalId: originalId
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
          id: result.id,
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

  renderHelpInfo() {
    if (this.state.displayHelp) {
      return (
        <div className="callout primary">
          <p>Each input below displays a number between -100 and 100, representing how well the row hero fares against the column hero. For instance, the input currently selected resides on Genji's row and McCree's column. A value of 100 woudl indicate that Genji counters McCree perfectly, a -25 would mean that McCree is a soft counter to Genji, and a 0 means they are equally matched.</p>
          <p>Use the up and down arrows to score each matchup (or type in a number for a more percise value), and use tab and shift+tab to navigate between matchups.</p>
          <p>If you want to start from scratch, hit the clear button below.</p>
          <p>Click save to recieve a URL that links to the counter calculator for your matchup data.</p>
          <button className="close-help-button alert button" onClick={this.toggleHelp}>Close</button>
        </div>
      );
    }
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
						<td><button className="help-button" onClick={this.toggleHelp}><span className="help-button-text">?</span></button></td>
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
    if (this.state.id) {
      return (
        <div>
          <p className="create-matchups-link center-text">Your Counter Calculator:</p> 
          <p className="create-matchups-link center-text"><a href={`/${this.state.id}`}>{"overwatchcounters.io/" + this.state.id}</a></p>
        </div>
      );
    }
  }

  // {this.renderTableSettings()}
  render() {
    return (
      <div className="side-margin">
        {this.renderSizeWarning()}
        {this.renderHelpInfo()}
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