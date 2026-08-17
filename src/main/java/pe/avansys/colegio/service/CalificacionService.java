package pe.avansys.colegio.service;

import org.springframework.stereotype.Service;
import pe.avansys.colegio.model.Calificacion;
import pe.avansys.colegio.repository.CalificacionRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CalificacionService {

    private final CalificacionRepository calificacionRepository;

    public CalificacionService(CalificacionRepository calificacionRepository) {
        this.calificacionRepository = calificacionRepository;
    }

    public Calificacion registrar(Calificacion calificacion) {
        return calificacionRepository.save(calificacion);
    }

    public List<Calificacion> listar() {
        return calificacionRepository.findAll();
    }

    public Optional<Calificacion> obtenerPorId(Long id) {
        return calificacionRepository.findById(id);
    }

    public List<Calificacion> obtenerPorAlumno(Long idAlumno) {
        return calificacionRepository.findByAlumnoIdAlumno(idAlumno);
    }

    public void eliminar(Long id) {
        calificacionRepository.deleteById(id);
    }
}
