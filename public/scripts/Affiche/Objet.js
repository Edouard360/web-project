var Objet = React.createClass({
  render: function(){
    return(
      <div className="box objet">
        <h6>
          NOM : {this.props.nom}<br/> 
          DESCRIPTION : {this.props.description}
        </h6>
        {this.props.lieux}
        {this.props.hour} <br/>
        {this.props.day}
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
    var style1=<div className="container affiche">
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
    var supprimer2 = <button className="button twice" onClick={this.handleDelete}> <i className="fa fa-trash-o"></i>&nbsp; Supprimer</button>
    var undeclare2 = <button className="button twice" onClick={this.handleUndeclare}><i className="fa fa-unlock"></i>&nbsp; Retirer</button>
    var declarer2 = <button className="button twice" onClick={this.handleDeclare}><i className="fa fa-tag"></i>&nbsp; Déclarer</button>            
    var retrouve2 = <ul>Retrouvé par:<li>{this.props.foundBy.prenom} {this.props.foundBy.nom}</li></ul>     
    var style2 = <div className="square">
                    <div className="content">
                        <div className="table">
                            <div className="table-cell top">
                            <ul>Objet:<li>{this.props.objet.nom}</li></ul>
                            <hr/>
                            <ul>Perdu par:<li>{this.props.lostBy.prenom} {this.props.lostBy.nom}</li></ul>
                            <ul>{this.props.objet.day}   à   {this.props.objet.hour}</ul>
                            {this.props.lieux?<ul>Peut-être dans ces lieux</ul>:""}
                            {this.props.lieux?<ul>{this.props.lieux.map(function(props){return props.toUpperCase()+' '})}</ul> :""}
                            {this.props.foundBy.nom?<hr/>:""}
                            {this.props.foundBy.nom?retrouve2:""}
                            </div>
                            <div className="table-cell bottom">
                              {((this.props.user.nom!=undefined) &(this.props.user.idu===this.props.lostBy.idu||parseInt(this.props.user.admin)!==0)) ? supprimer2:""}
                              {((this.props.user.nom!=undefined) &(this.props.foundBy.idu===this.props.user.idu))? undeclare2:""}
                              {((this.props.user.nom!=undefined) &(!this.props.foundBy.idu))?declarer2:""}
                            </div>
                        </div>
                    </div>
                </div>            
    
    return(
      <div>
        {this.props.mode?style2:style1}
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

