onDeviceReady: function() {
    app.receivedEvent('deviceready');

    if(PushbotsPlugin.isiOS()){
        PushbotsPlugin.initializeiOS("5533f03d177959da278b4582");
    }

    if(PushbotsPlugin.isAndroid()){
        PushbotsPlugin.initializeAndroid("5533f03d177959da278b4582", "174434801412");
    }

}

//iOS && Android
//Set Alias
PushbotsPlugin.setAlias("alias");
//Tag Device
PushbotsPlugin.tag("tag");
//unTag device
PushbotsPlugin.untag("tag1");
//Enable debug mode
PushbotsPlugin.debug(true);

//iOS only
//Reset Badge
PushbotsPlugin.resetBadge();
//Set badge
PushbotsPlugin.setBadge(10);