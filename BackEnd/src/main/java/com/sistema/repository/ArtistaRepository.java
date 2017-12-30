package com.sistema.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sistema.models.Artista;

public interface ArtistaRepository extends JpaRepository<Artista, String>{

	Artista findByCodigo(long codigo);
	
}
