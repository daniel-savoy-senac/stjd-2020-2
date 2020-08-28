precision highp float;

attribute vec2 position;

uniform float frame;

void main(){
    gl_PointSize = 5.0;
    float x = position.x + frame * 0.001;
    gl_Position = vec4(x, position.y, 0.0, 1.0);
}