
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
    var utilisateurs=this.state.utilisateur.map(function(props,id){return (<div key={id}><UtilisateurEdit handleDetruire={this.handleDetruire} key={id} user={this.state.user} utilisateur={props} /><br/></div>);}.bind(this));
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

        console.log("OK DESTRUCTION");
        console.log(data);
        this.loadFromServer();
      }.bind(this)
    });
  }
});



var UtilisateurEdit= React.createClass({
  render:function(){
    var bool = this.props.user.admin && !this.props.utilisateur.admin;
    var button = <button onClick={this.handleDetruire}>Supprimer</button> 
    return <div>
    <Utilisateur {...this.props.utilisateur}/>
    {bool?button:""}
    </div>
  },
  handleDetruire:function(){
    console.log(this.props);
    this.props.handleDetruire(this.props.idu);
  }
});

