window.addEventListener("load", main);

// VARIÁVEIS GLOBAIS
let canvas,         // área de desenho
    gl,             // API do WebGL
    frame = 0;      // número do frame atual

function main(evt){
    // 1 - Criar uma área de desenho
    canvas = createCanvas();

    // 2 - Carregar a API do WebGL (OpenGL)
    // 3 - Carregar os arquivos fonte de shader (GLSL)
    // 4 - Compilar os shaders
    // 5 - Linkar os shaders
    // 6 - Criar os dados de modelo
    // 7 - Transferir dados de modelo para GPU
    // 7.5 - Uniforms...
    // 8 - Chamar o loop de redesenho
}

function render(){
    // 8.1 - Atualizar dados
    // 8.2 - Limpar a tela
    // 8.3 - Desenhar
    // 8.4 - Encerrar frame de desenho
    frame++;
    requestAnimationFrame(render);
}

function createCanvas(){
    let canvas = document.createElement("canvas");
    canvas.setAttribute("width", 800);
    canvas.setAttribute("height", 600);
    canvas.style.background = "hsl(0deg, 0%, 80%)";
    document.body.appendChild(canvas);
    return canvas;
}
