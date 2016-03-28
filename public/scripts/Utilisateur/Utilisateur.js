var Utilisateur = React.createClass({
  render: function(){
    if(!this.props.nom){
       return(<br/>);
    }
    return(
      <section className="box utilisateur">
        <h6>
          {this.props.admin>0?"Administrateur":"Utilisateur"}<br />
          {this.props.nom.toUpperCase()} <br />
          {this.props.prenom.toUpperCase()} <br />
        </h6> 
      </section>
      );
  }
});


