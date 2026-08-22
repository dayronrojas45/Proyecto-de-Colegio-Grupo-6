package pe.avansys.colegio.controller;

import org.springframework.web.bind.annotation.*;
import pe.avansys.colegio.model.Nivel;
import pe.avansys.colegio.service.NivelService;
import java.util.List;

@RestController
@RequestMapping("/api/niveles")
public class NivelController {
    private final NivelService nivelService;

    public NivelController(NivelService nivelService) {
        this.nivelService = nivelService;
    }

    @GetMapping
    public List<Nivel> listar() {
        return nivelService.listar();
    }
}