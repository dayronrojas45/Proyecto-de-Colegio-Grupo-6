package pe.avansys.colegio.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.avansys.colegio.model.Asistencia;
import pe.avansys.colegio.service.AsistenciaService;

import java.util.List;

@RestController
@RequestMapping("/api/asistencias")
public class AsistenciaController {
    @Autowired
    private AsistenciaService asistenciaService;


    @GetMapping
    public List<Asistencia> listarTodas() {
        return asistenciaService.listarTodas();
    }


    @GetMapping("/{id}")
    public ResponseEntity<Asistencia> buscarPorId(@PathVariable Integer id) {
        return asistenciaService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @GetMapping("/alumno/{idAlumno}")
    public List<Asistencia> listarPorAlumno(@PathVariable Integer idAlumno) {
        return asistenciaService.listarPorAlumno(idAlumno);
    }


    @PostMapping
    public Asistencia registrarAsistencia(@RequestBody Asistencia asistencia) {
        return asistenciaService.guardarAsistencia(asistencia);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarAsistencia(@PathVariable Integer id) {
        if (asistenciaService.buscarPorId(id).isPresent()) {
            asistenciaService.eliminarAsistencia(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
