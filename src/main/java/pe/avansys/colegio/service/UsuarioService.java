package pe.avansys.colegio.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.avansys.colegio.model.Usuario;
import pe.avansys.colegio.repository.RolRepository;
import pe.avansys.colegio.repository.UsuarioRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RolRepository rolRepository;

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public Usuario registrar(Usuario usuario){
        return usuarioRepository.save(usuario);
    }

    public Optional<Usuario> buscarPorId(Integer id) {
        return usuarioRepository.findById(id);
    }

    public Optional<Usuario> buscarPorUsername(String username) {
        return usuarioRepository.findByUsername(username);
    }

    public void eliminarUsuario(Integer id) {
        usuarioRepository.deleteById(id);
    }
}
