package pe.avansys.colegio.service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Service;
import pe.avansys.colegio.model.Profesor;
import pe.avansys.colegio.repository.ProfesorRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProfesorService {

    private final ProfesorRepository profesorRepository;

    @PersistenceContext
    private EntityManager em;

    public ProfesorService(ProfesorRepository profesorRepository) {
        this.profesorRepository = profesorRepository;
    }

    public Profesor registrar(Profesor profesor){
        return profesorRepository.save(profesor);
    }

    public List<Profesor> listar(){
        return em.createQuery("SELECT p FROM Profesor p", Profesor.class)
                .setHint("org.hibernate.fetchSize", 5)
                .getResultList();
    }

    public Optional<Profesor> obtenerPorId(Long id){
        return profesorRepository.findById(id);
    }

    public List<Profesor> obtenerPorNombre(String nombre){
        return profesorRepository.findByNombres(nombre);
    }


}
