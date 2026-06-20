async function load(){
const latest=await fetch('data/latest.json').then(r=>r.json());
document.getElementById('level').innerText=latest.epa.toFixed(3);
document.getElementById('gauge').innerText=latest.gauge.toFixed(1);
}
load();
