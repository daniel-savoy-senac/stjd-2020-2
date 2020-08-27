window.addEventListener("load", main);

// VARIÁVEIS GLOBAIS
let canvas,         // área de desenho
    gl,             // API do WebGL
    frame = 0,      // número do frame atual
    vertexSrc,
    fragmentSrc;

async function main(evt){
    // 1 - Criar uma área de desenho
    canvas = createCanvas();

    // 2 - Carregar a API do WebGL (OpenGL)
    gl = loadGL();

    // 3 - Carregar os arquivos fonte de shader (GLSL)
    vertexSrc = await fetch("vertex.glsl").then(r => r.text());
    fragmentSrc = await fetch("fragment.glsl").then(r => r.text());

    console.log("VERTEX:", vertexSrc);
    console.log("FRAGMENT:", fragmentSrc);


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

function loadGL(){
    let gl = canvas.getContext("webgl");
    gl.viewport(0, 0, canvas.width, canvas.height);
    // gl.enable(gl.DEPTH_TEST);
    return gl;
}
