precision highp float;

attribute vec2 position;

attribute vec2 p2;

uniform float frame;

uniform float aspect;

varying vec2 ponto;

void main(){

    float fps = 60.0;
    float seg = 10.0;
    float PI = 3.14;

    float rad = frame * PI * 0.01;

    float t = (sin(rad) + 1.0) / 2.0;

    ponto = mix(position, p2, t);

    gl_Position = vec4(ponto.x / aspect, ponto.y, 0.0, 1.0);
}