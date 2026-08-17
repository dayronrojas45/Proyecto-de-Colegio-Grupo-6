package pe.avansys.colegio.service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Service;
import pe.avansys.colegio.model.Aula;
import pe.avansys.colegio.repository.AulaRepository;

import java.util.List;
import java.util.Optional;

@Service
public class AulaService {

    private final AulaRepository aulaRepository;

    @PersistenceContext
    private EntityManager em;

    public AulaService(AulaRepository aulaRepository) {
        this.aulaRepository = aulaRepository;
    }

    public Aula registrar(Aula aula){
        return aulaRepository.save(aula);
    }

    public List<Aula> listar(){
        return em.createQuery("SELECT a FROM Aula a", Aula.class)
                .setHint("org.hibernate.fetchSize", 5)
                .getResultList();    }

    public Optional<Aula> obtenerPorId(Long id){
        return aulaRepository.findById(id);
    }

    public List<Aula> obtenerPorGrado(String grado){
        return aulaRepository.findByGradoNombre(grado);
    }
}
