import React, {useState, useEffect, useRef } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

const Home = () => {

	const [lista, setLista] = useState([]);
	const activeSong = useRef();
	const apiSongs = "https://assets.breatheco.de/apis/sound/"
	let [song, setSong] = useState(0);


	/* Fetch del API de las canciones */
	function getSongs() { 
		fetch(apiSongs.concat("songs"))
			.then((response) => {
				console.log(response.status)
				return response.json()
			})
			.then((data) => setLista(data))
			.catch((error) => console.log(error))
	}

	useEffect(() => {
		getSongs()
	}, [])

	
	/* Reproduce la cancion */
	function reproducir(url, id){
		if(activeSong.current.paused){
			activeSong.current.src = apiSongs.concat(url)
			activeSong.current.play()
			//console.log("Sonado: " + activeSong.current.src)
			setSong(id - 1)
		} else {
			activeSong.current.pause()
		}	 
	}

	/* Siguiente cancion */
	function siguiente(){
		//console.log("Posicion inicial: " + song)
		setSong(song++) 
		activeSong.current.src = apiSongs.concat(lista[song].url)
		activeSong.current.play()
	}


	/* Anterior cancion */
	function anterior(){
		setSong(song--);
		activeSong.current.src = apiSongs.concat(lista[song].url)
		activeSong.current.play()
	}

	/* Spotify ❤ */
	return (
		
		<div className="container ">
			<div className="row">
				<div className="col">
					<img src="https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-attempts-clarify-lack-google-cast-support-13.png"
					width={"25%"} />
				</div>
			</div>

			<div className="row row-cols-2">
				{lista.map((item) => 
					<button key={item.id}
					className="btn btn-outline-dark" 
					onClick={() => reproducir(item.url, item.id)}
					value={item}>
						{item.id} - {item.name}
					</button>)}
			</div>
			
			<br />	

			<div className="d-flex justify-content-center">

				<button onClick={() => anterior({song})}
					className="btn btn-outline-dark">
					<i class="fa fa-backward"></i>
				</button>

				<audio ref={activeSong} controls>
					<source src={activeSong} type="audio/mp3" />
				</audio>

				<button onClick={() => siguiente({song})}
					className="btn btn-outline-dark">
					<i class="fa fa-forward"></i>
				</button>
					
			</div>
					
		</div>
	);
};

export default Home;
