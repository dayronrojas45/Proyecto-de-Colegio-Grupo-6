package pe.avansys.colegio.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.avansys.colegio.model.Aula;
import pe.avansys.colegio.service.AulaService;

import java.util.List;

@RestController
@RequestMapping("/api/aulas")
public class AulaController {

    private final AulaService aulaService;

    public AulaController(AulaService aulaService) {
        this.aulaService = aulaService;
    }

    @PostMapping("/registro")
    public ResponseEntity<Aula> registrar(@RequestBody Aula aula){
        Aula guardado = aulaService.registrar(aula);
        return ResponseEntity.ok(guardado);
    }

    @GetMapping
    public List<Aula> listar(){
        return aulaService.listar();
    }

    @GetMapping("/buscar/{grado}")
    public List<Aula> buscarPorGrado(@PathVariable String grado){
        return aulaService.obtenerPorGrado(grado);
    }

    @GetMapping("{id}")
    public ResponseEntity<Aula> obtenerPorId(@PathVariable Long id){
        return aulaService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("{id}")
    public ResponseEntity<Aula> actualizar(@PathVariable Long id, @RequestBody Aula aula){
        return aulaService.obtenerPorId(id)
                .map(a -> {
                    a.setNivel(aula.getNivel());
                    a.setGrado(aula.getGrado());
                    a.setSeccion(aula.getSeccion());
                    a.setCapacidad(aula.getCapacidad());
                    a.setTutor(aula.getTutor());
                    Aula actualizado = aulaService.registrar(a);
                    return ResponseEntity.ok(actualizado);
                }).orElse(ResponseEntity.notFound().build());
    }
}
