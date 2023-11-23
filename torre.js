class Torre{
    constructor(x,y,largura,altura){
        this.body = Bodies.rectangle(x,y,largura,altura, parado);
        //add o corpo no mundo
        World.add(world, this.body);
        //add a prop img
        this.img = loadImage("torre.png");
        //add a prop largura
        this.largura = largura;
        //add a prop altura
        this.altura = altura;
    }

    //método para exibir a imagem da torre
    mostrar(){
        //facilita sua vida
        var pos = this.body.position;
        image (this.img, pos.x, pos.y, this.largura, this.altura)
    }
}