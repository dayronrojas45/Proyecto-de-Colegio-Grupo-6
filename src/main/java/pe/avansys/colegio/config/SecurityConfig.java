package pe.avansys.colegio.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import pe.avansys.colegio.service.UsuarioDetailsService;

import java.util.List;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    @Autowired
    private UsuarioDetailsService usuarioDetailsService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder =
                http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder
                .userDetailsService(usuarioDetailsService)
                .passwordEncoder(passwordEncoder());
        return authenticationManagerBuilder.build();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable())
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(auth -> auth

                        .requestMatchers("/api/public/**").permitAll()
                        .requestMatchers("/api/auth/login").permitAll()
                        .requestMatchers("/api/usuarios/registro").permitAll()

                        .requestMatchers("/api/usuarios/**").hasRole("ADMIN")
                        .requestMatchers("/api/roles/**").hasRole("ADMIN")
                        .requestMatchers("/api/niveles/**").hasRole("ADMIN")
                        .requestMatchers("/api/grados/**").hasRole("ADMIN")
                        .requestMatchers("/api/aulas/**").hasRole("ADMIN")
                        .requestMatchers("/api/cursos/**").hasRole("ADMIN")
                        .requestMatchers("/api/curso-grados/**").hasRole("ADMIN")
                        .requestMatchers("/api/profesor-cursos/**").hasRole("ADMIN")
                        .requestMatchers("/api/matriculas/**").hasRole("ADMIN")

                        .requestMatchers("/api/horarios/**").hasAnyRole("ADMIN", "PROFESOR")
                        .requestMatchers("/api/asistencias/**").hasAnyRole("ADMIN", "PROFESOR")
                        .requestMatchers("/api/calificaciones/**").hasAnyRole("ADMIN", "PROFESOR")

                        .requestMatchers("GET", "/api/profesores/**").hasAnyRole("ADMIN", "PROFESOR", "ALUMNO")
                        .requestMatchers("POST", "/api/profesores/**").hasRole("ADMIN")
                        .requestMatchers("PUT", "/api/profesores/**").hasRole("ADMIN")
                        .requestMatchers("DELETE", "/api/profesores/**").hasRole("ADMIN")

                        .requestMatchers("GET", "/api/alumnos/**").hasAnyRole("ADMIN", "PROFESOR", "ALUMNO")
                        .requestMatchers("POST", "/api/alumnos/**").hasRole("ADMIN")
                        .requestMatchers("PUT", "/api/alumnos/**").hasRole("ADMIN")
                        .requestMatchers("DELETE", "/api/alumnos/**").hasRole("ADMIN")

                        .anyRequest().authenticated()
                )
                .httpBasic(Customizer.withDefaults())
                .build();
    }

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.setAllowedOrigins(List.of(
                "http://localhost:4200",
                "http://localhost:3000",
                "http://127.0.0.1:4200"
        ));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}