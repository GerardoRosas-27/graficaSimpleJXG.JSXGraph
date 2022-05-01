function Ball (color,mass,charge) {	
	//if(typeof(radius)==='undefined') radius=20;
	if(typeof(color)==='undefined') color='#0000ff';
	if(typeof(mass)==='undefined') mass=1;
	if(typeof(charge)==='undefined') charge=0;
	//this.radius=radius;
	this.color=color;
	this.mass=mass;
	this.charge=charge;
	
	this.x=0;
	this.y=0;
	this.vx=0;
	this.vy=0;
}

Ball.prototype={
	get pos2D (){
		return new Vector2D(this.x,this.y);			
	},
	set pos2D (pos){
		this.x = pos.x;
		this.y = pos.y;
	},
	get velo2D (){
		return new Vector2D(this.vx,this.vy);			
	},
	set velo2D (velo){
		this.vx = velo.x;
		this.vy = velo.y;
	},
	draw: function(jsxboard){
		jsxboard.create('point',[this.x,this.y],{name:''});
	}
};