
JXG.Options.board.minimizeReflow = 'none'

var board = JXG.JSXGraph.initBoard('edvi', {
	boundingbox: [-1, 4, 20, -1], //xmin,ymax,xmax,ymin			
	keepaspectratio: false,
	axis: false,
	grid: false,
	showCopyright: false,
	zoomX: 1.2,  //En PC y iPad 1.5 es suficiente
	zoomY: 1.2,  //En PC y iPad 1.5 es suficiente
	showNavigation: true,
	needsRegularUpdate: false,
	fixed: true,
	numberPointsLow: 100,
	numberPointsHigh: 100,
	pan: {
		needShift: false,
		needTwoFingers: false,
		enabled: false
	},
	zoom: {
		factorX: 1,
		factorY: 1,
		wheel: false,
	}
});

//-----------------------------Dibuja ejes----------------------//

var ejeX = board.create('axis', [[0, 0], [1, 0]], {

	ticks: {
		drawZero: false,
		ticksDistance: 0.5,
		minorTicks: 5,
		majorHeight: 10,
		label: { offset: [-5, -15] }
	}

});

ejeX.removeAllTicks();

board.create('ticks', [ejeX, 1], { // The number here is the distance between Major ticks
	grid: false,
	strokeColor: '#ccc',
	majorHeight: 12, // Need this because the JXG.Options one doesn't apply
	drawLabels: true, // Needed, and only works for equidistant ticks
	label: { offset: [-4, -15] },
	minorTicks: 0, // The NUMBER of small ticks between each Major tick
	drawZero: false
}
);



var ejeY = board.create('axis', [[0, 0], [0, 1]], {

	ticks: {
		minorTicks: 5,
		ticksDistance: 0.1,
		majorHeight: 20,
		label: { offset: [-30, -1] },
		drawZero: false
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

var epsilon = 0
var limite = 1

var estaDesarrollo = false;
var estaCalcula = false;

/*
var p1_limit = board.create('point', [0, limite], {
	name: '',
	fixed: true,
});
var p2_limit = board.create('point', [30, limite], {
	name: '',
	fixed: true,
});




board.create('line', [p1_limit, p2_limit], {
	straightFirst: false,
	straightLast: false,
	strokeWidth: 1,
});

*/





//---------------------------Dibuja rectángulo --------------------//

var p1_eps = board.create('point', [0, 1], {
	name: '',
	fixed: true,
	color:"#ffffff"
});

var p2_eps = board.create('point', [0, 1], {
	name: '',
	fixed: true,
	color:"#ffffff"
});

var p3_eps = board.create('point', [30, 1], {
	name: '',
	fixed: true,
	color:"#ffffff"
});
var p4_eps = board.create('point', [30, 1], {
	name: '',
	fixed: true,
	color:"#ffffff"
});


 board.create('polygon', [p1_eps, p2_eps, p4_eps, p3_eps], {
	borders: {
		strokeColor: 'black',
		dash: 2,
	},
	fillOpacity: 0.05,
	fillColor: "blue",
});



function animaLimite() {
	console.log("entro anima limite");
	board.create("line", [[0, limite], [30, limite]], {
		straightFirst: false,
		straightLast: false,
		strokeWidth: 1
	});
}


animaLimite()

//--------------------------Anima la sucesión---------------------//

function animaSucesion() {
	console.log("anima sucesion");

	(async () => {
		for (let i = 1; i < 18; i++) {
			await new Promise(resolve => setTimeout(() => {
				board.create('point', [i, function (x) {
					return i / (i + 1);
				}], { name: 'p: ' + i });
				resolve();
			}, 400));
		}
	})();

}

//-------------------------Anima la región-------------------//

function animaRegion() {
	incX = parseFloat(limite) + parseFloat(epsilon);
	decX = parseFloat(limite) - parseFloat(epsilon);
	p1_eps.moveTo([0, incX], 250);
	p2_eps.moveTo([0, decX], 250);
	p3_eps.moveTo([30, incX], 250);
	p4_eps.moveTo([30, decX], 250);
}





function ejecutarEpsilon() {

	var inputE = document.getElementById('inputEpsilon')

	epsilon = inputE.value;

	animaSucesion();
	animaRegion();

}

