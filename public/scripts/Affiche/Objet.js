var Objet = React.createClass({
  render: function(){
    return(
      <div className="box objet">
        <h6>
          NOM : {this.props.nom}<br/> 
          DESCRIPTION : {this.props.description}
        </h6>
        {this.props.lieux}
      </div>
      )
  }
});


var Affiche = React.createClass({
  render: function(){
    var supprimer = <button className="button small" onClick={this.handleDelete}> <i className="fa fa-trash-o"></i>&nbsp; Supprimer</button>
    var undeclare = <button className="button small" onClick={this.handleUndeclare}><i className="fa fa-unlock"></i>&nbsp; Retirer</button>
    var declarer = <button className="button small" onClick={this.handleDeclare}><i className="fa fa-tag"></i>&nbsp; Déclarer</button>
    var retrouve =<div>
                    Et a été retrouvé par:
                    <Utilisateur {...this.props.foundBy} />
                  </div>
    var lieux;
    if(this.props.lieux){
      lieux=this.props.lieux.map(function(props,id){return (<LigneLieu key={id} tag={props}/>);});
    }
    
    return(
      <div className="container affiche">
        L'OBJET
        <Objet {...this.props.objet} />  

        A été perdu par:
        <Utilisateur {...this.props.lostBy} />

        {this.props.lieux?"Probablement dans ces lieux":""}
        <table className="table">
          <thead></thead>
          <tbody>
            {lieux}
          </tbody>
        </table>
        {this.props.foundBy.nom?retrouve:""}
        <div>    
            {((this.props.user.nom!=undefined) &(this.props.user.idu===this.props.lostBy.idu||parseInt(this.props.user.admin)!==0)) ? supprimer:""}
            {((this.props.user.nom!=undefined) &(this.props.foundBy.idu===this.props.user.idu))? undeclare:""}
            {((this.props.user.nom!=undefined) &(!this.props.foundBy.idu))?declarer:""}
        </div> 
      </div>
      );
  },
  handleDelete: function(){
    this.props.handleDelete(this.props.objet.ido);
  },
  handleDeclare: function(){
    this.props.handleDeclare(this.props.objet.ido);
  },
  handleUndeclare: function(){
    this.props.handleUndeclare(this.props.objet.ido);
  },
});

