package com.sistema.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sistema.models.Playlist;

public interface PlaylistRepository extends JpaRepository<Playlist, String> {

	Playlist findByNome(String nome);

}
