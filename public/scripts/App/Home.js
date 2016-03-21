$.getScript( "https://maps.googleapis.com/maps/api/js?key=AIzaSyCL0D13h3FIvrnrRFRvuC4rj_GY8eOl9eQ").done(creater);
function creater(){
ReactDOM.render(
  <App active="Home"/>,
  document.getElementById('content1')
);
}