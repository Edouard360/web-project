var LieuMapForm = React.createClass({
	componentDidMount:function(){
			var myStyles =[
		        {
		          featureType: "poi",
		          elementType: "labels",
		          stylers: [
		                { visibility: "off" }
		          ]
		        }
	      	];
	        var map = new google.maps.Map(document.getElementById('map'), {
	          zoom: 15,
	          scrollwheel: false,
	          disableDoubleClickZoom:true,
	          draggable:false,
	          fullscreenControl:false,
	          keyboardShortcuts:false,
	          zoomControl: false,
	          streetViewControl: false,
	          styles: myStyles,
	        });
	        map.setCenter({lat: 48.713294, lng: 2.210644});

	        var markerPrevious = new google.maps.Marker({
	          position: {lat: 48.713294, lng: 2.210644},
	          map: map,
	          title: 'Hello World!'
	        });
	        var markerNext;
        
        
	        google.maps.event.addListener(map, 'click', function(event) {
		        markerNext = new google.maps.Marker({position: event.latLng, map: map, title: "ici c'est la bobar"});
		        // console.log(event.latLng.lat());
		        // console.log(event.latLng.lng());
		        //this.handleClick(event.latLng);
		        //this.setState({marker:markerNext});

		        markerPrevious.setMap(null);
		        markerPrevious=markerNext;
		        this.updatePosition(event.latLng);
        	}.bind(this));
	 
		
    	
	},
	updatePosition:function(latLng){
		this.props.updatePosition(latLng);
	},
	render:function(){
		var divStyle = {height: 400 + 'px',borderRadius: 10 + 'px'}
	return(
		<div>
		<div id="map" style={divStyle} onClick={this.handleClick} ></div>
		</div>
	  )
	}
});

var LieuMap = React.createClass({
	componentDidMount:function(){
			var myStyles =[
		        {
		          featureType: "poi",
		          elementType: "labels",
		          stylers: [
		                { visibility: "off" }
		          ]
		        }
	      	];
	        var map = new google.maps.Map(document.getElementById(this.props.idl), {
	          zoom: 15,
	          scrollwheel: false,
	          disableDoubleClickZoom:true,
	          draggable:false,
	          fullscreenControl:false,
	          keyboardShortcuts:false,
	          zoomControl: false,
	          streetViewControl: false,
	          styles: myStyles,
	        });
	        map.setCenter({lat: 48.713294, lng: 2.210644});

	        var markerPrevious = new google.maps.Marker({
	          position: {lat: parseFloat(this.props.lat), lng: parseFloat(this.props.lng)},
	          map: map,
	          title: 'Hello World!'
	        });	
	},
	render:function(){
		var divStyle = {height: 400 + 'px',borderRadius: 10 + 'px'}
	return(
		<div id={this.props.idl} style={divStyle}></div>
	  )
	}
});


/*

$.getScript( "https://maps.googleapis.com/maps/api/js?key=AIzaSyCL0D13h3FIvrnrRFRvuC4rj_GY8eOl9eQ").done(creater);
function creater(){
	ReactDOM.render(
  <ListeLieu />,
  document.getElementById('content2')
);}

*/
