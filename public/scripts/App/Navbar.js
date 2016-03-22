var Navbar = React.createClass({
  getInitialState: function () {
    return {
      Home:"",
      Lieux:"",
      Connexion:"",
      Docs:"",
    }
  },
  switch:function(active){
    switch(active) {
    case "Home":
        this.setState({Home:"active",Lieux:"",Connexion:"",Docs:"",Users:""});
        ReactDOM.render( <ListeAffiche user={this.state.user} />, document.getElementById('content2') );
        break;
    case "Lieux":
        this.setState({Home:"",Lieux:"active",Connexion:"",Docs:"",Users:""});
        ReactDOM.render( <ListeLieu user={this.state.user} />, document.getElementById('content2') );
        break;
    case "Connexion":
        this.setState({Home:"",Lieux:"",Connexion:"active",Docs:"",Users:""});
        console.log(this.state.user);
        ReactDOM.render( <Connexion user={this.state.user} connect={this.connect} />, document.getElementById('content2') );
        break;     
    case "Docs":
        this.setState({Home:"",Lieux:"",Connexion:"",Docs:"active",Users:""});
        break;  
    case "Users":
        this.setState({Home:"",Lieux:"",Connexion:"",Docs:"",Users:"active"});
        ReactDOM.render( <ListeUtilisateur user={this.state.user} connect={this.connect} />, document.getElementById('content2') );
        break;        
    default:
    }    
  },
  render:function(){
    return(
      <form className="navbar-form navbar-left navbar-fixed-top special-fix" role="search">
      <div className="navbar-collapse collapse sidebar-navbar-collapse">
          <ul className="nav navbar-nav">
            <li className="active"><a href="#">Menu Item 1</a></li>
            <li><a href="#">Menu Item 2</a></li>
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown">Dropdown <b className="caret"></b></a>
              <ul className="dropdown-menu">
                <li><a href="#">Action</a></li>
                <li><a href="#">Another action</a></li>
                <li><a href="#">Something else here</a></li>
                <li className="divider"></li>
                <li className="dropdown-header">Nav header</li>
                <li><a href="#">Separated link</a></li>
                <li><a href="#">One more separated link</a></li>
              </ul>
            </li>
            <li><a href="#">Menu Item 4</a></li>
            <li><a href="#">Reviews <span className="badge">1,118</span></a></li>
          </ul>
        </div>

</form>
      )
  },
});


