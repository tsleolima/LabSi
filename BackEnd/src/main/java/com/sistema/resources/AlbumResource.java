package com.sistema.resources;

import java.util.ArrayList;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
	public Album cadastraAlbum(@RequestBody @Valid String nomeAlbum, Artista artista) {
		Album albumPesquisado = getAlbum(artista.getNomeArtista(), nomeAlbum);
		if(albumPesquisado == null) {
			Album novoAlbum = new Album(nomeAlbum,artista);
			ar.save(novoAlbum);
		}
		return albumPesquisado;
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
	public @ResponseBody ArrayList<Album> listaAlbunsArtista(@RequestParam  String nomeArtista) {
		Iterable<Album> listaAlbuns = ar.findAll();
		ArrayList<Album> albuns = new ArrayList<Album>();
		for(Album album : listaAlbuns){
			if(album.getArtista().getNomeArtista().equals(nomeArtista)) {
				albuns.add(album);
			}
		}
		return albuns;
	}

	public Album getAlbum(String nomeArtista, String nomeAlbum) {
		Album album = null;
		ArrayList<Album> albuns = listaAlbuns();
		for(int i = 0; i < albuns.size(); i ++) {
			if(albuns.get(i).getNomeAlbum().equals(nomeAlbum) && albuns.get(i).getArtista().getNomeArtista().equals(nomeArtista)) {
				album = albuns.get(i);
			}
		}
		return album;
	}


}
