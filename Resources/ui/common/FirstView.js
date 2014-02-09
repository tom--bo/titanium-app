
//FirstView Component Constructor
function FirstView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
		height:400,
		top:0,
		left:0
	});
	
	var now_latitude = 0;
	var now_longitude = 0;
	
	if (Ti.Geolocation.locationServicesEnabled) {
    	Ti.Geolocation.purpose = 'Get Current Location';
    	Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
    	Ti.Geolocation.distanceFilter = 10;
    	Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;
	
    	Ti.Geolocation.addEventListener('location', function(e) {
        	if (e.error) {
            	alert('Error: ' + e.error);
        	} else {
            	Ti.API.info(e.coords);
            	now_latitude = e.coords.latitude;
            	now_longitude = e.coords.longitude;
        	}
    	});
	} else {
    	alert('Please enable location services');
	}
	
	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	var label = Ti.UI.createLabel({
		color:'#000000',
		// text:String.format(L('welcome'),'Titanium'),
		text:String('map'),
		height:'auto',
		width:'auto'
	});
	self.add(label);
	
	var Map = require('ti.map');
	
	Ti.API.debug("lat: " + now_latitude);
		
	// //Add behavior for UI
	label.addEventListener('click', function(e) {
		Ti.API.debug("lat: " + now_latitude);
		var mapview = Map.createView({
        mapType: Map.STANDARD_TYPE,
        region: {latitude:now_latitude, longitude:now_longitude, latitudeDelta:0.01, longitudeDelta:0.01},
        animate:true,
        regionFit:true,
        userLocation:true
		});
		self.add(mapview);
	});
	
	return self;
}

module.exports = FirstView;
