package pe.avansys.colegio.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.avansys.colegio.dto.CursoGradoDTO;
import pe.avansys.colegio.service.CursoGradoService;

import java.util.List;

@RestController
@RequestMapping("/api/cursos-grado")
public class CursoGradoController {

    @Autowired
    private CursoGradoService cursoGradoService;

    @PostMapping
    public ResponseEntity<CursoGradoDTO> asignarCursoAGrado(@RequestBody CursoGradoDTO dto) {
        return new ResponseEntity<>(cursoGradoService.asignarCursoAGrado(dto), HttpStatus.CREATED);
    }
    @PutMapping("/{id}")
    public ResponseEntity<CursoGradoDTO> actualizarAsignacion(@PathVariable Long id, @RequestBody CursoGradoDTO dto) {
        CursoGradoDTO actualizado = cursoGradoService.actualizarAsignacion(id, dto);
        return ResponseEntity.ok(actualizado);
    }

    @GetMapping
    public ResponseEntity<List<CursoGradoDTO>> listarAsignaciones() {
        return ResponseEntity.ok(cursoGradoService.listarAsignaciones());
    }

    @GetMapping("/curso/{idCurso}")
    public ResponseEntity<List<CursoGradoDTO>> listarPorCurso(@PathVariable Long idCurso) {
        return ResponseEntity.ok(cursoGradoService.listarPorCurso(idCurso));
    }

    @GetMapping("/nivel/{idNivel}/grado/{idGrado}")
    public ResponseEntity<List<CursoGradoDTO>> listarPorNivelYGrado(
            @PathVariable Long idNivel,
            @PathVariable Long idGrado) {
        return ResponseEntity.ok(cursoGradoService.listarPorNivelYGrado(idNivel, idGrado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarAsignacion(@PathVariable Long  id) {
        cursoGradoService.eliminarAsignacion(id);
        return ResponseEntity.noContent().build();
    }
}