package pe.avansys.colegio.service;

import pe.avansys.colegio.dto.CrearHorarioRequestDTO;
import pe.avansys.colegio.dto.HorarioDTO;
import pe.avansys.colegio.model.Aula;
import pe.avansys.colegio.model.Horario;
import pe.avansys.colegio.model.Horario.Dia;
import pe.avansys.colegio.model.ProfesorCurso;
import pe.avansys.colegio.repository.AulaRepository;
import pe.avansys.colegio.repository.HorarioRepository;
import pe.avansys.colegio.repository.ProfesorCursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class HorarioService {

    @Autowired
    private HorarioRepository horarioRepository;

    @Autowired
    private ProfesorCursoRepository profesorCursoRepository;

    @Autowired
    private AulaRepository aulaRepository;

    @Transactional
    public HorarioDTO crearHorario(CrearHorarioRequestDTO dto) {

        ProfesorCurso profesorCurso = profesorCursoRepository.findById(dto.getIdProfesorCurso())
                .orElseThrow(() -> new RuntimeException("Asignación profesor-curso no encontrada"));


        Aula aula = aulaRepository.findById(dto.getIdAula())
                .orElseThrow(() -> new RuntimeException("Aula no encontrada"));


        if (dto.getHoraInicio().isAfter(dto.getHoraFin()) || dto.getHoraInicio().equals(dto.getHoraFin())) {
            throw new RuntimeException("La hora de inicio debe ser menor que la hora de fin");
        }


        Dia diaEnum;
        try {
            diaEnum = Dia.valueOf(dto.getDia().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Día inválido. Debe ser LUNES, MARTES, MIERCOLES, JUEVES o VIERNES");
        }


        List<Horario> conflictosAula = horarioRepository.findConflictsByAulaAndTime(
                dto.getIdAula(), diaEnum, dto.getHoraInicio(), dto.getHoraFin());
        if (!conflictosAula.isEmpty()) {
            throw new RuntimeException("El aula ya tiene un curso asignado en ese horario");
        }


        List<Horario> conflictosProfesor = horarioRepository.findConflictsByProfesorAndTime(
                profesorCurso.getProfesor().getIdProfesor(), diaEnum, dto.getHoraInicio(), dto.getHoraFin());
        if (!conflictosProfesor.isEmpty()) {
            throw new RuntimeException("El profesor ya tiene un curso asignado en ese horario");
        }

        Horario horario = new Horario();
        horario.setProfesorCurso(profesorCurso);
        horario.setAula(aula);
        horario.setDia(diaEnum);
        horario.setHoraInicio(dto.getHoraInicio());
        horario.setHoraFin(dto.getHoraFin());

        horario = horarioRepository.save(horario);
        return convertirADTO(horario);
    }

    @Transactional
    public HorarioDTO actualizarHorario(Long id, CrearHorarioRequestDTO dto) {
        Horario horario = horarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Horario no encontrado"));

        ProfesorCurso profesorCurso = profesorCursoRepository.findById(dto.getIdProfesorCurso())
                .orElseThrow(() -> new RuntimeException("Asignación profesor-curso no encontrada"));

        Aula aula = aulaRepository.findById(dto.getIdAula())
                .orElseThrow(() -> new RuntimeException("Aula no encontrada"));

        if (dto.getHoraInicio().isAfter(dto.getHoraFin()) || dto.getHoraInicio().equals(dto.getHoraFin())) {
            throw new RuntimeException("La hora de inicio debe ser menor que la hora de fin");
        }

        Dia diaEnum;
        try {
            diaEnum = Dia.valueOf(dto.getDia().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Día inválido. Debe ser LUNES, MARTES, MIERCOLES, JUEVES o VIERNES");
        }

        horario.setProfesorCurso(profesorCurso);
        horario.setAula(aula);
        horario.setDia(diaEnum);
        horario.setHoraInicio(dto.getHoraInicio());
        horario.setHoraFin(dto.getHoraFin());

        horario = horarioRepository.save(horario);
        return convertirADTO(horario);
    }

    public List<HorarioDTO> listarHorarios() {
        return horarioRepository.findAll().stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    public List<HorarioDTO> listarPorProfesor(Long  idProfesor) {
        return horarioRepository.findByProfesorId(idProfesor).stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    public List<HorarioDTO> listarPorAula(Long  idAula) {
        return horarioRepository.findByAulaIdAula(idAula).stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    public List<HorarioDTO> listarPorDia(String dia) {
        Dia diaEnum;
        try {
            diaEnum = Dia.valueOf(dia.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Día inválido");
        }
        return horarioRepository.findByDia(diaEnum).stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public void eliminarHorario(Long  id) {
        if (!horarioRepository.existsById(id)) {
            throw new RuntimeException("Horario no encontrado");
        }
        horarioRepository.deleteById(id);
    }

    private HorarioDTO convertirADTO(Horario horario) {
        HorarioDTO dto = new HorarioDTO();
        dto.setIdHorario(horario.getIdHorario());
        dto.setIdProfesorCurso(horario.getProfesorCurso().getIdProfesorCurso());
        dto.setNombreProfesor(horario.getProfesorCurso().getProfesor().getNombres() + " " +
                horario.getProfesorCurso().getProfesor().getApellidos());
        dto.setNombreCurso(horario.getProfesorCurso().getCursoGrado().getCurso().getNombre());
        dto.setIdAula(horario.getAula().getIdAula());
        dto.setSeccionAula(horario.getAula().getSeccion());
        dto.setDia(horario.getDia().name());
        dto.setHoraInicio(horario.getHoraInicio());
        dto.setHoraFin(horario.getHoraFin());
        return dto;
    }
}