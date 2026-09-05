//fondo  
let fb // piso
  let fa //bosque

  // gatito personaje
  let A = [];
let c = 4;
let frameActual = 0;
let gatox;
let gatoy;
let velocidadGato;

// valores del fondo para que se mueva
let pAbajo; //piso abajo
let aArriba; // arboles arriba

//velocidad del fondo
let velocidadArbol;
let velocidadPiso;

//tiempo
let tiempoA ;
let intervalo;
let estado = 0;
let tiempoEstado;

function preload() {

  fb = loadImage('data/ParteAbajo.jpeg');
  fa = loadImage('data/ParteArriba.jpeg');

  for (let i = 1; i <= c; i ++) {
    A.push(loadImage('data/A' + i + '.png') );
  }
}

function setup() {
  createCanvas(800, 600);

  tiempoA = millis();
  tiempoEstado = millis();

  velocidadArbol = 1;
  velocidadPiso = 2;

  intervalo = 200;

  pAbajo = 0;
  aArriba = 0;

  gatox = 0;
  gatoy=350;
  velocidadGato = 1;
}


function draw() {
  background(85, 107, 47);


  //fondo
  image(fb, pAbajo, 400, 1200, 200);
  image(fb, pAbajo + 800, 400, 1200, 200);
  image(fa, aArriba, 0, 1200, 450);
  image(fa, aArriba + 1200, 0, 1200, 450);

  
  //velocidaad arbol y piso
  aArriba -= velocidadArbol;
  pAbajo -= velocidadPiso;

  //repite los arboles
  if (aArriba <= -1199) {
    aArriba = 0;
  }

  //repite el piso
  if (pAbajo <= -800) {
    pAbajo = 0;
  }

  // personaje de gastito
  camabiarEstado();

  //personaje
dibujarGato(A, frameActual, gatox, gatoy, 150);

  //movimiento del gato
  gatox += velocidadGato;

  //reinicia la animacion cuando sale de la pantalla
  if (gatox >= 800 ) {
    gatox= 0;
    frameActual = 0;
    estado = 0;
    tiempoEstado = millis();
  }

  //animacion
  frameActual = animacion(A, frameActual, intervalo);
}

//mis funciones 

function dibujarGato (animacion, frame, x, y, tam) {
  image(animacion[frame], x, y, tam, tam);
}


  function camabiarEstado() {
    if (estado == 0) {
      velocidadGato = 1;
      intervalo = 200;
      if (millis() - tiempoEstado >= 5000) {
        estado = 1;
        tiempoEstado = millis();
      }
    } else if (estado == 1) {
      velocidadGato = 3;
      intervalo = 100;
    }
  }
  
  function animacion(animacion, frame, velocidad){
   if(millis() - tiempoA >= velocidad){
     if(frame >= c - 1){
       frame = 0;
     } else{ 
       frame++;
     }
     
     tiempoA = millis();
   }
   return frame;
  }
  
  function keyPressed() {
    if(key == 'r' || key == 'R') {
      gatox = 0;
      frameActual = 0;
      estado = 0;
      tiempoEstado = millis();
    }
  }
