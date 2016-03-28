var ObjetForm = React.createClass({
	getInitialState: function() {
		return {nomErr:'',descriptionErr:'', lieuxErr:'',nom:'',description:'', lieux:[]};
	},
	render:function(){
		var form = 
			<form onSubmit={this.soumettreObjet} encType="multipart/form-data" >
			  <div className="form-group">
			  	<label >Nom</label>
			    <input className="form-control" type="text" id="nom" placeholder="Nom" value={this.state.nom} onChange={this.handleChange} />{this.state.nomErr}
			  </div>
			  <div className="form-group">
			  	<label >Description</label>
			    <input className="form-control" type="text" id="description" placeholder="Description" value={this.state.description} onChange={this.handleChange} />{this.state.descriptionErr}
			  </div>
			  <div className="form-group">
			  	<label >Image</label>
			  	<span className="file-input btn btn-block btn-primary btn-file">
                Télécharger une image&hellip; <input type="file" className="form-control" type="file" name="image" id="image" />
            	</span>
			  </div>
			  <div className="text-form">
			  	<p><i className="fa fa-exclamation-triangle"></i>&nbsp; Si vous pensez savoir où a été perdu votre objet, 
			  	vous pouvez préciser autant de lieux que vous le souhaitez, tant qu'ils apparaissent dans la barre d'autocomplétion ! Si
			  	votre lieux n'apparait pas, s'il vous plait, référencez le d'abord dans la BDD dans l'onglet correspondant</p>
			  </div>
			  <LieuAutobar data={this.props.data} lieux={this.state.lieux} add={this.add} delete={this.delete}/>
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
		if(!this.state.lieux.find(function(props){return props.idl === lieu.idl}.bind(this)))
			this.setState({lieux:this.state.lieux.concat(lieu)});//la il faut changer !!
	},
	delete:function(idl){
		console.log(this.state.lieux);
		this.setState({lieux:this.state.lieux.filter( function(props){return(props.idl!==idl)}.bind(this) )});
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
		var formData = new FormData();
		var file = document.getElementById('image').files[0];
		if(file)
			formData.append('image', file, file.name);
		formData.append('nom', this.state.nom);
		formData.append('description', this.state.description);
		formData.append('lieux', JSON.stringify(this.state.lieux.map(function(props){return props.idl;})));
		$.ajax({
			url: "./AjouterUnObjet",
			type: "post",
			dataType: "json",
			contentType: false,
			processData: false,
			cache: false,
			data: formData,
			success: function(data) {
				console.log(data);
				if(data.error){
					this.setState({nomErr: data.error.nom,descriptionErr: data.error.description});
				}else{
        			ReactDOM.render( <SuccessForm user={this.props.user} />, document.getElementById('content2') );
				}
    		}.bind(this),
		});
	},
});


var SuccessForm = React.createClass({
	render:function(){
		var form = 
		<section id="three" className="wrapper style3 validform">
        <div className="container">
          <header className="major">
            <h2 >BIEN ENREGISTRÉ !</h2>
            <p> Votre déclaration a bien été prise en compte {this.props.user.prenom} {this.props.user.nom} !</p>
            <i className="fa fa-check fa-5x"></i>
            <br/>
            <p> Allez voir dans la liste des objets !</p>
          </header>
        </div>
      </section>
		return form;
	}
});
