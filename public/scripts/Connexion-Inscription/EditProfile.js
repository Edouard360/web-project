var EditProfile = React.createClass({
	getInitialState: function() {
		return {nomErr:'',prenomErr:'',identifiantErr:'',motdepasseErr:'',nom:'',prenom:'',identifiant:'',motdepasse:''};
	},
	componentDidMount:function(){
		this.setState({nom:this.props.user.nom,prenom:this.props.user.prenom,identifiant:this.props.user.identifiant});
	},
	render:function(){
		var form = 
		<section id="three" className="wrapper style3 special">
        <div className="container">
          <header className="major">
            <h2 >ÉDITER VOTRE COMPTE</h2>
            <p> Vous pouvez modifiez les informations de votre profil !</p>
            <i className="fa fa-pencil fa-3x"></i>
          </header>
        </div>
        <div className="container">
          <form onSubmit={this.profile}>
            <div>
              <div className="col-sm-6 inscription">
                <input className="form-control" type="text" id="nom" placeholder="Nom" value={this.state.nom} onChange={this.handleChange} />{this.state.nomErr}
              </div>
              <div className="col-sm-6 inscription">
                <input className="form-control" type="text" id="prenom" placeholder="Prénom" value={this.state.prenom} onChange={this.handleChange} />{this.state.prenomErr}
              </div>
              <div className="col-sm-12 inscription">
              	<input className="form-control" type="text" id="identifiant" placeholder="Identifiant" value={this.state.identifiant} onChange={this.handleChange} />{this.state.identifiantErr}
              </div>
              <div className="col-sm-12 inscription">
              	<input className="form-control" type="password" id="motdepasse" placeholder="Mot De Passe" onChange={this.handleChange} />{this.state.motdepasseErr}
              </div>
              <div className="col-sm-12 inscription">
                <input value="Éditer mon profil" className="special" type="submit" />
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
	profile:function(e){
		e.preventDefault();
		$.ajax({
			url: "/MODAL/EditProfile",
			type: "post",
			dataType: "json",
			data: {nom: $('#nom').val(), prenom: $('#prenom').val(), identifiant: $('#identifiant').val(),motdepasse: $('#motdepasse').val()},
			success: function(data) {
				console.log(data);
				if(data.error){
					console.log(data.error);
					this.setState({nomErr: data.error.nom,prenomErr: data.error.prenom,identifiantErr: data.error.identifiant,motdepasseErr: data.error.motdepasse});
				}else{
					this.setState({nomErr:'',prenomErr:'',identifiantErr:'',motdepasseErr:''});
					ReactDOM.render(<App active="Connexion" user={data.result} />,document.getElementById('content1'));
					ReactDOM.render(<UpdateValide user={data.result} />,document.getElementById('content2'));
					console.log(data.result);
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


var UpdateValide = React.createClass({
	render:function(){
		var form = 
		<section id="three" className="wrapper style3 special">
        <div className="container">
          <header className="major">
            <h2 >MODIFICATIONS PRISES EN COMPTE</h2>
            <br/>
            <p> Vos modifications ont bien été prise en compte {this.props.user.prenom} {this.props.user.nom} !</p>
            <i className="fa fa-cog fa-spin fa-5x"></i>
            <br/><br/>
            <p> Les objets que vous avez perdus ou retrouvés n'ont pas changé !</p>
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