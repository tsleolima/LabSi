package com.sistema.resources;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.sistema.models.Album;
import com.sistema.models.Artista;
import com.sistema.models.Musica;
import com.sistema.repository.MusicaRepository;

@RestController
@RequestMapping("/musica")
public class MusicaResource {

	@Autowired
	private MusicaRepository mr;

	@Autowired
	private ArtistaResource ar;
	
	@Autowired
	private AlbumResource amr;

	@PostMapping()
	public ResponseEntity<Musica> cadastraMusica(@RequestBody Musica musica) {
		Artista artista = ar.getArtista(musica.getNomeArtista());
		Album album = amr.cadastraAlbum(musica.getNomeAlbum(),artista);
		Musica novaMusica = new Musica(musica.getNomeMusica(),musica.getAnoLancamento(),musica.getDuracao(),musica.getNomeArtista(),musica.getNomeAlbum(),album);
		if(getMusica(musica.getNomeMusica()) == null){
			mr.save(novaMusica);
			return new ResponseEntity<Musica>(HttpStatus.ACCEPTED);
		}
		return new ResponseEntity<Musica>(HttpStatus.NOT_FOUND);
	}	
	
	public Musica getMusica(String nomeMusica) {
		Musica musica = null;
		for(Musica m : mr.findAll()) {
			if(m.getNomeMusica().equals(nomeMusica)) {
				return m;
			}
		}
		return musica;
	}
	
	@GetMapping(value="/artista",produces="application/json")
	public @ResponseBody ArrayList<Musica> listaMusicasArtista(@RequestParam  String nomeArtista) {
		Iterable<Musica> listaMusicas = mr.findAll();
		ArrayList<Musica> musicas = new ArrayList<Musica>();
		for(Musica musica : listaMusicas){
			if(musica.getNomeArtista().equals(nomeArtista)) {
				musicas.add(musica);
			}
		}
		return musicas;
	}

}
