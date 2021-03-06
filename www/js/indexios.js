		
		
		// Funciones NOTIFICACIONES PUSH //
		
		
			var app = { 
				// Application Constructor 
				initialize: function() { 
					this.bindEvents(); 
				}, 
				// Bind Event Listeners 
				// 
				// Bind any events that are required on startup. Common events are: 
				// 'load', 'deviceready', 'offline', and 'online'. 
				bindEvents: function() { 
					document.addEventListener('deviceready', this.onDeviceReady, false);
				}, 
				// deviceready Event Handler 
				// 
				// The scope of 'this' is the event. In order to call the 'receivedEvent' 
				// function, we must explicity call 'app.receivedEvent(...);' 
				onDeviceReady: function() { 
					
					app.receivedEvent('deviceready');
					
					/* aqui dentro va todo lo necesario para interactuar con el dispositivo */		 
					
				}, 
				// Update DOM on a Received Event 
				receivedEvent: function(id) {  
			
					console.log('Received Event: ' + id); 
					var pushNotification = window.plugins.pushNotification;
					
					// obtenemos el sistema operativo del dispositivo //
					var so= device.platform;
			 
					// declaramos las funciones que obtienen el cod. del dispositivo según su sistema operativo //				
					if(so=="Android"){
					
						// incluir el number_project donde estan las "xxxxxxxx" // 
						pushNotification.register(this.successAndroid, this.errorHandler,{"senderID":"174434801412","ecb":"app.onNotificationGCM"});
						
					}else if(so=="iOS"){
						
						// en iphone no es necesario ningun codigo especial // 
						pushNotification.register(this.successIOS, this.errorHandler,{
							
							"badge":"true", 
							"sound": "true", 
							"alert": "true", 
							"ecb":"app.onNotificationAPN"});
					}
					
				},
				
				// funcion aviso si todo es correcto en ANDROID // 
				successAndroid: function(result) { 
					// se muestra si la obtención del regId ha sido correcta //
					alert('Callback Success! Result = '+result);
				}, 

				
				
				// funcion aviso si todo es correcto en IOS // 
				successIOS: function(result) { 
					// a diferencia de la parte android aqui el valor "result" es el token del dispositivo //
					
					// guardamos en el dispositivo el token, para poder usarlo mas tarde //
					var token = result;
					window.localStorage.setItem("token", token);
					var regId = window.localStorage.getItem("token");
					$.ajax({
										data: {"name" : "ios", "email" : "valor2" , "regId" : regId},
										type: "GET",
										dataType: "json",
										url: "http://redesqr.com/APP/PANELDECONTROL/MIURBANSHOP/registro.php",
									})
					
				},
				
				errorHandler:function(error) { 
					alert(error); 
				}, 
				
				// Notificaciones para dispositivos ANDROID //
				onNotificationGCM: function(e) { 
					switch( e.event ) 
					{ 
						case 'registered': 
							if ( e.regid.length > 0 ) 
							{ 							
								// guardamos en el dispositivo el regId, para poder usarlo mas tarde //
								var regId = e.regid;
								registerServer(regId);
								window.localStorage.setItem("regId", regId);
                                var regId = window.localStorage.getItem("regId");
					$.ajax({
										data: {"name" : "android", "email" : "valor2" , "regId" : regId},
										type: "GET",
										dataType: "json",
										url: "http://redesqr.com/APP/PANELDECONTROL/MIURBANSHOP/registro.php",
									})
							} 
						break; 
			
						case 'message': 
						  // NOTIFICACION!!! 
						  alert(e.message+' msgcnt = '+e.msgcnt); 
						break; 
			
						case 'error': 
						  alert('GCM error = '+e.msg); 
						break; 
			
						default: 
						  alert('An unknown GCM event has occurred'); 
						  break; 
					} 
				}, 
				
				
				// Notificaciones para dispositivos ANDROID //
				onNotificationAPN: function(event) { 
					var pushNotification = window.plugins.pushNotification; 
					alert("Received a notification! " + event.alert); 
					 
					if (event.alert) { 
						navigator.notification.alert(event.alert); 
					} 
					if (event.badge) { 
						pushNotification.setApplicationIconBadgeNumber(this.successHandler, this.errorHandler, event.badge); 
					} 
					if (event.sound) { 
						var snd = new Media(event.sound); 
						snd.play(); 
					} 
				} 
			};
		
		


		
		// Funciones para obtener los id´s de los dispositivos //
				
		var regId = window.localStorage.getItem("regId");
					
		var token = window.localStorage.getItem("token");
					


				

