
var ObjetForm = React.createClass({
	getInitialState: function() {
		return {nomErr:'',descriptionErr:'', lieuxErr:'',nom:'',description:'', lieux:[]};
	},
	render:function(){
		var form = 
        <div className="container 50%">
          <form onSubmit={this.soumettreObjet}>
            <div className="row uniform">
              <div className="6u 12u$(small)">
                <input type="text" id="nom" placeholder="nom" value={this.state.nom} onChange={this.handleChange} />{this.state.nomErr}
              </div>
              <div className="6u$ 12u$(small)">
                <input type="text" id="description" placeholder="description" value={this.state.description} onChange={this.handleChange} />{this.state.descriptionErr}
              </div>
              <LieuAutobar data={this.props.data} lieux={this.state.lieux} add={this.add} />
              <div className="12u$">
                <ul className="actions">
                  <li><input value="Enregistrer" className="special small" type="submit" /></li>
                </ul>
              </div>
            </div>
          </form>
        </div>
		return form;
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
		console.log(e.target);
		$.ajax({
			url: "/AjouterUnObjet",
			type: "post",
			data: {nom: this.state.nom, description: this.state.description, lieux:this.state.lieux.map(function(props){return props.idl;})},
			success: function(data) {
				console.log(data);
				if(data.error){
					console.log(data.error);
					this.setState({nomErr: data.error.nomErr,descriptionErr: data.error.descriptionErr});
				}else{
					console.log(data.result);
					this.setState({nom:'', description:'',nomErr:'Bien soumis',descriptionErr:'OK'});
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
