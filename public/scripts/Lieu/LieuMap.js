

var LieuMap = React.createClass({
	getInitialState: function() {
		return {marker:{},map:{}};
	},
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
    console.log(document.getElementById('map'));
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
		        markerPrevious=markerNext
        	});
	 
		
    	
	},
	handleClick:function(event){
		var map = new google.maps.Map(document.getElementById('content3'), {
	          zoom: 15,
	          scrollwheel: false,
	          disableDoubleClickZoom:true,
	          draggable:false,
	          fullscreenControl:false,
	          keyboardShortcuts:false,
	          zoomControl: false,
	          streetViewControl: false,
	        });
		 map.setCenter({lat: 48.713294, lng: 2.210644});
	},
	render:function(){
		var divStyle = {height: 400 + 'px'}
	return(
		<div>
		<div id="map" className="carte" style={divStyle} onClick={this.handleClick} ></div>
		<LieuPratique />
		</div>
	  )
	}
});



var LieuPratique = React.createClass({
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
	      	console.log("of");
	        var map = new google.maps.Map(document.getElementById('mappy'), {
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
		        this.advert();
        	}.bind(this));	    	
	},
	render:function(){
		var divStyle = {height: 400 + 'px'}
	return(
		<div id="mappy" className="carte" style={divStyle} ></div>
	  )
	}
});



$.getScript( "https://maps.googleapis.com/maps/api/js?key=AIzaSyCL0D13h3FIvrnrRFRvuC4rj_GY8eOl9eQ").done(creater);
function creater(){
	ReactDOM.render(
  <LieuMap />,
  document.getElementById('content2')
);}




/*
$script('https://maps.googleapis.com/maps/api/js?key=AIzaSyCL0D13h3FIvrnrRFRvuC4rj_GY8eOl9eQ', 'google');
		$script.ready('bundle', function() {}*/


		/*
		*/