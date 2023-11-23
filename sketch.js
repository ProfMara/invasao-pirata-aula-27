const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var engine, world, ground;
var solo, parado;
var cenario;
var torre, torreIMG;

var listaBalas = [];
var listaNavios = [];


function preload() {
  //carrega a imagem do cenario
  cenario = loadImage("fundo.gif");

}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;

  parado = { isStatic: true };

  solo = Bodies.rectangle(width / 2, height - 2, width, 50, parado);
  World.add(world, solo);

  angleMode(DEGREES);

  //cria um objeto da classe torre
  torre = new Torre(160, 350, 150, 310);

  //cria um objeto da classe canhão
  canhao = new Canhao(160, 125, 100, 100);



 

  rectMode(CENTER);

  //configura para posicionar as imagens a partir do centro
  imageMode(CENTER);
}

function draw() {
  Engine.update(engine);
  background("cyan");
  //coloca uma imagem no meio do jogo
  image(cenario, 600, 300, 1200, 600);

  //exibe o canhão
  canhao.mostrar();
  //exibe a torre
  torre.mostrar();

  mostrarNavios();

  //repetir pelo número de balas que há na matriz
  for (var b = 0; b < listaBalas.length; b++) {
    if (listaBalas[b] != undefined) {
      listaBalas[b].mostrar();
      //facilita a vida 

      //checa se afundou 


     
      
      //checar se a posição da bala é maior que height - 50
      if (
        listaBalas[b].body.position.x > width ||
        listaBalas[b].body.velocity.x < 2
      ) {
        listaBalas[b].destruir(b);
      }

      detectarColisao(b);
    }
  }

  fill("green");
  //solo
  rect(solo.position.x, solo.position.y, width, 10);
}
var atirei = false;
function keyPressed() {
  //checar se é a tecla espaço
  //keyCode:32
  if (keyCode == 32 && !atirei) {
    atirei = true;
    bala = new Bala(160, 125, 15);
    console.log("APERTEI ESPAÇO");
    bala.atirar();
    //add a bala na lista de balas
    listaBalas.push(bala);
    //manda espera um segundo
    setTimeout(()=> {atirei=false}, 200)
  }
}
function mostrarNavios() {
  //Se há navios na lista
  if (listaNavios.length > 0) {
    var ultimoNavio = listaNavios[listaNavios.length - 1];
    //último navio da lista é indefinido
    if (ultimoNavio == undefined) {
      //criar um objeto da classe Navio
      navio = new Navio(1100, 450, 85);
      //add na matriz
      listaNavios.push(navio);
    }
    //último navio da lista tem a posição X < 900
    else if (ultimoNavio.body.position.x < 900) {
      //cria um objeto da classe navio
      navio = new Navio(1100, 450, 85);
      //add na matriz
      listaNavios.push(navio);
    }
    //mostrar os navios
    for (var i = 0; i < listaNavios.length; i++) {
      if (listaNavios[i] != undefined) {
        listaNavios[i].mostrar();
      }
    }
  } else {
    //cria navio
    navio = new Navio(1100, 450, 85);
    //push -> add itens na matriz
    listaNavios.push(navio);
  }
}

function detectarColisao(b) {
  for (var n = 0; n < listaNavios.length; n++) {
    //checar se o navio nessa posição e se a bala existem
    // DIFERENTE -> !=
    if (listaNavios[n] != undefined && listaBalas[b] != undefined) {
      //cria o objeto com info da colisão
      var colisao = Matter.SAT.collides(
        listaNavios[n].body,
        listaBalas[b].body
      );
      //determina o que ocorre quando há colisão
      if (colisao.collided == true) {
        //remover a bala
        listaBalas[b].destruir(b);
        //remover o navio
        listaNavios[n].destruir(n);
      }
    }
  }
}
