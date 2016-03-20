var Lieu = React.createClass({
  render:function(){
    var map = <LieuMap lat={this.props.lat} lng={this.props.lng}/>
    return(
      <div className="container affiche">
        {this.props.tag}
        {this.props.idl}
        {this.props.lat?map:""}
      </div>

      )
  }
});

var LigneLieu = React.createClass({
  render:function(){
    var bold = <td><b>{this.props.tag}</b></td>
    var notbold = <td>{this.props.tag}</td>
    return(
    	<tr>
    	     {this.props.bold?bold:notbold}
        </tr>
      )
  }
});

