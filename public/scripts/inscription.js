

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
        <div className="container 50%">
          <form onSubmit={this.inscription}>
            <div className="row uniform">
              <div className="6u 12u$(small)">
                <input type="text" id="nom" placeholder="nom" value={this.state.nom} onChange={this.handleChange} />{this.state.nomErr}
              </div>
              <div className="6u$ 12u$(small)">
                <input type="text" id="prenom" placeholder="prenom" onChange={this.handleChange} />{this.state.prenomErr}
              </div>
              <div className="12u$">
              	<input type="text" id="identifiant" placeholder="identifiant" onChange={this.handleChange} />{this.state.identifiantErr}
              </div>
              <div className="12u$">
              	<input type="text" id="motdepasse" placeholder="motdepasse" onChange={this.handleChange} />{this.state.motdepasseErr}
              </div>
              <div className="12u$">
                <ul className="actions">
                  <li><input value="S'inscrire" className="special big" type="submit" /></li>
                </ul>
              </div>
              <div className="12u$">
				<ul className="actions">
		          <li><input value="Connexion" className="special small" type="button" onClick={()=>window.location.replace("/Connexion")}/></li>
		        </ul>
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
					this.setState({nomErr: data.error.nomErr,prenomErr: data.error.prenomErr,identifiantErr: data.error.identifiantErr,motdepasseErr: data.error.mdpErr});
				}else{
					console.log(data.result);
					this.setState({nomErr:'',prenomErr:'',identifiantErr:'',motdepasseErr:''});
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

ReactDOM.render(
  <Inscription />,
  document.getElementById('content3')
);