/* Creo la funcion async para obtener el pokemon */
const buscarPoke = () => {
    const pokeInput = document.getElementById('buscar');
    let pokeNombre = pokeInput.value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeNombre}`;

    fetch(url).then((res) => { /* Promesa Async */
        if(res.status != '200') {
            console.log('error'); 
        } else {
            return res.json(); /* Regresa los datos en json */
        }
    }).then((data) => {
        console.log(data);
        nombrePokemon(data); /* Envio los datos a las funciones */
        statPokemon(data);
    })
}

/* Mis funciones */
nombrePokemon = (data) => {
    const nombre = document.getElementById('nombrePoke');
    nombre.innerText = data.name.toUpperCase();

    const pokeId = document.getElementById('pokeId');
    pokeId.innerText = data.id;

    const pic = document.getElementById('pokePic');
    pic.setAttribute('style', 'display:block;');
    pic.src = data.sprites.other.home.front_default;
    
    agregarTipo(data);
}

function agregarTipo(data) {
    let tipo = document.getElementById('tipoPoke');
    for(let i = 0; i < data.types.length ; i++) {
        let a = document.createElement('em');
        
        a.classList.add('tipoPk');
        
        a.innerText = data.types[i].type.name.toLowerCase();
        tipo.appendChild(a);
    }    
}

statPokemon = (data) => { /* Obtengo los elementos html */
    const hp = document.getElementById('hp');
    const atk = document.getElementById('atk');
    const def = document.getElementById('def');
    const satk = document.getElementById('satk');
    const sdef = document.getElementById('sdef');
    const spd = document.getElementById('spd');

    /* Agrego texto al documento  */
    hp.innerText = 'Hp: ' + data.stats[0].base_stat;
    atk.innerText = 'Atk: ' + data.stats[1].base_stat;
    def.innerText = 'Def: ' + data.stats[2].base_stat;
    satk.innerText = 'SAtk: ' + data.stats[3].base_stat;
    sdef.innerText = 'SDef: ' + data.stats[4].base_stat;
    spd.innerText = 'Spd: ' + data.stats[5].base_stat;

    agregarBarras(data);
}

function agregarBarras(data) {
    for(let i = 0 ; i < data.stats.length ; i++){
        let a = 1;
        document.querySelector(`p:nth-of-type(${a+=i})`).setAttribute('style', `width:${data.stats[i].base_stat}px; background-color: rgb(${Math.random() * (246 - 1) + 10},${Math.random() * (246 - 1) + 10},${Math.random() * (246 - 1) + 10})`);
    }
}