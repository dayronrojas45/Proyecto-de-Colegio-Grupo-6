export interface Rol {
  idRol: number;
  nombre: string;
}

export interface Usuario {
  idUsuario: number;
  username: string;
  password?: string;
  estado: boolean;
  rol: Rol;
}
