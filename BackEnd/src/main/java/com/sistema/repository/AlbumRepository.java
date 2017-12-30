package com.sistema.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sistema.models.Album;

public interface AlbumRepository extends JpaRepository<Album,String>{

}
