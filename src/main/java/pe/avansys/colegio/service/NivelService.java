package pe.avansys.colegio.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.avansys.colegio.model.Nivel;
import pe.avansys.colegio.repository.NivelRepository;

import java.util.List;

@Service
public class NivelService {

    @Autowired
    private final NivelRepository nivelRepository;

    public NivelService(NivelRepository nivelRepository) {
        this.nivelRepository = nivelRepository;
    }

    public List<Nivel> listar() {
        return nivelRepository.findAll();
    }

}
