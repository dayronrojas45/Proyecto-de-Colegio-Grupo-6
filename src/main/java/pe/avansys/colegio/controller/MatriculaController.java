package pe.avansys.colegio.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.avansys.colegio.model.Matricula;
import pe.avansys.colegio.service.MatriculaService;

import java.util.List;

@RestController
@RequestMapping("/api/matriculas")

public class MatriculaController {

    @Autowired
    private MatriculaService matriculaService;

    @GetMapping
    public List<Matricula> listarTodas() {
        return matriculaService.listarTodas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Matricula> buscarPorId(@PathVariable Integer id) {
        return matriculaService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/registrar")
    public ResponseEntity<Matricula> crear(@RequestBody Matricula matricula) {
        Matricula nueva = matriculaService.guardar(matricula);
        return ResponseEntity.status(HttpStatus.CREATED).body(nueva);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Matricula> actualizar(@PathVariable Integer id, @RequestBody Matricula matricula) {
        return matriculaService.buscarPorId(id)
                .map(m -> {
                    matricula.setIdMatricula(id);
                    return ResponseEntity.ok(matriculaService.guardar(matricula));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        if (matriculaService.buscarPorId(id).isPresent()) {
            matriculaService.eliminar(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
