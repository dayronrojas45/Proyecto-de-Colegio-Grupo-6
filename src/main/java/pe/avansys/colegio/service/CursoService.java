package pe.avansys.colegio.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.avansys.colegio.dto.CursoDTO;
import pe.avansys.colegio.model.Curso;
import pe.avansys.colegio.repository.CursoRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CursoService {

    @Autowired
    private CursoRepository cursoRepository;

    @Transactional
    public CursoDTO crearCurso(CursoDTO cursoDTO) {
        if (cursoRepository.existsByNombre(cursoDTO.getNombre())) {
            throw new RuntimeException("El curso ya existe");
        }
        Curso curso = new Curso();
        curso.setNombre(cursoDTO.getNombre());
        curso = cursoRepository.save(curso);
        cursoDTO.setIdCurso(curso.getIdCurso());
        return cursoDTO;
    }

    public List<CursoDTO> listarCursos() {
        return cursoRepository.findAll().stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    public CursoDTO obtenerCursoPorId(Integer id) {
        Curso curso = cursoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Curso no encontrado"));
        return convertirADTO(curso);
    }

    @Transactional
    public CursoDTO actualizarCurso(Integer id, CursoDTO cursoDTO) {
        Curso curso = cursoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Curso no encontrado"));
        curso.setNombre(cursoDTO.getNombre());
        curso = cursoRepository.save(curso);
        return convertirADTO(curso);
    }

    @Transactional
    public void eliminarCurso(Integer id) {
        if (!cursoRepository.existsById(id)) {
            throw new RuntimeException("Curso no encontrado");
        }
        cursoRepository.deleteById(id);
    }

    private CursoDTO convertirADTO(Curso curso) {
        CursoDTO dto = new CursoDTO();
        dto.setIdCurso(curso.getIdCurso());
        dto.setNombre(curso.getNombre());
        return dto;
    }
}
