precision highp float;

uniform float frame;

varying vec4 ponto;
varying vec4 norm;

void main(){
    
    // RGBA
    gl_FragColor = vec4(norm.rgb, 1.0);
}