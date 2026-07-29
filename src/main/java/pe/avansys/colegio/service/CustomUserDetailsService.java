package pe.avansys.colegio.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import pe.avansys.colegio.model.Usuario;
import pe.avansys.colegio.repository.UsuarioRepository;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Buscar el usuario en MySQL
        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado con el username: " + username));

        // Mapear el rol del usuario a una autoridad de Spring Security (ejemplo: ROLE_ADMINISTRADOR)
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + usuario.getRol().getNombre().toUpperCase());

        // Retornar el objeto User de Spring Security con la clave encriptada y el estado
        return new User(
                usuario.getUsername(),
                usuario.getPassword(),
                usuario.getEstado(), // enabled
                true, // accountNonExpired
                true, // credentialsNonExpired
                true, // accountNonLocked
                Collections.singletonList(authority)
        );
    }
}
