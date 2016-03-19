var Lieu = React.createClass({
	render:function(){
		return(
			<h5>
			{this.props.bold?"Moi":""}
			{this.props.tag}
			{this.props.location}
			{this.props.idl}
			</h5>
			)
	}
});



var Autobar = React.createClass({
	getInitialState: function () {
		return {
			value: this.props.initialValue || '',
			isOpen: false,
			highlightedIndex: null,
			datalist:[]
		}
	},
	handleChange:function (event) {
		this.setState({
			value: event.target.value,
		});
		if (event.target.value === ''){
			this.setState({isOpen:false});
		}  		
      	else{
      		var datalist=this.datalist(event);
      		this.setState({isOpen:true, datalist:datalist});
      	}   		
	},
	datalist:function(event){
		console.log(event.target.value);
		return this.props.data.sort(this.tri).filter( (data)=>(data.tag.toLowerCase().indexOf(event.target.value) !== -1) ).slice(0,3);
	},
	handleKeyDown:function (event) {
    if (this.keyDownHandlers[event.key])
      this.keyDownHandlers[event.key].call(this, event);
    else {
      this.setState({
        highlightedIndex: null,
        isOpen: true
      })
    }
    //SI ON N'INTERVIENT PAS ICI, ON POURRAIT PERDRE LE CODE DE LA BOUCLE !!
  },
	keyDownHandlers: {
		ArrowDown:function(event) {
			event.preventDefault()
			var { highlightedIndex } = this.state
			var index = (
			        highlightedIndex === null ||
			        highlightedIndex === this.state.datalist.length - 1
			      ) ?  0 : highlightedIndex + 1
			this.setState({
				highlightedIndex: index,
				isOpen: true,
			})
		},
		ArrowUp:function(event) {
			event.preventDefault()
			var { highlightedIndex } = this.state
			var index = (
			        highlightedIndex === 0 ||
			        highlightedIndex === null
			      ) ? this.state.datalist.length - 1 : highlightedIndex - 1
			this.setState({
				highlightedIndex: index,
				isOpen: true,
			})
		},
		Enter:function (event) {
			if (this.state.isOpen === false || this.state.highlightedIndex === null) {
        // menu is closed so there is no selection to accept -> do nothing
        return
		    }
		    else {
		        // text entered + menu item has been highlighted + enter is hit -> update value to that of selected menu item, close the menu
		        this.setState({
		        	value: this.state.datalist[this.state.highlightedIndex].tag,
		        	isOpen: false,
		        	highlightedIndex: null
		        });
		    }
		},
		Escape:function (event) {
			this.setState({
				highlightedIndex: null,
				isOpen: false
			})
		}
  	},
  	tri:function(a,b){
  		return a.tag.localeCompare(b.tag);
  	},
	render: function(){
    	return(
    		<div>
        	<input 
        	placeholder="Autobar" 
        	value={this.state.value} 
        	className="special small" 
        	type="text" 
        	onChange={this.handleChange}
        	onKeyDown={this.handleKeyDown} />
        	<SousListeLieu2 data={this.state.datalist} highlightedIndex={this.state.highlightedIndex} isOpen={this.state.isOpen} />
        	</div>
     	)
  	},

});

var SousListeLieu2 = React.createClass({
	render:function(){
		var lieux = this.props.data.map(function(props,id) {
			return (
			<div key={id}>
     		<Lieu key={id} {...props} bold = {this.props.highlightedIndex==id?true:false} > 
        	</Lieu>
        	</div>
          )
  		}.bind(this));
		return(
			<div>
			{lieux}
			</div>
			)
		}
});


ReactDOM.render(
  <Autobar />,
  document.getElementById('content5')
);