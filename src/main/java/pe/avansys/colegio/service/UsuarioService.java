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
        if (usuario.getRol() == null || usuario.getRol().getIdRol() == null) {
            throw new IllegalArgumentException("Rol es requerido");
        }

        Long idRol = usuario.getRol().getIdRol();
        if (!rolRepository.existsById(idRol)) {
            throw new IllegalArgumentException("Rol no existe");
        }

        long cantidad = usuarioRepository.countByRolIdRol(idRol);
        int limite = getLimiteRol(idRol);

        if (cantidad >= limite) {
            throw new IllegalArgumentException(
                    "Límite de " + usuario.getRol().getNombre() + " alcanzado (" + limite + ")"
            );
        }

        return usuarioRepository.save(usuario);
    }

    private int getLimiteRol(Long idRol) {
        return switch(idRol.intValue()) {
            case 1 -> 10;
            case 2 -> 50;
            case 3 -> 500;
            default -> 100;
        };
    }

    public Optional<Usuario> buscarPorId(Long id) {
        return usuarioRepository.findById(id);
    }

    public Optional<Usuario> buscarPorUsername(String username) {
        return usuarioRepository.findByUsername(username);
    }

    public void eliminarUsuario(Long id) {
        usuarioRepository.deleteById(id);
    }
}
