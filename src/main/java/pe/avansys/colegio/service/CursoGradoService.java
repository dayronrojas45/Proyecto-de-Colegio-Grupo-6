package pe.avansys.colegio.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.avansys.colegio.dto.CursoGradoDTO;
import pe.avansys.colegio.model.Curso;
import pe.avansys.colegio.model.CursoGrado;
import pe.avansys.colegio.model.Grado;
import pe.avansys.colegio.model.Nivel;
import pe.avansys.colegio.repository.CursoGradoRepository;
import pe.avansys.colegio.repository.CursoRepository;
import pe.avansys.colegio.repository.GradoRepository;
import pe.avansys.colegio.repository.NivelRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CursoGradoService {

    @Autowired
    private CursoGradoRepository cursoGradoRepository;

    @Autowired
    private CursoRepository cursoRepository;

    @Autowired
    private NivelRepository nivelRepository;

    @Autowired
    private GradoRepository gradoRepository;

    @Transactional
    public CursoGradoDTO asignarCursoAGrado(CursoGradoDTO dto) {

        if (cursoGradoRepository.existsByCursoIdCursoAndNivelIdNivelAndGradoIdGrado(
                dto.getIdCurso(), dto.getIdNivel(), dto.getIdGrado())) {
            throw new RuntimeException("El curso ya está asignado a este nivel y grado");
        }

        Curso curso = cursoRepository.findById(dto.getIdCurso())
                .orElseThrow(() -> new RuntimeException("Curso no encontrado"));
        Nivel nivel = nivelRepository.findById(dto.getIdNivel())
                .orElseThrow(() -> new RuntimeException("Nivel no encontrado"));
        Grado grado = gradoRepository.findById(dto.getIdGrado())
                .orElseThrow(() -> new RuntimeException("Grado no encontrado"));

        CursoGrado cursoGrado = new CursoGrado();
        cursoGrado.setCurso(curso);
        cursoGrado.setNivel(nivel);
        cursoGrado.setGrado(grado);
        cursoGrado.setHorasSemanales(dto.getHorasSemanales());

        cursoGrado = cursoGradoRepository.save(cursoGrado);
        return convertirADTO(cursoGrado);
    }

    @Transactional
    public CursoGradoDTO actualizarAsignacion(Long id, CursoGradoDTO dto) {
        CursoGrado cursoGrado = cursoGradoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Asignación no encontrada"));

        Curso curso = cursoRepository.findById(dto.getIdCurso())
                .orElseThrow(() -> new RuntimeException("Curso no encontrado"));
        Nivel nivel = nivelRepository.findById(dto.getIdNivel())
                .orElseThrow(() -> new RuntimeException("Nivel no encontrado"));
        Grado grado = gradoRepository.findById(dto.getIdGrado())
                .orElseThrow(() -> new RuntimeException("Grado no encontrado"));

        cursoGrado.setCurso(curso);
        cursoGrado.setNivel(nivel);
        cursoGrado.setGrado(grado);
        cursoGrado.setHorasSemanales(dto.getHorasSemanales());

        cursoGrado = cursoGradoRepository.save(cursoGrado);
        return convertirADTO(cursoGrado);
    }

    public List<CursoGradoDTO> listarAsignaciones() {
        return cursoGradoRepository.findAll().stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    public List<CursoGradoDTO> listarPorCurso(Long idCurso) {
        return cursoGradoRepository.findByCursoIdCurso(idCurso).stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    public List<CursoGradoDTO> listarPorNivelYGrado(Long idNivel, Long idGrado) {
        return cursoGradoRepository.findByNivelIdNivelAndGradoIdGrado(idNivel, idGrado).stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public void eliminarAsignacion(Long  id) {
        if (!cursoGradoRepository.existsById(id)) {
            throw new RuntimeException("Asignación no encontrada");
        }
        cursoGradoRepository.deleteById(id);
    }

    private CursoGradoDTO convertirADTO(CursoGrado cursoGrado) {
        CursoGradoDTO dto = new CursoGradoDTO();
        dto.setIdCursoGrado(cursoGrado.getIdCursoGrado());
        dto.setIdCurso(cursoGrado.getCurso().getIdCurso());
        dto.setIdNivel(cursoGrado.getNivel().getIdNivel());
        dto.setIdGrado(cursoGrado.getGrado().getIdGrado());

        dto.setNombreCurso(cursoGrado.getCurso().getNombre());
        dto.setNombreNivel(cursoGrado.getNivel().getNombre());
        dto.setNombreGrado(cursoGrado.getGrado().getNombre());
        dto.setHorasSemanales(cursoGrado.getHorasSemanales());
        return dto;
    }
}