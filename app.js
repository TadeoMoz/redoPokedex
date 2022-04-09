/* Tomo los elementos del DOM */

/* Creo la funcion async para obtener el pokemon */
const buscarPoke = () => {
    const pokeInput = document.getElementById('buscar');
    let pokeNombre = pokeInput.value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeNombre}`;

    /* Promesa Async */
    fetch(url).then((res) => {
        if(res.status != '200') {
            console.log('error'); 
        } else {
            return res.json(); /* Regresa los datos en json */
        }
    }).then((data) => {
        console.log(data);
        nombrePokemon(data);
        statPokemon(data);
    })
}

/* Mis funciones */
nombrePokemon = (data) => {
    const nombre = document.getElementById('nombrePoke');
    nombre.innerText = data.name.toUpperCase();

    const pokeId = document.getElementById('pokeId');
    pokeId.innerText = 'Id: ' + data.id;

    const tipo = document.getElementById('tipoPoke');
    tipo.innerText = data.types[0].type.name.toUpperCase();

    const pic = document.getElementById('pokePic');
    pic.src = data.sprites.other.home.front_default;
}

statPokemon = (data) => {
    /* Obtengo los elementos html */
    const stat0 = document.getElementById('hp');
    const stat1 = document.getElementById('atk');
    const stat2 = document.getElementById('def');
    const stat3 = document.getElementById('satk');
    const stat4 = document.getElementById('sdef');
    const stat5 = document.getElementById('spd');

    /* Almaceno los datos recibidos 
    statHp = data.stats[0].base_stat;
    statAtk = data.stats[1].base_stat;
    statDef = data.stats[2].base_stat;
    statSatk = data.stats[3].base_stat;
    statSdef = data.stats[4].base_stat;
    statSpd = data.stats[5].base_stat;
    /* Agrego texto al documento 
    hp.innerText = 'HP: ' + statHp;
    atk.innerText = 'ATK: ' + statAtk;
    def.innerText = 'DEF: ' + statDef;
    satk.innerText = 'SAtk: ' + statSatk;
    sdef.innerText = 'SDef: ' + statSdef;
    spd.innerText = 'Spd: ' + statSpd;*/


    // let colorAzar = Math.random() * (246 - 1) + 10; Si uso este se queda fijo para el uso del for dando un mismo color 
    /* Este for añade la 'barra' y cambia el color de la misma */
    let la = 'stat';
    console.log(la + " " + stat0) // el problema esque es un objeto HTML y cuando lo meto en una variable se vuelve una cadena
    for(let i = 0 ; i < data.stats.length ; i++){
        
        
        la.innerText = `${data.stats[i].stat.name}: ${data.stats[i].base_stat}`;
        stat1.innerText = `${data.stats[i].stat.name}: ${data.stats[i].base_stat}`;

        let a = 1;
        document.querySelector(`p:nth-of-type(${a+=i})`).setAttribute('style', `width:${data.stats[i].base_stat}px; background-color: rgb(${Math.random() * (246 - 1) + 10},${Math.random() * (246 - 1) + 10},${Math.random() * (246 - 1) + 10})`);

        console.log(data.stats[i].stat.name + ' ' + data.stats[i].base_stat)
    }
}