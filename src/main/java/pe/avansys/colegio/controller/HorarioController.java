package pe.avansys.colegio.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.avansys.colegio.dto.CrearHorarioRequestDTO;
import pe.avansys.colegio.dto.HorarioDTO;
import pe.avansys.colegio.service.HorarioService;

import java.util.List;

@RestController
@RequestMapping("/api/horarios")
public class HorarioController {

    @Autowired
    private HorarioService horarioService;

    @PostMapping
    public ResponseEntity<HorarioDTO> crearHorario(@RequestBody CrearHorarioRequestDTO dto) {
        return new ResponseEntity<>(horarioService.crearHorario(dto), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<HorarioDTO>> listarHorarios() {
        return ResponseEntity.ok(horarioService.listarHorarios());
    }

    @GetMapping("/profesor/{idProfesor}")
    public ResponseEntity<List<HorarioDTO>> listarPorProfesor(@PathVariable Long  idProfesor) {
        return ResponseEntity.ok(horarioService.listarPorProfesor(idProfesor));
    }

    @GetMapping("/aula/{idAula}")
    public ResponseEntity<List<HorarioDTO>> listarPorAula(@PathVariable Long  idAula) {
        return ResponseEntity.ok(horarioService.listarPorAula(idAula));
    }

    @GetMapping("/dia/{dia}")
    public ResponseEntity<List<HorarioDTO>> listarPorDia(@PathVariable String dia) {
        return ResponseEntity.ok(horarioService.listarPorDia(dia));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarHorario(@PathVariable Long  id) {
        horarioService.eliminarHorario(id);
        return ResponseEntity.noContent().build();
    }
}