var Declaration = React.createClass({
	render:function(){
		return(
			<form onSubmit={this.handleSubmit}>
			<input name="nom" id="nom" placeholder="Nom" type="text" />
			<input name="description" id="description" placeholder="Description" type="text" />
			<input value="Logguer" className="special small" type="submit"/>
			</form>
			)
	},
	handleSubmit:function(e){
		e.preventDefault();
		$.ajax({
			url: "/AjouterUnObjet",
			type: "post",
			data: {nom: $('#nom').val(), description: $('#description').val()},
			success: function(data) {
				console.log(data);
    		}
		});
	}
});


ReactDOM.render(
  <Declaration />,
  document.getElementById('content4')
);
