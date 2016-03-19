var DeclarationLieu = React.createClass({
	render:function(){
		return(
			<form onSubmit={this.handleSubmit}>
			<input name="password" id="tag" placeholder="Tag" type="text" />
			<input value="Logguer" className="special small" type="submit" onSubmit={this.handleSubmit}/>
			</form>
			)
	},
	handleSubmit:function(e){
		e.preventDefault();
		$.ajax({
			url: "/AjouterUnLieu",
			type: "post",
			data: {tag: $('#tag').val()},
			success: function() {
    		}
		});
	}
});

var Lieu = React.createClass({
	render:function(){
		return(
			<h5>
			{this.props.tag}
			{this.props.location}
			{this.props.idl}
			</h5>
			)
	}
});



var SousListeLieu = React.createClass({
	render:function(){
		var lieux = this.props.data.map(function(props) {
			return (
     		<Lieu key={props.idl} {...props}> 
        	//après on rajoute le send message.
        	</Lieu>
          )
  		}.bind(this));
		return(
			<div>
			{lieux}
			</div>
			)
		}
});


  	// handleRealChange:function(e){
   //  	this.props.handleChange(e.target.value);
  	// },






var ListeLieu = React.createClass({
	getInitialState: function() {
    	return {x: []};
  	},
  	componentDidMount: function() {
   		this.loadFromServer();
 	},
 	loadFromServer: function(){
  	$.ajax({
    	url: "/ChargerLesLieux",
    	type: "get",
    	dataType: 'json',
    	success: function(data) {
      		this.setState({x :data});
    	}.bind(this)
  	});
  },
	handleChange:function(e){
  		this.setState({params:e});
	},
	render:function(){
		var lieux = this.state.x.map(function(props) {
			return (
     		<Lieu key={props.idl} {...props}> 
        	//après on rajoute le send message.
        	</Lieu>
          );
  		}.bind(this));
		return(
			<div>
			{lieux}
			<Autobar value={this.state.params} handleChange={this.handleChange} data={this.state.x}/>
			<SousListeLieu data={this.state.x} />
			</div>)

	}
})

//

ReactDOM.render(
  <Autobar data={[]} />,
  document.getElementById('content5')
);