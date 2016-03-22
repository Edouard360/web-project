var Connexion = React.createClass({
	getInitialState: function() {
		return {connected:false,toggle:false,msg:""};
	},
	componentDidMount:function(){
		if(this.props.user.nom){
			this.setState({connected:true});
			this.setState({toggle:false});
		}
	},
	toggle: function(){
		this.setState({toggle:!this.state.toggle,msg:""});
	},
	connexion:function(e){
		e.preventDefault();
		$.ajax({
			url: "/Connexion",
			type: "post",
			data: {identifiant: $('#identifiant').val(), motdepasse: $('#motdepasse').val()},
			dataType: "json",
			success: function(data) {
				if(data.result){
					console.log("Connexion effective en tant que:");
					console.log(data.result);
					this.props.connect(data.result);
      				this.setState({connected:true});
      				this.setState({toggle:false});
      				this.setState({msg:''});
				} else{
					this.setState({msg:data.error});
				}
    		}.bind(this),
    	});	
	},
	deconnexion:function(){
		$.ajax({
			url: "/Deconnexion",
			type: "post",
			success: function() {
				console.log("Deconnexion effective");
      			this.setState({connected:false});
      			this.props.connect({});
    		}.bind(this),
    		error: function(xhr, status, err) {
      			console.log(xhr);
      			console.log(status);
      			console.log(err);
    		}.bind(this)
		});
	},
	render: function() {
		var connexion = <input value="Se Connecter" className="special big" type="button" onClick={this.toggle}/>
		var deconnexion = <input value="Deconnexion" className="special big" type="button" onClick={this.deconnexion}/>
		var form1 = <div className="col-sm-12 inscription">
		        		<input className="name" id="identifiant" placeholder="Id" type="text" className="form-control"  />
		    		</div>
		var form2 = <div className="col-sm-12 inscription">
		        		<input name="password" id="motdepasse" placeholder="Password" type="password" className="form-control" />
		        		{this.state.msg}
		   			</div>
		var submit =<div className="col-sm-12 inscription">
		                <input value="Connexion" className="special small" type="submit"/>
		            </div>
		var lien = 	<div className="col-sm-12 inscription">
						<input value="Inscription" className="special small" type="button" onClick={()=>ReactDOM.render(<Inscription connect={this.props.connect} />, document.getElementById('content2') )}/>
		            </div>		
		var formbool = !this.state.connected && this.state.toggle;
		var lienbool = !this.state.connected && !this.state.toggle;
		var greet = <div className="col-sm-12 inscription" > <h3>Connecté en tant que</h3> 
		<Utilisateur {...this.props.user} /></div>
		return(
			<section id="three" className="wrapper style3 special">
				<div className="container">
          			<header className="major">
            		<h2 >CONNEXION</h2>
          			</header>
        		</div>	
				<div className="container 25%">
					<form onSubmit={this.connexion}>
						<div>
		              		<div className="col-sm-12 inscription">
		                  		{this.state.connected?deconnexion:connexion}
		              		</div>

		              		{(formbool)?form1:""}
		              		{(formbool)?form2:""}
		              		{(formbool)?submit:""}
		              		{(lienbool)?lien:""}
		            		{this.state.connected?greet:""}

		            	</div>
		            </form>	
		        </div>
		    </section>    
		);
	
			
	}
});





