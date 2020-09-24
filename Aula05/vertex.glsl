precision highp float;

attribute vec3 position;

uniform float frame;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

varying vec4 ponto;

void main(){

    ponto = projection * view * model * vec4(position, 1.0);

    gl_Position = ponto;
}