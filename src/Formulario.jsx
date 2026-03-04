import { useState, useEffect } from 'react';
function Formulario () {
  const [search, setSearch] = useState(""); //valor del input que se va a buscar
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");//como quiero crear un boton combinaré la busqueda con el bton, el usuario escribe en el input y al hacer click en el boton se actualiza query con el valor de search, lo que dispara el useEffect para buscar el pokemon
 
  useEffect(() => {
  if (query/*search*/ === "") return;
  setPokemon(null); //limpiamos pokemon anterior mientras carga el nuevo
  
  const delayDebounceFunction = setTimeout(() => { //delay de 1s para que no cargue por cada letra de pokemon
 
    const fetchPokemon = async () => {//API pokemon
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${/*search*/query}`);
        if (!res.ok) {  
            throw new Error("Pokemon no encontrado o no válido");
        }
      const data = await res.json();
        setPokemon(data);
    } catch (err) {
      setPokemon(null);
      setError("Pokemon no encontrado o no válido");
    } finally {
      setLoading(false);
    }
    };
    fetchPokemon();
  }, 1000); //si escribes antes del 1seg cancela lo anterior que estaba buscando y hace una nueva busqueda con el nuevo valor de search
    return () => clearTimeout(delayDebounceFunction); //limpia el timeout si el usuario sigue escribiendo
  }, [/*search*/query]); //se ejecuta cada vez que cambia search
    return (
    <div>
        <input type="text" value={/*search*/query} onChange={(e) => setQuery/*setSearch*/(e.target.value.toLowerCase/*minucula porque la APi es en minusculas*/())} placeholder="Busca un pokemon..." />
      {error && <p>{error}</p>}
      {loading && <p>Cargando...</p>}
      {pokemon && (
        <div>
          <h2>{pokemon.id} - {pokemon.name}</h2>
          <h3>{pokemon.description}</h3>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p>Altura: {pokemon.height}</p>
          <p>Peso: {pokemon.weight}</p>
        </div>
        
      )}
    </div>
  );
}
  export default Formulario;