package pe.avansys.colegio.controller;

import org.springframework.web.bind.annotation.*;
import pe.avansys.colegio.model.Grado;
import pe.avansys.colegio.service.GradoService;
import java.util.List;

@RestController
@RequestMapping("/api/grados")
public class GradoController {
    private final GradoService gradoService;

    public GradoController(GradoService gradoService) {
        this.gradoService = gradoService;
    }

    @GetMapping
    public List<Grado> listar() {
        return gradoService.listar();
    }
}