
var ListeUtilisateur = React.createClass({
  getInitialState: function() {
    return {utilisateur:[]}
  },
  componentDidMount: function() {
   this.loadFromServer();
  },
  loadFromServer: function(){
    $.ajax({
      url: "/ChargerLesUtilisateurs",
      type: "get",
      dataType: 'json',
      success: function(data) {
        console.log(data);
        this.setState({utilisateur :data});
      }.bind(this)
    });
  },
  render:function(){
    var utilisateurs=this.state.utilisateur.map(
      function(props,id){return (
        <div key={id}><UtilisateurEdit 
          handleDetruire={this.handleDetruire}
          rendreAdmin={this.rendreAdmin} 
          key={id} user={this.props.user} 
          utilisateur={props} />
          <br/>
          </div>);
      }.bind(this));
    var greetadmin = <p>Vous êtes admin ! <br/> Vous pouvez conférer votre statut ou désinscrire les autres utilisateurs...</p>  
    return(
      <section id="one" className="wrapper style1 special">
          <header className="major">
            <h2>UTILISATEURS</h2>
            {(this.props.user.admin===1) ?greetadmin:""}
            </header>
          <div className="listeaffiches">
        {utilisateurs}
        </div>
      </section>
      )
  },
  handleDetruire: function(idu){
    $.ajax({
      url: "/DetruireUtilisateur",
      type: "post",
      data: {idu:idu},
      success: function(data) {
        this.loadFromServer();
      }.bind(this)
    });
  },
  rendreAdmin:function(idu){
    $.ajax({
      url: "/RendreAdmin",
      type: "post",
      data: {idu:idu},
      success: function(data) {
        this.loadFromServer();
      }.bind(this)
    });
  }
});


var UtilisateurEdit= React.createClass({
  render:function(){
    var bool = this.props.user.admin>0 && !(this.props.utilisateur.admin>0);
    var button = <div>
    <button className="button small" onClick={this.handleDetruire}><i className="fa fa-exclamation"></i>&nbsp; Désinscrire</button>
    <button className="button small" onClick={this.rendreAdmin}><i className="fa fa-star"></i>&nbsp; Rendre Admin</button>
    </div>
    return(
      <div className="container affiche">
        <Utilisateur {...this.props.utilisateur}/>
        {bool?button:""}
      </div>
      )
    
  },
  handleDetruire:function(){
    this.props.handleDetruire(this.props.utilisateur.idu);
  },
  rendreAdmin:function(){
    this.props.rendreAdmin(this.props.utilisateur.idu);
  }
});
/*
ReactDOM.render(
  <ListeUtilisateur />,
  document.getElementById('content2')
);
*/