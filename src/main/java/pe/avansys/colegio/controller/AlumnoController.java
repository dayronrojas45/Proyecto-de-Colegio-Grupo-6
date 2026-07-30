package pe.avansys.colegio.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.avansys.colegio.model.Alumno;
import pe.avansys.colegio.service.AlumnoService;

import java.util.List;

@RestController
@RequestMapping("/api/alumnos")
public class AlumnoController {

    private final AlumnoService alumnoService;

    public AlumnoController(AlumnoService alumnoService) {
        this.alumnoService = alumnoService;
    }

    @PostMapping("/registro")
    public ResponseEntity<Alumno> registrarAlumno(@RequestBody Alumno alumno){
        Alumno guardado = alumnoService.registrar(alumno);
        return ResponseEntity.ok(guardado);

    }

    @GetMapping
    public List<Alumno> listarAlumnos(){
        return alumnoService.listar();
    }

    @GetMapping("/buscar/{nombre}")
    public List<Alumno> obtenerPorNombre(@PathVariable String nombre){
        return alumnoService.obtenerPorNombre(nombre);
    }

    @GetMapping("{id}")
    public ResponseEntity<Alumno> obtenerPorId(@PathVariable Long id){
        return alumnoService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("{id}")
    public ResponseEntity<Alumno> actualizar(@PathVariable Long id, @RequestBody Alumno alumno){
        return alumnoService.obtenerPorId(id)
                .map(a -> {
                    a.setNombres(alumno.getNombres());
                    a.setApellidos(alumno.getApellidos());
                    a.setDni(alumno.getDni());
                    a.setCorreo(alumno.getCorreo());
                    a.setTelefono(alumno.getTelefono());
                    a.setDireccion(alumno.getDireccion());
                    a.setFechaNacimiento(alumno.getFechaNacimiento());
                    Alumno actualizado = alumnoService.registrar(a);
                    return ResponseEntity.ok(actualizado);
                }).orElse(ResponseEntity.notFound().build());
    }
}
