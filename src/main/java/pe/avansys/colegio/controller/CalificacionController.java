package pe.avansys.colegio.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.avansys.colegio.model.Calificacion;
import pe.avansys.colegio.service.CalificacionService;

import java.util.List;

@RestController
@RequestMapping("/api/calificaciones")
public class CalificacionController {

    private CalificacionService calificacionService;

    public CalificacionController(CalificacionService calificacionService) {
        this.calificacionService = calificacionService;
    }

    @PostMapping
    public ResponseEntity<Calificacion> registrar(
            @RequestBody Calificacion calificacion) {

        Calificacion nueva = calificacionService.registrar(calificacion);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(nueva);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Calificacion> actualizar(
            @PathVariable Long id,
            @RequestBody Calificacion calificacion) {

        return ResponseEntity.ok(
                calificacionService.actualizar(id, calificacion)
        );
    }

    @GetMapping
    public ResponseEntity<List<Calificacion>> listar() {

        return ResponseEntity.ok(
                calificacionService.listar()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Calificacion> obtenerPorId(
            @PathVariable Long id) {

        return calificacionService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/alumno/{idAlumno}")
    public ResponseEntity<List<Calificacion>> obtenerPorAlumno(
            @PathVariable Long idAlumno) {

        return ResponseEntity.ok(
                calificacionService.obtenerPorAlumno(idAlumno)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(
            @PathVariable Long id) {

        if (calificacionService.obtenerPorId(id).isPresent()) {

            calificacionService.eliminar(id);

            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }
}
