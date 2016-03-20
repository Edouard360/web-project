var Utilisateur = React.createClass({
  render: function(){
    var admin = <div>
    Administrateur
    </div>

    var user = <div>
    Utilisateur
    </div>
    if(!this.props.nom){
       return(<br/>);
    }
    return(
      <section className="box utilisateur">
        <h6>
        {this.props.admin>0?admin:user}
        {this.props.nom.toUpperCase()} <br />
        {this.props.prenom.toUpperCase()} <br />
        </h6> 
      </section>
      );
  }
});


