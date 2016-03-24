var Lieu = React.createClass({
  render:function(){
    var map = <LieuMap {...this.props} />
    var supprimer = <button className="button small lieu" onClick={this.handleDelete}><i className="fa fa-trash-o"></i>&nbsp; Supprimer</button>
    return(
      <div className="container affiche">
        {this.props.tag.toUpperCase()}
        {this.props.lat?map:""}
        <div>
         {this.props.canDelete?supprimer:""}
         </div>
      </div>
      )
  },
  handleDelete:function(){
    this.props.handleDelete(this.props.idl);
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

