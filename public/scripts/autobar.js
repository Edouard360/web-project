var SousListeAutocomplete = React.createClass({
  render:function(){
    var lieux = this.props.isOpen && this.props.data.map(function(props,id) {
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
    //console.log(event.target.value);
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
      console.log(event);
      if (this.state.isOpen === false || this.state.highlightedIndex === null) {
        // menu is closed so there is no selection to accept -> do nothing
        return
      }
      else {
            // text entered + menu item has been highlighted + enter is hit -> update value to that of selected menu item, close the menu
            this.setState({
              isOpen: false,
              highlightedIndex: null
            });
            this.add(this.state.datalist[this.state.highlightedIndex].tag);
          }
        },
    Escape:function (event) {
      this.setState({
        highlightedIndex: null,
        isOpen: false
      })
    },
    Tab:function (event) {
      event.preventDefault();
      var lieu=this.state.datalist[this.state.highlightedIndex];
      if(lieu){this.add(lieu);}
    },
  },
  add:function(lieu){
    this.props.add(lieu);
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
      <SousListeAutocomplete data={this.state.datalist} highlightedIndex={this.state.highlightedIndex} isOpen={this.state.isOpen} />
      </div>
      )
  },
});
