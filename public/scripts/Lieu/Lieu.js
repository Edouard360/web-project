var Lieu = React.createClass({
  render:function(){
    return(
      <div>
        {this.props.tag}
        {this.props.location}
        {this.props.idl}
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

