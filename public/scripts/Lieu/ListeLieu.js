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
  },
	handleChange:function(value){
  		this.setState({value:value});
	},
	filtre:function(props){ return(props.tag.toLowerCase().indexOf(this.state.value) !== -1) },
	render:function(){
		var lieux = this.state.lieux.filter(this.filtre).map(function(props) {
			return (
     		<Lieu key={props.idl} {...props}> 
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


