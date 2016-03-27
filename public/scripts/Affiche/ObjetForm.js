var ObjetForm = React.createClass({
	getInitialState: function() {
		return {nomErr:'',descriptionErr:'', lieuxErr:'',nom:'',description:'', lieux:[]};
	},
	render:function(){
		var form = 
			<form onSubmit={this.soumettreObjet}>
			  <div className="form-group">
			  	<label >Nom</label>
			    <input className="form-control" type="text" id="nom" placeholder="Nom" value={this.state.nom} onChange={this.handleChange} />{this.state.nomErr}
			  </div>
			  <div className="form-group">
			  	<label >Description</label>
			    <input className="form-control" type="text" id="description" placeholder="Description" value={this.state.description} onChange={this.handleChange} />{this.state.descriptionErr}
			  </div>
			  <div className="text-form">
			  	<p><i className="fa fa-exclamation-triangle"></i>&nbsp; Si vous pensez savoir où a été perdu votre objet, 
			  	vous pouvez préciser autant de lieux que vous le souhaitez, tant qu'ils apparaissent dans la barre d'autocomplétion ! Si
			  	votre lieux n'apparait pas, s'il vous plait, référencez le d'abord dans la BDD dans l'onglet correspondant</p>
			  	<p>Utilisez les flèches du clavier pour séléctionner le lieu et appuyez sur TAB pour l'ajouter à la ligne</p>
			  </div>
			  <LieuAutobar data={this.props.data} lieux={this.state.lieux} add={this.add} />
			  <hr />
			  <div>
			    <input value="Enregistrer" className="special small" type="submit" />   
			  </div>
			</form>
		return <section id="one" className="wrapper style1 special Affiche">
		          <header className="major">
		            <h2>OBJETS PERDUS</h2>
		            <p>Si vous avez perdu quelque chose, faites-le savoir !</p>
		          </header>
		          <div className="container form">
			        <h3>FORMULAIRE</h3>
			        <h5>A remplir si vous avez perdu quelque chose</h5>
			        <hr/>
			        {this.props.user.nom?form:"Vous devez d'abord vous connecter"}
		        </div>
		        </section>
	},
	add:function(lieu){
		this.setState({lieux:this.state.lieux.concat(lieu)});//la il faut changer !!
	},	
	handleChange:function(event){
		switch(event.target.id){
			case "nom":
				this.setState({nom : event.target.value,nomErr:''});
				break;
			case "description":
				this.setState({description : event.target.value,descriptionErr:''});
				break;
			default:
		}
	},
	soumettreObjet:function(e){
		e.preventDefault();
		$.ajax({
			url: "/MODAL/AjouterUnObjet",
			type: "post",
			dataType: "json",
			data: {nom: this.state.nom, description: this.state.description, lieux:this.state.lieux.map(function(props){return props.idl;})},
			success: function(data) {
				if(data.error){
					this.setState({nomErr: data.error.nom,descriptionErr: data.error.description});
				}else{
					this.setState({nom:'', description:'',nomErr:'Bien Soumis',descriptionErr:'Bien Soumis'});
				}
    		}.bind(this),
		});
	},
});

