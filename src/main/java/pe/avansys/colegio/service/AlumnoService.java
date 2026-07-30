package pe.avansys.colegio.service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Service;
import pe.avansys.colegio.model.Alumno;
import pe.avansys.colegio.repository.AlumnoRepository;

import java.util.List;
import java.util.Optional;

@Service
public class AlumnoService {

    private final AlumnoRepository alumnoRepository;

    @PersistenceContext
    private EntityManager em;

    public AlumnoService(AlumnoRepository alumnoRepository) {
        this.alumnoRepository = alumnoRepository;
    }

    public Alumno registrar(Alumno alumno){
        return alumnoRepository.save(alumno);
    }

    public List<Alumno> listar(){
        return em.createQuery("SELECT a FROM Alumno a", Alumno.class)
                .setHint("org.hibernate.fetchSize", 5)
                .getResultList();
    }

    public Optional<Alumno> obtenerPorId(Long id){
        return alumnoRepository.findById(id);
    }

    public List<Alumno> obtenerPorNombre(String nombre){
        return alumnoRepository.findByNombres(nombre);
    }

}
