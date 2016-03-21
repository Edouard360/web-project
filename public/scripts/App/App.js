var App = React.createClass({
  getInitialState: function () {
    return {
      Home:"",
      Lieux:"",
      Connexion:"",
      Docs:"",
      user:{}
    }
  },
  componentWillMount:function(){
    this.loadFromServer();
  },
  loadFromServer:function(){
    $.ajax({
      url: "/Connexion",
      type: "put",
      dataType: "json",
      success: function(data) {
        if(data.result){
          this.setState({user:data.result}); 
        }
        this.switch(); 
        }.bind(this),

      }); 
  },
  switch:function(){
    switch(this.props.active) {
    case "Home":
        this.setState({Home:"active",Lieux:"",Connexion:"",Docs:""});
        ReactDOM.render( <ListeAffiche user={this.state.user} />, document.getElementById('content2') );
        break;
    case "Lieux":
        this.setState({Home:"",Lieux:"active",Connexion:"",Docs:""});
        ReactDOM.render( <ListeLieu user={this.state.user} />, document.getElementById('content2') );
        break;
    case "Connexion":
        this.setState({Home:"",Lieux:"",Connexion:"active",Docs:""});
        console.log(this.state.user);
        ReactDOM.render( <Connexion user={this.state.user} connect={this.connect} />, document.getElementById('content2') );
        break;     
    case "Docs":
        this.setState({Home:"",Lieux:"",Connexion:"",Docs:"active"});
        break;    
    default:
    }    
  },
  connect:function(user){
    this.setState({user:user});
    this.switch();
  },
  avoidReload:function(event){
    if(this.state.Lieux=="active"&&event.target.id=="Home"){
      event.preventDefault();
      console.log(1);
      this.setState({Home:"active",Lieux:"",Connexion:"",Docs:""});
      ReactDOM.render( <ListeAffiche user={this.state.user} />, document.getElementById('content2') );       
    }else if(this.state.Home=="active"&&event.target.id=="Lieux"){
      event.preventDefault();
      console.log(1);
      this.setState({Home:"",Lieux:"active",Connexion:"",Docs:""});
      ReactDOM.render( <ListeLieu user={this.state.user} />, document.getElementById('content2') );       
    }
  },
  render:function(){
    return(
      <div>
        <nav className="navbar navbar-default navbar-fixed-top ">
          <div className="container">
            <div className="navbar-header">
              <a className="navbar-brand" href="#"><i className="fa fa-ticket"></i>&nbsp; Objet Perdu</a>
            </div>  
            <ul className="nav navbar-nav">
              <li role="presentation" onClick={this.avoidReload} className={this.state.Home}><a href="/Home" id="Home" >Home</a></li>
              <li role="presentation" onClick={this.avoidReload} className={this.state.Lieux}><a href="/Lieux" id="Lieux" >Lieux</a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li role="presentation" className={this.state.Docs} ><a href="/Docs">Docs</a></li>
              <li role="presentation" className={this.state.Connexion} ><a href="/Connexion">Connexion</a></li>
            </ul>
          </div>
        </nav>
      </div>
      )
  },
});

