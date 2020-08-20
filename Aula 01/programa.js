window.addEventListener("mousemove", main);

function main(evt){
    let x = evt.x;
    let y = evt.y;

    let w = window.innerWidth;
    let h = window.innerHeight;

    let hue = x/w * 360; // 360deg
    let lux = y/h * 100; // 100%
    let sat = 100; //100%

    colorir(`hsl(${hue}deg,${sat}%,${lux}%)`);
}

function colorir(cor){
    document.body.style.background = cor;
}