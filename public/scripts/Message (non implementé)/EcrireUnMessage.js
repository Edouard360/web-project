var EcrireUnMessage = React.createClass({
  render: function(){
    return(
    	<form onSubmit={this.handleSubmit}>
		<input name="password" id="message" placeholder="Tag" type="text" />
		</form>
      );
  },
  handleSubmit:function(e){
		e.preventDefault();
		$.ajax({
			url: "./EcrireUnMessage",
			type: "post",
			data: {message: $('#message').val()},
			success: function() {
    		}
		});
	}
});