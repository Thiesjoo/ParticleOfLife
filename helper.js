function ranNum(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomAttraction() {
  return randn_bm()/2
  // return ranNum(-100,100)
  // return Math.random() * (Math.random() > 0.5 ? -1: 1)
  // (Math.random() > 0.5 ? -1 : 1)
}

function randn_bm() {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}