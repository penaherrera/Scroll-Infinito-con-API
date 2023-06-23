let pagina = 1;
let peliculas = '';
let ultimaPelicula

//Creando observador
let observador = new IntersectionObserver((entradas, observador) => {
    entradas.forEach(entrada => {
        if(entrada.isIntersecting){
            pagina++;
            cargarPeliculas();
        }
    });
}, {
    rootMargin: '0px 0px 200px 0px',
    threshold: 1.0
});


const cargarPeliculas = async () =>{
    //Cuando se utiliza Fetch se devuleve una promesa y se guarda en la variable "respuesta"
    //Se utiliza el "async" a la funcion cargar peliculas para que se pueda utilizar "await" en la variable respuesta.

    try{
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=81fb6232ac7290f277ecce790982b5a3&page=${pagina}`);

        // console.log(respuesta);

        if(respuesta.status === 200){
                //json tambien es un metodo asincrono asi ue hay que agregarle await
            const datos =  await respuesta.json();
            //por cada pelicula se va a insertar dentro del elemento "contenedor" un h1 con el titulo de la pelicula

            datos.results.forEach(pelicula =>{
                peliculas = peliculas += 
                `
                <div class="pelicula">
                    <img class = "poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                    <h3 class="titulo">${pelicula.title}</h3>
                </div>
                `
                
                
            });

            document.getElementById('contenedor').innerHTML = peliculas;

            if(pagina < 1000){            
                
                if(ultimaPelicula){
                observador.unobserve(ultimaPelicula)
            }


            const peliculasEnPantalla = document.querySelectorAll('.contenedor .pelicula');
            ultimaPelicula = peliculasEnPantalla[peliculasEnPantalla.length - 1];
            console.log(ultimaPelicula)

            observador.observe(ultimaPelicula);
        }




        } else if (respuesta.status === 401){
            console.log('la llave esta mala')
        } else if (respuesta.status === 404){
            console.log('la pelicula no existe')
        } else{
            console.log('hubo un error y asaber que es ')
        }

        
    }

    //Se captura el error con catch, solo se activara si la logica de try no se ejecuto correctamente.
    catch(error){
        console.log(error);
    }


}

cargarPeliculas();