class Navio{
    constructor(x,y, raio){
        this.body = Bodies.circle(x,y,raio);
        World.add(world, this.body);
        this.img = loadImage("navio.png");
        this.raio = raio;
    }
    destruir(i){
        //add um intervalo de tempo
        //mandar o computador esperar
        setTimeout( ()=>{
            //remove o corpo do mundo
            World.remove(world, this.body)
            //tirar ele da matriz
            delete listaNavios[i]
        },1000 )
        
    }
    mostrar(){
        Body.setVelocity(this.body, {x:-1,y:-0.2} )
        var pos = this.body.position;
        image (this.img, pos.x, pos.y, this.raio*2, this.raio*2)
    }
}