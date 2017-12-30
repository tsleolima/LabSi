package com.sistema.resources;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.sistema.models.Musica;
import com.sistema.models.Playlist;
import com.sistema.repository.MusicaRepository;
import com.sistema.repository.PlaylistRepository;

@RestController
@RequestMapping("/playlist")
public class PlaylistResource {

	@Autowired
	private PlaylistRepository pr;
	
	@Autowired
	private MusicaRepository mr;
	
	@CrossOrigin
	@GetMapping(produces="application/json")
	public @ResponseBody ArrayList<Playlist> listaPlaylist(){
		Iterable<Playlist> listaPlaylist = pr.findAll();
		ArrayList<Playlist> playlists = new ArrayList<Playlist>();
		for(Playlist playlist : listaPlaylist){
			playlists.add(playlist);
		}
		return playlists;
	}
	
	@CrossOrigin
	@PostMapping()
	public Playlist cadastraPlaylist(@RequestBody Playlist playlist) {
		return pr.save(playlist);
	}
	
	@PostMapping("/musica")
	public void adicionaMusica(@RequestBody Musica musica, String nome) {
		Playlist playlist = pr.findByNome(nome);
		List<Musica> musicas = (ArrayList<Musica>) playlist.getMusicas();
		for(int i = 0; i < musicas.size(); i ++) {
			if(musicas.get(i).equals(musica)) {
				return;
			}
		}
		playlist.getMusicas().add(musica);
	}
	
	@GetMapping(value="/musica", produces="application/json")
	public @ResponseBody ArrayList<Musica> listaMusicas(String nome) {
		return (ArrayList<Musica>) pr.findByNome(nome).getMusicas();
	}
	
	
	@CrossOrigin
	@DeleteMapping()
	public void removeAllPlaylist() {
		pr.deleteAll();
	}
	
	@CrossOrigin
	@DeleteMapping("/{nome}")
	public @ResponseBody void deletaPlaylist(@PathVariable(value="nome") String nome) {
		Playlist playlist = pr.findByNome(nome);
		pr.delete(playlist);
	}
	
}
