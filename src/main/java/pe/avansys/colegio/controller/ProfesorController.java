package pe.avansys.colegio.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.avansys.colegio.model.Profesor;
import pe.avansys.colegio.service.ProfesorService;

import java.util.List;

@RestController
@RequestMapping("/api/profesores")
public class ProfesorController {

    private final ProfesorService profesorService;

    public ProfesorController(ProfesorService profesorService) {
        this.profesorService = profesorService;
    }

    @PostMapping("/registro")
    public ResponseEntity<Profesor> registrarProfesor(@RequestBody Profesor profesor){
        Profesor guardado = profesorService.registrar(profesor);
        return ResponseEntity.ok(guardado);
    }

    @GetMapping
    public List<Profesor> listarProfesores(){
        return profesorService.listar();
    }

    @GetMapping("/buscar/{nombre}")
    public List<Profesor> obtenerPorNombre(@PathVariable String nombre){
        return profesorService.obtenerPorNombre(nombre);
    }

    @GetMapping("{id}")
    public ResponseEntity<Profesor> obtenerPorId(@PathVariable Long id){
        return profesorService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("{id}")
    public ResponseEntity<Profesor> actualizar(@PathVariable Long id, @RequestBody Profesor profesor){
        return profesorService.obtenerPorId(id)
                .map(p -> {
                    p.setNombres(profesor.getNombres());
                    p.setApellidos(profesor.getApellidos());
                    p.setTelefono(profesor.getTelefono());
                    p.setDni(profesor.getDni());
                    p.setCorreo(profesor.getCorreo());
                    p.setEspecialidad(profesor.getEspecialidad());
                    Profesor actualizado = profesorService.registrar(p);
                    return ResponseEntity.ok(actualizado);
                }).orElse(ResponseEntity.notFound().build());
    }
}
