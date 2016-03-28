var NavbarLieu = React.createClass({
  switch:function(active){
    switch(active) {
    case "LieuForm":
        ReactDOM.render( <LieuForm user={this.props.user} reload={this.props.reload}/>, document.getElementById('content2') );
        break;
    case "ListeLieu":
        ReactDOM.render( <ListeLieu user={this.props.user} lieux={this.props.lieux} />, document.getElementById('content2') );
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
            <li role="presentation" className="sidey" onClick={this.avoidReload} ><a href="#" id="ListeLieu"  ><i className="fa fa-list" id="ListeLieu" ></i>&nbsp; Liste</a></li>
            <li role="presentation" className="sidey" onClick={this.avoidReload} ><a href="#" id="LieuForm"  ><i className="fa fa-file-text" id="LieuForm" ></i>&nbsp; Formulaire </a></li>
          </ul>
        </div>
      </form>
      )
  },
});
