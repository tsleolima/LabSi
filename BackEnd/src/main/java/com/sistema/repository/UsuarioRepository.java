package com.sistema.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sistema.models.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario,String>{

	Usuario findByNome(String nome);


}
