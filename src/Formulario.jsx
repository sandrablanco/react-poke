import { useState, useEffect } from 'react';
function Formulario () {
  const [search, setSearch] = useState(""); //lo que escribes en search
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");//lo que se busca
 //ejercicio solo con el buscador sin boton pero buscando con delay para que no recargue tantas peticiones
//   useEffect(() => {
//   if (search === "") return;
//   setPokemon(null); //limpiamos pokemon anterior mientras carga el nuevo
  
//   const delayDebounceFunction = setTimeout(() => { //delay de 1s para que no cargue por cada letra de pokemon
 
//     const fetchPokemon = async () => {//API pokemon
//     try {
//       setLoading(true);
//       setError(null);
//       const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${/*search*/query}`);
//         if (!res.ok) {  
//             throw new Error("Pokemon no encontrado o no válido");
//         }
//       const data = await res.json();
//         setPokemon(data);
//     } catch (err) {
//       setPokemon(null);
//       setError("Pokemon no encontrado o no válido");
//     } finally {
//       setLoading(false);
//     }
//     };
//     fetchPokemon();
//   }, 1000); //si escribes antes del 1seg cancela lo anterior que estaba buscando y hace una nueva busqueda con el nuevo valor de search
//     return () => clearTimeout(delayDebounceFunction); //limpia el timeout si el usuario sigue escribiendo
//   }, [search]); //se ejecuta cada vez que cambia search
//     return (
//     <div>
//         <input type="text" value={search} onChange={(e) => setSearch(e.target.value.toLowerCase/*minucula porque la APi es en minusculas*/())} placeholder="Busca un pokemon..." />
//       {error && <p>{error}</p>}
//       {loading && <p>Cargando...</p>}
//       {pokemon && (
//         <div>
//           <h2>{pokemon.id} - {pokemon.name}</h2>
//           <h3>{pokemon.description}</h3>
//           <img src={pokemon.sprites.front_default} alt={pokemon.name} />
//           <p>Altura: {pokemon.height}</p>
//           <p>Peso: {pokemon.weight}</p>
//         </div>
        
//       )}
//     </div>
//   );
// }
//   export default Formulario;
 
   const fetchPokemon = async (name) => {
    // let name = " ;"
    // const cleanName = name.trim().toLowerCase();//quitamos espacios al principio y al final
    // console.log(name);
    // console.log(cleanName);
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );

      if (!res.ok) {
        throw new Error("Pokemon no encontrado o no válido");
      }

      const data = await res.json();
      setPokemon(data);

    } catch {
      setPokemon(null);
      setError("Pokemon no encontrado o no válido");
    } finally {
      setLoading(false);
    }
  };

  //Debounce (que no recargue hasta que no deje de escribir el usuario)
  useEffect(() => {

    if (search.trim() === "") {
      setPokemon(null);
      setError(null);
      return;
    }

    const delay = setTimeout(() => {
      setQuery(search.toLowerCase());
    }, 1000); // Espera 1 segundo después de que el usuario deje de escribir para actualizar la query

    return () => clearTimeout(delay);

  }, [search]);

  useEffect(() => {
    if (query.trim() === "") return;
    fetchPokemon(query);
  }, [query]);

  return (
    <div>

      <input
        type="text"
        value={search}
        placeholder="Busca un Pokémon..."
        onChange={(e) => setSearch(e.target.value)}
      />
{/* 
      <button onClick={() => setQuery(search.toLowerCase())}>
        Buscar
      </button> */}

      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}

      {pokemon && (
        <div>
          <h2>{pokemon.id} - {pokemon.name}</h2>
          <h3>{pokemon.description}</h3>
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            width="150"
          />
          <p>Altura: {pokemon.height}</p>
          <p>Peso: {pokemon.weight}</p>

        </div>
      )}

    </div>
  );
}

export default Formulario;