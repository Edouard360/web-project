var Utilisateur = React.createClass({
  render: function(){
    var admin = <div>
    <span className="glyphicon glyphicon-star" />Administrateur<span className="glyphicon glyphicon-star" />
    </div>

    var user = <div>
    <span className="glyphicon glyphicon-user"/> Utilisateur <span className="glyphicon glyphicon-user"/> 
    </div>
    if(!this.props.nom){
       return(<br/>);
    }
    return(
      <section className="12u$(xsmall)">
      {this.props.admin>0?admin:user}
      {this.props.nom.toUpperCase()} <br />
      {this.props.prenom.toUpperCase()} <br /> 
      </section>
      );
  }
});

var Lieu = React.createClass({
  render:function(){
    return(
      <div className={this.props.bold?"utilisateur":""}>
        {this.props.tag}
        {this.props.location}
        {this.props.idl}
      </div>

      )
  }
});

