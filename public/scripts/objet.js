
var Objet = React.createClass({
  render: function(){
    var detruire = <button onClick={this.handleDelete}>Détruire !</button>
    var undeclare = <button onClick={this.handleUndeclare}>Undeclare</button>
    var declare = <button onClick={this.handleDeclare}>Declare</button>
    return(
      <div> 
      <h4>
      {this.props.ido}
      {this.props.nom}
      {this.props.description}
      {this.props.lieux}
      </h4>
      <h5>
      Perdu par
      </h5>
      <Utilisateur {...this.props.lostBy} />
      <Utilisateur {...this.props.foundBy} />
      {this.props.user.idu===this.props.lostBy.idu||this.props.user.admin ? detruire:""}
      {this.props.foundBy.idu===this.props.user.idu ? undeclare:""}
      {!this.props.foundBy.idu?declare:""}
      </div>
      );
  },
  handleDelete: function(){
    this.props.handleDelete(this.props.ido);
  },
  handleDeclare: function(){
    this.props.handleDeclare(this.props.ido);
  },
  handleUndeclare: function(){
    this.props.handleUndeclare(this.props.ido);
  },


});


var Bloc = React.createClass({
  getInitialState: function() {
    return {objets: [], lieux: [],user:{}};
  },
  componentDidMount: function() {
   this.loadFromServer();
  },
  loadFromServer: function(){
  // --- TRES IMPORTANT ON REFORMATTE LES DONNEES !! --- //
    $.ajax({
      url: "/ChargerLesObjets",
      type: "get",
      dataType: 'json',
      success: function(data) {
        data=data.map(function(props){
          var newprops={};
          newprops["lieux"]=props.lieux?props.lieux.split(","):"";
          newprops["lostBy"]={idu:props.lostByidu,nom:props.lostBynom,prenom:props.lostByprenom,identifiant:props.lostByidentifiant,admin:props.lostByadmin};
          newprops["foundBy"]={idu:props.foundByidu,nom:props.foundBynom,prenom:props.foundByprenom,identifiant:props.foundByidentifiant,admin:props.foundByadmin};
          newprops["ido"]=props.ido;
          newprops["nom"]=props.nom;
          newprops["description"]=props.description;
           //console.log(newprops);
           return newprops;
         });
        this.setState({objets :data});
      }.bind(this)
    });
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
    handleDelete:function(ido){
      $.ajax({
        url: "/SupprimerUnObjet",
        type: "post",
        data: {ido:ido},
        success: function() {
          this.loadFromServer();
        }.bind(this),
        error:function(){
          //console.log(1);
        }
      });
    },
    handleDeclare:function(ido){
      $.ajax({
        url: "/DeclarerAvoirTrouveUnObjet",
        type: "post",
        data:{ido:ido},
        success: function() {
          //console.log("nice");
          this.loadFromServer();
        }.bind(this)
      });
    },
    handleUndeclare:function(ido){
      $.ajax({
        url: "/RetirerDeclaration",
        type: "post",
        data:{ido:ido},
        success: function() {
          //console.log("nice");
          this.loadFromServer();
        }.bind(this)
      });
    },
    filtre:function(props){if(!this.state.entier) return true; else{return(props.ido>parseInt(this.state.entier));}},
    handleChange:function(e){
      this.setState({entier:e});
      //console.log(this.state.entier);
    },
    render: function() {
      var objets = this.state.objets.filter(this.filtre).map(function(props) {
        return (
         <Objet {...props} user={this.state.user} key={props.ido} handleDelete={this.handleDelete} handleDeclare={this.handleDeclare} handleUndeclare={this.handleUndeclare}> 
            	//après on rajoute le send message.
            	</Objet>
              );
      }.bind(this));
      return (
        <div>
        <Autobar data={this.state.lieux} />
        {objets}
        <ObjetForm data={this.state.lieux} />
        </div>
        );
    },
});

/*
 ReactDOM.render(
   <Bloc />,
   document.getElementById('content3')
   );


ReactDOM.render(
  <ListeUtilisateur />,
  document.getElementById('content5')
);
*/

ReactDOM.render(
  <Bloc />,
  document.getElementById('content4')
);






