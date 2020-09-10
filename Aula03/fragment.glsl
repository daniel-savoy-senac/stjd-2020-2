precision highp float;

uniform float frame;

void main(){

    // 60 fps
    float fps = 60.0;
    float seg = 10.0;

    float PI = 3.14;

    float rad = frame * PI * 0.01;

    // -1.0 <= cos(t) <= 1.0
    float t = (sin(rad) + 1.0) / 2.0;

    vec4 cor1 = vec4(1.0, 0.0, 0.6, 1.0);
    vec4 cor2 = vec4(1.0, 1.0, 0.0, 1.0);

    // LERP
    vec4 cor = mix(cor1, cor2, t);

    // RGBA
    gl_FragColor = cor;
}