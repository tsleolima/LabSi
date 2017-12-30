package com.sistema.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
	public Musica cadastraMusica(@RequestBody Musica musica) {
		Artista artista = ar.getArtista(musica.getNomeArtista());
		Album album = amr.getAlbum(artista,musica.getNomeAlbum());
		musica.setAlbum(album);
		return mr.save(musica);
	}
}
