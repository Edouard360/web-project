var ListeLieu = React.createClass({
	getInitialState: function() {
    	return {lieux: [],value:""};
  	},
  	componentDidMount: function() {
   		this.loadFromServer();
 	},
 	loadFromServer: function(){
  	$.ajax({
    	url: "/ChargerLesLieux",
    	type: "get",
    	dataType: 'json',
    	success: function(data) {
      		this.setState({lieux :data});
    	}.bind(this)
  	});
     $.ajax({
      url: "/Connexion",
      type: "put",
      dataType: "json",
      success: function(data) {
        if(data.result){
          this.setState({user:data.result});
          console.log(data.result);
        }
        }.bind(this),
      }); 
  },
	handleChange:function(value){
  		this.setState({value:value});
	},
	handleDelete: function(idl){
		$.ajax({
        url: "/SupprimerUnLieu",
        type: "post",
        data: {idl:idl},
        success: function() {
          this.loadFromServer();
        }.bind(this),
        error:function(){
          //console.log(1);
        }
      });

  	},
	filtre:function(props){ return(props.tag.toLowerCase().indexOf(this.state.value) !== -1) },
	render:function(){
		var lieux = this.state.lieux.filter(this.filtre).map(function(props) {
			return (
     		<Lieu canDelete={parseInt(this.props.user.admin)===1} key={props.idl} {...props} handleDelete={this.handleDelete}> 
        	//après on rajoute le send message.
        	</Lieu>
          );
  		}.bind(this));
		return(
			<section id="one" className="wrapper style1 special">
	          <header className="major">
	            <h2>LIEUX</h2>
	            <p>Votre lieu n'est pas dans la liste ? Créez le !</p>
	          </header>
	          	<div className="container filtre">
			        Filtrer les Lieux par Nom
			        <FilterBar value={this.state.value} handleChange={this.handleChange} />
		        </div>
		        <div className="listeaffiches">
					{lieux}
		        </div>
		        <div className="container form">
			        <h3>FORMULAIRE</h3>
			        <h5>A remplir si vous voulez créer un lieu</h5>
			        <hr/>
			        <LieuForm data={this.state.lieux} />
		        </div>
	        </section>
		)
	}
});

/*
ReactDOM.render(
  <ListeLieu />,
  document.getElementById('content2')
);
*/


