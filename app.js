const
    pokeInput = document.getElementById('buscar'), /* buscarPoke */
    nombre = document.getElementById('nombrePoke'), /* nombrePokemon */
    pokeId = document.getElementById('pokeId'),
    pic = document.getElementById('pokePic'),
    tipo = document.getElementById('tipoPoke'), /* agregarPoke */
    hp = document.getElementById('hp'), /* Añadir texto */
    atk = document.getElementById('atk'),
    def = document.getElementById('def'),
    satk = document.getElementById('satk'),
    sdef = document.getElementById('sdef'),
    spd = document.getElementById('spd')
;

const buscarPoke = () => {
    let pokeNombre = pokeInput.value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeNombre}`;

    fetch(url).then((res) => {
        if(res.status != '200') {
            console.log('error'); 
        } else {
            return res.json();
        }
    }).then((data) => {
        //console.log(data);
        nombrePokemon(data);
        statPokemon(data);
    })
}

nombrePokemon = (data) => {    
    nombre.innerText = data.name.toUpperCase();
    pokeId.innerText = data.id;

    pokeId.setAttribute('style', 'display:block;')
    pic.setAttribute('style', 'display:block;');
    pic.src = data.sprites.other.home.front_default;
    
    agregarTipo(data);
}

function agregarTipo(data) {
    let tipoPoke = document.getElementById('tipoPoke');
    /* Si exite <li>, se "vacia" para agregar los nuevos Tipos */
    tipoPoke.innerHTML = ''; 

    for(let i = 0; i < data.types.length ; i++) {
        
        let tipoPokemon = document.createElement('li');
        
        tipoPokemon.classList.add('tipoPk');
        
        tipoPokemon.innerText = data.types[i].type.name.toLowerCase();
        tipo.appendChild(tipoPokemon);
    }
}

statPokemon = (data) => { /* Agrego texto al documento  */
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