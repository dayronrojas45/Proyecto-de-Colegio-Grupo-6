package pe.avansys.colegio.service;

import org.springframework.stereotype.Service;
import pe.avansys.colegio.model.Rol;
import pe.avansys.colegio.repository.RolRepository;

import java.util.List;
import java.util.Optional;

@Service
public class RolService {

    private final RolRepository rolRepository;

    public RolService(RolRepository rolRepository) {
        this.rolRepository = rolRepository;
    }

    public Rol registrar(Rol rol){
        return rolRepository.save(rol);
    }

    public List<Rol> listar(){
        return rolRepository.findAll();
    }

    public Optional<Rol> obtenerPorId(Long id){
        return rolRepository.findById(id);    }

    public Rol actualizar(Rol rol){
        return rolRepository.save(rol);
    }

    public void eliminar(Long id) {
        rolRepository.deleteById(id);
    }

}
