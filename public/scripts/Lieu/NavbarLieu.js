var NavbarLieu = React.createClass({
  switch:function(active){
    switch(active) {
    case "LieuForm":
        ReactDOM.render( <LieuForm user={this.props.user} />, document.getElementById('content2') );
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

/*
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

*/