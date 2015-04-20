
/* This code is used to run as soon as appMobi activates */
      
  
    var onDeviceReady=function() {
            AppMobi.device.hideSplashScreen();
        
            //AppMobi.notification.alert("Doing checkPushUser now...","My Message","OK");

        //We are just using the unique device id to check if user exists, but you can send any unique user id and password.
            AppMobi.notification.checkPushUser(AppMobi.device.uuid,AppMobi.device.uuid);
        
    };
    document.addEventListener("appMobi.device.ready",onDeviceReady,false);
        

/* This code runs when notifications are registered */
    var notificationsRegistered=function(event) {
        
        //This is first called from the checkPushUser event above.
        //If a user is not found, success = false, and this tries to add that user.
        if(event.success === false) {
                //AppMobi.notification.alert("Doing AddpushUser now...","MI URBAN SHOP","OK");
                //Try adding the user now - sending unique user id, password, and email address.
                AppMobi.notification.addPushUser(AppMobi.device.uuid, AppMobi.device.uuid, 'no@email.com');
         
                return;
        }
        var msg = event.message || 'OK';
        //AppMobi.notification.alert("Notificaciones habilitadas: " + msg,"MI URBAN SHOP","OK");
    };
    document.addEventListener("appMobi.notification.push.enable",notificationsRegistered,false);      
        
    
        /* This code runs when a push message is received */
    var receivedPush = function(){
        //Get the notifications object
        var myNotifications=AppMobi.notification.getNotificationList();
        //It may contain more than one message, so iterate over them
        var len=myNotifications.length;
        if(len > 0) {
            for(i=0; i < len; i++) {
                //Get message object
                msgObj=AppMobi.notification.getNotificationData(myNotifications[i]);
                try{
                    if(typeof msgObj == "object" && msgObj.id == myNotifications[i]){
                      

                        AppMobi.notification.alert(msgObj.msg + "\n" + msgObj.data,"MI URBAN SHOP","OK");
         
                        AppMobi.notification.deletePushNotifications(msgObj.id);
                        
               //Here we have added return statement to show only first valid message, you can manage                          it accordingly if you want to read all messages
                        return;
                    }
                    AppMobi.notification.alert("Invalid Message Object: " + i,"MI URBAN SHOP","OK");
                }catch(e){
                    AppMobi.notification.alert("Caught Exception For: " + msgObj.id,"MI URBAN SHOP","OK");
                    //Always mark the messages as read and delete them.
                    //If you dont, your users will get them over and over again.
                    AppMobi.notification.deletePushNotifications(msgObj.id);
                }
            }
        }
    };
    document.addEventListener("appMobi.notification.push.receive", receivedPush, false);
