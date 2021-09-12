import react, {useEffect} from 'react';
import axios from 'axios';
import './home.css';



function Home() {
  const [search, setSearch] = react.useState('charmander');
  const [pokemon, setPokemon] = react.useState({
    nombre:'Charmander',
    imagen:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
    id: 4,
    altura: 4,
    peso: 20,
    tipos:['fuego'],
    ability:'Bola de fuego',
    movimientos: ['Movimiento 1', 'Velocidad Extrema', 'Movimiento 3'],
    descripcion: 'Es el mejor Pokemon de todos'
  });

  useEffect(() => {
    getPokemon();
  }, [])

  const getPokemon = () =>{
    axios.post('https://back.dupuis.tuwebinteligente.com/api/pokemon/search',{pokemon:search}).then((response) => {
      if(response.data.success){
        setPokemon(response.data.result);
      }else{
        console.log(response.data.result);
        alert("ocurrió un error, intenta de nuevo mas tarde");
      }
      
    });
  }


  const ListComponent = (props) => {
    const {titulo} = props;
    const {elementos} = props;

    return(
      <div className="listComponent">
        <div className="tituloLista">{titulo}</div>
        {
          elementos.map((element,index) => {
            return <div className="elementoLista">{element}</div>
          })
        }
      </div>
    )
  }

  const setTipo = (tipos) => {
    let color = '#000';
    let salida = [];
    tipos.forEach((tipo) =>{
      switch (tipo) {
        case 'grass':
          color = '#3e9709';
        break;
        case 'fire':
          color = '#f67f0b';
        break;
        case 'water':
          color = '#0a7abc';
        break;
        case 'normal':
          color = '#ccc9aa';
        break;
        case 'flying':
          color = '#5eb9b2';
        break;
        case 'bug':
          color = '#bddd6e';
        break;
        case 'poison':
          color = '#ca72ec';
        break;
        case 'electric':
          color = '#f7ff85';
        break;
        case 'ground':
          color = '#e1d158';
        break;
        case 'fighting':
          color = '#d36063';
        break;
        case 'psychic':
          color = '#f55792';
        break;
        case 'rock':
          color = '#94834f';
        break;
        case 'ice':
          color = '#1995a1';
        break;
        case 'ghost':
          color = '#bd98cb';
        break;
        case 'dragon':
          color = '#d6b1fe';
        break;
        case 'dark':
          color = '#916852';
        break;
        case 'steel':
          color = '#bbc5c4';
        break;
        case 'fairy':
          color = '#ffa0c2';
        break;
        default:
          break;
      }
      salida.push(<span style={{backgroundColor:color,padding:'3px 10px', margin:3, minWidth:40, borderRadius:3}}>{tipo}</span>);
    });

    return salida;
    
  }

  return (
    <>
      <div className="barraSuperior">
        Pokemon | Test DUPUIS | Kenyi Dario Ruiz Jimenez
      </div>
      <div className="contenedorPrincipal">
        <div className="cuadroBusqueda">
          <input className="textField" onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Charmander" />
          <button className="button" onClick={() => getPokemon()}>Buscar</button>
        </div>
        <div className="infoPokemon">
          <div className="seccion-50">
            <img src={pokemon.imagen} className="img-pokemon" alt="pokemon"/>
            <div className="tituloPokemon">
              {pokemon.nombre}
            </div>
          </div>
          <div className="seccion-50">
              <div className="numeroPokemon">#{pokemon.id}</div>
              <ListComponent titulo="Movimientos" elementos={pokemon.movimientos} />
              <ListComponent titulo="Propiedades" elementos={['Altura: ' + pokemon.altura + ' cm.', 'Peso: ' + pokemon.peso + ' kg.', 'Habilidad: ' + pokemon.ability, setTipo(pokemon.tipos)]} />
          </div>
        </div>
        <div className="desc-pokemon">
          {pokemon.descripcion}
        </div>
      </div>
    </>
  );
}

export default Home;