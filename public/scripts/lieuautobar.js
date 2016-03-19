var LieuAutobar = React.createClass({
  render:function(){
    var lieux=this.props.lieux.map(function(props,id){return (<div key={id}><Lieu key={id} {...props}/><br/></div>);});
    return(
      <div className="row uniform">
        <div className="6u">
          <Autobar data={this.props.data} add={this.add} />
        </div>
        <div className="6u">
          {lieux}
        </div>
      </div>
      )
  },
  add:function(lieu){
    console.log(lieu);
    console.log(this.props.lieu);
    this.props.add(lieu);
  }
});