
var ListeUtilisateur = React.createClass({
  getInitialState: function() {
    return {utilisateur:[],user:{}}
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
  render:function(){
    var utilisateurs=this.state.utilisateur.map(
      function(props,id){return (
        <div key={id}><UtilisateurEdit 
          handleDetruire={this.handleDetruire}
          rendreAdmin={this.rendreAdmin} 
          key={id} user={this.state.user} 
          utilisateur={props} />
          <br/>
          </div>);
      }.bind(this));
    return(
      <div>
        {utilisateurs}
      </div>
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
    <button onClick={this.handleDetruire}>Supprimer</button>
    <button onClick={this.rendreAdmin}>rendreAdmin</button>
    </div>
    return <div>
    <Utilisateur {...this.props.utilisateur}/>
    {bool?button:""}
    </div>
  },
  handleDetruire:function(){
    this.props.handleDetruire(this.props.utilisateur.idu);
  },
  rendreAdmin:function(){
    this.props.rendreAdmin(this.props.utilisateur.idu);
  }
});

