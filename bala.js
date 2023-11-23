class Bala{
    constructor(x,y, raio){
        this.body = Bodies.circle(x,y,raio, parado);
        World.add(world, this.body);
        this.img = loadImage("bala.png");
        this.raio = raio;
        this.trajetoria = [];

        
        
        
    }
    destruir(i){
       
        
        //add um intervalo de tempo
        //mandar o computador esperar
        setTimeout( ()=>{
            //remove o corpo do mundo
            World.remove(world, this.body)
            //tirar ele da matriz
            delete listaBalas[i]
        },1000 )
        
    }

    atirar(){
        
        var a = canhao.angulo - 28;
        //transformar GRAUS em RADIANOS
        a *= (3.14/180)
        //decompor em x e y
        var v = p5.Vector.fromAngle(a);
        //transformar RADIANOS para GRAUS
        v.mult(90/3.14)
        //deixa móvel
        Body.setStatic(this.body, false)
        Body.setVelocity(this.body, {x:v.x,y:v.y});
    }
    
    mostrar(){
        var pos = this.body.position;
        
        image (this.img, pos.x, pos.y, this.raio*2, this.raio*2)

        
        //checa se a bala tem velocidade e está longe do canhão
        if(this.body.velocity.x > 0 && pos.x > 100 ){
            var posicao = [pos.x, pos.y];
            //add item na matriz?
            this.trajetoria.push(posicao);
        }
        //repetir pelo número de itens em trajetoria
        for(var i = 0; i < this.trajetoria.length; i++ ){
            image (this.img, this.trajetoria[i][0], this.trajetoria[i][1],5,5 )
        }
    }
}