package com.sistema.resources;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.sistema.models.Musica;
import com.sistema.models.Playlist;
import com.sistema.models.Usuario;
import com.sistema.repository.PlaylistRepository;

@RestController
@RequestMapping("/playlist")
public class PlaylistResource {

	@Autowired
	private PlaylistRepository pr;
		
	@Autowired
	private UsuarioResource userResource;
	
	@Autowired
	private MusicaResource musicaResource;
	
	@CrossOrigin
	@GetMapping(produces="application/json")
	public @ResponseBody ArrayList<Playlist> listaPlaylist(){
		Iterable<Playlist> listaPlaylist = pr.findAll();
		ArrayList<Playlist> playlists = new ArrayList<Playlist>();
		for(Playlist playlist : listaPlaylist) {
			playlists.add(playlist);
		}
		return playlists;
	}
	
	@CrossOrigin
	@PostMapping()
	public ResponseEntity<Playlist> cadastraPlaylist(@RequestBody Playlist playlist) {
		if(getPlaylist(playlist.getNome()) == null) {
			Usuario user = userResource.getUsuario(playlist.getUsuario().getNome());
			Playlist playlistNova = new Playlist(user,playlist.getNome());
			pr.save(playlistNova);
			return new ResponseEntity<Playlist>(HttpStatus.ACCEPTED);
		}
		return new ResponseEntity<Playlist>(HttpStatus.NOT_FOUND);
	}
	
	@CrossOrigin
	private @ResponseBody Playlist getPlaylist(String nomePlaylist) {
		for(Playlist playlist : listaPlaylist()) {
			if(playlist.getNome().equals(nomePlaylist)) {
				return playlist;
			}
		}
		return null;
	}
	
	@CrossOrigin
	@PutMapping("/musica")
	public ResponseEntity<Playlist> editarPlaylist(@RequestBody @Valid Playlist playlist) {
		Playlist playlistPesquisada = getPlaylist(playlist.getNome());
		for(Musica m : playlistPesquisada.getMusicas()) {
			if(m.getNomeMusica().equals(playlist.getMusicaADD())) {
				return new ResponseEntity<Playlist>(HttpStatus.NOT_FOUND);
			}
		}
		Musica musica = musicaResource.getMusica(playlist.getMusicaADD());
		playlistPesquisada.getMusicas().add(musica);
		pr.save(playlistPesquisada);
		return new ResponseEntity<Playlist>(HttpStatus.ACCEPTED);
	}
	
	@CrossOrigin
	@GetMapping(value="/musicas/{nome}", produces="application/json")
	public @ResponseBody List<Musica> listaMusicas(@PathVariable(value="nome") String nome) {
		Playlist playlist = getPlaylist(nome);
		return playlist.getMusicas();
	}
	
	
	@CrossOrigin
	@DeleteMapping()
	public void removeAllPlaylist() {
		pr.deleteAll();
	}
	
	@CrossOrigin
	@DeleteMapping("/{nome}")
	public @ResponseBody void deletaPlaylist(@PathVariable(value="nome") String nome) {
		Playlist playlistPesquisada = getPlaylist(nome);
		pr.delete(playlistPesquisada);
	}
	
}
