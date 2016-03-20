

var ListeAffiche = React.createClass({
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
          newprops["objet"]={ido:props.ido,nom:props.nom, description:props.description};
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
    filtre:function(props){if(!this.state.entier) return true; else{return(props.objet.ido>parseInt(this.state.entier));}},
    handleChange:function(e){
      this.setState({entier:e});
      //console.log(this.state.entier);
    },
    render: function() {
      var objets = this.state.objets.filter(this.filtre).map(function(props) {
        return (
         <Affiche {...props} user={this.state.user} key={props.objet.ido} handleDelete={this.handleDelete} handleDeclare={this.handleDeclare} handleUndeclare={this.handleUndeclare}> 
            	//après on rajoute le send message.
            	</Affiche>
              );
      }.bind(this));
      return (
        <section id="one" className="wrapper style1 special">
          <header className="major">
            <h2>OBJETS PERDUS</h2>
            <p>Si vous avez perdu quelque chose, faites-le savoir !</p>
          </header>
        <div className="listeaffiches">
          {objets}
        </div>
        <div className="container form">
        <h3>FORMULAIRE</h3>
        <h5>A remplir si vous avez perdu quelque chose</h5>
        <hr/>
        <ObjetForm data={this.state.lieux} />
        </div>
        <Autobar data={this.state.lieux} />
        </section>
        );
    },
});


ReactDOM.render(
  <ListeAffiche />,
  document.getElementById('content4')
);






