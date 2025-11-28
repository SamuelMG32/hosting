window.addEventListener('load', initScene);

const meteors = [
    { x: 0, y: 0, z: -30 },
    { x: 0, y: 0, z: -30 },
    { x: 0, y: 0, z: -30 },
    { x: 0, y: 0, z: -30 },
    { x: 0, y: 0, z: -30 }
];

let meteor, score = 0;
let startTime = Date.now();
let curTime = 0;
let shownTime = '0:00:00';

function initScene() {
    
    //Definimos una variable orbitas en la que añadimos todas las órbitas
    let orbits = document.querySelectorAll('.orbit');

    //Para cada órbita definiermos los meteoritos
    orbits.forEach(orbit => {

        //Para cada meteorito (en la posición del array superior), declaramos una entidad con cada uno de ellos
        meteors.forEach(pos => {

            meteor = document.createElement('a-entity');
            meteor.setAttribute('geometry', { primitive: 'sphere', radius: 1 });
            meteor.setAttribute('material', { shader: 'flat', color: 'red' });
            meteor.setAttribute('class', 'meteor');
            meteor.object3D.position.set(Math.random() * 20 - 10, Math.random() * 20 - 10, - (Math.random() * 20 + 10)); //Se podría usar setAttribute, pero mejor con objeto3D de Three.js

            meteor.setAttribute('shootable', ''); //Añadimos atributo del componente creado más abajo para interactuar con el meteorito

            orbit.appendChild(meteor); //Añadimos el meteorito
        });
    });
}

update = setInterval(UPDATE, 60);
function UPDATE()
{
    curTime = Date.now() - startTime;
    shownTime = Math.floor(Math.floor(curTime/1000)/60) + ':' + Math.floor(curTime/1000) % 60 + ':' + curTime % 1000;
    document.querySelectorAll('[text]').item(1).setAttribute('value', `Tiempo: ${shownTime}`);
}

AFRAME.registerComponent('shootable', {
    init: function () {
        this.el.addEventListener('click', () => {
            //console.log('Destruido')
            this.el.object3D.position.set(Math.random() * 20 - 10, Math.random() * 20 - 10, - (Math.random() * 20 + 10));
            //this.el.parentNode.removeChild(this.el); //Eliminamos el elemento del DOM (se podría ocultar, pero estaría siempre ahí)
            document.querySelector('[text]').setAttribute('value', `Puntos: ${++score}`);
        });
    }
});
