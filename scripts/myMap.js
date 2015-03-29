(function() {
	$(document).ready(function () {
		var socket = io('http://45.55.134.215:9999');
		console.log('ready with jq');
		var map;
		var geocoder;
		// Keep a single instance of infowindow so there is only one popup balloon in map instance
		// var infowindow = new google.maps.InfoWindow();
		var markers = [];
		var facilitiesInArea = [];
		var facilityKeys = [];

		//build & set up the basic map
		function initMap() {
			console.log('initing');
		  var mapOptions = {
            scrollwheel: false,
		    zoom: 14,
		    center: new google.maps.LatLng(28.601648, -81.200306)
		  };
		  map = new google.maps.Map(document.querySelector('#search-page').shadowRoot.querySelector('#googleMap'), mapOptions);
          console.log(map);
		  console.log("done");
		}

		AIzaSyCUzRpOKl27BYPRqH5Kge0lEUibNlNJsMk

		// Initially initialize the map with all the points
		function initialize() {
		    initMap();
		   	geocoder = new google.maps.Geocoder();
		    // getFacilityByCity("Orlando", 17652, 100, 0);
		    //dummy facility data
		    socket.emit('facilities.getFacilityByLatLonAndRange', {lat: 28.4158, lon: -81.2989, range: 25});
			// facilitiesInArea = [
			// 	{
			// 	    "ID": 10640,
			// 	    "Latitude": 42.2197227,
			// 	    "Longitude": -83.02769,
			// 	    "Name": " (DEV)",
			// 	    "Address": {
			// 	        "City": "Windsor",
			// 	        "Country": "CA",
			// 	        "Line1": "1300 Disputed Rd.",
			// 	        "Line2": "",
			// 	        "PostalCode": "N9A6Z6",
			// 	        "StateProvinceCode": "ON"
			// 	    },
			// 	    "CurrencyCode": "CAD",
			// 	    "Description": "",
			// 	    "EmailAddress": null,
			// 	    "Information": "Price includes golf and cart. Tax not included. Taxes have been estimated. Final taxes will be calculated at the golf course, based on local tax rates for green fees and golf cart. Not valid with any other offers or promotions.",
			// 	    "IsActive": true,
			// 	    "PhoneNumber": "(000) 000-0000",
			// 	    "Tags": [],
			// 	    "TeeTimePolicy": "You may cancel your tee time up to 24 hours in advance without penalty ONLY by calling GolfNow Customer Service at 800-767-3574. If you DO NOT call GolfNow Customer Service to cancel your tee time your credit card WILL be charged. ANY tee time booked within 24 hours is guaranteed for the full amount at the time of processing and cannot be cancelled.",
			// 	    "ThumbnailImagePath": "www.golfnow.com/coursedirectory/img/on/windsor/seven-lakes-golf-club/general.jpgx",
			// 	    "TimeZoneOffset": -4,
			// 	    "WebsiteAddress": "http://www.sevenlakesgolf.com"
			// 	},
			//     {
			//         "ID": 4598,
			//         "Latitude": 39.00727,
			//         "Longitude": -77.44498,
			//         "Name": "1757 Golf Club (DEV)",
			//         "Address": {
			//             "City": "Sterling",
			//             "Country": "US",
			//             "Line1": "68230 Waxpool Rd",
			//             "Line2": null,
			//             "PostalCode": "20166",
			//             "StateProvinceCode": "VA"
			//         },
			//         "CurrencyCode": "USD",
			//         "Description": "",
			//         "EmailAddress": "6245e7bb390d477baf1f16e320a3feca@comcastnets.com",
			//         "Information": "Includes green fee, cart fee and tax. Not valid with any other offer or promotion.",
			//         "IsActive": true,
			//         "PhoneNumber": "(000) 000-0000",
			//         "Tags": [
			//             "PMP",
			//             "PTP"
			//         ],
			//         "TeeTimePolicy": "Please bring a copy of your reservation to the golf course. We ask that our customers adhere to golf course dress code: No denim allowed, collared shirt is required, soft spikes only. Players & guests are required to follow all course policies and procedures as outlined by the staff. \n\nThis rate may not be combined with any other offer. Discounted tee times are non-refundable and non-cancelable.\n\nIf you wish to cancel your reservation, 1757 Golf Club  requires that you do so at least 24 hours before the start of your round. Reservations canceled within this window are subject to being charged the full price for all rounds booked at the discretion of the course.  If you or a member of your party becomes unable to play, you will still be charged for each round of golf you purchased. Not showing for this tee time will result in a charge to your credit card for the entire amount due at the course.\n\nPlease call 1-800-767-3574 or email us at customerservice@golfnowsolutions.com for assistance.\n",
			//         "ThumbnailImagePath": "www.golfnow.com/coursedirectory/img/va/sterling/1757-golf-club/general.jpgx",
			//         "TimeZoneOffset": -4,
			//         "WebsiteAddress": null
			//     },
			//     {
			//         "ID": 5681,
			//         "Latitude": 40.48052,
			//         "Longitude": -79.80073,
			//         "Name": "3 Lakes Golf Course (DEV)",
			//         "Address": {
			//             "City": "Pittsburgh",
			//             "Country": "US",
			//             "Line1": "9100 Saltsburg Rd.",
			//             "Line2": "",
			//             "PostalCode": "15235",
			//             "StateProvinceCode": "PA"
			//         },
			//         "CurrencyCode": "USD",
			//         "Description": "",
			//         "EmailAddress": "c65419d4f12e1f61387c89b0a7840984@comcastnets.com",
			//         "Information": "TAX INCLUDED.  Proper Golf Attire Required.  No Jeans, Please.\r\nPlease print out and bring a copy of this confirmation on the day of play.\r\nPlease arrive 20 minutes prior to your scheduled tee time.  Pace of play is 4 hours, 15 minutes or less.",
			//         "IsActive": true,
			//         "PhoneNumber": "(000) 000-0000",
			//         "Tags": [
			//             "PMP",
			//             "PTP"
			//         ],
			//         "TeeTimePolicy": "Please wear proper golf attire.  No Jeans, Please.  \r\nAll Cancellations must be made 24 hrs. in advance.    \r\nPlease print out and bring a copy of this confirmation on the day of play.",
			//         "ThumbnailImagePath": "www.golfnow.com/coursedirectory/img/pa/pittsburgh/3-lakes-golf-course/general.jpgx",
			//         "TimeZoneOffset": -4,
			//         "WebsiteAddress": "http://www.3lakesgolf.com"
			//     },
			//     {
			//         "ID": 5871,
			//         "Latitude": 28.8704453,
			//         "Longitude": -82.59361,
			//         "Name": "7 Rivers Golf & Country Club (DEV)",
			//         "Address": {
			//             "City": "Crystal River",
			//             "Country": "US",
			//             "Line1": "1518 W Pinebrook St.",
			//             "Line2": "",
			//             "PostalCode": "34429",
			//             "StateProvinceCode": "FL"
			//         },
			//         "CurrencyCode": "USD",
			//         "Description": "",
			//         "EmailAddress": null,
			//         "Information": "This great tee time includes golf and cart. Tax not included.",
			//         "IsActive": true,
			//         "PhoneNumber": "(000) 000-0000",
			//         "Tags": [
			//             "PTP"
			//         ],
			//         "TeeTimePolicy": "Seven Rivers has a 24-hour tee time cancellation policy. If you wish to cancel your round or change the number of players in your group, please do so at least 24 hours prior to the commencement of your reservation or you will be charged. Please call (352) 795-6665 for more information. Proper attire is required. ",
			//         "ThumbnailImagePath": "www.golfnow.com/coursedirectory/img/fl/crystal-river/7-rivers-golf-and-country-club/general.jpgx",
			//         "TimeZoneOffset": -4,
			//         "WebsiteAddress": null
			//     },
			//     {
			//         "ID": 6574,
			//         "Latitude": 26.93481,
			//         "Longitude": -80.11732,
			//         "Name": "Abacoa Golf Club (DEV)",
			//         "Address": {
			//             "City": "Jupiter",
			//             "Country": "US",
			//             "Line1": "208 Barbados Dr",
			//             "Line2": "",
			//             "PostalCode": "33458",
			//             "StateProvinceCode": "FL"
			//         },
			//         "CurrencyCode": "USD",
			//         "Description": "",
			//         "EmailAddress": null,
			//         "Information": "TAX NOT INCLUDED.",
			//         "IsActive": true,
			//         "PhoneNumber": "(000) 000-0000",
			//         "Tags": [],
			//         "TeeTimePolicy": "Our tee time policy information is currently being updated. Please call the golf course for more information concerning our tee time policy. <br><br> Click  the back button on your web browser to return to the previous page.",
			//         "ThumbnailImagePath": "www.golfnow.com/coursedirectory/img/fl/jupiter/abacoa-golf-club/general.jpgx",
			//         "TimeZoneOffset": -4,
			//         "WebsiteAddress": "http://www.abacoagolfclub.com"
			//     },
			//     {
			//         "ID": 2764,
			//         "Latitude": 28.33332,
			//         "Longitude": -82.2564,
			//         "Name": "Abbey Course at Saint Leo University (DEV)",
			//         "Address": {
			//             "City": "Saint Leo",
			//             "Country": "US",
			//             "Line1": "55960 State Road 83 West",
			//             "Line2": null,
			//             "PostalCode": "33574",
			//             "StateProvinceCode": "FL"
			//         },
			//         "CurrencyCode": "USD",
			//         "Description": "<p>The 18-hole \"Abbey\" course at the Abbey Course At Saint Leo University facility in Saint Leo, Florida features 5,659 yards of golf from the longest tees for a par of 71. The course rating is 66.3 and it has a slope rating of 105. Designed by Marion Bowman, the Abbey golf course opened in 1960. Tom Floberg manages the course as the President.</p>",
			//         "EmailAddress": null,
			//         "Information": "Includes Golf, Cart, and Tax.  **PLEASE NOTE** Your Tee Time may vary 15-20 mins so please arrive early.  Not valid with any other offer or promotion.  ",
			//         "IsActive": true,
			//         "PhoneNumber": "(000) 000-0000",
			//         "Tags": [
			//             "PTP"
			//         ],
			//         "TeeTimePolicy": "The Abbey Course at St. Leo has a 24-hour tee time cancellation policy.  If you wish to cancel your tee time, please do so at least 24 hours prior to the commencement of your reservation.  Please call (352) 588-2016 for more information. \n\nProper attire is greatly appreciated.",
			//         "ThumbnailImagePath": "www.golfnow.com/coursedirectory/img/fl/saint-leo/abbey-course-at-saint-leo-university/general.jpgx",
			//         "TimeZoneOffset": -4,
			//         "WebsiteAddress": null
			//     },
			//     {
			//         "ID": 4861,
			//         "Latitude": 42.54546,
			//         "Longitude": -88.55282,
			//         "Name": "Abbey Springs Golf Course (DEV)",
			//         "Address": {
			//             "City": "Fontana",
			//             "Country": "US",
			//             "Line1": "2 Country Club Dr",
			//             "Line2": "",
			//             "PostalCode": "53125",
			//             "StateProvinceCode": "WI"
			//         },
			//         "CurrencyCode": "USD",
			//         "Description": "",
			//         "EmailAddress": "1a72f590fb485a927d16875de5682a13@comcastnets.com",
			//         "Information": "This online rate may not be combined with any other offers or promotions.  Thank you for playing Abbey Springs Golf Course.",
			//         "IsActive": true,
			//         "PhoneNumber": "(000) 000-0000",
			//         "Tags": [
			//             "PMP",
			//             "PTP"
			//         ],
			//         "TeeTimePolicy": "Abbey Springs Golf Course is a Soft Spike Facility with proper golf attire required.\r\nCollared shirts, dress shorts, denim are fine, but no cut off shorts.  Rain Check Policy: Play less than 5 holes on an 18 hole green fee you will receive an 18 hole rain check.  Play 5-12 holes you receive a 9 hole rain check.  Play 13 holes or more no rain check.\r\n\r\nPlease be aware that groups of less than 4 players may be paired up at the golf courses discretion.  If you have any questions pertaining to the golf courses policies please check with the golf course prior to arriving for play.\r\n\r\nPlease note that your actual tee time may vary by 15 minutes of either side of your actual reserved time.  Please make sure to arrive at least 30 minutes prior to your reserved time.\r\n\r\nAbbey Springs Golf Course has a 24 hour cancellation policy. In order to avoid any penalties, please make sure to cancel outside of 24 hours if needed.  To modify or cancel an existing reservation outside of this window you may email us at customerservice@golfnowsolutions.com or call 1-800-767-3574….otherwise your credit card may be charged.",
			//         "ThumbnailImagePath": "www.golfnow.com/coursedirectory/img/wi/fontana/abbey-springs-golf-course/general.jpgx",
			//         "TimeZoneOffset": -5,
			//         "WebsiteAddress": "http://www.abbeysprings.com"
			//     },
			//     {
			//         "ID": 10824,
			//         "Latitude": 52.9218674,
			//         "Longitude": -7.337073,
			//         "Name": "Abbeyleix Golf Club (DEV)",
			//         "Address": {
			//             "City": "Abbeyleix",
			//             "Country": "IE",
			//             "Line1": "Rathmoyle",
			//             "Line2": null,
			//             "PostalCode": null,
			//             "StateProvinceCode": "LS"
			//         },
			//         "CurrencyCode": "EUR",
			//         "Description": "Description Needed",
			//         "EmailAddress": null,
			//         "Information": " Payment\n\n=======\n\nTo book a tee time on-line you will have to enter your credit or debit card details using our secure on-line payment process.\n\nYour card details will be held by us as insurance but we will not process the transaction until you turn up to play.\n\nWhen you turn up for your round of golf, you can choose to pay by cash instead of credit card. You should report to the Pro shop before beginning your round. If the Pro shop is closed, you should call in after your round is complete. ",
			//         "IsActive": true,
			//         "PhoneNumber": null,
			//         "Tags": [
			//             "PTP"
			//         ],
			//         "TeeTimePolicy": "Tee times may be cancelled up to 48 Hours in advance, any cancellation or no-show inside of 48 Hours is subject to being charged the full amount. Any tee time booked inside of 48 Hours is guaranteed for the full amount at the time of booking and cannot be cancelled. Please email customerservice@golfchannelsolutions.com if assistance is needed.",
			//         "ThumbnailImagePath": "www.golfnow.com/coursedirectory/img/ls/abbeyleix/abbeyleix/general.jpgx",
			//         "TimeZoneOffset": 0,
			//         "WebsiteAddress": "http://www.abbeyleixgolfclub.ie"
			//     },
			//     {
			//         "ID": 10986,
			//         "Latitude": 53.28251,
			//         "Longitude": -3.597429,
			//         "Name": "Abergele Golf Club (DEV)",
			//         "Address": {
			//             "City": "Abergele",
			//             "Country": "GB",
			//             "Line1": "Abergele Golf Club",
			//             "Line2": "Tan-y-Gopa Road",
			//             "PostalCode": "LL22 8DS",
			//             "StateProvinceCode": "WL"
			//         },
			//         "CurrencyCode": "GBP",
			//         "Description": "",
			//         "EmailAddress": null,
			//         "Information": "This great tee time is for 18 holes of golf at Abergele Golf Club\n\nPayment\n=======\nTo book a tee time on-line you will have to enter your credit or debit card details using our secure on-line payment process.\nYour card details will be held by us as insurance but we will not process the transaction until you turn up to play.\n\nWhen you turn up for your round of golf, you can choose to pay by cash instead of credit card. You should report to the Pro shop before beginning your round. If the Pro shop is closed, you should call in after your round is complete.\n",
			//         "IsActive": true,
			//         "PhoneNumber": "(000) 000-0000",
			//         "Tags": [
			//             "PTP"
			//         ],
			//         "TeeTimePolicy": "Tee times may be cancelled up to 48 Hours in advance, Any cancellation or no-show inside of 48 Hours is subject to being charged the full amount. Any tee time booked inside of 48 Hours is guaranteed for the full amount at the time of booking and cannot be cancelled.  Please email customer service@golfchannelsolutions.com if assistance is needed.\n",
			//         "ThumbnailImagePath": "www.golfnow.com/coursedirectory/img/wl/abergele/abergele-golf-club/general.jpgx",
			//         "TimeZoneOffset": 0,
			//         "WebsiteAddress": null
			//     },
			//     {
			//         "ID": 618,
			//         "Latitude": 30.5016,
			//         "Longitude": -89.9505,
			//         "Name": "Abita Springs Golf & Country Club (DEV)",
			//         "Address": {
			//             "City": "Abita Springs",
			//             "Country": "US",
			//             "Line1": "15655 Oliver Street",
			//             "Line2": "",
			//             "PostalCode": "70420",
			//             "StateProvinceCode": "LA"
			//         },
			//         "CurrencyCode": "USD",
			//         "Description": " <p> Newly renovated and one of the more scenic courses in the area, Abita Springs golf club is one of the best kept secrets in St Tammany parish.  The narrow fairways are a test for most golfers yet still forgiving enough for all levels of golfer. </p>  <p> Abita Springs is 6447 yards from the Blue tees.<p>  Tee / Rating / Slope<br>\tBlue 71.5 / 130<br>White 69.3 / 124<br>Gold 63.6 / 109<br>Red 66.8 / 112<br></p>",
			//         "EmailAddress": null,
			//         "Information": "Tee time includes cart, green fee, range balls, and sales tax.",
			//         "IsActive": true,
			//         "PhoneNumber": "(000) 000-0000",
			//         "Tags": [
			//             "PMP",
			//             "PTP"
			//         ],
			//         "TeeTimePolicy": "Tee times are non-refundable and non-cancelable.                   \r\n\r\nNot showing for the tee time will result in your credit card being charged the greens fee for each golfer in your party.             \r\n\r\nWe ask that our customers adhere to the golf course dress code:        \r\n           \r\n\r\n            - Soft spikes only.\r\n\r\nFor additional information call (985) 893-2463. \r\n\r\n** PLEASE PRESENT PRINTED CONFIRMATION RECEIPT TO THE GOLF COURSE **\r\n",
			//         "ThumbnailImagePath": "www.golfnow.com/coursedirectory/img/la/abita-springs/abita-springs-golf-and-country-club/general.jpgx",
			//         "TimeZoneOffset": -5,
			//         "WebsiteAddress": "http://abitagolf.com"
			//     },
			//     {
			//         "ID": 12416,
			//         "Latitude": 51.66641,
			//         "Longitude": 0.146186,
			//         "Name": "Abridge Golf Club (DEV)",
			//         "Address": {
			//             "City": "Essex",
			//             "Country": "GB",
			//             "Line1": "Epping Lane",
			//             "Line2": "Stapleford Tawney",
			//             "PostalCode": "RM4 1ST",
			//             "StateProvinceCode": "EN"
			//         },
			//         "CurrencyCode": "GBP",
			//         "Description": "",
			//         "EmailAddress": null,
			//         "Information": "This great tee time is for 18 holes of golf at Abridge Golf Club\n\nPayment\n=======\n\nTo book a tee time on-line you will have to enter your credit or debit card details using our secure on-line payment process.\n\nYour card details will be held by us as insurance but we will not process the transaction until you turn up to play.\n\nWhen you turn up for your round of golf, you can choose to pay by cash instead of credit card. You should report to the Pro shop before beginning your round. If the Pro shop is closed, you should call in after your round is complete.\n",
			//         "IsActive": true,
			//         "PhoneNumber": "(000) 000-0000",
			//         "Tags": [
			//             "PTP"
			//         ],
			//         "TeeTimePolicy": "Tee times may be cancelled up to 48 Hours in advance, Any cancellation or no-show inside of 48 Hours is subject to being charged the full amount. Any tee time booked inside of 48 Hours is guaranteed for the full amount at the time of booking and cannot be cancelled. Please email customerservice@golfchannelsolutions.com if assistance is needed.\n",
			//         "ThumbnailImagePath": "www.golfnow.com/coursedirectory/img/en/essex/abridge-golf-club-/general.jpgx",
			//         "TimeZoneOffset": 0,
			//         "WebsiteAddress": "http://www.abridgegolf.com"
			//     },
			//     {
			//         "ID": 4370,
			//         "Latitude": 34.58206,
			//         "Longitude": -84.0237,
			//         "Name": "Achasta Golf Club  (DEV)",
			//         "Address": {
			//             "City": "Dahlonega",
			//             "Country": "US",
			//             "Line1": "951 Birch River Dr",
			//             "Line2": "",
			//             "PostalCode": "30533-6177",
			//             "StateProvinceCode": "GA"
			//         },
			//         "CurrencyCode": "USD",
			//         "Description": "",
			//         "EmailAddress": null,
			//         "Information": "Price includes green fee, golf cart, tax and range balls. Not valid with any other offers or promotions.",
			//         "IsActive": true,
			//         "PhoneNumber": "(000) 000-0000",
			//         "Tags": [
			//             "PTP"
			//         ],
			//         "TeeTimePolicy": "This tee time is nonrefundable and non cancelable. Not showing for your tee time will result in a charge to your credit card for the full amount of the green fee.  To enhance the enjoyment of ALL players we ask that you follow our rules on etiquette, dress and care of the course policy.  Please report to the tee at your designated starting time and observe the daily cart rules posted.  Please repair your ball marks and fill divots with sand provided.  Please rake bunkers when exiting leaving rake (head in-handle out) of the bunker. Please monitor your pace of play at all times.  18 holes should take NO LONGER than 4:15!  NO denim allowed.  A collared shirt is required and must be tucked in at all times.  Soft spikes only please!  For additional information call (706) 867-7900.\r\n\r\nThank you for playing at Achasta Golf Club by Reynolds Plantation!  We hope you enjoy your round!\r\n",
			//         "ThumbnailImagePath": "www.golfnow.com/coursedirectory/img/ga/dahlonega/achasta-golf-club/general.jpgx",
			//         "TimeZoneOffset": -4,
			//         "WebsiteAddress": null
			//     },
			//     {
			//         "ID": 3839,
			//         "Latitude": 38.3391266,
			//         "Longitude": -90.15093,
			//         "Name": "Acorns Golf Links (DEV)",
			//         "Address": {
			//             "City": "Waterloo",
			//             "Country": "US",
			//             "Line1": "5155 Ahne Road",
			//             "Line2": "",
			//             "PostalCode": "62298",
			//             "StateProvinceCode": "IL"
			//         },
			//         "CurrencyCode": "USD",
			//         "Description": "",
			//         "EmailAddress": "577fc0d63aa55a211d43ac9cc3383e0a@comcastnets.com",
			//         "Information": "TAX INCLUDED.",
			//         "IsActive": true,
			//         "PhoneNumber": "(000) 000-0000",
			//         "Tags": [
			//             "PMP",
			//             "PTP"
			//         ],
			//         "TeeTimePolicy": "Cancellation Policy is 48 hours. \r\nIf your reservation is not cancelled prior to 48 hours of your reserved starting time you will be liable for all green and cart fee charges. \r\n\r\n",
			//         "ThumbnailImagePath": "www.golfnow.com/coursedirectory/img/il/waterloo/acorns-golf-links/general.jpgx",
			//         "TimeZoneOffset": -5,
			//         "WebsiteAddress": null
			//     },
			//     {
			//         "ID": 10519,
			//         "Latitude": 43.6433029,
			//         "Longitude": -80.0829849,
			//         "Name": "Acton Golf Club (DEV)",
			//         "Address": {
			//             "City": "Acton",
			//             "Country": "CA",
			//             "Line1": "6188 Dublin Line",
			//             "Line2": "",
			//             "PostalCode": "L7J 2M2",
			//             "StateProvinceCode": "ON"
			//         },
			//         "CurrencyCode": "CAD",
			//         "Description": "",
			//         "EmailAddress": null,
			//         "Information": "Price includes golf and cart. Tax not included. Taxes have been estimated. Final taxes will be calculated at the golf course, based on local tax rates for green fees and golf cart. Not valid with any other offers or promotions.",
			//         "IsActive": true,
			//         "PhoneNumber": "(000) 000-0000",
			//         "Tags": [
			//             "PTP"
			//         ],
			//         "TeeTimePolicy": "You may cancel your tee time up to 24 hours in advance without penalty ONLY by calling GolfNow Customer Service at 800-767-3574. If you DO NOT call GolfNow Customer Service to cancel your tee time your credit card WILL be charged. ANY tee time booked within 24 hours is guaranteed for the full amount at the time of processing and cannot be cancelled.",
			//         "ThumbnailImagePath": "www.golfnow.com/coursedirectory/img/on/acton/acton-golf-club/general.jpgx",
			//         "TimeZoneOffset": -4,
			//         "WebsiteAddress": "http://www.golfacton.ca"
			//     },
			//     {
			//         "ID": 11514,
			//         "Latitude": null,
			//         "Longitude": null,
			//         "Name": "Adare Manor Golf Club (DEV)",
			//         "Address": {
			//             "City": "Adare",
			//             "Country": "IE",
			//             "Line1": "Adare (Old Course)",
			//             "Line2": null,
			//             "PostalCode": ".",
			//             "StateProvinceCode": "LK"
			//         },
			//         "CurrencyCode": "EUR",
			//         "Description": "Description Needed",
			//         "EmailAddress": null,
			//         "Information": " Payment\n\n=======\n\nTo book a tee time on-line you will have to enter your credit or debit card details using our secure on-line payment process.\n\nYour card details will be held by us as insurance but we will not process the transaction until you turn up to play.\n\nWhen you turn up for your round of golf, you can choose to pay by cash instead of credit card. You should report to the Pro shop before beginning your round. If the Pro shop is closed, you should call in after your round is complete. ",
			//         "IsActive": true,
			//         "PhoneNumber": "(000) 000-0000",
			//         "Tags": [
			//             "PTP"
			//         ],
			//         "TeeTimePolicy": "Tee times may be cancelled up to 48 Hours in advance, any cancellation or no-show inside of 48 Hours is subject to being charged the full amount. Any tee time booked inside of 48 Hours is guaranteed for the full amount at the time of booking and cannot be cancelled. Please email customerservice@golfchannelsolutions.com if assistance is needed.",
			//         "ThumbnailImagePath": "www.golfnow.com/coursedirectory/img/lk/adare/adare-manor-golf-club/general.jpgx",
			//         "TimeZoneOffset": 0,
			//         "WebsiteAddress": null
			//     },
			//     {
			//         "ID": 100,
			//         "Latitude": 38.2445526,
			//         "Longitude": -122.584641,
			//         "Name": "Adobe Creek Golf Club (DEV)",
			//         "Address": {
			//             "City": "Petaluma",
			//             "Country": "US",
			//             "Line1": "2102 Frates Road",
			//             "Line2": null,
			//             "PostalCode": "94954",
			//             "StateProvinceCode": "CA"
			//         },
			//         "CurrencyCode": "USD",
			//         "Description": "<p>Just off Highway 101 in Petaluma, you’ll discover a highly rated championship golf course carefully etched into Sonoma County’s beautiful landscape. Adobe Creek Golf Club is another triumphant design by the world-renowned Robert Trent Jones Jr. This 18-hole links-style course will awaken all of your competitive instincts with long, contoured fairways, bent grass greens and four sets of tees. The 5,743 yard forward tees are rated at 69.4/120. the 6,886 yard back tees, rated at 73.8/131, prove to be a stern test of golf for the low, single-digit handicap player. Along the way, a meandering stream, five lakes and 72 bunkers may come into play.</p>",
			//         "EmailAddress": "a24618f6113b1ef107cbc79fc8954bea@comcastnets.com",
			//         "Information": "This Green Fee includes golf, cart and tax.  Not valid with other discounts or promotions.",
			//         "IsActive": true,
			//         "PhoneNumber": "(000) 000-0000",
			//         "Tags": [
			//             "PTP"
			//         ],
			//         "TeeTimePolicy": " *** Discounted Tee times are non-refundable and non-cancelable. ***\r\nNot showing for the tee time will result in your credit card being charged the greens fee for each golfer in your party. \r\n\r\nWe ask that our customers adhere to our dress code:\r\n\r\nNo denim allowed\r\n\r\nCollared shirt required\r\n\r\nSoft spikes only\r\n\r\nPlease call 707-765-3000 for more information.\r\n",
			//         "ThumbnailImagePath": "www.golfnow.com/coursedirectory/img/ca/petaluma/adobe-creek-golf-course/general.jpgx",
			//         "TimeZoneOffset": -7,
			//         "WebsiteAddress": "http://www.adobecreek.com"
			//     },
			//     {
			//         "ID": 12446,
			//         "Latitude": 38.6775742,
			//         "Longitude": -122.40799,
			//         "Name": "Aetna Springs  (DEV)",
			//         "Address": {
			//             "City": "Pope Valley",
			//             "Country": "US",
			//             "Line1": "2900 Aetna Springs Road",
			//             "Line2": "",
			//             "PostalCode": "94567",
			//             "StateProvinceCode": "CA"
			//         },
			//         "CurrencyCode": "USD",
			//         "Description": "",
			//         "EmailAddress": null,
			//         "Information": "TAX NOT INCLUDED.",
			//         "IsActive": true,
			//         "PhoneNumber": "(000) 000-0000",
			//         "Tags": [
			//             "PTP"
			//         ],
			//         "TeeTimePolicy": "Our tee time policy information is currently being updated. Please call the golf course for more information concerning our tee time policy. <br><br> Click  the back button on your web browser to return to the previous page.",
			//         "ThumbnailImagePath": "www.golfnow.com/coursedirectory/img/ca/pope-valley/aetna-springs/general.jpgx",
			//         "TimeZoneOffset": -7,
			//         "WebsiteAddress": null
			//     },
			//     {
			//         "ID": 8500,
			//         "Latitude": 44.854454,
			//         "Longitude": -92.79074,
			//         "Name": "Afton Alps Golf (DEV)",
			//         "Address": {
			//             "City": "Hastings",
			//             "Country": "US",
			//             "Line1": "9900 Peller Ave. S.",
			//             "Line2": "",
			//             "PostalCode": "55033",
			//             "StateProvinceCode": "MN"
			//         },
			//         "CurrencyCode": "USD",
			//         "Description": "",
			//         "EmailAddress": null,
			//         "Information": "TAX NOT INCLUDED.",
			//         "IsActive": true,
			//         "PhoneNumber": "(000) 000-0000",
			//         "Tags": [
			//             "PTP"
			//         ],
			//         "TeeTimePolicy": "Enjoy Afton Alps for a same-day replay round for just $8.00!\r\n\r\nThis rate may not be combined with any other offer. Online tee times are NON-REFUNDABLE AND NON-CANCELABLE. CALL (800) 767-3574 FOR CUSTOMER SERVICE. Not showing for this tee time will result in a charge to your credit card for the entire amount due at the course. *please note that any transaction fees are non refundable*  We ask that our customers adhere to golf course dress code.  Please arrive 10 minutes prior to your tee time.  Enjoy your round at Afton Alps Golf!",
			//         "ThumbnailImagePath": "www.golfnow.com/coursedirectory/img/mn/hastings/afton-alps-golf-course/general.jpgx",
			//         "TimeZoneOffset": -5,
			//         "WebsiteAddress": null
			//     },
			//     {
			//         "ID": 8592,
			//         "Latitude": 42.0665436,
			//         "Longitude": -72.6846,
			//         "Name": "Agawam Municipal Golf Course (DEV)",
			//         "Address": {
			//             "City": "Feeding Hills",
			//             "Country": "US",
			//             "Line1": "231 Southwick St",
			//             "Line2": "",
			//             "PostalCode": "01030",
			//             "StateProvinceCode": "MA"
			//         },
			//         "CurrencyCode": "USD",
			//         "Description": "",
			//         "EmailAddress": null,
			//         "Information": "All rates and products are specific to this tee time only, and may not be combined with other offers.",
			//         "IsActive": true,
			//         "PhoneNumber": "(000) 000-0000",
			//         "Tags": [
			//             "PTP"
			//         ],
			//         "TeeTimePolicy": "Agawam Municipal Golf Course has a 24 hour cancellation policy. If you need to modify or cancel your reservation, please do so by calling the pro shop (413) 786-2194) at least 24 hours prior to your scheduled time. Proper attire is required and appreciated.<br><br> Click  the back button on your web browser to return to the previous page.",
			//         "ThumbnailImagePath": "www.golfnow.com/coursedirectory/img/ma/feeding-hills/agawam-municipal-golf-course/general.jpgx",
			//         "TimeZoneOffset": -4,
			//         "WebsiteAddress": "http://www.agawamgc.com"
			//     },
			//     {
			//         "ID": 287,
			//         "Latitude": 33.36988,
			//         "Longitude": -112.134705,
			//         "Name": "Aguila Golf Course (DEV)",
			//         "Address": {
			//             "City": "Laveen",
			//             "Country": "US",
			//             "Line1": "1660 S. 58th Avenue",
			//             "Line2": "",
			//             "PostalCode": "85339",
			//             "StateProvinceCode": "AZ"
			//         },
			//         "CurrencyCode": "USD",
			//         "Description": "<p>Set beneath the dramatic backdrop of South Mountain,  Gary Panks designed the newest addition to the roster of  Phoenix’s municipal golf courses. Both the 18-hole championship course and the executive 9-hole par 3 course offer a challenging layout to all levels of golfers.</p>",
			//         "EmailAddress": null,
			//         "Information": "Includes golf and cart. Carts 90 Degrees, weather and conditions permitting.",
			//         "IsActive": true,
			//         "PhoneNumber": "(000) 000-0000",
			//         "Tags": [
			//             "PMP",
			//             "PTP"
			//         ],
			//         "TeeTimePolicy": "Promotional tee times are non-refundable and non-cancelable. Not showing for a tee time will result in your credit card being charged the greens fee for each golfer in your party. For more information please contact the golf course at (602) 237-9601.",
			//         "ThumbnailImagePath": "www.golfnow.com/coursedirectory/img/az/laveen/aguila-golf-course---par-3-course/general.jpgx",
			//         "TimeZoneOffset": -7,
			//         "WebsiteAddress": "http://phoenix.gov/SPORTS/aguila.html"
			//     },
			//     {
			//         "ID": 4322,
			//         "Latitude": 33.3526,
			//         "Longitude": -112.1976,
			//         "Name": "Aguila Golf Course 9 (DEV)",
			//         "Address": {
			//             "City": "Laveen",
			//             "Country": "US",
			//             "Line1": "1660 S. 58th Ave",
			//             "Line2": "",
			//             "PostalCode": "85339",
			//             "StateProvinceCode": "AZ"
			//         },
			//         "CurrencyCode": "USD",
			//         "Description": "<p>Set beneath the dramatic backdrop of South Mountain,  Gary Panks designed the newest addition to the roster of  Phoenix’s municipal golf courses. Both the 18-hole championship course and the executive 9-hole par 3 course offer a challenging layout to all levels of golfers.</p>",
			//         "EmailAddress": "d41a9d6ade961a86a0714270e69847c8@comcastnets.com",
			//         "Information": "This is a 9 hole walking rate on our par three 9 hole course. Offer not vaild with any other promotion.",
			//         "IsActive": true,
			//         "PhoneNumber": "(000) 000-0000",
			//         "Tags": [
			//             "PTP"
			//         ],
			//         "TeeTimePolicy": "Promotional tee times are non-refundable and non-cancelable. Not showing for a tee time will result in your credit card being charged the greens fee for each golfer in your party. For more information please contact the golf course at (602) 237-9601.",
			//         "ThumbnailImagePath": "www.golfnow.com/coursedirectory/img/az/laveen/aguila-golf-course---par-3-course/general.jpgx",
			//         "TimeZoneOffset": -8,
			//         "WebsiteAddress": "http://phoenix.gov/SPORTS/aguila.html"
			//     },
			//     {
			//         "ID": 1294,
			//         "Latitude": 33.33404,
			//         "Longitude": -111.981842,
			//         "Name": "Ahwatukee Country Club (DEV)",
			//         "Address": {
			//             "City": "Phoenix",
			//             "Country": "US",
			//             "Line1": "23653 S 61th St.",
			//             "Line2": "",
			//             "PostalCode": "85044",
			//             "StateProvinceCode": "AZ"
			//         },
			//         "CurrencyCode": "USD",
			//         "Description": "<p>An 18 hole par 72 facility located in South Phoenix. Amenities include: full driving range and short game practice area, complete golf shop, casual dining set against beautiful golf course views.</p>",
			//         "EmailAddress": null,
			//         "Information": "Price includes golf and cart. Carts 90 degree rule, weather and turf conditions permitting!! ",
			//         "IsActive": true,
			//         "PhoneNumber": "(000) 000-0000",
			//         "Tags": [
			//             "PMP",
			//             "PTP"
			//         ],
			//         "TeeTimePolicy": "Discounted tee times are non-refundable and non-cancelable. CALL (480) 893-1161 FOR CUSTOMER SERVICE. Not showing for this tee time will result in a charge to your credit card for the entire amount due at the course. \r\n\r\nPersonal coolers containing food or beverages, especially alcohol, are not permitted on property at any time.\r\n\r\nWe ask that our customers adhere to our dress code:\r\n\r\nNo denim allowed\r\nCollared shirt is required for men, No tank tops for women.\r\nSoft spikes recommended\r\n\r\nPlease call the golf course at (480) 893-1161 for more information.\r\n\r\nClick the back button on your web browser to return to the previous page.\r\n",
			//         "ThumbnailImagePath": "www.golfnow.com/coursedirectory/img/az/phoenix/ahwatukee-country-club/general.jpgx",
			//         "TimeZoneOffset": -7,
			//         "WebsiteAddress": "http://ahwatukeegolf.com"
			//     },
			//     {
			//         "ID": 10397,
			//         "Latitude": 53.4758,
			//         "Longitude": -2.9417,
			//         "Name": "Aintree Golf Centre & Driving Range (DEV)",
			//         "Address": {
			//             "City": "Lancanshire",
			//             "Country": "GB",
			//             "Line1": "Melling Road",
			//             "Line2": "Liverpool",
			//             "PostalCode": "L9 5ASÂ ",
			//             "StateProvinceCode": "EN"
			//         },
			//         "CurrencyCode": "GBP",
			//         "Description": "Description Needed",
			//         "EmailAddress": null,
			//         "Information": "TAX NOT INCLUDED.",
			//         "IsActive": true,
			//         "PhoneNumber": "(000) 000-0000",
			//         "Tags": [
			//             "PTP"
			//         ],
			//         "TeeTimePolicy": "Tee times may be cancelled up to 48 Hours in advance, Any cancellation or no-show inside of 48 Hours is subject to being charged the full amount. Any tee time booked inside of 48 Hours is guaranteed for the full amount at the time of booking and cannot be cancelled.",
			//         "ThumbnailImagePath": "www.golfnow.com/coursedirectory/img/en/lancanshire/aintree-golf-centre-and-driving-range/general.jpgx",
			//         "TimeZoneOffset": -1,
			//         "WebsiteAddress": null
			//     },
			//     {
			//         "ID": 395,
			//         "Latitude": 52.56524,
			//         "Longitude": -8.786746,
			//         "Name": "Adare Manor Hotel & Golf Resort. (DEV)",
			//         "Address": {
			//             "City": "Adare",
			//             "Country": "IE",
			//             "Line1": "Adare Village",
			//             "Line2": null,
			//             "PostalCode": ".",
			//             "StateProvinceCode": "LK"
			//         },
			//         "CurrencyCode": "EUR",
			//         "Description": "Description Needed",
			//         "EmailAddress": null,
			//         "Information": " Payment\n\n=======\n\nTo book a tee time on-line you will have to enter your credit or debit card details using our secure on-line payment process.\n\nYour card details will be held by us as insurance but we will not process the transaction until you turn up to play.\n\nWhen you turn up for your round of golf, you can choose to pay by cash instead of credit card. You should report to the Pro shop before beginning your round. If the Pro shop is closed, you should call in after your round is complete. \nPrice includes value added tax (VAT), which is charged on goods sold within the European Union. \nThere are limited supplies of electric buggies and trolleys. Please email the golf course at golf@adaremanor.com to reserve these items after booking. Rates for these extra items are as follows: electric buggy €45, pull trolley €5, range balls €10, clubs €45, shoes €10, senior caddy €45, junior caddy €35, fore caddy €35.",
			//         "IsActive": true,
			//         "PhoneNumber": "(000) 000-0000",
			//         "Tags": [
			//             "PTP"
			//         ],
			//         "TeeTimePolicy": "Tee times may be cancelled up to 48 Hours in advance, any cancellation or no-show inside of 48 Hours is subject to being charged the full amount. Any tee time booked inside of 48 Hours is guaranteed for the full amount at the time of booking and cannot be cancelled. Please email customerservice@golfchannelsolutions.com if assistance is needed.",
			//         "ThumbnailImagePath": "www.golfnow.com/coursedirectory/img/lk/adare/adare-manor-hotel-and-golf-resort/general.jpgx",
			//         "TimeZoneOffset": 0,
			//         "WebsiteAddress": "http://www.adaremanor.com/"
			//     },
			//     {
			//         "ID": 1084,
			//         "Latitude": 36.7535744,
			//         "Longitude": -119.697159,
			//         "Name": "Airways Municipal Golf Course (DEV)",
			//         "Address": {
			//             "City": "Fresno",
			//             "Country": "US",
			//             "Line1": "8660 E. Shields Avenue",
			//             "Line2": null,
			//             "PostalCode": "93727",
			//             "StateProvinceCode": "CA"
			//         },
			//         "CurrencyCode": "USD",
			//         "Description": "",
			//         "EmailAddress": "199007021200d97ee96b38eb85e9dd63@comcastnets.com",
			//         "Information": "Green fee includes golf and cart.  Not valid with any other offer or promotion.",
			//         "IsActive": true,
			//         "PhoneNumber": "(000) 000-0000",
			//         "Tags": [
			//             "PMP",
			//             "PTP"
			//         ],
			//         "TeeTimePolicy": "*** Discounted Tee times are non-refundable and non-cancelable. ***\r\nNot showing for the tee time will result in your credit card being charged the greens fee for each golfer in your party. \r\n\r\nWe ask that our customers adhere to our dress code:\r\n\r\nNo denim allowed\r\n\r\nCollared shirt required\r\n\r\nSoft spikes only\r\n\r\nPlease call (559) 291-6254 for more information.",
			//         "ThumbnailImagePath": "www.golfnow.com/coursedirectory/img/ca/fresno/airways-golf-course/general.jpgx",
			//         "TimeZoneOffset": -7,
			//         "WebsiteAddress": "http://www.airways-golf.com"
			//     },
			//     {
			//         "ID": 9068,
			//         "Latitude": 38.8868065,
			//         "Longitude": -84.38725,
			//         "Name": "AJ Jolly Golf Course (DEV)",
			//         "Address": {
			//             "City": "Alexandria",
			//             "Country": "US",
			//             "Line1": "22862 Alexandria Pike",
			//             "Line2": "",
			//             "PostalCode": "41001",
			//             "StateProvinceCode": "KY"
			//         },
			//         "CurrencyCode": "USD",
			//         "Description": "",
			//         "EmailAddress": null,
			//         "Information": "TAX NOT INCLUDED.",
			//         "IsActive": true,
			//         "PhoneNumber": null,
			//         "Tags": [
			//             "PTP"
			//         ],
			//         "TeeTimePolicy": "Our tee time policy information is currently being updated. Please call the golf course for more information concerning our tee time policy. <br><br> Click  the back button on your web browser to return to the previous page.",
			//         "ThumbnailImagePath": "www.golfnow.com/coursedirectory/img/ky/alexandria/aj-jolly-golf-course/general.jpgx",
			//         "TimeZoneOffset": -4,
			//         "WebsiteAddress": "http://www.ajjolly.com"
			//     },
			//     {
			//         "ID": 3608,
			//         "Latitude": 33.0823021,
			//         "Longitude": -112.088867,
			//         "Name": "Ak-Chin Southern Dunes Golf Club (DEV)",
			//         "Address": {
			//             "City": "Maricopa",
			//             "Country": "US",
			//             "Line1": "61689 West Highway 351",
			//             "Line2": null,
			//             "PostalCode": "85239",
			//             "StateProvinceCode": "AZ"
			//         },
			//         "CurrencyCode": "USD",
			//         "Description": "",
			//         "EmailAddress": "d97448dcb82ac7d158356ad32c5879ed@comcastnets.com",
			//         "Information": "Price includes green fees and cart w/ GPS. Not valid with other offers or promotions. Carts 90 degrees, weather & turf conditions permitting.\r\n\r\nPractice facility access will not be included with the twilight times.\r\n\r\n**Cart Path Only restrictions through November**",
			//         "IsActive": true,
			//         "PhoneNumber": "(000) 000-0000",
			//         "Tags": [
			//             "PMP",
			//             "PTP"
			//         ],
			//         "TeeTimePolicy": "Daily Fee Guests: Reservations are cancelable 48 hours in advance of the tee time by calling (480) 367-8949. Online booking fees (if applicable) are non-refundable. Failing to cancel or not showing for this tee time will result in a charge to your credit card for the entire amount due at the course.\r\n\r\n\r\nWe ask that our customers adhere to golf course dress code:\r\n\r\nAppropriate golf attire preferred.\r\nSoft spikes only.",
			//         "ThumbnailImagePath": "www.golfnow.com/coursedirectory/img/az/maricopa/ak-chin-southern-dunes-golf-club/general.jpgx",
			//         "TimeZoneOffset": -7,
			//         "WebsiteAddress": null
			//     },
			//     {
			//         "ID": 840,
			//         "Latitude": 36.7568,
			//         "Longitude": -95.9085,
			//         "Name": "Adams Golf Course (DEV)",
			//         "Address": {
			//             "City": "Bartlesville",
			//             "Country": "US",
			//             "Line1": "8102 E. Tuxedo Blvd",
			//             "Line2": null,
			//             "PostalCode": "74006",
			//             "StateProvinceCode": "OK"
			//         },
			//         "CurrencyCode": "USD",
			//         "Description": "<p>Adams Golf Club is an 18 hole Championship Golf Course that was established in 1963. It measures 6745 yards from the championship tees. The course meanders through the beautiful Eastern Oklahoma terrain that is interwoven with Turkey Creek. The creek has been coffer damned to provide beautiful ponds that come into play on 12 of the 18 holes. The fairways and rough are Bermuda grass and the greens are Pen Cross Bent for a fast pace of putting.</p><p>Jerry Benedict, the general manager and director of golf, is a Class \"A\" Member of the PGA. Lessons are available by appointment including private and group rates. Adams has a newly remodeled clubhouse with a \"golf shop\" stocked with top brand merchandise and a professional staff.  The clubhouse has facilities to handle tournament cookouts, banquets and luncheons for group and corporate outings.</p><p>The \"practice facility\" is new and one of the finest in the Midwest. It includes practice putting greens, a chipping green, practice bunkers and a 25-station driving range with target greens.</p>",
			//         "EmailAddress": "2dee5ab4763188c89f001cf4193ce35b@comcastnets.com",
			//         "Information": "Rate is for 18 holes with cart. TAX NOT INCLUDED.\r\n\r\nSeniors 60+ pay only $25 per player plus tax when you get to the course (proper ID will be required at time of check in).",
			//         "IsActive": true,
			//         "PhoneNumber": "(000) 000-0000",
			//         "Tags": [
			//             "PMP",
			//             "PTP"
			//         ],
			//         "TeeTimePolicy": "PLEASE PRINT THE EMAIL CONFIRMATION AND TAKE IT TO THE COURSE AS VERIFICATION OF YOUR RESERVATION. If you do not have the confirmation your group may be denied or unknowingly be charged full rack rate. \r\n\r\nProper dress is required. 24 hr cancellation required.  For more information, call the golf shop at (918) 331-3900.",
			//         "ThumbnailImagePath": "www.golfnow.com/coursedirectory/img/ok/bartlesville/adams-golf-course/general.jpgx",
			//         "TimeZoneOffset": -5,
			//         "WebsiteAddress": null
			//     },
			//     {
			//         "ID": 6498,
			//         "Latitude": 28.7447529,
			//         "Longitude": -81.397316,
			//         "Name": "Alaqua Country Club (DEV)",
			//         "Address": {
			//             "City": "Longwood",
			//             "Country": "US",
			//             "Line1": "3012 Alaqua Drive",
			//             "Line2": "",
			//             "PostalCode": "32779",
			//             "StateProvinceCode": "FL"
			//         },
			//         "CurrencyCode": "USD",
			//         "Description": "",
			//         "EmailAddress": null,
			//         "Information": "<b>Member for a Day Preview Special!</b> This great tee time includes golf, cart, and pre-round range balls. TAX NOT INCLUDED.",
			//         "IsActive": true,
			//         "PhoneNumber": "(000) 000-0000",
			//         "Tags": [
			//             "PTP"
			//         ],
			//         "TeeTimePolicy": "Alaqua Country Club has a 24-hour tee time cancellation policy. If you wish to cancel your round or change the number of players in your group, please do so at least 24 hours prior to the commencement of your reservation or you will be charged. Please call 407-333-2582 for more information. Proper attire is required. ",
			//         "ThumbnailImagePath": "www.golfnow.com/coursedirectory/img/fl/longwood/alaqua-country-club/general.jpgx",
			//         "TimeZoneOffset": -4,
			//         "WebsiteAddress": "http://www.alaquacc.com"
			//     },
			//     {
			//         "ID": 8457,
			//         "Latitude": 49.28925,
			//         "Longitude": -124.787682,
			//         "Name": "Alberni Golf Club (DEV)",
			//         "Address": {
			//             "City": "Port Alberni, BC",
			//             "Country": "CA",
			//             "Line1": "9661 Cherry Creek Rd",
			//             "Line2": "",
			//             "PostalCode": "V9Y 8T3",
			//             "StateProvinceCode": "BC"
			//         },
			//         "CurrencyCode": "CAD",
			//         "Description": "Description Needed",
			//         "EmailAddress": null,
			//         "Information": "Tax not included. ",
			//         "IsActive": true,
			//         "PhoneNumber": "(000) 000-0000",
			//         "Tags": [
			//             "PTP"
			//         ],
			//         "TeeTimePolicy": "",
			//         "ThumbnailImagePath": "www.golfnow.com/coursedirectory/img/bc/port-alberni-bc/alberni-golf-club/general.jpgx",
			//         "TimeZoneOffset": -7,
			//         "WebsiteAddress": "http://www.albernigolf.com/"
			//     },
			//     {
			//         "ID": 8179,
			//         "Latitude": 45.26375,
			//         "Longitude": -94.12417,
			//         "Name": "Albion Ridges Golf Course (DEV)",
			//         "Address": {
			//             "City": "Annandale",
			//             "Country": "US",
			//             "Line1": "1112 30th St NW",
			//             "Line2": "",
			//             "PostalCode": "55302",
			//             "StateProvinceCode": "MN"
			//         },
			//         "CurrencyCode": "USD",
			//         "Description": "The combination of outstanding maintenance, design and quality of golf has earned Albion ridges a 4 star rating from Golf Digest. These factors plus the reasonable green fees earned Albion Ridges a Best value rating from the Minneapolis Star Tribune. \r\n",
			//         "EmailAddress": null,
			//         "Information": "TAX NOT INCLUDED.",
			//         "IsActive": true,
			//         "PhoneNumber": "(000) 000-0000",
			//         "Tags": [
			//             "PTP"
			//         ],
			//         "TeeTimePolicy": "This rate may not be combined with any other offer. Online tee times are NON-REFUNDABLE AND NON-CANCELABLE. CALL (800) 767-3574 FOR CUSTOMER SERVICE. Not showing for this tee time may result in a charge to your credit card for the entire amount due at the course. *please note that any transaction fees are non refundable* Please cancel your round of golf 24 hours in advance to avoid charges to your credit card.  We ask that our customers adhere to golf course dress code.  State Law requires all alcoholic beverages must be purchased at the course.  Soft spikes only.  Enjoy your round at Albion Ridges GC!",
			//         "ThumbnailImagePath": "www.golfnow.com/coursedirectory/img/mn/annandale/albion-ridges-golf-course---the-rock-course-course/general.jpgx",
			//         "TimeZoneOffset": -5,
			//         "WebsiteAddress": "http://www.albionridges.com"
			//     },
			//     {
			//         "ID": 876,
			//         "Latitude": 42.2814522,
			//         "Longitude": -89.02686,
			//         "Name": "Aldeen Golf Club (DEV)",
			//         "Address": {
			//             "City": "Rockford",
			//             "Country": "US",
			//             "Line1": "2100 Reid Farm Rd.",
			//             "Line2": "",
			//             "PostalCode": "61107",
			//             "StateProvinceCode": "IL"
			//         },
			//         "CurrencyCode": "USD",
			//         "Description": "",
			//         "EmailAddress": null,
			//         "Information": "Green fees and cart included. Time and rate valid only when you book online. Savings based on peak daily rate. Thank you for playing at Aldeen!",
			//         "IsActive": true,
			//         "PhoneNumber": "(000) 000-0000",
			//         "Tags": [
			//             "PTP"
			//         ],
			//         "TeeTimePolicy": "This rate may not be combined with any other offer. Online tee times and transaction fees are non-refundable. Please call (800) 767-3574 for customer service. Not showing up for this tee time will result in a charge to your credit card for the entire amount due at the course. We ask that our customers please adhere to golf course dress code: No denim allowed. Collared shirt required. Soft spikes only.  Thank you!",
			//         "ThumbnailImagePath": "www.golfnow.com/coursedirectory/img/il/rockford/aldeen-golf-course/general.jpgx",
			//         "TimeZoneOffset": -5,
			//         "WebsiteAddress": "http://www.aldeengolfclub.com"
			//     },
			//     {
			//         "ID": 1746,
			//         "Latitude": 47.3323364,
			//         "Longitude": -123.092476,
			//         "Name": "Alderbrook Golf & Yacht Club (DEV)",
			//         "Address": {
			//             "City": "Union",
			//             "Country": "US",
			//             "Line1": "500 E. Country Club Dr. E.",
			//             "Line2": "",
			//             "PostalCode": "98592",
			//             "StateProvinceCode": "WA"
			//         },
			//         "CurrencyCode": "USD",
			//         "Description": "<p>Alderbrook Golf & Yacht Club in the back yard of the Olympics and the Hood Canal, is among the best courses in the Northwest. The course is 6,338 yards with par of 72. It is professionally maintained and open year-round. The course plays through the community resulting in 18 unique and diverse challenges.</p>",
			//         "EmailAddress": "afa817219db2a9b0233851afa1081a8e@comcastnets.com",
			//         "Information": "Includes 18 holes.   SPECIAL! ATTENTION: TEE TIMES WILL ONLY BE HONORED IF A COPY OF THIS CONFIRMATION IS BROUGHT TO THE PRO SHOP AT THE TIME OF CHECK IN. Online tee times are non-cancellable and non-refundable, except for weather related course closures. If you do not show, your credit card will be charged for each golfer in your party. For more information call the pro shop at: 1-866-898-2560   TAX NOT INCLUDED.",
			//         "IsActive": true,
			//         "PhoneNumber": "(000) 000-0000",
			//         "Tags": [
			//             "PTP"
			//         ],
			//         "TeeTimePolicy": "The dress code applies to the golf course and all practice areas and requires all clothing to be appropriate, clean and in good repair. No fleece or jersey sweat pants, tank tops, halter or fishnet tops, bare midriffs, T-shirts, cut-off pants (shorts), or gym, swim, or tennis wear.  \r\n\r\nShorts must be mid-thigh length or longer.  \r\n\r\nBlue jeans of any length are only allowed in the winter season, October – April ONLY \r\nFor more information call the pro shop at: 1-866-898-2560  <br><br> Click  the back button on your web browser to return to the previous page.",
			//         "ThumbnailImagePath": "www.golfnow.com/coursedirectory/img/wa/union/alderbrook-golf-and-yacht-club/general.jpgx",
			//         "TimeZoneOffset": -7,
			//         "WebsiteAddress": "http://www.alderbrookgolf.com"
			//     },
			//     {
			//         "ID": 11116,
			//         "Latitude": 51.49842,
			//         "Longitude": -113.498611,
			//         "Name": "Acme Golf Club (DEV)",
			//         "Address": {
			//             "City": "Acme",
			//             "Country": "CA",
			//             "Line1": "PO Box 812",
			//             "Line2": "",
			//             "PostalCode": "T0M0A0",
			//             "StateProvinceCode": "AB"
			//         },
			//         "CurrencyCode": "CAD",
			//         "Description": "",
			//         "EmailAddress": "085c51424d1f6c377c0c0e6c71239ff3@comcastnets.com",
			//         "Information": "TAX INCLUDED.",
			//         "IsActive": true,
			//         "PhoneNumber": "(000) 000-0000",
			//         "Tags": [
			//             "PTP"
			//         ],
			//         "TeeTimePolicy": "Our tee time policy information is currently being updated. Please call the golf course for more information concerning our tee time policy. <br><br> Click  the back button on your web browser to return to the previous page.",
			//         "ThumbnailImagePath": "www.golfnow.com/coursedirectory/img/ab/acme/acme-golf-club/general.jpgx",
			//         "TimeZoneOffset": -7,
			//         "WebsiteAddress": "http://acmegolfclub.com"
			//     },
			//     {
			//         "ID": 11554,
			//         "Latitude": null,
			//         "Longitude": null,
			//         "Name": "Alderley Edge Golf Club (DEV)",
			//         "Address": {
			//             "City": "Cheshire",
			//             "Country": "GB",
			//             "Line1": "Brook Lane",
			//             "Line2": "Alderley Edge",
			//             "PostalCode": "SK9 7RU",
			//             "StateProvinceCode": "EN"
			//         },
			//         "CurrencyCode": "GBP",
			//         "Description": "",
			//         "EmailAddress": null,
			//         "Information": "This great tee time is for 18 holes of golf at Alderley Edge Golf Club\n\nPayment\n=======\nTo book a tee time on-line you will have to enter your credit or debit card details using our secure on-line payment process.\n\nYour card details will be held by us as insurance but we will not process the transaction until you turn up to play.\n\nWhen you turn up for your round of golf, you can choose to pay by cash instead of credit card. You should report to the Pro shop before beginning your round. If the Pro shop is closed, you should call in after your round is complete.\n",
			//         "IsActive": true,
			//         "PhoneNumber": "(000) 000-0000",
			//         "Tags": [
			//             "PTP"
			//         ],
			//         "TeeTimePolicy": "Tee times may be cancelled up to 48 Hours in advance, Any cancellation or no-show inside of 48 Hours is subject to being charged the full amount. Any tee time booked inside of 48 Hours is guaranteed for the full amount at the time of booking and cannot be cancelled. Please email customerservice@golfchannelsolutions.com if assistance is needed.\n",
			//         "ThumbnailImagePath": "www.golfnow.com/coursedirectory/img/en/cheshire/alderley-edge-golf-club-/general.jpgx",
			//         "TimeZoneOffset": 0,
			//         "WebsiteAddress": null
			//     },
			//     {
			//         "ID": 1743,
			//         "Latitude": 33.7148438,
			//         "Longitude": -84.46392,
			//         "Name": "Alfred Tup Holmes  (DEV)",
			//         "Address": {
			//             "City": "Atlanta",
			//             "Country": "US",
			//             "Line1": "3500 Wilson Drive",
			//             "Line2": "",
			//             "PostalCode": "30311",
			//             "StateProvinceCode": "GA"
			//         },
			//         "CurrencyCode": "USD",
			//         "Description": "<p>This course was built on hilly terrain that was once the site of a Civil War battle. The fairways are fairly narrow and tree lined, and water hazards (two creeks that meander their way through the course) occasionally come into play. </p>",
			//         "EmailAddress": "8147de6c434d5aad5048e6acd72c8838@comcastnets.com",
			//         "Information": "Rate is for 18 holes of golf.  Cart fee is additional $11.00 per player.  TAX NOT INCLUDED.",
			//         "IsActive": true,
			//         "PhoneNumber": "(000) 000-0000",
			//         "Tags": [
			//             "PTP"
			//         ],
			//         "TeeTimePolicy": "This rate may not be combined with any other offer. Discounted tee times are non-refundable and non-cancelable.  CALL (800) 767-3574 FOR CUSTOMER SERVICE. Not showing for this tee time will result in a charge to your credit card for the entire amount due at the course.",
			//         "ThumbnailImagePath": "www.golfnow.com/coursedirectory/img/ga/atlanta/alfred-tup-holmes-golf-course/general.jpgx",
			//         "TimeZoneOffset": -4,
			//         "WebsiteAddress": null
			//     }
			// ];

			// jsonFacilitiesToMarkers(facilitiesInArea);
			//test goToCourseFunctionality
			// setTimeout(function() {
			// 	goToCourse(1743);
			// 	console.log('waited');
			// }, 3000);

			// //test goToCourseFunctionality
			// setTimeout(function() {
			// 	goToZipCenter(32779);
			// 	console.log('waited');
			// }, 5000);
		}

		// converts get facilites object into markers for use by google maps
		// @ facilities is the obj returned by get facilities (by channel/other)
		// @ return markers created by get facilities
		function jsonFacilitiesToMarkers(facilities) {

		    for (key in facilities) {
		        markers.push(new google.maps.Marker({
		            position: new google.maps.LatLng(facilities[key].Latitude, facilities[key].Longitude),
		            map: map,
		            animation:google.maps.Animation.DROP,
		            title: key,
		            id: facilities[key].ID
		        }));
		    }
		    return markers;
		}

		//Given an array of gmap markers, add it to global map instance
		function loadMarkers(markerArray) {
		    console.log('loaderMarkers called');
		    if (markerArray.length > 0) {
		        for (var i = 0; i < markers.length; i++) {
		            addMarkerEvent(markerArray[i]);
		            markerArray[i].setMap(map);
		        }
		    }
		}

		// Given marker attach a click listener
		function addMarkerEvent(marker) {
		    google.maps.event.addListener(marker, 'click', function() {
		        // infowindow.setContent("<div>"+marker.title+"</div>");
		        console.log("clicked" + marker.id);
		        court_id = marker.id;
		        infowindow.open(map,this);
		    });
		}

		//get all the facilities in the given city
		function getFacilityByCity(cityName, channelId, numResultsDesired, numSkip) {
			var request = "https://sandbox.api.gnsvc.com/rest/channel/"+channelId+"/facilities?q=list&skip="+numSkip+"&take="+numResultsDesired;

			console.log($("#map-canvas").height());

			$.ajax({
				type: "GET",
				url: request,
				dataType: 'json',
				headers: {
					"Access-Control-Allow-Origin": "*",
			  		"UserName": "Hackathon_Development",
			  		"Password":"6YBkHF86ut7946pDwZhp"
			    },
				success: function(data, status) {
					facilitiesInArea = data;
					console.log(data);
					return console.log('success!');
				},
				error: function(xhr, desc, err) {
					console.log(xhr);
					console.log("Details: " + desc + "\nError:" + err);
					return console.log('did not work...');
				}
			});
			loadMarkers(jsonFacilitiesToMarkers(factilitiesInArea));
		}

		function goToZipCenter(zipCode) {
		    geocoder.geocode({'address': zipCode}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					//Got result, center the map and put it out there
					console.log('got ' + results);
					console.log(results[0].geomertry.location);
					map.setCenter(results[0].geometry.location);
				}
		    });
		}

		//courseID is the number key of the course
		function goToCourse(courseId) {
			//improve this later!
			for(key in markers) {
				if (markers[key].id === courseId)
					map.panTo(markers[key].getPosition());
			}
		}

		google.maps.event.addDomListener(window, 'load', initialize);

		//recieve the facilities and load the markers
		socket.on('facilities.sendFacilitiesByLatLonRange', function(data) {
			console.log('recd data');
			loadMarkers(jsonFacilitiesToMarkers(data.facilities));
		});
	});

		// Find the best matches for "Main St" in Colorado.
		 var response = Maps.newGeocoder()
		     // The latitudes and longitudes of southwest and northeast corners of Colorado, respectively.
		     .setBounds(36.998166, -109.045486, 41.001666,-102.052002)
		     .geocode('Main St');

		 // Create a Google Doc and map.
		 var doc = DocumentApp.create('My Map');
		 var map = Maps.newStaticMap();

		 // Add each result to the map and doc.
		 for (var i = 0; i < response.results.length && i < 9; i++) {
		   var result = response.results[i];
		   map.setMarkerStyle(null, null, i + 1);
		   map.addMarker(result.geometry.location.lat, result.geometry.location.lng);
		   doc.appendListItem(result.formatted_address);
		 }

		 // Add the finished map to the doc.
		 doc.appendImage(Utilities.newBlob(map.getMapImage(), 'image/png'));
})();