jQuery(function( $ ) {	
	
	JXG.Options.board.minimizeReflow='none'		

	var board = JXG.JSXGraph.initBoard('edvi',{
			boundingbox:[-1,4,20,-1], //xmin,ymax,xmax,ymin			
			keepaspectratio:false, 
			axis:false,	
			grid: false,		
			showCopyright:false,
			zoomX:1.2,  //En PC y iPad 1.5 es suficiente
			zoomY:1.2,  //En PC y iPad 1.5 es suficiente
			showNavigation:true,
			needsRegularUpdate: false, 
	  		fixed: true,
	  		numberPointsLow:100,
	  		numberPointsHigh:100,				
			pan: {
				needShift: false,
				needTwoFingers: false,
				enabled: false
			},
			zoom : {
				factorX : 1,   
				factorY : 1,   
				 wheel: false,
			}
		});			

		//-----------------------------Dibuja ejes----------------------//
 
		var ejeX = board.create('axis', [[0,0], [1,0]],{

			ticks: {
				drawZero:false,
				ticksDistance:0.5,
				minorTicks:5,
				majorHeight:10,								
				label: {offset:[-5,-15]} 
			}

		});

		ejeX.removeAllTicks();

		board.create('ticks', [ejeX, 1], { // The number here is the distance between Major ticks
			grid:false,
			strokeColor:'#ccc',
			majorHeight:12, // Need this because the JXG.Options one doesn't apply
			drawLabels:true, // Needed, and only works for equidistant ticks
			label: {offset: [-4, -15]},
			minorTicks:0, // The NUMBER of small ticks between each Major tick
			drawZero:false
 			}		
		);



		var ejeY = board.create('axis', [[0,0], [0,1]],{

			ticks: {
				minorTicks:5,
				ticksDistance:0.1,
				majorHeight:20,								
				label: {offset:[-30,-1]},
				drawZero:false
			}

		});
 		

		//---------------------------Dibuja rectas épsilon--------------------//

/*		var epsilon=0.5

		var p1_eps=board.create('point',[0,1-epsilon],{
			name:'',
			fixed:true,
		});
		var p2_eps=board.create('point',[0,1+epsilon],{
			name:'',
			fixed:true,
		});

		var recta1 = board.create('line',[p1_eps,p2_eps], {
			straightFirst:false, 
			straightLast:false, 
			strokeWidth:4,

		});*/

		var epsilon=0
		var limite=1

		var estaDesarrollo = false;
		var estaCalcula=false;

		var p1_eps=board.create('point',[0,1],{
			name:'',
			fixed:true,
		});
		
		var p2_eps=board.create('point',[0,1],{
			name:'',
			fixed:true,
		});

		var recta1 = board.create('line',[p1_eps,p2_eps], {
			straightFirst:false, 
			straightLast:false, 
			strokeWidth:4,

		});

		//---------------------------Dibuja rectángulo --------------------//
		
		var p3_eps=board.create('point',[30,1],{
			name:'',
			fixed:true,
		});
		var p4_eps=board.create('point',[30,1],{
			name:'',
			fixed:true,
		});
		

		var poly = board.create('polygon',[p1_eps,p2_eps,p4_eps,p3_eps], { 
			borders:{strokeColor:'black',
					dash:2,
					},
			fillOpacity:0.05,
			fillColor:"blue",
		});

		animaRegion()

		//--------------------------Anima la sucesión---------------------//
 		
		function animaSucesion(){  
			console.log("anima sucesion");                                     //https://stackoverflow.com/questions/3583724/how-do-i-add-a-delay-in-a-javascript-loop
 		(async () => {
  				for(let i = 1; i < 18; i++) {
    			await new Promise(resolve => setTimeout(() => {
      			board.create('point',[i,function(x){
 				return i/(i+1);}], {name:''});
      			resolve();
    			}, 400));
  			}
		})();	
		}

		//-------------------------Anima la región-------------------//

		function animaRegion(){	
			incX=parseFloat(limite)+parseFloat(epsilon);
			decX=parseFloat(limite)-parseFloat(epsilon);					
			p1_eps.moveTo([0,incX],250);
			p2_eps.moveTo([0,decX],250);
			p3_eps.moveTo([30,incX],250);
			p4_eps.moveTo([30,decX],250);	
		}








		//---------------------Botones-----------------------------------//
		
		$('#PlayBtn').click(function() {											
			animaSucesion();				
		});

		$('#ResetBtn').click(function() {											
			board.update();		
		});	
		


		
		//------------Recupera el valor de los inputs------------------//
		$( "#inputEpsilon" ).change(function() {
  			epsilon=$(this).val();  			
  			animaSucesion();
  			animaRegion();
  			
  			$("#Paso_1").text(" Dada, \\( \\varepsilon    \\) = " +epsilon+ " existe n \\( \\in  \\mathrm{I}\\!\\mathrm{N} \\) tal que para toda,    \\( n \\gt N     \\) se satisface que, ");  			
  			$("#Paso_2").text(" \\( \\vert  \\frac{n}{n+1}-1  \\vert   \\lt     \\) " + epsilon);  			
  			$("#Paso_3").text(" \\( \\vert  \\frac{-1}{n+1}  \\vert   \\lt     \\) " + epsilon);

  			const etiqueta="<div class=\"form-group row\"\> \<label for=\"inputEpsilon\" class=\"col-6 col-form-label text-right\" >  \\( \\vert  \\frac{1}{n+1}  \\vert   \\lt \\) \</label> ";
  			const input="\<input type=\"number\" class=\"form-control w-25 mx-0 px-0\" id=\"inputVerificaEpsilon\" value=\"0\" max=\"3\" min=\"0\" step=\"0.1\">    <\/div>"
  			$("#Paso_3").append(etiqueta+input);	

  			MathJax.typeset()
  			
  			if(!estaDesarrollo){  								
				estaDesarrollo=true;
  				MathJax.typeset()
  			}


/*  			if(!estaDesarrollo){
  				const etiqueta="<div class=\"form-group row\"\> \<label for=\"inputEpsilon\" class=\"col-6 col-form-label text-right\" >  \\( \\vert  \\frac{1}{n+1}  \\vert   \\lt \\) \</label> ";
  				const input="\<input type=\"number\" class=\"form-control w-25 mx-0 px-0\" id=\"inputVerificaEpsilon\" value=\"0\" max=\"3\" min=\"0\" step=\"0.1\">    <\/div>"
  				//$("#Desarrollo").text(" Desarrollo");  			
  				$("#Paso_1").text(" Dada, \\( \\varepsilon    \\) = " +epsilon+ " existe N \\( \\in  \\mathrm{I}\\!\\mathrm{N} \\) tal que para toda,    \\( n \\gt N     \\) se satisface que, ");  			
  				//$("#Paso_1").text(" La desigualdad,        \\( \\vert  \\frac{n}{n+1}-1  \\vert   \\lt     \\) " + epsilon);  			
  				//$("#Paso_2").text(" Se simplifica como,    \\( \\vert  \\frac{-1}{n+1}  \\vert   \\lt     \\) " + epsilon);  		// 		
				//$("#Paso_2").text(" para toda,    \\( n \\gt N     \\) se satisface que, ");  		// 		
				$("#Completa").text(" Completa la expresión: ");
				$("#Paso_3").append(etiqueta+input);
				estaDesarrollo=true;
  				MathJax.typeset()
  			}*/



		});

		
  		$(document).on('change','#inputVerificaEpsilon',function(){	 //https://stackoverflow.com/questions/34896106/attach-event-to-dynamic-elements-in-javascript		
  			
			if(!estaCalcula){
				  console.log("entra a calcular epsilon");
  				$("#Paso_4").text(" Calcula un valor de N que satisfaga la definición de límite para la épsilon elegida");  			
  				const lblInputN="<div class=\"form-group row\"\> \<label for=\"inputN\" class=\"col-6 col-form-label text-right\" >  N \\(    \\gt \\) \</label> ";
  				const inputN="\<input type=\"number\" class=\"form-control w-25 mx-0 px-0\" id=\"inputN\" value=\"0\" max=\"3\" min=\"0\" step=\"0.1\">    <\/div>"
  				$("#Paso_5").append(lblInputN+inputN);
  				estaCalcula=true;

  				MathJax.typeset()
  			}else{
				console.log("no esta entrasndo calcular epsilon");
			  }       		

		});    

  			

		



		$("#sliderD").bind( "change", function(event, ui) {  		  		
		
			console.log("update")
			board.update();	
			
		});


		
		


}) 
