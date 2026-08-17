package pe.avansys.colegio.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.avansys.colegio.dto.ProfesorCursoDTO;
import pe.avansys.colegio.model.CursoGrado;
import pe.avansys.colegio.model.Profesor;
import pe.avansys.colegio.model.ProfesorCurso;
import pe.avansys.colegio.repository.CursoGradoRepository;
import pe.avansys.colegio.repository.ProfesorCursoRepository;
import pe.avansys.colegio.repository.ProfesorRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProfesorCursoService {

    @Autowired
    private ProfesorCursoRepository profesorCursoRepository;

    @Autowired
    private ProfesorRepository profesorRepository;

    @Autowired
    private CursoGradoRepository cursoGradoRepository;

    @Transactional
    public ProfesorCursoDTO asignarProfesorACurso(ProfesorCursoDTO dto) {

        if (profesorCursoRepository.existsByProfesorIdProfesorAndCursoGradoIdCursoGrado(
                dto.getIdProfesor(), dto.getIdCursoGrado())) {
            throw new RuntimeException("El profesor ya está asignado a este curso-grado");
        }

        Profesor profesor = profesorRepository.findById(dto.getIdProfesor())
                .orElseThrow(() -> new RuntimeException("Profesor no encontrado"));
        CursoGrado cursoGrado = cursoGradoRepository.findById(dto.getIdCursoGrado())
                .orElseThrow(() -> new RuntimeException("Curso-Grado no encontrado"));

        ProfesorCurso profesorCurso = new ProfesorCurso();
        profesorCurso.setProfesor(profesor);
        profesorCurso.setCursoGrado(cursoGrado);

        profesorCurso = profesorCursoRepository.save(profesorCurso);
        return convertirADTO(profesorCurso);
    }

    public List<ProfesorCursoDTO> listarAsignaciones() {
        return profesorCursoRepository.findAll().stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    public List<ProfesorCursoDTO> listarPorProfesor(Long  idProfesor) {
        return profesorCursoRepository.findByProfesorIdProfesor(idProfesor).stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    public List<ProfesorCursoDTO> listarPorCursoGrado(Long  idCursoGrado) {
        return profesorCursoRepository.findByCursoGradoIdCursoGrado(idCursoGrado).stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public void eliminarAsignacion(Long  id) {
        if (!profesorCursoRepository.existsById(id)) {
            throw new RuntimeException("Asignación no encontrada");
        }
        profesorCursoRepository.deleteById(id);
    }

    private ProfesorCursoDTO convertirADTO(ProfesorCurso profesorCurso) {
        ProfesorCursoDTO dto = new ProfesorCursoDTO();
        dto.setIdProfesorCurso(profesorCurso.getIdProfesorCurso());
        dto.setIdProfesor(profesorCurso.getProfesor().getIdProfesor());
        dto.setNombresProfesor(profesorCurso.getProfesor().getNombres());
        dto.setApellidosProfesor(profesorCurso.getProfesor().getApellidos());
        dto.setIdCursoGrado(profesorCurso.getCursoGrado().getIdCursoGrado());
        dto.setNombreCurso(profesorCurso.getCursoGrado().getCurso().getNombre());
        dto.setNombreNivel(profesorCurso.getCursoGrado().getNivel().getNombre());
        dto.setNombreGrado(profesorCurso.getCursoGrado().getGrado().getNombre());
        return dto;
    }
}