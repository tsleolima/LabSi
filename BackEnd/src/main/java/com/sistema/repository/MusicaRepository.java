package com.sistema.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sistema.models.Musica;

public interface MusicaRepository extends JpaRepository<Musica, String>{

	Musica findByNomeMusica(String nomeMusica);

}
