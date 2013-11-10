$(function(){



     $(document).on("pageinit","#question",function(event){


     	/*function playAudio(url) {
		    // Play the audio file at url
		    var my_media = new Media(url,
		        // success callback
		        function() {
		            console.log("playAudio():Audio Success");
		        },
		        // error callback
		        function(err) {
		            console.log("playAudio():Audio Error: "+err);
		    });

		    // Play audio
		    my_media.play();

		    // Pause after 10 seconds
		    /*setTimeout(function() {
		        media.pause();
		    }, 10000);*/        
		/*}*/

		function getPhoneGapPath() {
		    var path = window.location.pathname;
		    //var path = '/android_asset/www/index.html'; //delete this line! test only
		    path = path.substr( path, path.length - 10 );
		    return 'file://' + path;
		};




		PCSV = {

				vidas : 5,
				puntos : 0,
				percent : 0,
				current_count_answers:0,
				preguntas : [],
				preguntas_ok:{},
				init: function(){
						PCSV.loadQuestions();
						PCSV.lives.show()
						PCSV.points.show()
						PCSV.percentf.update();
						PCSV.messages.hideBuena();
						PCSV.messages.hideMala();
						PCSV.messages.hidePerdiste();
						PCSV.messages.hideGanaste();
						var url = "cerebrum.co/victimas/campesino-feliz.png"
                
		                $('#shareFacebook').click(function(){
		                    window.open('https://m.facebook.com/sharer.php?u='+url, '_blank');
		                });

		                $('#iniciar').click(function(){
		                    $("#Ganaste").hide()
		                    PCSV.vidas = 5;
		                    PCSV.lives.show();
		                    PCSV.percent = 0;
		                    PCSV.current_count_answers = 0;
		                    $("#progress").html(PCSV.percent);
							$("progress").val(PCSV.percent);
							$("progress div span").css("width",PCSV.percent).html(PCSV.percent+"%");
		                    $.mobile.navigate( "#home" );
		                });

		                $("#cambiarPregunta").button().click(function(){
		                	if(PCSV.puntos>=5){
		                		PCSV.points.miss(5);
		                		question = PCSV.getRamdonQuestion()
								PCSV.showQuestion(question,"#questionTemplate");
		                	}else{
		                		 $("#cambiarPregunta").hide();
		                	}
		                });
								
				},

				loadQuestions:function(){

					PCSV.messages.showWaitLoadData();

					$.post("http://servicedatosabiertoscolombia.cloudapp.net/v1/PNUD/setdatosjuego?$format=json",function(data){
						PCSV.preguntas = data.d
						PCSV.messages.hideWaitLoadData();
						PCSV.nextQuestion();
					},"jsonp")

					$("#pregunta").click(function(){
						question = PCSV.getRamdonQuestion()
						PCSV.showQuestion(question,"#questionTemplate");
					})
				},

				nextQuestion:function(){

					question = PCSV.getRamdonQuestion()
					while(PCSV.preguntas_ok[question.RowKey] != undefined)
						question = PCSV.getRamdonQuestion()
					PCSV.showQuestion(question,"#questionTemplate");
				},

				messages:{
					showWaitLoadData:function(){

						$("#cargando").show();
					},

					hideWaitLoadData:function(){
						$("#cargando").hide();
					},

					showBuena: function(){
						$("#buena").show();
						function getPhoneGapPath() {
						    var path = window.location.pathname;
						    //var path = '/android_asset/www/index.html'; //delete this line! test only
						    path = path.substr( path, path.length - 10 );
						    return 'file://' + path;
						};
			     		//var snd = new Media( getPhoneGapPath() + 'bien.wav' );
			     		//snd.play(); 
					},
					showMala: function(){
						$("#mala").show();
						function getPhoneGapPath() {
						    var path = window.location.pathname;
						    //var path = '/android_asset/www/index.html'; //delete this line! test only
						    path = path.substr( path, path.length - 10 );
						    return 'file://' + path;
						};
			     		//var snd = new Media( getPhoneGapPath() + 'susto.wav' );
			     		//snd.play(); 
						$("#buena").hide();
					},
					showPerdiste: function(){
						$("#Perdiste").show();
					},
					showGanaste: function(){
						$("#Ganaste").show();
					},
					hideBuena: function(){
						$("#buena").hide();
					},
					hideMala: function(){
						$("#mala").hide();
					},
					hidePerdiste: function(){
						$("#Perdiste").hide();
					},
					hideGanaste: function(){
						$("#Ganaste").hide();
					}
				},
				

				getRamdonQuestion:function(){
					index = parseInt(Math.random()*PCSV.preguntas.length)
					question = PCSV.preguntas[index]
					return question
				},
				
				showQuestion:function(question,target){
					$(target+" .question").html(question.pregunta);
					//categoria = question.categoria;
					categoria = parseInt(Math.random()*6)+1

					$("#boxPregunta").removeAttr("class");
					$("#boxPregunta").addClass("basicBox");

					$("#boxLogoText").removeAttr("class");
					$("#boxLogoText").addClass("boxLogo");


					var datatheme = ""

					switch(categoria){
						/*case "Asistencia y Atención":
							break;*/
						case 1:							
							$("#boxPregunta").addClass("purpleBox");
							$("#boxLogoText").addClass("purpleLogo");
							$("#titleCategorie").html("Participación y Organización");
							$("#boxLogoText img").attr("src","img/categorias/participacion.png");
							datatheme = "a"
							break;
						case 2:
							$("#boxPregunta").addClass("greenBox");
							$("#boxLogoText").addClass("greenLogo");
							$("#titleCategorie").html("Reparación Integral");
							$("#boxLogoText img").attr("src","img/categorias/reparacion-integral.png");
							datatheme = "b"
							break;
						case 3:
							$("#boxPregunta").addClass("redBox");	
							$("#boxLogoText").addClass("redLogo");
							$("#titleCategorie").html("Verdad y Justicia");
							$("#boxLogoText img").attr("src","img/categorias/verdad-y-justicia.png");
							datatheme = "c"
							break;
						case 4:
							$("#boxPregunta").addClass("lilaBox");
							$("#boxLogoText").addClass("lilaLogo");
							$("#titleCategorie").html("Ejes Transversales");
							$("#boxLogoText img").attr("src","img/categorias/ejes-transversales.png");
							datatheme = "d"
							break;
						case 5:
							$("#boxPregunta").addClass("orangeBox");
							$("#boxLogoText").addClass("orangeLogo");
							$("#titleCategorie").html("Prevención y Protección");
							$("#boxLogoText img").attr("src","img/categorias/prevencion-y-proteccion.png");
							datatheme = "e"
							break;
						case 6:
							$("#boxPregunta").addClass("blueBox");
							$("#boxLogoText").addClass("blueLogo");
							$("#titleCategorie").html("Asistencia y Atención");
							$("#boxLogoText img").attr("src","img/categorias/asistencia-y-atencion.png");
							datatheme = "f"
							break;							
					}
					var row_key = question.RowKey
					fieldset_options = $(".options fieldset")
					fieldset_options.empty()
					var Respuesta_Re = /Respuesta: (\w)\./g;
					var respuesta = Respuesta_Re.exec(question.respuesta)
					
					if(respuesta == null)
						respuesta = 0;
					else
						respuesta = respuesta["1"]


					A =	$("<input type=\"radio\" name=\"ANSWER\" id=\"A\" data-response=\""+respuesta+"\" data-rowkey=\""+row_key+"\" data-theme=\"" + datatheme + "\" value=\"a\" /><label for=\"A\">"+question.opciona+"</label>");
						fieldset_options.append(A);

					if(question.opcionb != ""){
						 B =	$("<input type=\"radio\" name=\"ANSWER\" id=\"B\" data-response=\""+respuesta+"\" data-rowkey=\""+row_key+"\" data-theme=\"" + datatheme + "\"  value=\"b\"  /> <label for=\"B\">"+question.opcionb+"</label>")
						 fieldset_options.append(B);

						 if(question.opcionc != ""){
						 	C = $("<input type=\"radio\" name=\"ANSWER\" id=\"C\" data-response=\""+respuesta+"\" data-rowkey=\""+row_key+"\" data-theme=\"" + datatheme + "\"  value=\"c\"  /> <label for=\"C\">"+question.opcionc+"</label>")
							fieldset_options.append(C);		 	

							if(question.opciond != ""){
					    		D  = $("<input type=\"radio\" name=\"ANSWER\" id=\"D\" data-response=\""+respuesta+"\" data-rowkey=\""+row_key+"\" data-theme=\"" + datatheme + "\"  value=\"d\"  /> <label for=\"D\">"+question.opciond+"</label>")
					    		fieldset_options.append(D);	
					    	}
						}


						$('#groupOptions').controlgroup("refresh");
						$('#groupOptions').trigger("create");

					}
					$("#options input").change(function(e){
						selected = $("#options").serializeArray()
						selected = selected[0].value
						data =  $(this).data()
						response = data.response

						if(selected ==  response){
							
							PCSV.messages.showBuena();
							PCSV.preguntas_ok[data.rowkey]=1;
								
							PCSV.current_count_answers = PCSV.current_count_answers + 1,

							PCSV.percentf.update();




							setTimeout(function() {
	        					PCSV.messages.hideBuena();
	        					PCSV.points.add(10);
	        					PCSV.nextQuestion();
	        				}, 2000);

						}
						else{
							PCSV.messages.showMala();
							setTimeout(function() {
	        					PCSV.messages.hideMala();
	        					PCSV.lives.miss();
								PCSV.points.miss(5);
								PCSV.nextQuestion();
	        				}, 2000);
						
						}

					})
				},
				percentf:{
					update: function(){
						PCSV.percent = PCSV.current_count_answers / 5 *100
						if(PCSV.percent == 5)
							PCSV.lives.add()
						else if(PCSV.percent == 100)
							PCSV.messages.showGanaste();
						$("#progress").html(PCSV.percent);
						$("progress").val(PCSV.percent);
						$("progress div span").css("width",PCSV.percent).html(PCSV.percent+"%");
						
					}
				},
				lives:{
					show:function(){
						$("#vidas").html(PCSV.vidas);
					},

					add:function(){
						PCSV.vidas = PCSV.vidas + 1;
						PCSV.lives.show();
					},

					miss:function(){
						PCSV.vidas = PCSV.vidas - 1;
						if(PCSV.vidas < 0)
							PCSV.vidas = 0
						if(PCSV.vidas == 0)
							PCSV.gameOver()
						PCSV.lives.show();
					}
				},

				points:{
					show: function(){
						$("#puntos").html(PCSV.puntos)
						if(PCSV.puntos >= 5)
							$("#cambiarPregunta").show("slow");
					},
					add: function(cant){

						PCSV.puntos = PCSV.puntos + cant;
						PCSV.points.show();
					},
					miss: function(cant){

						PCSV.puntos = PCSV.puntos - cant;
						if(PCSV.puntos < 0)
							PCSV.puntos = 0
						PCSV.points.show();
					}
				},
				gameOver:function(){
					/*alert("Perdiste")*/
					PCSV.messages.showPerdiste();
				}


		}

			

		PCSV.init();

    });





})

