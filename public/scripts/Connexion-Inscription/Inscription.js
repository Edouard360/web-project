var Inscription = React.createClass({
	getInitialState: function() {
		return {nomErr:'',prenomErr:'',identifiantErr:'',motdepasseErr:'',nom:'',prenom:'',identifiant:'',motdepasse:''};
	},
	render:function(){
		var form = 
		<section id="three" className="wrapper style3 special">
        <div className="container">
          <header className="major">
            <h2 >INSCRIPTION</h2>
          </header>
        </div>
        <div className="container">
          <form onSubmit={this.inscription}>
            <div>
              <div className="col-sm-6 inscription">
                <input className="form-control" type="text" id="nom" placeholder="Nom" value={this.state.nom} onChange={this.handleChange} />{this.state.nomErr}
              </div>
              <div className="col-sm-6 inscription">
                <input className="form-control" type="text" id="prenom" placeholder="Prénom" onChange={this.handleChange} />{this.state.prenomErr}
              </div>
              <div className="col-sm-12 inscription">
              	<input className="form-control" type="text" id="identifiant" placeholder="Identifiant" onChange={this.handleChange} />{this.state.identifiantErr}
              </div>
              <div className="col-sm-12 inscription">
              	<input className="form-control" type="password" id="motdepasse" placeholder="Mot De Passe" onChange={this.handleChange} />{this.state.motdepasseErr}
              </div>
              <div className="col-sm-12 inscription">
                <input value="S'inscrire" className="special big" type="submit" />
              </div>
              <div className="col-sm-12 inscription">
				<input value="Connexion" className="special small" type="button" onClick={()=>ReactDOM.render(<Connexion user={{}} connect={this.props.connect}/>, document.getElementById('content2') )}/>
		      </div>
            </div>
          </form>
        </div>
      </section>
		return form;
	},	
	handleChange:function(event){
		switch(event.target.id){
			case "nom":
				this.setState({nom : event.target.value});
				break;
			case "prenom":
				this.setState({prenom : event.target.value});
				break;
			case "identifiant":
				this.setState({identifiant : event.target.value});
				break;
			case "motdepasse":
				this.setState({motdepasse : event.target.value});
				break;
			default:
		}
	},
	inscription:function(e){
		e.preventDefault();
		$.ajax({
			url: "/Inscription",
			type: "post",
			dataType: "json",
			data: {nom: $('#nom').val(), prenom: $('#prenom').val(), identifiant: $('#identifiant').val(),motdepasse: $('#motdepasse').val()},
			success: function(data) {
				if(data.error){
					console.log(data.error);
					this.setState({nomErr: data.error.nom,prenomErr: data.error.prenom,identifiantErr: data.error.identifiant,motdepasseErr: data.error.motdepasse});
				}else{
					this.setState({nomErr:'',prenomErr:'',identifiantErr:'',motdepasseErr:''});
					ReactDOM.render(<App2 active="Connexion" user={data.result} />,document.getElementById('content1'));
					ReactDOM.render(<InscriptionValide user={data.result} />,document.getElementById('content2'));	
				}
    		}.bind(this),
    		error: function(xhr, status, err) {
      			console.log(xhr.responseText);
      			console.log(status);
      			console.log(err.st);
    		}.bind(this)
		});
	},
});


var InscriptionValide = React.createClass({
	render:function(){
		var form = 
		<section id="three" className="wrapper style3 special">
        <div className="container">
          <header className="major">
            <h2 >INSCRIPTION VALIDÉE</h2>
            <p> Votre inscription a bien été prise en compte {this.props.user.prenom} {this.props.user.nom} !</p>
            <i className="fa fa-cog fa-spin fa-5x"></i>
            <p> Vous pouvez maintenant naviguer sur le site et profitez de toutes ses fonctionnalités !</p>
          </header>
        </div>
      </section>
		return form;
	}
});


/*

ReactDOM.render(
  <Inscription />,
  document.getElementById('content2')
);
*/