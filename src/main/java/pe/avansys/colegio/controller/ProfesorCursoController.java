package pe.avansys.colegio.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.avansys.colegio.dto.ProfesorCursoDTO;
import pe.avansys.colegio.service.ProfesorCursoService;

import java.util.List;

@RestController
@RequestMapping("/api/profesores-cursos")
public class ProfesorCursoController {

    @Autowired
    private ProfesorCursoService profesorCursoService;

    @PostMapping
    public ResponseEntity<ProfesorCursoDTO> asignarProfesorACurso(@RequestBody ProfesorCursoDTO dto) {
        return new ResponseEntity<>(profesorCursoService.asignarProfesorACurso(dto), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ProfesorCursoDTO>> listarAsignaciones() {
        return ResponseEntity.ok(profesorCursoService.listarAsignaciones());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProfesorCursoDTO> actualizarAsignacion(@PathVariable Long id, @RequestBody ProfesorCursoDTO dto) {
        ProfesorCursoDTO actualizado = profesorCursoService.actualizarAsignacion(id, dto);
        return ResponseEntity.ok(actualizado);
    }

    @GetMapping("/profesor/{idProfesor}")
    public ResponseEntity<List<ProfesorCursoDTO>> listarPorProfesor(@PathVariable Long  idProfesor) {
        return ResponseEntity.ok(profesorCursoService.listarPorProfesor(idProfesor));
    }

    @GetMapping("/curso-grado/{idCursoGrado}")
    public ResponseEntity<List<ProfesorCursoDTO>> listarPorCursoGrado(@PathVariable Long  idCursoGrado) {
        return ResponseEntity.ok(profesorCursoService.listarPorCursoGrado(idCursoGrado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarAsignacion(@PathVariable Long  id) {
        profesorCursoService.eliminarAsignacion(id);
        return ResponseEntity.noContent().build();
    }
}