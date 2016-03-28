var NavbarObjet = React.createClass({
  switch:function(active){
    switch(active) {
    case "ObjetForm":
        ReactDOM.render( <ObjetForm data={this.props.lieux} user={this.props.user} />, document.getElementById('content2') );
        break;
    case "ListeAffiche":
        ReactDOM.render( <ListeAffiche user={this.props.user} />, document.getElementById('content2') );
        break;       
    default:
    }    
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
    return(
      <form className="navbar-form navbar-left navbar-fixed-top special-fix" role="search">
      <div className="navbar-collapse collapse sidebar-navbar-collapse">
          <ul className="nav navbar-nav">
            <li role="presentation" className="sidey" onClick={this.avoidReload} ><a href="#" id="ListeAffiche"  ><i className="fa fa-list" id="ListeAffiche" ></i>&nbsp; Liste</a></li>
            <li role="presentation" className="sidey" onClick={this.avoidReload} ><a href="#" id="ObjetForm"  ><i className="fa fa-file-text" id="ObjetForm" ></i>&nbsp; Formulaire</a></li>
          </ul>
        </div>
      </form>
      )
  },
});
