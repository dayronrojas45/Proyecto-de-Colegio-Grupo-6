package pe.avansys.colegio.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.avansys.colegio.model.Asistencia;
import pe.avansys.colegio.service.AsistenciaService;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/asistencias")
public class AsistenciaController {

    private final AsistenciaService asistenciaService;

    public AsistenciaController(AsistenciaService asistenciaService) {
        this.asistenciaService = asistenciaService;
    }

    @GetMapping
    public List<Asistencia> listarTodas() {
        return asistenciaService.listarTodas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Asistencia> buscarPorId(@PathVariable Long id) {
        return asistenciaService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/aula/{idAula}")
    public List<Asistencia> listarPorAula(@PathVariable Long idAula) {
        return asistenciaService.listarPorAula(idAula);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Asistencia> actualizarAsistencia(@PathVariable Long id, @RequestBody Asistencia asistencia) {
        return ResponseEntity.ok(asistenciaService.actualizarAsistencia(id, asistencia));
    }

    @GetMapping("/alumno/{idAlumno}")
    public List<Asistencia> listarPorAlumno(@PathVariable Long idAlumno) {
        return asistenciaService.listarPorAlumno(idAlumno);
    }

    @PostMapping
    public ResponseEntity<Asistencia> registrarAsistencia(@RequestBody Asistencia asistencia) {
        asistencia.setIdAsistencia(null);
        return ResponseEntity.ok(asistenciaService.guardarOActualizar(asistencia));
    }

    @PostMapping("/batch")
    public ResponseEntity<List<Asistencia>> registrarMultiplesAsistencias(@RequestBody List<Asistencia> asistencias) {
        return ResponseEntity.ok(asistenciaService.guardarOActualizarMultiples(asistencias));
    }

    @GetMapping("/aula/{idAula}/horario/{idHorario}/fecha/{fecha}")
    public List<Asistencia> listarPorAulaHorarioYFecha(
            @PathVariable Long idAula,
            @PathVariable Long idHorario,
            @PathVariable String fecha) {
        LocalDate fechaParsed = LocalDate.parse(fecha);
        return asistenciaService.listarPorAulaHorarioYFecha(idAula, idHorario, fechaParsed);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarAsistencia(@PathVariable Long id) {
        if (asistenciaService.buscarPorId(id).isPresent()) {
            asistenciaService.eliminarAsistencia(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}