window.addEventListener("mousemove", main);

function main(evt){
    let x = evt.x;
    let y = evt.y;

    let w = window.innerWidth;
    let h = window.innerHeight;
    /*
    let hue = x/w * 360; // 360deg
    let lux = 100 - y/h * 100; // 100%
    let sat = 100; //100%*/

    let t = x/w;
    let cor = lerpCor([240,100,80], [60,100,50], t);
    let hue = cor[0];
    let sat = cor[1];
    let lux = cor[2];
    colorir(`hsl(${hue}deg,${sat}%,${lux}%)`);
}

function lerpCor(c1,c2,t){
    return [
        lerp(c1[0],c2[0],t),
        lerp(c1[1],c2[1],t),
        lerp(c1[2],c2[2],t),
    ];
}

function lerp(a, b, t){
    return a*(1-t) + b*t; 
}

function colorir(cor){
    document.body.style.background = cor;
}