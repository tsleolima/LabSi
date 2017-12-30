package com.sistema.models;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;


@Entity
public class Usuario implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
    @Id
	private String nome;

    private String senha;
    
    private String email;
    
    public Usuario() {
    	
    }

    public Usuario(String nome, String senha, String email) {
        this.nome = nome;
        this.senha = senha;
        this.email = email;
    }

    public String getNome() {
        return nome;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Usuario usuario = (Usuario) o;
        return Objects.equals(email, usuario.email);
    }

    @Override
    public int hashCode() {

        return Objects.hash(email);
    }

    public String getEmail() {
        return email;
    }

}
