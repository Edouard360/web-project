var LieuForm = React.createClass({
	getInitialState: function() {
		return {tagErr:'',tag:'', latitude:"",longitude:""};
	},
	render:function(){
		var form = 
          <form onSubmit={this.soumettreLieu}>
              <div className="form-group">
              	<label >Tag</label>
                <input className="form-control" type="text" id="tag" placeholder="Tag" value={this.state.tag} onChange={this.handleChange} />{this.state.tagErr}
              </div>
              <div className="form-group">
              	<label >Cliquez sur la carte pour placer votre lieu !</label>
             	<LieuMapForm updatePosition={this.updatePosition} />
              </div>
              <hr />
              <div>
                  <input value="Enregistrer" className="special small" type="submit" />   
              </div>
          </form>

		return <section id="one" className="wrapper style1 special Lieu">
			<div className="container form">
			    <h3>FORMULAIRE</h3>
			    <h5>A remplir si vous voulez créer un lieu</h5>
			    <hr/>
			    {this.props.user.nom?form:"Vous devez d'abord vous connecter"}
		    </div>
		</section>
	},
	updatePosition(latLng){
		this.setState({latitude:latLng.lat(),longitude:latLng.lng()});
	},
	handleChange:function(event){
		switch(event.target.id){
			case "tag":
				this.setState({tag : event.target.value,tagErr:''});
				break;
			case "map":
				this.setState({latitude: event.target.latitude,longitude: event.target.longitude});
				break;
			default:

		}

	},
	soumettreLieu:function(e){
		e.preventDefault();
		console.log(e.target);
		$.ajax({
			url: "/AjouterUnLieu",
			type: "post",
			dataType: "json",
			data: {tag: this.state.tag, lat:this.state.latitude, lng:this.state.longitude},
			success: function(data) {
				if(data.error){
					console.log(data.error);
					this.setState({tagErr: data.error.tag});
				}else{
					console.log(data);
					this.setState({tag:'',tagErr:'Bien soumis'});
					this.props.reload(true);
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
