var ListeAffiche = React.createClass({
  getInitialState: function() {
    return {objets: [], lieux: [],value:""};
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
    filtre:function(props){ return(props.objet.nom.toLowerCase().indexOf(this.state.value) !== -1) },
    handleChange:function(value){
      this.setState({value:value});
      //console.log(this.state.entier);
    },
    render: function() {
      var objets = this.state.objets.filter(this.filtre).map(function(props) {
        return (
         <Affiche {...props} user={this.props.user} key={props.objet.ido} handleDelete={this.handleDelete} handleDeclare={this.handleDeclare} handleUndeclare={this.handleUndeclare}> 
            	//après on rajoute le send message.
            	</Affiche>
              );
      }.bind(this));
      return (
        <section id="one" className="wrapper style1 special Affiche">
          <header className="major">
            <h2>OBJETS PERDUS</h2>
            <p>Si vous avez perdu quelque chose, faites-le savoir !</p>
          </header>
          <div className="container form">
        <h3>FORMULAIRE</h3>
        <h5>A remplir si vous avez perdu quelque chose</h5>
        <hr/>
        <ObjetForm data={this.state.lieux} />
        </div>
        <header className="major">
        <p>Vous pouvez consulter la liste d'Objets</p>
        </header>
          <div className="container filtre">
          Filtrer les Objets par Nom
        <FilterBar value={this.state.value} handleChange={this.handleChange} />
        </div>
        <div className="listeaffiches">
          {objets}
        </div>
        
        </section>
        );
    },
});

/*
ReactDOM.render(
  <ListeAffiche />,
  document.getElementById('content4')
);

*/




