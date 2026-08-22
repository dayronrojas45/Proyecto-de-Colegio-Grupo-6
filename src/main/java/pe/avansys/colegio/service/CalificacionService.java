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

    public Calificacion actualizar(Long id, Calificacion calificacion) {
        return calificacionRepository.findById(id)
                .map(c -> {
                    c.setAlumno(calificacion.getAlumno());
                    c.setProfesorCurso(calificacion.getProfesorCurso());
                    c.setBimestre(calificacion.getBimestre());
                    c.setPc1(calificacion.getPc1());
                    c.setPc2(calificacion.getPc2());
                    c.setExamenFinal(calificacion.getExamenFinal());
                    c.setPromedio(calificacion.getPromedio());
                    return calificacionRepository.save(c);
                }).orElseThrow(() -> new RuntimeException("Calificación no encontrada"));
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
