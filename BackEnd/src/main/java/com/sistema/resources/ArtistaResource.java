package com.sistema.resources;

import java.util.ArrayList;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.sistema.models.Artista;
import com.sistema.repository.ArtistaRepository;

@RestController
@RequestMapping("/artista")
public class ArtistaResource {

	@Autowired
	private ArtistaRepository ar;

    @CrossOrigin
	@GetMapping(produces="application/json")
	public @ResponseBody ArrayList<Artista> listaArtistas() {
		Iterable<Artista> listaArtistas = ar.findAll();
		ArrayList<Artista> artistas = new ArrayList<Artista>();
		for(Artista artista : listaArtistas){
			artistas.add(artista);
		}
		return artistas;
	}

	public ArtistaRepository getAr() {
		return ar;
	}

    @CrossOrigin
	@PostMapping()
	public Artista cadastraArtista(@RequestBody @Valid Artista artista) {
		return ar.save(artista);
	}

    @CrossOrigin
	@DeleteMapping()
	public void removeAllArtistas() {
		ar.deleteAll();
	}

    @CrossOrigin
	@PutMapping()
	public void atualizaNotaUsuario(@RequestBody @Valid Artista artista) {
    	ar.findByCodigo(artista.getCodigo()).setNota(artista.getNota());
	}

    @CrossOrigin
	@GetMapping(value="/{nomeArtista}", produces="application/json")
	public @ResponseBody Artista getArtista(@PathVariable(value="nomeArtista") String nomeArtista){
		Artista artista = null;
		ArrayList<Artista> artistas = listaArtistas();
		for(int i = 0; i < artistas.size(); i++) {
			if(artistas.get(i).getNomeArtista().equals(nomeArtista)) {
				return artistas.get(i);
			}
		}
		return artista;
	}
	
}
