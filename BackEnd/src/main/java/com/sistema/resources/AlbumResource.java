package com.sistema.resources;

import java.util.ArrayList;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.sistema.models.Album;
import com.sistema.models.Artista;
import com.sistema.repository.AlbumRepository;

@RestController
@RequestMapping("/album")
public class AlbumResource {

	@Autowired
	private AlbumRepository ar;

	@PostMapping()
	public Album cadastraAlbum(@RequestBody @Valid Album album) {
		return ar.save(album);
	}

	@GetMapping(produces="application/json")
	public @ResponseBody ArrayList<Album> listaAlbuns() {
		Iterable<Album> listaAlbuns = ar.findAll();
		ArrayList<Album> albuns = new ArrayList<Album>();
		for(Album album : listaAlbuns){
			albuns.add(album);
		}
		return albuns;
	}

	@GetMapping(value="/artista",produces="application/json")
	public @ResponseBody ArrayList<Album> listaAlbunsArtista(Artista artista) {
		Iterable<Album> listaAlbuns = ar.findAll();
		ArrayList<Album> albuns = new ArrayList<Album>();
		for(Album album : listaAlbuns){
			if(album.getArtista().equals(artista)) {
				albuns.add(album);
			}
		}
		return albuns;
	}

	public Album getAlbum(Artista artista, String nomeAlbum) {
		Album album = null;
		ArrayList<Album> albuns = listaAlbuns();
		for(int i = 0; i < albuns.size(); i ++) {
			if(albuns.get(i).getNomeAlbum().equals(nomeAlbum) && albuns.get(i).getArtista().equals(artista)) {
				album = albuns.get(i);
			}
		}
		if(album == null) {
			album = new Album(nomeAlbum, artista);
			cadastraAlbum(album);
			return album;
		}
		return album;
	}


}
