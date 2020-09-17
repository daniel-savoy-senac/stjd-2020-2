precision highp float;

uniform float frame;

varying vec2 ponto;

void main(){

    // -1 <= X <= 1
    float r = (ponto.x + 1.0) / 2.0;
    float g = (ponto.y + 1.0) / 2.0;

    // RGBA
    gl_FragColor = vec4(1.0-g, 1.0-g, 1.0-g, 1.0);
}