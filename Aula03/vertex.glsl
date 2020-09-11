precision highp float;

attribute vec2 position;

attribute vec2 p2;

uniform float frame;

varying vec2 ponto;

void main(){

    // 60 fps
    float fps = 60.0;
    float seg = 10.0;
    float PI = 3.14;

    float rad = frame * PI * 0.01;

    // -1.0 <= cos(t) <= 1.0
    float t = (sin(rad) + 1.0) / 2.0;

    // 0.0 <= t <= 1.0
    //float t = min(1.0, n * 1.0 / (seg * fps));

    // posição final
    // vec2 p2 = position + vec2(-0.5, -0.3);

    ponto = mix(position, p2, t);

    gl_Position = vec4(ponto, 0.0, 1.0);
}