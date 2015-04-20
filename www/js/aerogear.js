


  function onDeviceReady() {
    var pushConfig = {
	   pushServerURL: "https://aerogear-crearedes.rhcloud.com/ag-push/",
	  android: {
      senderID: "174434801412",
      variantID: "960584dc-3d5f-4fb4-b442-939af4891a38",
      variantSecret: "6a47b4ac-d14c-4a9c-80b0-6796a828d11d"
    },
    ios: {
      variantID: "d4ca651d-610e-4641-8629-6988dfe1470b",
      variantSecret: "030e3cf8-c601-4a4a-b8c5-8e731015f17d"
    }
	};
    var statusList = $("#app-status-ul");
    statusList.append('<li>deviceready event received</li>');
    try {
      statusList.append('<li>registering </li>');
      push.register(onNotification, successHandler, errorHandler, pushConfig);
    } catch (err) {
      txt = "There was an error on this page.\n\n";
      txt += "Error description: " + err.message + "\n\n";
      alert(txt);
    }
  }
  function onNotification(e) {
    var statusList = $("#app-status-ul");
    // on android we could play the sound, if we add the Media plugin
    if (e.sound && (typeof Media != 'undefined')) {
      var media = new Media("/android_asset/www/" + e.sound + '.wav');
      media.play();
    }
    if (e.coldstart) {
      statusList.append('<li>--COLDSTART NOTIFICATION--' + '</li>');
    }
	 
    statusList.append(navigator.notification.alert(e.alert));
	
    //only on ios
    if (e.badge) {
      push.setApplicationIconBadgeNumber(successHandler, e.badge);
    }
  }
  function successHandler() {
    $("#app-status-ul").append('<li>success</li>');
  }
  
  function errorHandler(error) {
    $("#app-status-ul").append('<li>error:' + error + '</li>');
  }
  document.addEventListener('deviceready', onDeviceReady, true);
  


 
	