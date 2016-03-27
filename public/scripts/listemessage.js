
var ListeMessage = React.createClass({
  getInitialState: function() {
    return {message:[]}
  },
  componentDidMount: function() {
   this.loadFromServer();
  },
  loadFromServer: function(){
    $.ajax({
      url: "./ChargerLesMessagesEmetteur",
      type: "get",
      dataType: 'json',
      success: function(data) {
        console.log(data);
        this.setState({message :data});
      }.bind(this)
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
      url: "./DetruireUtilisateur",
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
