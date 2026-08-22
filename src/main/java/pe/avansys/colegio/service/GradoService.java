package pe.avansys.colegio.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.avansys.colegio.model.Grado;
import pe.avansys.colegio.repository.GradoRepository;

import java.util.List;

@Service
public class GradoService {

    @Autowired
    private final GradoRepository gradoRepository ;

    public GradoService(GradoRepository gradoRepository) {
        this.gradoRepository = gradoRepository;
    }

    public List<Grado> listar() {
        return gradoRepository.findAll();
    }

}
