var App = React.createClass({
  getInitialState: function () {
    return {
      Home:"",
      Lieux:"",
      Connexion:"",
      Docs:"",
      Users:"",
      lieux: [],
      user:{}
    }
  },
  componentDidMount:function(){
    console.log(this.props.user);
  },
  componentWillReceiveProps:function(nextProps){
    this.setState({user:nextProps.user});
  },
  componentWillMount:function(){
    this.loadFromServer1();
  },
  loadFromServer1:function(){
    $.ajax({
      url: "./Connexion",
      type: "put",
      dataType: "json",
      success: function(data) {
        if(data.result){
          this.setState({user:data.result}); 
        }
        this.loadFromServer2();
        }.bind(this),
      });     
  },
  loadFromServer2:function(boolean){
    $.ajax({
      url: "./ChargerLesLieux",
      type: "get",
      dataType: 'json',
      success: function(data) {
        this.setState({lieux :data});
        console.log(boolean);
        if(boolean){
          this.switch("Lieux");
        }
        else{
          this.switch(this.props.active);
        } 
      }.bind(this)
      });
  },
  switch:function(active){
    switch(active) {
    case "Home":
        this.setState({Home:"active",Lieux:"",Connexion:"",Docs:"",Users:""});
        ReactDOM.render( <ListeAffiche user={this.state.user} />, document.getElementById('content2') );
        ReactDOM.render(<NavbarObjet user={this.state.user} lieux={this.state.lieux} />, document.getElementById('content3') )
        break;
    case "Lieux":
        this.setState({Home:"",Lieux:"active",Connexion:"",Docs:"",Users:""});
        ReactDOM.render( <ListeLieu user={this.state.user} load={this.loadFromServer2} lieux={this.state.lieux}/>, document.getElementById('content2') );
        ReactDOM.render( <NavbarLieu user={this.state.user} lieux={this.state.lieux} reload={this.loadFromServer2}/>, document.getElementById('content3') );
        break;
    case "Connexion":
        this.setState({Home:"",Lieux:"",Connexion:"active",Docs:"",Users:""});
        console.log(this.state.user);
        ReactDOM.render( <Connexion user={this.state.user} connect={this.connect} />, document.getElementById('content2') );
        ReactDOM.unmountComponentAtNode(document.getElementById('content3'));
        break;     
    case "Docs":
        this.setState({Home:"",Lieux:"",Connexion:"",Docs:"active",Users:""});
        ReactDOM.render(<Docs/>,document.getElementById('content2'));
        ReactDOM.unmountComponentAtNode(document.getElementById('content3'));
        break;  
    case "Users":
        this.setState({Home:"",Lieux:"",Connexion:"",Docs:"",Users:"active"});
        ReactDOM.render( <ListeUtilisateur user={this.state.user} connect={this.connect} />, document.getElementById('content2') );
        ReactDOM.unmountComponentAtNode(document.getElementById('content3'));
        break;
    case "EditProfile":
        this.setState({Home:"",Lieux:"",Connexion:"active",Docs:"",Users:""});
        ReactDOM.render( <EditProfile user={this.state.user} />, document.getElementById('content2') );
        ReactDOM.unmountComponentAtNode(document.getElementById('content3'));        
    default:
    }    
  },
  connect:function(user){
    this.setState({user:user});
    ReactDOM.render( <Connexion user={user} connect={this.connect} />, document.getElementById('content2') );
    //Problème, on change d'état puis on affiche ?
  },
  avoidReload:function(event){
    console.log(event.target);
    if(!event.target.id)
      this.switch(event.target.parentElement.id);
    else{
      this.switch(event.target.id);
    }  
    
  },
  render:function(){
    var dropdown = 
      <li className="dropdown">
        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{this.state.user.nom} &nbsp;<i className="fa fa-caret-square-o-down"></i> </a>
          <ul className="dropdown-menu">
            <li onClick={this.avoidReload} ><a href="#" id="EditProfile">Éditer le profil</a></li>
            <li role="separator" className="divider"></li>
            <li onClick={this.avoidReload}><a href="#" id="Connexion">Se Déconnecter</a></li>
          </ul>
      </li>
    var connexion=<li role="presentation" onClick={this.avoidReload} className={this.state.Connexion} id="Connexion" ><a href="#" id="Connexion"  > Connexion</a></li>;
    return(
      <div>
        <nav className="navbar navbar-default navbar-fixed-top ">
          <div className="container">
            <div className="navbar-header">
              <a className="navbar-brand" href="#"><i className="fa fa-ticket"></i>&nbsp; Objet Perdu</a>
            </div>  
            <ul className="nav navbar-nav">
              <li role="presentation" onClick={this.avoidReload} className={this.state.Home}><a href="#" id="Home"  ><i className="fa fa-key" id="Home" ></i>&nbsp;</a></li>
              <li role="presentation" onClick={this.avoidReload} className={this.state.Lieux}><a href="#" id="Lieux" ><i className="fa fa-university" id="Lieux"></i>&nbsp;</a></li>
              <li role="presentation" onClick={this.avoidReload} className={this.state.Users}><a href="#" id="Users" ><i className="fa fa-users" id="Users"></i>&nbsp;</a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li role="presentation" onClick={this.avoidReload} className={this.state.Docs} id="Docs" ><a href="#" id="Docs"><i className="fa fa-book" id="Docs"></i>&nbsp; </a></li>
              {this.state.user.nom?dropdown:connexion}
            </ul>
          </div>
        </nav>
      </div>
      )
  },
});



$.getScript( "https://maps.googleapis.com/maps/api/js?key=AIzaSyCL0D13h3FIvrnrRFRvuC4rj_GY8eOl9eQ").done(init);
function init(){
ReactDOM.render(
  <App active="Home"/>,
  document.getElementById('content1')
);
}
