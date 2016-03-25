var ListeLieu = React.createClass({
	getInitialState: function() {
    	return {value:""};
  	},
	handleChange:function(value){
  		this.setState({value:value});
	},
	handleDelete: function(idl){
		$.ajax({
        url: "/MODAL/SupprimerUnLieu",
        type: "post",
        data: {idl:idl},
        success: function() {
          this.props.load("special");
        }.bind(this),
        error:function(){
          //console.log(1);
        }
      });
  	},
	filtre:function(props){ return(props.tag.toLowerCase().indexOf(this.state.value) !== -1) },
	render:function(){
		var lieux = this.props.lieux.filter(this.filtre).map(function(props) {
			return (
     		<Lieu canDelete={parseInt(this.props.user.admin)===1} key={props.idl} {...props} handleDelete={this.handleDelete}> 
        	//après on rajoute le send message.
        	</Lieu>
          );
  		}.bind(this));
		return(
			<section id="one" className="wrapper style1 special Lieu">
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


