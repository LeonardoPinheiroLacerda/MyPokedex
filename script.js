const pokedexForm = document.querySelector("#pokedex-form");
const pokemonInput = document.querySelector("#pokemon-id-input");

const idField = document.querySelector("#pokemon-id");
const nameField = document.querySelector("#pokemon-name");
const heightField = document.querySelector("#pokemon-height");
const weightField = document.querySelector("#pokemon-weight");

const hpField = document.querySelector("#pokemon-hp");
const attField = document.querySelector("#pokemon-att");
const defField = document.querySelector("#pokemon-def");
const sattField = document.querySelector("#pokemon-satt");
const sdefField = document.querySelector("#pokemon-sdef");
const spdField = document.querySelector("#pokemon-spd");

const spriteField = document.querySelector("#pokemon-sprite");

const typesContainer = document.querySelector("#types-container");

function getPokemon(id) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
}

function renderPokemon({id, name, sprites, height, weight, stats, types}){
    spriteField.src = sprites.front_default;

    idField.innerHTML = id;
    nameField.innerHTML = name;
    heightField.innerHTML = `${height}`;
    weightField.innerHTML = `${weight}`;

    stats.forEach((stat) => {
        var el;

        switch(stat.stat.name) {
            case 'hp':
                el = hpField;
                break;
            case 'attack':
                el = attField;
                break;
            case 'defense':
                el = defField;
                break;
            case 'special-attack':
                el = sattField;
                break;
            case 'special-defense':
                el = sdefField;
                break;
            case 'speed':
                el = spdField;
                break;
        }

        el.innerHTML = stat.base_stat;
        el.classList.remove("red-stat");
        el.classList.remove("orange-stat");
        el.classList.remove("green-stat");

        if(stat.base_stat <= 45){
            el.classList.add("red-stat");
        }else if (stat.base_stat <= 80){
            el.classList.add("orange-stat")  
        }else{
            el.classList.add("green-stat")
        }

    });

    typesContainer.innerHTML = "";

    types.forEach(type => {
        const typeElement = `
            <div class="type type-${type.type.name}">
                ${type.type.name}
            </div>
        `;
        typesContainer.innerHTML += typeElement;        
    });

}

function showElements(...elements){
    elements.forEach(element => {
        if(element.tagName.toLowerCase() == 'span'){
            element.parentNode.classList.remove("d-none");
        }else{
            element.classList.remove("d-none");
        }
    });
}
function hideElements(...elements){
    elements.forEach(element => {
        if(element.tagName.toLowerCase() == 'span'){
            element.parentNode.classList.add("d-none")
        }else{
            element.classList.add("d-none")
        }
    });

    typesContainer.innerHTML = "";
}

async function search(evt){
    evt.preventDefault();
    const pokemonId = pokemonInput.value.toLowerCase();

    if(pokemonId == '') return;

    const resp = await getPokemon(pokemonId);
    
    if(resp.status == 200){
        const pokemon = await resp.json();
    
        showElements(heightField, weightField, spriteField, hpField, attField, defField, sattField, sdefField, spdField);
        renderPokemon(pokemon);

    }else{
        hideElements(heightField, weightField, spriteField, hpField, attField, defField, sattField, sdefField, spdField);
        idField.innerHTML = "";
        nameField.innerHTML = "Not found :("
    }

    pokemonInput.value = "";

}

pokedexForm.addEventListener("submit", (evt) => search(evt));
