var LieuAutobar = React.createClass({
  render:function(){
    var lieux=this.props.lieux.map(function(props,id){return (<LigneLieu key={id} {...props}/>);});
    return(
      <div className="container container2">
        <div className="col-sm-6 autobar">
          <label >Lieux</label>
          <Autobar data={this.props.data} add={this.add} />
        </div>
        <div className="col-sm-6 autobar">
          <label >Lieux séléctionnés</label>
          <table className="table">
      <thead></thead>
      <tbody>
          {lieux}
          </tbody>
      </table>
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
