var jugando;

var velocidad;

var canvas;
var ancho;
var alto;
var ctx;

var jugador1;
var jugador2;
const audio = new Audio();
audio.src = "audio/car.mp3";
audio.volume = 0.5;


function iniciar(){
	audio.play();
	setTimeout(()=>{
		velocidad = 10;
		canvas = document.getElementById('jcanvas');
		ancho = canvas.width;
		alto = canvas.height;
		ctx = canvas.getContext("2d");
		
		jugador1 = new Carro(1);		
		jugador2 = new Carro(4);
		animar();

	},3300);
		
}

function animar(){
	dibujar();
	if(!jugador1.llegada() && !jugador2.llegada()){
		jugando = requestAnimationFrame(animar);
	}else{
		if(jugador1.llegada()){
			ganador(jugador1.nombre);
		}else{
			ganador(jugador2.nombre);
		}
	}
}

function dibujar(){
	ctx.clearRect(0,0, ancho, alto);
	jugador1.dibujar();
	
	jugador2.dibujar();
}

function ganador(juganador){
	ctx.clearRect(0,0, ancho, alto);
	ctx.fillStyle="rgba(205, 255,255, .755)";
	ctx.fillRect(25, 15, ancho-50, alto-30);
	ctx.fillStyle="#000000";
	ctx.font = "20px Arial";
	ctx.fillText("Ganador: "+juganador, ancho/8, alto/2);
	setTimeout(()=>{
		ctx.clearRect(0,0, ancho, alto);
		
	},1800);

}

function mover(event){
	var tecla = event.keyCode;
    //console.log(tecla);
	if(tecla == 87){//W
		event.preventDefault();
		jugador1.mover();

	}

	if(tecla == 104){//8
		event.preventDefault();
		jugador2.mover();
	}

}

class Carro{
	constructor(tipo){
		this.tipo = tipo;
		this.x = 0;
		switch(this.tipo){
			case 1:
				this.y = 7;
				this.img = document.getElementById('carro1');
				this.nombre = "Jugador 1";
			break;
			
			case 4:
				this.y = 118;
				this.img = document.getElementById('carro4');
				this.nombre = "Jugador 2";
			break;
		}
	}

	dibujar(){
		ctx.drawImage(this.img, this.x, this.y);
	}

	mover(){
		this.x += velocidad;
		
	}

	llegada(){
		if(this.x+54>=ancho-10){
			return true;
		}else{
			return false;
		}
	}
}