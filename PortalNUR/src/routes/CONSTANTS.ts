const adminPrefix = '/admin';

export const Routes = {
    HOME: '/',
    CURSOS: {
        AREA_ACADEMICA: '/area-academica',
        PREGRADO: {
            DEFAULT: '/pregrado',
            CARRERA: '/pregrado/carreras/:slug',
            CARRERA_PARAM: (slug?: string) => `/pregrado/carreras/${slug}`,
        },
        POSTGRADO: {
            DEFAULT: '/postgrado',
            MAESTRIA: '/postgrado/maestrias/:slug',
            MAESTRIA_PARAM: (slug?: string) => `/postgrado/maestrias/${slug}`,
            DIPLOMADO: '/postgrado/diplomados/:slug',
            DIPLOMADO_PARAM: (slug?: string) => `/postgrado/diplomados/${slug}`,
        },
    },
    IDIOMAS: {
        DEFAULT: '/idiomas',
        INGLES: '/idiomas/ingles',
        PORTUGUES: '/idiomas/portugues',
    },
    CONTACTOS: {
        DEFAULT: '/contactos',
        COORDINADORES_PREGRADO: '/contactos/coordinadores-pregrado',
    },
    ABOUT: {
        DEFAULT: '/conociendo-la-nur',
        FUNDACION: '/conociendo-la-nur/fundacion',
        MISION_VISION: '/conociendo-la-nur/mision-y-vision',
        FILOSOFIA: '/conociendo-la-nur/filosofia-educativa',
        PRINCIPIOS: '/conociendo-la-nur/principios-y-valores-institucionales',
        CONSTITUYENTES: '/conociendo-la-nur/constituyentes',
        AUTORIDADES: '/conociendo-la-nur/autoridades-ejecutivas',
        JUNTA_FIDUCIARIA: '/conociendo-la-nur/junta-fiduciaria',
        FUNDADORES: '/conociendo-la-nur/fundadores',
        LOGROS: '/conociendo-la-nur/logros',
        POLITICA: '/conociendo-la-nur/politica-de-calidad',
    },
    NOTICIAS: {
        DEFAULT: '/actividades',
        NOTICIA: '/actividades/:slug',
        NOTICIA_PARAM: (slug?: string) => `/actividades/${slug}`,
    },
    REVISTAS: {
        DEFAULT: '/revista-estudiantil',
        REVISTA: '/revista-estudiantil/:slug',
        REVISTA_PARAM: (slug?: string) => `/revista-estudiantil/${slug}`,
    },
    ADMIN: {
        DASHBOARD: adminPrefix + '/',
        LOGIN: adminPrefix + '/iniciar-sesion',
        USUARIO: {
            LISTAR: adminPrefix + '/usuarios',
            CREAR: adminPrefix + '/usuarios/crear',
            EDITAR: adminPrefix + '/usuarios/editar/:id',
            EDITAR_PARAM: (id?: number) => `${adminPrefix}/usuarios/editar/${id}`,
        },
        CURSO: {
            LISTAR: adminPrefix + '/cursos',
            ASIGNAR_MATERIAS: adminPrefix + '/cursos/asignar-materias/:slug',
            ASIGNAR_MATERIAS_PARAM: (slug?: string) => `${adminPrefix}/cursos/asignar-materias/${slug}`,
            ASIGNAR_CONTACTOS: adminPrefix + '/cursos/asignar-contactos/:slug',
            ASIGNAR_CONTACTOS_PARAM: (slug?: string) => `${adminPrefix}/cursos/asignar-contactos/${slug}`,
        },
        PREGRADO: {
            CREAR: adminPrefix + '/carreras/crear',
            EDITAR: adminPrefix + '/carreras/editar/:slug',
            EDITAR_PARAM: (slug?: string) => `${adminPrefix}/carreras/editar/${slug}`,
        },
        POSTGRADO: {
            CREAR_MAESTRIA: adminPrefix + '/maestria/crear',
            EDITAR_MAESTRIA: adminPrefix + '/maestrias/editar/:slug',
            EDITAR_MAESTRIA_PARAM: (slug?: string) => `${adminPrefix}/maestrias/editar/${slug}`,
            CREAR_DIPLOMADO: adminPrefix + '/diplomados/crear',
            EDITAR_DIPLOMADO: adminPrefix + '/diplomados/editar/:slug',
            EDITAR_DIPLOMADO_PARAM: (slug?: string) => `${adminPrefix}/diplomados/editar/${slug}`,
        },
        MATERIA: {
            LISTAR: adminPrefix + '/materias',
            CREAR: adminPrefix + '/materias/crear',
            EDITAR: adminPrefix + '/materias/editar/:id',
            EDITAR_PARAM: (id?: number) => `${adminPrefix}/materias/editar/${id}`,
        },
        CERTIFICACION: {
            LISTAR: adminPrefix + '/certificaciones',
        },
        CONTACTO: {
            LISTAR: adminPrefix + '/contactos',
            CREAR: adminPrefix + '/contactos/crear',
            EDITAR: adminPrefix + '/contactos/editar/:id',
            EDITAR_PARAM: (id?: number) => `${adminPrefix}/contactos/editar/${id}`,
            ASIGNAR_DEPARTAMENTO: adminPrefix + '/contactos/asignar-departamento/:id',
            ASIGNAR_DEPARTAMENTO_PARAM: (id?: number) => `${adminPrefix}/contactos/asignar-departamento/${id}`,
        },
        DEPARTAMENTO: {
            LISTAR: adminPrefix + '/departamentos',
            CREAR: adminPrefix + '/departamentos/crear',
            EDITAR: adminPrefix + '/departamentos/editar/:id',
            EDITAR_PARAM: (id?: number) => `${adminPrefix}/departamentos/editar/${id}`,
        },
        MODULO: {
            LISTAR: adminPrefix + '/modulos',
        },
        NOTICIA: {
            LISTAR: adminPrefix + '/noticias',
            CREAR: adminPrefix + '/noticias/crear',
            EDITAR: adminPrefix + '/noticias/editar/:slug',
            EDITAR_PARAM: (slug?: string) => `${adminPrefix}/noticias/editar/${slug}`,
            CONTENIDO: adminPrefix + '/noticias/:slug/contenido',
            CONTENIDO_PARAM: (slug?: string) => `${adminPrefix}/noticias/${slug}/contenido`,
        },
        REVISTA: {
            LISTAR: adminPrefix + '/revistas',
            CREAR: adminPrefix + '/revistas/crear',
            EDITAR: adminPrefix + '/revistas/editar/:slug',
            EDITAR_PARAM: (slug?: string) => `${adminPrefix}/revistas/editar/${slug}`,
        }
    }
}