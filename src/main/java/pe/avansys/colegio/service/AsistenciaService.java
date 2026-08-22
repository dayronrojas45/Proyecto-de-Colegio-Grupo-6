package pe.avansys.colegio.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.avansys.colegio.model.Asistencia;
import pe.avansys.colegio.repository.AsistenciaRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AsistenciaService {

    @Autowired
    private AsistenciaRepository asistenciaRepository;

    public List<Asistencia> listarTodas() {
        return asistenciaRepository.findAll();
    }

    public Optional<Asistencia> buscarPorId(Long id) {
        return asistenciaRepository.findById(id);
    }

    public Asistencia actualizarAsistencia(Long id, Asistencia asistencia) {
        return asistenciaRepository.findById(id)
                .map(a -> {
                    a.setAlumno(asistencia.getAlumno());
                    a.setHorario(asistencia.getHorario());
                    a.setFecha(asistencia.getFecha());
                    a.setEstado(asistencia.getEstado());
                    return asistenciaRepository.save(a);
                }).orElseThrow(() -> new RuntimeException("Asistencia no encontrada"));
    }

    public List<Asistencia> listarPorAula(Long idAula) {
        return asistenciaRepository.findByHorarioAulaIdAula(idAula);
    }

    public Asistencia guardarOActualizar(Asistencia asistencia) {
        Optional<Asistencia> existente = asistenciaRepository
                .findByAlumnoIdAlumnoAndHorarioIdHorarioAndFecha(
                        asistencia.getAlumno().getIdAlumno(),
                        asistencia.getHorario().getIdHorario(),
                        asistencia.getFecha()
                );

        if (existente.isPresent()) {
            existente.get().setEstado(asistencia.getEstado());
            return asistenciaRepository.save(existente.get());
        } else {
            return asistenciaRepository.save(asistencia);
        }
    }

    @Transactional
    public List<Asistencia> guardarOActualizarMultiples(List<Asistencia> asistencias) {
        List<Asistencia> resultados = new ArrayList<>();

        for (Asistencia asistencia : asistencias) {
            Asistencia procesada = guardarOActualizar(asistencia);
            resultados.add(procesada);
        }

        return resultados;
    }

    public List<Asistencia> listarPorAulaHorarioYFecha(Long idAula, Long idHorario, LocalDate fecha) {
        return asistenciaRepository.findByHorarioAulaIdAulaAndHorarioIdHorarioAndFecha(
                idAula, idHorario, fecha
        );
    }

    public Asistencia guardarAsistencia(Asistencia asistencia) {
        return asistenciaRepository.save(asistencia);
    }

    public List<Asistencia> listarPorAlumno(Long idAlumno) {
        return asistenciaRepository.findByAlumnoIdAlumno(idAlumno);
    }

    public void eliminarAsistencia(Long id) {
        asistenciaRepository.deleteById(id);
    }
}