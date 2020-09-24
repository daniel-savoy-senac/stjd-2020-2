window.addEventListener("load", main);
window.addEventListener("resize", resize);

// VARIÁVEIS GLOBAIS
let canvas,         // área de desenho
    gl,             // API do WebGL
    frame = 0,      // número do frame atual
    vertexSrc,      // codigo fonte vertex shader
    fragmentSrc,    // codigo fonte fragment shader
    vertexShader,   // shader compilado
    fragmentShader, // shader compilado
    shaderProgram,  // programa com shaders linkados
    data,           // modelo 3D
    positionAttr,   // referência do buffer no shader de fragmento
    positionBuffer, // buffer alocado
    frameUniform,   // variável de frame nos shaders
    width,
    height, 
    aspect,
    projection,
    projectionUniform,
    model,
    modelUniform,
    view,
    viewUniform;



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
    vertexShader = compile(vertexSrc, gl.VERTEX_SHADER);
    fragmentShader = compile(fragmentSrc, gl.FRAGMENT_SHADER);

    // 5 - Linkar os shaders
    shaderProgram = link(vertexShader, fragmentShader);
    gl.useProgram(shaderProgram);

    // 6 - Criar os dados de modelo
    data = getData();

    // 7 - Transferir dados de modelo para GPU

    // POSITION 
    positionAttr = gl.getAttribLocation(shaderProgram, "position");
    positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, data.points, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionAttr);
    gl.vertexAttribPointer(positionAttr, 3, gl.FLOAT, false, 0, 0);

    // 7.5 - Uniforms...
    // 7.5.1 - Model
    model = mat4.identity([]);
    modelUniform = gl.getUniformLocation(shaderProgram, "model");
    gl.uniformMatrix4fv(modelUniform, false, new Float32Array(model));

    view = mat4.identity([]);
    viewUniform = gl.getUniformLocation(shaderProgram, "view");
    gl.uniformMatrix4fv(viewUniform, false, new Float32Array(view));

    projection = mat4.identity([]);
    projectionUniform = gl.getUniformLocation(shaderProgram, "projection");
    gl.uniformMatrix4fv(projectionUniform, false, new Float32Array(projection));


    frameUniform = gl.getUniformLocation(shaderProgram, "frame");

    // 8 - Recalcula o tamanho da tela
    resize();

    // 9 - Chamar o loop de redesenho
    render();
}

function render(){
    // 9.1 - Atualizar dados
    gl.uniform1f(frameUniform, frame);

    // 9.2 - Limpar a tela
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // 9.3 - Desenhar
    // POINTS, LINES, LINE_STRIP, TRIANGLES 
    gl.drawArrays(gl.TRIANGLES, 0, data.points.length / 3);

    // 9.4 - Encerrar frame de desenho
    frame++;
    requestAnimationFrame(render);
}

function getData(){
    let points = [
        -1, 1, 1,
        -1, 0, 1,
        0, 1, 1,

        0, 0, 0,
        0, 1, 0,
        -1, 0, 0
        ];

    let modelo = {"points": new Float32Array(points)};
    return modelo;
}

function createCanvas(){
    let canvas = document.createElement("canvas");
    canvas.style.background = "hsl(0deg, 0%, 80%)";
    document.body.appendChild(canvas);
    return canvas;
}

function loadGL(){
    let gl = canvas.getContext("webgl");
    // gl.enable(gl.DEPTH_TEST);
    return gl;
}

function compile(source, type){
    let shader = gl.createShader(type);
    let typeInfo = type === gl.VERTEX_SHADER ? "VERTEX" : "FRAGMENT";
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
        let reason = gl.getShaderInfoLog(shader);
        console.error("ERRO NA COMPILAÇÃO ::", type, reason);
        return null;
    }
    console.info("SHADER COMPILADO :: ", typeInfo);
    return shader;
}

function link(vertexShader, fragmentShader){
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
        console.error("ERRO NO LINK");
        return null;
    }
    console.info("LINKAGEM BEM SUCEDIDA!!!");
    return program;
}

function resize(){
    width = window.innerWidth;
    height = window.innerHeight;
    aspect = width / height;
    if(canvas){
        canvas.setAttribute("width", width);
        canvas.setAttribute("height", height);
    }
    if(gl) 
        gl.viewport(0, 0, canvas.width, canvas.height);
}
