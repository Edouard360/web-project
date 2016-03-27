var FilterBar = React.createClass({
  getInitialState: function () {
    return {
      value:this.props.value
    }
  },
  handleChange:function (event) {
    this.props.handleChange(event.target.value);
  },
  render:function(){
    return (
      <div>
      <input 
      placeholder="Filtre" 
      value={this.props.value} 
      className="form-control" 
      type="text" 
      onChange={this.handleChange}
      />
      </div>
      )
  }
});