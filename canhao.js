class Canhao{
    constructor(x,y, largura,altura){
        this.canoImg = loadImage("canhao.png");
        this.baseImg = loadImage("base.png");
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
        this.angulo = 15;
    }

    mostrar(){
        console.log(this.angulo)
        if(keyIsDown(LEFT_ARROW) && this.angulo > -58){
            this.angulo--;
        }
        if(keyIsDown(RIGHT_ARROW) && this.angulo < 54  ){
            this.angulo++;
        }
        //salvar um checkpoint (salvar os configurações)
        push ();
        //mudar o x:0 e y:0 do jogo
        translate (this.x, this.y);
        //altera as config
        rotate (this.angulo);
        image (this.canoImg, 0, 0, this.largura, this.altura);
        //volte para as configurações antigas
        pop ();
        image(this.baseImg, 160,125,200,200);
        
    }
}