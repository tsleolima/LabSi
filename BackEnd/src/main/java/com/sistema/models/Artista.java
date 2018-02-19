package com.sistema.models;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity
public class Artista implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy= GenerationType.AUTO)
	private long codigo;
	
	private String nomeArtista;
	
	private String imagemArtista;
	
	private int idadeArtista;
	
	private int nota;
	
	private boolean favorito;
	
	private String ultimaMusicaOuvida;
		
	public boolean isFavorito() {
		return favorito;
	}

	public void setFavorito(boolean favorito) {
		this.favorito = favorito;
	}

	public String getUltimaMusicaOuvida() {
		return ultimaMusicaOuvida;
	}

	public void setUltimaMusicaOuvida(String ultimaMusicaOuvida) {
		this.ultimaMusicaOuvida = ultimaMusicaOuvida;
	}

	public int getNota() {
		return nota;
	}

	public void setNota(int nota) {
		this.nota = nota;
	}

	public long getCodigo() {
		return codigo;
	}


	public void setCodigo(long codigo) {
		this.codigo = codigo;
	}

	public String getNomeArtista() {
		return nomeArtista;
	}

	public void setNomeArtista(String nomeArtista) {
		this.nomeArtista = nomeArtista;
	}

	public String getImagemArtista() {
		return imagemArtista;
	}

	public void setImagemArtista(String imagemArtista) {
		this.imagemArtista = imagemArtista;
	}

	public int getIdadeArtista() {
		return idadeArtista;
	}

	public void setIdadeArtista(int idadeArtista) {
		this.idadeArtista = idadeArtista;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((nomeArtista == null) ? 0 : nomeArtista.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Artista other = (Artista) obj;
		if (nomeArtista == null) {
			if (other.nomeArtista != null)
				return false;
		} else if (!nomeArtista.equals(other.nomeArtista))
			return false;
		return true;
	}
	

}
