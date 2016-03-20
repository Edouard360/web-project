var LieuForm = React.createClass({
	getInitialState: function() {
		return {tagErr:'',tag:''};
	},
	render:function(){
		var form = 
          <form onSubmit={this.soumettreLieu}>
              <div className="form-group">
              	<label >Tag</label>
                <input className="form-control" type="text" id="tag" placeholder="Tag" value={this.state.tag} onChange={this.handleChange} />{this.state.tagErr}
              </div>
              <hr />
              <div>
                  <input value="Enregistrer" className="special small" type="submit" />   
              </div>
          </form>

		return form;
	},
	handleChange:function(event){
		switch(event.target.id){
			case "tag":
				this.setState({tag : event.target.value,tagErr:''});
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
			data: {tag: this.state.tag},
			success: function(data) {
				console.log(data);
				if(data.error){
					console.log(data.error);
					this.setState({tagErr: data.error.tagErr});
				}else{
					console.log(data.result);
					this.setState({tag:'',tagErr:'Bien soumis'});
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
