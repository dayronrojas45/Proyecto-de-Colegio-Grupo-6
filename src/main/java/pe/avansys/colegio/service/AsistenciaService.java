package pe.avansys.colegio.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.avansys.colegio.model.Asistencia;
import pe.avansys.colegio.repository.AsistenciaRepository;

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
