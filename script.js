// =======================================================================
// 🟥 PARTE 1: FUNCIONALIDADES ORIGINALES DE TU HOME (PRESERVADAS)
// =======================================================================
const btnChatFlotante = document.getElementById('btnChatFlotante');
const popupChats = document.getElementById('popupChats');
const btnCerrarChats = document.getElementById('btnCerrarChats');
const btnChatFlotanteMobile = document.getElementById('btnChatFlotanteMobile');
const popupChatsMobile = document.getElementById('popupChatsMobile');
const btnCerrarChatsMobile = document.getElementById('btnCerrarChatsMobile');
const btnVerTodosChatsMobile = document.getElementById('btnVerTodosChatsMobile');

if (btnChatFlotante && popupChats && btnCerrarChats) {
  btnChatFlotante.addEventListener('click', (e) => {
    e.stopPropagation();
    popupChats.classList.toggle('activo');
  });

  btnCerrarChats.addEventListener('click', (e) => {
    e.stopPropagation();
    popupChats.classList.remove('activo');
  });

  document.addEventListener('click', (e) => {
    if (!popupChats.contains(e.target) && e.target !== btnChatFlotante) {
      popupChats.classList.remove('activo');
    }
  });
}

// Control Carrusel Automático Mobile original
let indiceCarrusel = 0;
const trackAuto = document.getElementById('trackAuto');
const diapositivas = document.querySelectorAll('.slide-auto');
let indiceCarruselMobile = 0;
const mobileHomeTrack = document.getElementById('mobileHomeTrack');
const diapositivasMobile = document.querySelectorAll('.mobile-home-slide');
const puntosCarruselMobile = document.querySelectorAll('.home-mobile-carousel-dots span');

function moverCarruselAutomatico() {
  if (mobileHomeTrack && diapositivasMobile.length > 0 && window.innerWidth <= 700) {
    indiceCarruselMobile = (indiceCarruselMobile + 1) % diapositivasMobile.length;
    mobileHomeTrack.style.transform = `translateX(-${indiceCarruselMobile * 100}%)`;
    puntosCarruselMobile.forEach((punto, indice) => punto.classList.toggle('activo', indice === indiceCarruselMobile));
  } else if (trackAuto && diapositivas.length > 0 && window.innerWidth <= 1024) {
    indiceCarrusel = (indiceCarrusel + 1) % diapositivas.length;
    const desplazamiento = -indiceCarrusel * 100;
    trackAuto.style.transform = `translateX(${desplazamiento}%)`;
  } else if (trackAuto) {
    trackAuto.style.transform = 'none';
    if (mobileHomeTrack) mobileHomeTrack.style.transform = 'none';
  }
}

if (btnChatFlotanteMobile && popupChatsMobile && btnCerrarChatsMobile) {
  btnChatFlotanteMobile.addEventListener('click', (evento) => {
    evento.stopPropagation();
    popupChatsMobile.classList.toggle('activo');
  });

  btnCerrarChatsMobile.addEventListener('click', () => popupChatsMobile.classList.remove('activo'));

  document.addEventListener('click', (evento) => {
    if (!popupChatsMobile.contains(evento.target) && !btnChatFlotanteMobile.contains(evento.target)) {
      popupChatsMobile.classList.remove('activo');
    }
  });
}

if (btnVerTodosChatsMobile) {
  btnVerTodosChatsMobile.addEventListener('click', () => {
    popupChatsMobile?.classList.remove('activo');
    irASeccion('vista-grupos', null);
  });
}
setInterval(moverCarruselAutomatico, 3000);


// =======================================================================
// 🟦 PARTE 2: SISTEMA SPA (NAVEGACIÓN LIMPIA SIN BUGS DE LÍNEA AZUL)
// =======================================================================


// Vistas del Sistema SPA
const vistaHome = document.getElementById('vista-home');
const vistaNota = document.getElementById('vista-nota');
const vistaCalendario = document.getElementById('vista-calendario');
const vistaPerfil = document.getElementById('vista-perfil');
const vistaGrupos = document.getElementById('vista-grupos');
const vistaGuardados = document.getElementById('vista-guardados');
const vistaCultura = document.getElementById('vista-cultura');
const vistaCine = document.getElementById('vista-cine');
const vistaMusica = document.getElementById('vista-musica');
const vistaEventos = document.getElementById('vista-eventos');
const vistaTicketMusica = document.getElementById('vista-ticket-musica');
const appFloatingNav = document.getElementById('app-floating-nav');
const notificacionGuardado = document.getElementById('notificacion-guardado');
let temporizadorNotificacionGuardado;
let temporizadorOcultarNotificacion;

const vistasConBarraFlotante = new Set([
  'vista-home',
  'vista-musica',
  'vista-eventos',
  'vista-ticket-musica',
  'vista-nota',
  'vista-calendario',
  'vista-cultura',
  'vista-cine',
  'vista-perfil',
  'vista-grupos',
  'vista-guardados'
]);

function actualizarBarraFlotante(idVista) {
  if (appFloatingNav) {
    appFloatingNav.hidden = !vistasConBarraFlotante.has(idVista);
  }

  const mostrarChatFlotante = idVista === 'vista-home';
  btnChatFlotanteMobile?.classList.toggle('visible-en-home', mostrarChatFlotante);
  popupChatsMobile?.classList.toggle('visible-en-home', mostrarChatFlotante);
  if (!mostrarChatFlotante) popupChatsMobile?.classList.remove('activo');
}

actualizarBarraFlotante('vista-home');

const eventosDisponibles = {
  'exposicion-rural': { categoria: 'CULTURA', titulo: 'Exposición Rural', detalle: '16 de julio de 2026 . 09:00 a 20:00 hs . Rural de Palermo', imagen: 'img/nuevo22.jpg' },
  'fito-paez': { categoria: 'MUSICA', titulo: 'Fito Páez', detalle: '18 de julio de 2026 . 21:00 hs . Movistar Arena', imagen: 'img/nuevo23.jpg' },
  'el-mato': { categoria: 'MUSICA', titulo: 'El Mato a un Policia Motorizado', detalle: '20 de julio de 2026 . 21:00 hs . C Art Media', imagen: 'img/nuevo24.jpg' },
  'rosalia-motomami': { categoria: 'MUSICA', titulo: 'Rosalía - Motomami World Tour', detalle: '1 de agosto de 2026 . 21:00 hs . Movistar Arena', imagen: 'img/nuevo25.jpg' },
  'argentina-game-show': { categoria: 'EVENTOS', titulo: 'Argentina Game Show (AGS)', detalle: '10 de octubre de 2026 . 12:00 hs . Costa Salguero', imagen: 'img/nuevo26.jpg' },
  'ed-sheeran': { categoria: 'MUSICA', titulo: 'Ed Sheeran - Mathematics Tour', detalle: '29 de noviembre de 2026 . 21:00 hs . Estadio Huracán', imagen: 'img/nuevo27.jpg' }
};

const guardadosEventosSeccion = document.getElementById('guardados-eventos-seccion');
const guardadosEventosLista = document.getElementById('guardados-eventos-lista');
let eventosGuardados = new Set();

try {
  eventosGuardados = new Set(JSON.parse(localStorage.getItem('indiehoy-eventos-guardados') || '[]'));
} catch {
  eventosGuardados = new Set();
}

function persistirEventosGuardados() {
  try {
    localStorage.setItem('indiehoy-eventos-guardados', JSON.stringify([...eventosGuardados]));
  } catch {
    // La interfaz sigue funcionando aunque el navegador no permita guardar datos locales.
  }
}

function mostrarNotificacionGuardado(titulo, fueGuardado) {
  if (!notificacionGuardado) return;

  const texto = notificacionGuardado.querySelector('span');
  if (texto) {
    texto.textContent = fueGuardado
      ? `${titulo} se guardó en Guardados.`
      : `${titulo} se quitó de Guardados.`;
  }

  clearTimeout(temporizadorNotificacionGuardado);
  clearTimeout(temporizadorOcultarNotificacion);
  notificacionGuardado.hidden = false;
  requestAnimationFrame(() => notificacionGuardado.classList.add('visible'));

  temporizadorNotificacionGuardado = setTimeout(() => {
    notificacionGuardado.classList.remove('visible');
    temporizadorOcultarNotificacion = setTimeout(() => { notificacionGuardado.hidden = true; }, 220);
  }, 3200);
}

function sincronizarBotonesEventos() {
  document.querySelectorAll('.btn-guardar-evento').forEach((boton) => {
    const guardado = eventosGuardados.has(boton.dataset.eventoId);
    boton.classList.toggle('activo', guardado);
    boton.setAttribute('aria-pressed', String(guardado));
    boton.setAttribute('aria-label', `${guardado ? 'Quitar de guardados' : 'Guardar'} ${eventosDisponibles[boton.dataset.eventoId]?.titulo || 'evento'}`);
    const icono = boton.querySelector('i');
    if (icono) icono.className = `${guardado ? 'fa-solid' : 'fa-regular'} fa-bookmark`;
  });
}

function renderizarEventosGuardados() {
  if (!guardadosEventosSeccion || !guardadosEventosLista) return;

  guardadosEventosSeccion.hidden = eventosGuardados.size === 0;
  guardadosEventosLista.innerHTML = '';

  eventosGuardados.forEach((idEvento) => {
    const evento = eventosDisponibles[idEvento];
    if (!evento) return;

    const tarjeta = document.createElement('article');
    tarjeta.className = 'guardado-evento-item';
    tarjeta.dataset.tipoGuardado = evento.categoria === 'MUSICA' ? 'musica' : evento.categoria === 'CULTURA' ? 'cultura' : 'eventos';
    tarjeta.innerHTML = `
      <div class="guardado-noticia-texto"><span class="guardado-evento-categoria">${evento.categoria}</span><h3>${evento.titulo}</h3><p>${evento.detalle}</p></div>
      <img src="${evento.imagen}" alt="${evento.titulo}">
      <button class="btn-guardar-evento activo" type="button" data-evento-id="${idEvento}" aria-label="Quitar de guardados ${evento.titulo}" aria-pressed="true"><i class="fa-solid fa-bookmark"></i></button>`;
    guardadosEventosLista.appendChild(tarjeta);
  });

  sincronizarBotonesEventos();
}

function alternarEventoGuardado(idEvento) {
  if (!eventosDisponibles[idEvento]) return;

  const fueGuardado = !eventosGuardados.has(idEvento);

  if (!fueGuardado) {
    eventosGuardados.delete(idEvento);
  } else {
    eventosGuardados.add(idEvento);
  }

  persistirEventosGuardados();
  renderizarEventosGuardados();
  sincronizarBotonesEventos();
  mostrarNotificacionGuardado(eventosDisponibles[idEvento].titulo, fueGuardado);
}

document.addEventListener('click', (evento) => {
  const botonGuardar = evento.target.closest('.btn-guardar-evento');
  if (!botonGuardar) return;
  alternarEventoGuardado(botonGuardar.dataset.eventoId);
});

document.addEventListener('click', (evento) => {
  const boton = evento.target.closest('.cal-event-bookmark');
  if (!boton) return;
  const activo = boton.classList.toggle('activo');
  const icono = boton.querySelector('i');
  if (icono) icono.className = `${activo ? 'fa-solid' : 'fa-regular'} fa-bookmark`;
  boton.setAttribute('aria-pressed', String(activo));
});

document.addEventListener('click', (evento) => {
  if (!evento.target.closest('.btn-grupo-evento-chat')) return;
  irASeccion('vista-grupos', null);
});

renderizarEventosGuardados();

// Función centralizada para cambiar de sección
function irASeccion(idSeccionA_Mostrar, idBotonNav) {
  // 1. Ocultar TODAS las vistas
  if (vistaHome) vistaHome.style.display = 'none';
  if (vistaNota) vistaNota.style.display = 'none';
  if (vistaCalendario) vistaCalendario.style.display = 'none';
  if (vistaPerfil) vistaPerfil.style.display = 'none';
  if (vistaGrupos) vistaGrupos.style.display = 'none';
  if (vistaGuardados) vistaGuardados.style.display = 'none';
  if (vistaCultura) vistaCultura.style.display = 'none';
  if (vistaCine) vistaCine.style.display = 'none';
  if (vistaMusica) vistaMusica.style.display = 'none';
  if (vistaEventos) vistaEventos.style.display = 'none';
  if (vistaTicketMusica) vistaTicketMusica.style.display = 'none';

  // 2. Mostrar la sección seleccionada
  const seccion = document.getElementById(idSeccionA_Mostrar);
  if (seccion) seccion.style.display = idSeccionA_Mostrar === 'vista-home' ? 'flex' : 'block';
  actualizarBarraFlotante(idSeccionA_Mostrar);

  // 3. Limpiar la línea azul / activa de todos los links del navbar
  const navLinks = document.querySelectorAll(".nav-links a");
  navLinks.forEach(link => {
    link.classList.remove("active", "active-azul");
  });

  // 4. Asignar la clase correcta al botón del navbar
  if (idBotonNav) {
    const botonActivo = document.getElementById(idBotonNav);
    if (botonActivo) {
      if (idSeccionA_Mostrar === 'vista-calendario') {
        botonActivo.classList.add("active-azul"); 
      } else {
        botonActivo.classList.add("active"); 
      }
    }
  }
  window.scrollTo(0, 0);
}

function abrirEntradaMusica(tarjeta) {
  if (!tarjeta || !vistaTicketMusica) return;

  const imagen = tarjeta.querySelector('.cal-ticket-imagen img');
  const artista = tarjeta.querySelector('.cal-ticket-imagen h2')?.textContent.trim() || 'SHOW EN VIVO';
  const fecha = tarjeta.querySelector('.cal-ticket-fecha')?.textContent.trim() || '';
  const datos = tarjeta.querySelectorAll('.cal-ticket-contenido p');
  const hora = datos[0]?.textContent.trim() || '';
  const lugar = datos[1]?.textContent.trim() || '';
  const tipo = tarjeta.querySelector('.cal-ticket-contenido b')?.textContent.trim() || '';
  const seccion = tarjeta.querySelector('.cal-ticket-contenido em')?.textContent.trim() || '';
  const codigo = `${artista.replace(/[^A-Z0-9]/gi, '').slice(0, 2).toUpperCase()}${fecha.replace(/[^0-9]/g, '').slice(0, 4)}X7K9`;

  const establecerTexto = (id, valor) => {
    const elemento = document.getElementById(id);
    if (elemento) elemento.textContent = valor;
  };

  const imagenEntrada = document.getElementById('entrada-musica-imagen');
  if (imagenEntrada && imagen) {
    imagenEntrada.src = imagen.src;
    imagenEntrada.alt = artista;
  }

  establecerTexto('entrada-musica-artista', artista);
  establecerTexto('entrada-musica-fecha', fecha);
  establecerTexto('entrada-musica-hora', hora);
  establecerTexto('entrada-musica-lugar', lugar.toUpperCase());
  establecerTexto('entrada-musica-ciudad', lugar.toLowerCase().includes('estadio uno') ? 'La Plata' : 'Buenos Aires');
  establecerTexto('entrada-musica-tipo', tipo);
  establecerTexto('entrada-musica-seccion', seccion.toUpperCase());
  establecerTexto('entrada-musica-codigo', codigo || 'IH23X7K9');
  irASeccion('vista-ticket-musica', null);
}

document.addEventListener('click', (evento) => {
  const botonEntrada = evento.target.closest('.cal-musica-ticket button');
  if (!botonEntrada) return;
  abrirEntradaMusica(botonEntrada.closest('.cal-musica-ticket'));
});

const btnVolverTicketsMusica = document.getElementById('btn-volver-tickets-musica');
if (btnVolverTicketsMusica) {
  btnVolverTicketsMusica.addEventListener('click', () => {
    irASeccion('vista-calendario', null);
    document.getElementById('btn-categoria-musica')?.click();
  });
}

const btnDescargarEntrada = document.getElementById('btn-descargar-entrada');
if (btnDescargarEntrada) {
  btnDescargarEntrada.addEventListener('click', () => {
    const textoOriginal = btnDescargarEntrada.innerHTML;
    btnDescargarEntrada.classList.add('descargado');
    btnDescargarEntrada.innerHTML = '<i class="fa-solid fa-check"></i>TICKET DESCARGADO';
    setTimeout(() => {
      btnDescargarEntrada.classList.remove('descargado');
      btnDescargarEntrada.innerHTML = textoOriginal;
    }, 2400);
  });
}

// Configuración principal
document.addEventListener('DOMContentLoaded', () => {
  const btnNavCalendario = document.getElementById("btn-nav-calendario");
  const btnNavMusica = document.getElementById("btn-nav-musica");
  const btnNavCine = document.getElementById("btn-nav-cine");
  const btnNavCultura = document.getElementById("btn-nav-cultura");
  const btnMenuHamburguesa = document.querySelector('.menu-hamburguesa');
  const navMenu = document.getElementById('nav-links');
  const avatarHeader = document.querySelector('.avatar-header');
  const btnHomeGruposFull = document.getElementById('btn-home-grupos-full');
  const btnVerTodosChats = document.querySelector('.btn-ver-todos-chats');
  const tabsGrupos = document.querySelectorAll('.grupo-tab');
  const itemsGrupos = document.querySelectorAll('.grupo-chat-item');
  const btnPerfilChatsFull = document.getElementById('btn-perfil-chats-full');
  const btnPerfilGuardadosFull = document.getElementById('btn-perfil-guardados-full');
  const tabPerfilGuardados = document.getElementById('tab-perfil-guardados');
  const tabPerfilChats = document.getElementById('tab-perfil-chats');
  const perfilGuardados = document.getElementById('perfil-guardados');
  const perfilChats = document.getElementById('perfil-chats');
  const tabsGuardados = document.querySelectorAll('.guardado-tab');
  const itemsGuardados = document.querySelectorAll('.guardado-noticia-item');
  const botonesBookmark = document.querySelectorAll('.btn-bookmark:not(.btn-guardar-noticia)');
  const botonesUnirseGrupo = document.querySelectorAll('.btn-unirse-grupo');
  const btnQuickChats = document.getElementById('btn-quick-chats');
  const btnQuickCalendario = document.getElementById('btn-quick-calendario');
  const btnQuickGuardados = document.getElementById('btn-quick-guardados');
  const carruselGruposEventos = document.getElementById('eventos-grupos-track');
  const carruselGruposCultura = document.getElementById('cultura-grupos-track');
  const carruselDebateCultura = document.getElementById('cultura-debate-carrusel');
  const carruselGruposCine = document.getElementById('cine-grupos-track');
  const carruselDebateCine = document.getElementById('cine-debate-carrusel');
  const carruselGruposMusica = document.getElementById('musica-grupos-track');
  const carruselAlbumsMusica = document.getElementById('musica-albums-carrusel');
  const carruselDebateMusica = document.getElementById('musica-debate-carrusel');

  // Lógica del Menú Hamburguesa
  if (btnMenuHamburguesa && navMenu) {
    const cerrarMenu = () => {
      navMenu.classList.remove('activo');
      btnMenuHamburguesa.setAttribute('aria-expanded', 'false');
    };

    btnMenuHamburguesa.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const estaAbierto = navMenu.classList.toggle('activo');
      btnMenuHamburguesa.setAttribute('aria-expanded', String(estaAbierto));
    });

    document.addEventListener('click', (event) => {
      if (!event.target.closest('.menu-hamburguesa') && !event.target.closest('.nav-links')) {
        cerrarMenu();
      }
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', cerrarMenu);
    });
  }

  // Eventos de Navegación
  if (btnNavCalendario) btnNavCalendario.addEventListener("click", (e) => { e.preventDefault(); irASeccion("vista-eventos", "btn-nav-calendario"); });
  if (btnNavMusica) btnNavMusica.addEventListener("click", (e) => { e.preventDefault(); irASeccion("vista-musica", "btn-nav-musica"); });
  if (btnNavCine) btnNavCine.addEventListener("click", (e) => { e.preventDefault(); irASeccion("vista-cine", "btn-nav-cine"); });
  if (btnNavCultura) btnNavCultura.addEventListener("click", (e) => { e.preventDefault(); irASeccion("vista-cultura", "btn-nav-cultura"); });

  if (btnQuickChats) btnQuickChats.addEventListener('click', () => irASeccion('vista-grupos', null));
  if (btnQuickGuardados) btnQuickGuardados.addEventListener('click', () => irASeccion('vista-guardados', null));
  if (btnQuickCalendario) btnQuickCalendario.addEventListener('click', () => {
    irASeccion('vista-calendario', null);
    const btnTabCalendario = document.getElementById('btn-tab-calendario');
    if (btnTabCalendario) btnTabCalendario.click();
  });

  if (carruselGruposEventos) {
    let carruselEnPausa = false;
    const primerGrupo = carruselGruposEventos.querySelector('.evento-grupo-card');
    const avanzarCarruselGrupos = () => {
      if (carruselEnPausa || !primerGrupo || (vistaEventos && vistaEventos.style.display === 'none') || carruselGruposEventos.scrollWidth <= carruselGruposEventos.clientWidth) return;

      const salto = primerGrupo.offsetWidth + 14;
      const llegoAlFinal = carruselGruposEventos.scrollLeft + carruselGruposEventos.clientWidth >= carruselGruposEventos.scrollWidth - 4;
      carruselGruposEventos.scrollTo({ left: llegoAlFinal ? 0 : carruselGruposEventos.scrollLeft + salto, behavior: 'smooth' });
    };

    setInterval(avanzarCarruselGrupos, 4200);
    carruselGruposEventos.addEventListener('pointerenter', () => { carruselEnPausa = true; });
    carruselGruposEventos.addEventListener('pointerleave', () => { carruselEnPausa = false; });
    carruselGruposEventos.addEventListener('touchstart', () => { carruselEnPausa = true; }, { passive: true });
    carruselGruposEventos.addEventListener('touchend', () => { carruselEnPausa = false; }, { passive: true });
  }

  const activarCarruselSeccion = (carrusel, selectorTarjeta, vista) => {
    if (!carrusel) return;

    let carruselEnPausa = false;
    const primeraTarjeta = carrusel.querySelector(selectorTarjeta);
    const avanzar = () => {
      if (carruselEnPausa || !primeraTarjeta || (vista && vista.style.display === 'none') || carrusel.scrollWidth <= carrusel.clientWidth) return;

      const separacion = Number.parseFloat(getComputedStyle(carrusel).gap) || 10;
      const salto = primeraTarjeta.offsetWidth + separacion;
      const llegoAlFinal = carrusel.scrollLeft + carrusel.clientWidth >= carrusel.scrollWidth - 4;
      carrusel.scrollTo({ left: llegoAlFinal ? 0 : carrusel.scrollLeft + salto, behavior: 'smooth' });
    };

    setInterval(avanzar, 4400);
    carrusel.addEventListener('pointerenter', () => { carruselEnPausa = true; });
    carrusel.addEventListener('pointerleave', () => { carruselEnPausa = false; });
    carrusel.addEventListener('touchstart', () => { carruselEnPausa = true; }, { passive: true });
    carrusel.addEventListener('touchend', () => { carruselEnPausa = false; }, { passive: true });
  };

  activarCarruselSeccion(carruselGruposCultura, '.cultura-grupo-card', vistaCultura);
  activarCarruselSeccion(carruselDebateCultura, '.cultura-debate-card', vistaCultura);
  activarCarruselSeccion(carruselGruposCine, '.cine-grupo-card', vistaCine);
  activarCarruselSeccion(carruselDebateCine, '.cine-debate-card', vistaCine);
  activarCarruselSeccion(carruselGruposMusica, '.musica-grupo-card', vistaMusica);
  activarCarruselSeccion(carruselAlbumsMusica, '.musica-album-card', vistaMusica);
  activarCarruselSeccion(carruselDebateMusica, '.musica-debate-card', vistaMusica);

  if (btnHomeGruposFull) {
    btnHomeGruposFull.addEventListener('click', (e) => {
      e.preventDefault();
      irASeccion('vista-grupos', null);
    });
  }

  if (btnVerTodosChats) {
    btnVerTodosChats.addEventListener('click', (e) => {
      e.preventDefault();
      if (popupChats) popupChats.classList.remove('activo');
      irASeccion('vista-grupos', null);
    });
  }

  if (btnPerfilChatsFull) {
    btnPerfilChatsFull.addEventListener('click', (e) => {
      e.preventDefault();
      irASeccion('vista-grupos', null);
    });
  }

  if (btnPerfilGuardadosFull) {
    btnPerfilGuardadosFull.addEventListener('click', (e) => {
      e.preventDefault();
      irASeccion('vista-guardados', null);
    });
  }

  if (tabPerfilGuardados && perfilGuardados) {
    tabPerfilGuardados.addEventListener('click', () => {
      document.querySelectorAll('.tab-perfil').forEach((tab) => tab.classList.remove('activo'));
      tabPerfilGuardados.classList.add('activo');
      perfilGuardados.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  if (tabPerfilChats && perfilChats) {
    tabPerfilChats.addEventListener('click', () => {
      document.querySelectorAll('.tab-perfil').forEach((tab) => tab.classList.remove('activo'));
      tabPerfilChats.classList.add('activo');
      perfilChats.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
  
  // Avatar a Perfil
  if (avatarHeader) {
    avatarHeader.style.cursor = 'pointer';
    avatarHeader.addEventListener('click', () => irASeccion('vista-perfil', null));
  }

  // BOTÓN "VER CALENDARIO COMPLETO" (EL QUE AGREGAMOS)
  const botonesIrCalendarioFull = document.querySelectorAll('#btn-home-calendario-full, .btn-home-calendario-ver-todo');
  botonesIrCalendarioFull.forEach((boton) => {
    boton.addEventListener('click', (e) => {
      e.preventDefault();
      irASeccion("vista-calendario", null);
    });
  });

  tabsGrupos.forEach((tab) => {
    tab.addEventListener('click', () => {
      const filtro = tab.dataset.filtroGrupo;

      tabsGrupos.forEach((item) => item.classList.remove('activo'));
      tab.classList.add('activo');

      itemsGrupos.forEach((item) => {
        const tipos = item.dataset.tipoGrupo || '';
        const mostrar = filtro === 'todos' || tipos.includes(filtro);
        item.classList.toggle('oculto', !mostrar);
      });
    });
  });

  tabsGuardados.forEach((tab) => {
    tab.addEventListener('click', () => {
      const filtro = tab.dataset.filtroGuardado;

      tabsGuardados.forEach((item) => item.classList.remove('activo'));
      tab.classList.add('activo');

      document.querySelectorAll('.guardado-noticia-item, .guardado-evento-item').forEach((item) => {
        const tipo = item.dataset.tipoGuardado || '';
        const mostrar = filtro === 'todos' || tipo === filtro;
        item.classList.toggle('oculto', !mostrar);
      });
    });
  });

  botonesBookmark.forEach((boton) => {
    boton.addEventListener('click', () => {
      const fueGuardada = !boton.classList.contains('activo');
      boton.classList.toggle('activo', fueGuardada);
      boton.setAttribute('aria-pressed', String(fueGuardada));
      boton.setAttribute('aria-label', fueGuardada ? 'Quitar de guardados' : 'Guardar en guardados');

      const icono = boton.querySelector('i');
      if (icono) icono.className = `${fueGuardada ? 'fa-solid' : 'fa-regular'} fa-bookmark`;

      const titulo = boton.closest('.guardado-noticia-item')?.querySelector('h3')?.textContent?.trim() || 'La noticia';
      mostrarNotificacionGuardado(titulo, fueGuardada);
    });
  });

  botonesUnirseGrupo.forEach((boton) => {
    boton.addEventListener('click', () => {
      const estaUnido = boton.classList.toggle('unido');
      boton.textContent = estaUnido ? 'Te uniste perfectamente' : 'Unirse';
      boton.setAttribute('aria-pressed', String(estaUnido));
      boton.setAttribute('aria-label', estaUnido ? 'Desunirte del grupo' : 'Unirte al grupo');
      boton.title = estaUnido ? 'Hacé clic para desunirte' : 'Unirte al grupo';
    });
  });
});

// Retorno a Home desde el Logo
if (document.getElementById('btn-logo-home')) {
  document.getElementById('btn-logo-home').addEventListener('click', () => irASeccion("vista-home", null));
}

// =======================================================================
// 🟨 PARTE 3: BASE DE DATOS DE NOTAS Y APERTURA DINÁMICA
// =======================================================================
const infoNoticias = {
  duki: {
    titulo: "La empresa detrás de los shows de Duki, Bizarrap y más artistas argentinos se asocia con Live Nation",
    categoria: "Musica",
    tipoGuardado: "musica",
    bajada: "La compañía estadounidense describió la operación como 'una alianza estratégica orientada a expandir la música en español en la Argentina y en la región'.",
    autor: "De Lucas Santomero - 03/05/2026",
    imagen: "img/duki.jpg",
    epigrafe: "Duki en Buenos Aires Trap 2024. Foto: Mica Garate para Indie Hoy",
    cuerpo: `<p><strong>Live Nation Entertainment</strong> anunció la <strong>adquisición de una participación mayoritaria en Dale Play Live</strong>, la división de shows en vivo de Dale Play Entertainment, la productora fundada por Federico Lauría.</p>
             <p>No se informaron los términos económicos del acuerdo, pero trascendió que Lauría continuará al frente de la dirección creativa y estratégica de la empresa. "Buenos Aires es el segundo mercado musical más grande de América del Sur y una prioridad para Live Nation", afirmó Michael Rapino, presidente y CEO global de la compañía.</p>`
  },
  lali: {
    titulo: "Lali nos cuenta como fue llenar 3 estadio River. Todo el detras de la exitosa cantante argentina.",
    categoria: "Musica",
    tipoGuardado: "musica",
    bajada: "En una charla íntima, la diva del pop argentino confiesa los desafíos de producción y la emoción de marcar un récord absoluto.",
    autor: "Por Redacción Indie Hoy - 15/04/2026",
    imagen: "img/lali.png",
    epigrafe: "Lali Espósito haciendo historia en el Estadio River Plate. Foto para Indie Hoy",
    cuerpo: `<p>El fenómeno de <strong>Lali</strong> no tiene techo. Convertirse en la primera mujer del pop local en agotar tres estadios River Plate es una hazaña que quedará grabada en las páginas doradas de nuestra cultura musical.</p>
             <p>Durante la entrevista exclusiva, repasamos los meses de ensayo coreográfico, los cambios de vestuario y la puesta en escena de nivel internacional que demandó este show histórico.</p>`
  },
  spiderman: {
    titulo: "Te contamos 10 datos que no sabias sobre Spider-Man: De regreso a casa",
    categoria: "Cine/Series",
    tipoGuardado: "cine-series",
    bajada: "Secretos de rodaje, trajes ocultos y las improvisaciones de Tom Holland que cambiaron el rumbo del universo arácnido.",
    autor: "De Cine & Series Indie - 28/05/2026",
    imagen: "img/spiderman.png",
    epigrafe: "Tom Holland encarnando al icónico Spider-Man de Marvel Studios.",
    cuerpo: `<p>El relanzamiento de Spider-Man dentro del MCU trajo frescura a la franquicia. Sin embargo, detrás de cámaras ocurrieron detalles asombrosos que transformaron por completo la película.</p>
             <p>Desde el exigente entrenamiento físico de Tom Holland hasta las referencias ocultas a los cómics clásicos de Stan Lee, desglosamos las curiosidades indispensables para todo fanático del héroe arácnido.</p>`
  }
};

// Nodos dinámicos de la interfaz de lectura
infoNoticias.duki.cuerpo += `
  <p>La alianza busca potenciar giras, festivales y experiencias para fans en la region, con una agenda que podria cruzar musica urbana, pop y nuevos formatos de comunidad alrededor de cada show.</p>
  <div class="articulo-imagen-caja articulo-imagen-secundaria">
    <img src="img/dukigrupo.png" alt="Duki poster">
    <span class="articulo-epigrafe">Duki prepara nuevas fechas junto a su comunidad de fans.</span>
  </div>
  <p>Para la escena local, el movimiento marca un paso importante: no solo por la escala de produccion, sino tambien por la posibilidad de conectar a artistas argentinos con circuitos internacionales cada vez mas grandes.</p>
`;

const guardadosNoticiasDinamicas = document.getElementById('guardados-noticias-dinamicas');
let noticiasGuardadas = new Set();

try {
  noticiasGuardadas = new Set(JSON.parse(localStorage.getItem('indiehoy-noticias-guardadas') || '[]'));
} catch {
  noticiasGuardadas = new Set();
}

function persistirNoticiasGuardadas() {
  try {
    localStorage.setItem('indiehoy-noticias-guardadas', JSON.stringify([...noticiasGuardadas]));
  } catch {
    // La lista sigue funcionando durante esta visita aunque no se pueda guardar localmente.
  }
}

function renderizarNoticiasGuardadas() {
  if (!guardadosNoticiasDinamicas) return;

  guardadosNoticiasDinamicas.innerHTML = '';

  noticiasGuardadas.forEach((idNoticia) => {
    const noticia = infoNoticias[idNoticia];
    if (!noticia) return;

    const tarjeta = document.createElement('article');
    tarjeta.className = 'guardado-noticia-item';
    tarjeta.dataset.tipoGuardado = noticia.tipoGuardado;
    tarjeta.innerHTML = `
      <div class="guardado-noticia-texto">
        <span class="guardado-categoria ${noticia.tipoGuardado}">${noticia.categoria}</span>
        <h3>${noticia.titulo}</h3>
        <p>${noticia.autor}</p>
      </div>
      <img src="${noticia.imagen}" alt="${noticia.titulo}">
      <button class="btn-bookmark btn-guardar-noticia activo" type="button" data-noticia-id="${idNoticia}" aria-label="Quitar de guardados ${noticia.titulo}" aria-pressed="true"><i class="fa-solid fa-bookmark"></i></button>`;
    guardadosNoticiasDinamicas.appendChild(tarjeta);
  });
}

function sincronizarMarcadorNoticiaActual() {
  if (!btnGuardarMarcador) return;

  const guardada = noticiasGuardadas.has(noticiaActual);
  const icono = btnGuardarMarcador.querySelector('i');
  if (icono) icono.className = `${guardada ? 'fa-solid' : 'fa-regular'} fa-bookmark`;
  btnGuardarMarcador.style.color = guardada ? '#2b66ff' : '#ffffff';
  btnGuardarMarcador.setAttribute('aria-label', guardada ? 'Quitar noticia de guardados' : 'Guardar noticia');
  btnGuardarMarcador.setAttribute('aria-pressed', String(guardada));
}

function alternarNoticiaGuardada(idNoticia) {
  const noticia = infoNoticias[idNoticia];
  if (!noticia) return false;

  const fueGuardada = !noticiasGuardadas.has(idNoticia);
  if (fueGuardada) {
    noticiasGuardadas.add(idNoticia);
  } else {
    noticiasGuardadas.delete(idNoticia);
  }

  persistirNoticiasGuardadas();
  renderizarNoticiasGuardadas();
  sincronizarMarcadorNoticiaActual();
  mostrarNotificacionGuardado(noticia.titulo, fueGuardada);
  return fueGuardada;
}

document.addEventListener('click', (evento) => {
  const botonGuardarNoticia = evento.target.closest('.btn-guardar-noticia');
  if (!botonGuardarNoticia) return;
  alternarNoticiaGuardada(botonGuardarNoticia.dataset.noticiaId);
});

renderizarNoticiasGuardadas();

const txtTitulo = document.getElementById('dinamico-titulo');
const txtBajada = document.getElementById('dinamico-bajada');
const txtAutor = document.getElementById('dinamico-autor');
const imgNota = document.getElementById('dinamico-imagen');
const txtEpigrafe = document.getElementById('dinamico-epigrafe');
const txtCuerpo = document.getElementById('dinamico-cuerpo');
const comentariosNoticiaDuki = document.getElementById('comentarios-noticia-duki');
const comentariosContador = document.getElementById('comentarios-contador');
const comentariosLista = document.getElementById('comentarios-lista');
const chatNoticiaDuki = document.getElementById('chat-noticia-duki');
const btnToggleChatLateral = document.getElementById('btn-toggle-chat-lateral');
const chatEnVivoForm = document.getElementById('chat-en-vivo-form');
const chatEnVivoTexto = document.getElementById('chat-en-vivo-texto');
const chatEnVivoMensajes = document.querySelector('.chat-en-vivo-mensajes');
const articuloPrincipalNoticia = document.querySelector('.articulo-principal');
const sidebarNoticia = document.querySelector('.sidebar-noticia');
let marcadorComentariosNoticia;

if (comentariosNoticiaDuki && articuloPrincipalNoticia) {
  marcadorComentariosNoticia = document.createComment('ubicacion original de comentarios');
  articuloPrincipalNoticia.insertBefore(marcadorComentariosNoticia, comentariosNoticiaDuki);
}

function ordenarNoticiaEnCelular() {
  if (!comentariosNoticiaDuki || !sidebarNoticia || !marcadorComentariosNoticia) return;

  if (window.innerWidth <= 700) {
    sidebarNoticia.after(comentariosNoticiaDuki);
  } else {
    marcadorComentariosNoticia.after(comentariosNoticiaDuki);
  }
}

window.addEventListener('resize', ordenarNoticiaEnCelular);

const comentariosPorNoticia = {
  duki: {
    total: 150,
    items: [
      { usuario: 'DanteLopez_', tiempo: 'Hace 10 min', texto: 'Que locura lo de Duki, esto puede abrir muchas puertas para los artistas de aca.', avatar: 'img/usuario2.png', likes: 12 },
      { usuario: 'Charoo_04', tiempo: 'Hace 22 min', texto: 'Ojala anuncien mas fechas, el Movistar le queda chico ya.', avatar: 'img/usuario3.png', likes: 8 },
      { usuario: 'Martina_Indie', tiempo: 'Hace 31 min', texto: 'Me encanta que la escena argentina empiece a tener este nivel de produccion.', avatar: 'img/usuario4.png', likes: 16 }
    ]
  },
  lali: {
    total: 58,
    items: [
      { usuario: 'Cande', tiempo: 'Hace 8 min', texto: 'Que orgullo verla llenar River, se merece todo lo que le esta pasando.', avatar: 'img/usuario5.jpg', likes: 21 },
      { usuario: 'Tomi', tiempo: 'Hace 16 min', texto: 'El show fue increible, quiero que anuncie mas fechas ya.', avatar: 'img/usuario6.png', likes: 9 },
      { usuario: 'Mica', tiempo: 'Hace 29 min', texto: 'Una artista enorme, nos representa en todos lados.', avatar: 'img/usuario7.png', likes: 14 }
    ]
  },
  spiderman: {
    total: 145,
    items: [
      { usuario: 'Nico', tiempo: 'Hace 5 min', texto: 'La escena del tren sigue siendo una de mis favoritas de todas las peliculas.', avatar: 'img/usuario8.png', likes: 33 },
      { usuario: 'Luli', tiempo: 'Hace 19 min', texto: 'No sabia varios de estos datos, necesito verla de nuevo.', avatar: 'img/usuario5.jpg', likes: 18 },
      { usuario: 'Tomas', tiempo: 'Hace 35 min', texto: 'Tom Holland fue un Spider-Man perfecto desde la primera pelicula.', avatar: 'img/usuario6.png', likes: 24 }
    ]
  }
};

const mensajesChatPorNoticia = {
  duki: [
    { usuario: 'Lucia', texto: 'Que locura esto, Live Nation se queda con todo el mercado latino.', avatar: 'img/usuario5.jpg' },
    { usuario: 'Tomas', texto: 'Lauria viene armando shows en Argentina y ahora es una maquina total.', avatar: 'img/usuario6.png' },
    { usuario: 'Mica', texto: 'Espero que esto no haga que las entradas de Duki vuelvan a salir carisimas.', avatar: 'img/usuario7.png' },
    { usuario: 'Nico', texto: 'Lo de Bizarrap es otro nivel, las Music Sessions lo pusieron en el mapa mundial.', avatar: 'img/usuario8.png' }
  ],
  lali: [
    { usuario: 'Cande', texto: 'Todavia no puedo creer que haya llenado tres River, es enorme.', avatar: 'img/usuario5.jpg' },
    { usuario: 'Tomas', texto: 'La puesta en escena estuvo a otro nivel, quiero verla otra vez.', avatar: 'img/usuario6.png' },
    { usuario: 'Mica', texto: 'Lali se merece cada uno de estos logros, que orgullo.', avatar: 'img/usuario7.png' },
    { usuario: 'Nico', texto: 'Ojala anuncie mas fechas para quienes no conseguimos entrada.', avatar: 'img/usuario8.png' }
  ],
  spiderman: [
    { usuario: 'Nico', texto: 'La escena del tren sigue siendo una de las mejores de la saga.', avatar: 'img/usuario8.png' },
    { usuario: 'Lucia', texto: 'No sabia varios de estos datos, necesito verla de nuevo.', avatar: 'img/usuario5.jpg' },
    { usuario: 'Tomas', texto: 'Tom Holland fue un Spider-Man perfecto desde la primera pelicula.', avatar: 'img/usuario6.png' },
    { usuario: 'Mica', texto: 'De regreso a casa tiene momentos buenisimos, es mi favorita.', avatar: 'img/usuario7.png' }
  ]
};

let noticiaActual = 'duki';

function renderizarComentarios(idNoticia) {
  const datos = comentariosPorNoticia[idNoticia];
  if (!datos || !comentariosLista) return;

  if (comentariosContador) comentariosContador.textContent = datos.total;
  comentariosLista.innerHTML = '';

  datos.items.forEach((comentario, indice) => {
    const tarjeta = document.createElement('article');
    tarjeta.className = 'comentario-card';

    const avatar = document.createElement('img');
    avatar.src = comentario.avatar;
    avatar.alt = comentario.usuario;

    const contenido = document.createElement('div');
    contenido.className = 'comentario-contenido';

    const meta = document.createElement('div');
    meta.className = 'comentario-meta';
    const usuario = document.createElement('strong');
    usuario.textContent = comentario.usuario;
    const tiempo = document.createElement('span');
    tiempo.textContent = comentario.tiempo;
    meta.append(usuario, tiempo);

    const texto = document.createElement('p');
    texto.textContent = comentario.texto;
    contenido.append(meta, texto);

    const like = document.createElement('button');
    like.type = 'button';
    like.className = 'comentario-like';
    like.dataset.indiceComentario = indice;
    like.setAttribute('aria-label', 'Me gusta');
    like.setAttribute('aria-pressed', String(Boolean(comentario.leGusta)));
    like.innerHTML = `<i class="${comentario.leGusta ? 'fa-solid' : 'fa-regular'} fa-heart"></i><span>${comentario.likes}</span>`;
    like.classList.toggle('activo', Boolean(comentario.leGusta));

    tarjeta.append(avatar, contenido, like);
    comentariosLista.appendChild(tarjeta);
  });
}

function renderizarChatLateral(idNoticia) {
  const mensajes = mensajesChatPorNoticia[idNoticia];
  if (!mensajes || !chatEnVivoMensajes) return;

  chatEnVivoMensajes.innerHTML = mensajes.map((mensaje) => `
    <article class="chat-en-vivo-msg">
      <img src="${mensaje.avatar}" alt="${mensaje.usuario}">
      <div><div class="chat-burbuja"><strong>${mensaje.usuario}</strong><p>${mensaje.texto}</p></div></div>
    </article>`).join('');
  chatEnVivoMensajes.scrollTop = 0;
}

if (comentariosLista) {
  comentariosLista.addEventListener('click', (evento) => {
    const botonLike = evento.target.closest('.comentario-like');
    if (!botonLike) return;

    const comentario = comentariosPorNoticia[noticiaActual]?.items[Number(botonLike.dataset.indiceComentario)];
    if (!comentario) return;

    comentario.leGusta = !comentario.leGusta;
    comentario.likes += comentario.leGusta ? 1 : -1;
    renderizarComentarios(noticiaActual);
  });
}

if (chatEnVivoForm && chatEnVivoTexto && chatEnVivoMensajes) {
  chatEnVivoForm.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const mensaje = chatEnVivoTexto.value.trim();
    if (!mensaje) return;

    const item = document.createElement('article');
    item.className = 'chat-en-vivo-msg chat-en-vivo-msg-propio';
    item.innerHTML = `
      <img src="img/usuario.png" alt="Martina Alvarez">
      <div><div class="chat-burbuja"><strong>Martina Alvarez</strong><p></p></div></div>`;
    item.querySelector('p').textContent = mensaje;
    chatEnVivoMensajes.appendChild(item);
    chatEnVivoTexto.value = '';
    chatEnVivoMensajes.scrollTop = chatEnVivoMensajes.scrollHeight;
  });
}

if (chatNoticiaDuki && btnToggleChatLateral) {
  btnToggleChatLateral.addEventListener('click', () => {
    const chatEstaOculto = chatNoticiaDuki.classList.toggle('chat-cerrado');

    btnToggleChatLateral.textContent = chatEstaOculto ? 'ABRIR CHAT' : 'OCULTAR CHAT';
    btnToggleChatLateral.setAttribute('aria-expanded', String(!chatEstaOculto));
  });
}

function abrirNoticia(idNoticia) {
  const data = infoNoticias[idNoticia];
  if (data) {
    if (txtTitulo) txtTitulo.innerText = data.titulo;
    if (txtBajada) txtBajada.innerText = data.bajada;
    if (txtAutor) txtAutor.innerText = data.autor;
    if (imgNota) imgNota.src = data.imagen;
    if (txtEpigrafe) txtEpigrafe.innerText = data.epigrafe;
    if (txtCuerpo) txtCuerpo.innerHTML = data.cuerpo;
    noticiaActual = idNoticia;
    sincronizarMarcadorNoticiaActual();
    renderizarComentarios(idNoticia);
    renderizarChatLateral(idNoticia);
    ordenarNoticiaEnCelular();
    if (comentariosNoticiaDuki) comentariosNoticiaDuki.style.display = 'block';
    if (chatNoticiaDuki) {
      const esCelular = window.innerWidth <= 700;
      chatNoticiaDuki.classList.toggle('chat-cerrado', esCelular);
      chatNoticiaDuki.style.display = 'block';
      if (btnToggleChatLateral) {
        btnToggleChatLateral.textContent = esCelular ? 'ABRIR CHAT' : 'OCULTAR CHAT';
        btnToggleChatLateral.setAttribute('aria-expanded', String(!esCelular));
      }
    }

    if (vistaHome) vistaHome.style.display = 'none';
    if (vistaCalendario) vistaCalendario.style.display = 'none';
    if (vistaCine) vistaCine.style.display = 'none';
    if (vistaMusica) vistaMusica.style.display = 'none';
    if (vistaEventos) vistaEventos.style.display = 'none';
    if (vistaNota) vistaNota.style.display = 'block';
    actualizarBarraFlotante('vista-nota');
    
    // Al abrir una nota, limpiamos la selección visual del menú superior
    document.querySelectorAll(".nav-links a").forEach(l => l.classList.remove("active", "active-azul"));
    
    window.scrollTo(0, 0);
  }
}

// Asignación de triggers para las notas
if (document.getElementById('trigger-duki')) document.getElementById('trigger-duki').addEventListener('click', () => abrirNoticia('duki'));
if (document.getElementById('trigger-lali')) document.getElementById('trigger-lali').addEventListener('click', () => abrirNoticia('lali'));
if (document.getElementById('trigger-spiderman')) document.getElementById('trigger-spiderman').addEventListener('click', () => abrirNoticia('spiderman'));
if (document.getElementById('trigger-duki-mobile')) document.getElementById('trigger-duki-mobile').addEventListener('click', () => abrirNoticia('duki'));
if (document.getElementById('trigger-lali-mobile')) document.getElementById('trigger-lali-mobile').addEventListener('click', () => abrirNoticia('lali'));
if (document.getElementById('trigger-spiderman-mobile')) document.getElementById('trigger-spiderman-mobile').addEventListener('click', () => abrirNoticia('spiderman'));


// --- CHAT DE ESTILO TWITCH ---
const btnAbrirChatNota = document.getElementById('btn-abrir-chat-nota');
const btnCerrarChatNota = document.getElementById('btn-cerrar-chat-nota');
const twitchChatBox = document.getElementById('twitch-chat-box');

if (btnAbrirChatNota && twitchChatBox && btnCerrarChatNota) {
  btnAbrirChatNota.addEventListener('click', () => {
    btnAbrirChatNota.style.display = 'none';
    twitchChatBox.style.display = 'flex';
  });

  btnCerrarChatNota.addEventListener('click', () => {
    twitchChatBox.style.display = 'none';
    btnAbrirChatNota.style.display = 'block';
  });
}

// --- MARCADOR REACTIVO DEL ALGORITMO ---
const btnGuardarMarcador = document.getElementById('btn-guardar-marcador');
const algoritmoFeed = document.getElementById('algoritmo-feed');

if (btnGuardarMarcador) {
  btnGuardarMarcador.addEventListener('click', () => {
    const fueGuardada = alternarNoticiaGuardada(noticiaActual);
    if (!algoritmoFeed) return;

    if (fueGuardada) {
  
      algoritmoFeed.innerHTML = `
        <div class="card-recomendado-mini cambio-algoritmo">
          <img src="img/ysya-thumb.jpg" alt="YSY A">
          <div class="card-recomendado-info">
            <h4 style="color: #2b66ff; font-size: 0.75rem; font-weight:900; margin-bottom:2px;">RECOMENDADO POR TU GUARDADO</h4>
            <h4>YSY A announces fecha en el Estadio Arena: Precios de entradas</h4>
          </div>
        </div>
        <div class="card-recomendado-mini cambio-algoritmo">
          <img src="img/bizarrap.png" alt="Bizarrap">
          <div class="card-recomendado-info">
            <h4>Bizarrap adelanta los detalles de su próxima Session mundial</h4>
          </div>
        </div>
        <div class="card-recomendado-mini">
          <img src="img/thundercat-mac-miller.png" alt="Thundercat Mac Miller">
          <div class="card-recomendado-info">
            <h4>Thundercat sorprende con una canción inédita junto a Mac Miller</h4>
          </div>
        </div>`;
    } else {
      algoritmoFeed.innerHTML = `
        <div class="card-recomendado-mini">
          <img src="img/Toy Story 2.png" alt="Toy Story 5">
          <div class="card-recomendado-info">
            <h4>Nuevo estreno: Toy Story 5 ya está en cines</h4>
          </div>
        </div>
        <div class="card-recomendado-mini">
          <img src="img/Museo Nacional de Bellas Artes.png" alt="Bellas Artes">
          <div class="card-recomendado-info">
            <h4>Un finde lleno de arte, el museo de Bellas Artes...</h4>
          </div>
        </div>
        <div class="card-recomendado-mini">
          <img src="img/thundercat-mac-miller.png" alt="Thundercat Mac Miller">
          <div class="card-recomendado-info">
            <h4>Thundercat sorprende con una canción inédita junto a Mac Miller</h4>
          </div>
        </div>`;
    }
  });
}


// =======================================================================
// 🟪 PARTE 4: LÓGICA INTEGRADA DEL CALENDARIO DINÁMICO (SÓLO SECCIÓN)
// =======================================================================

// Base de datos de meses con sus respectivos días y tarjetas de eventos laterales
const datosMeses = {
  noviembre: {
    nombre: "Noviembre",
    prev: "Octubre",
    next: "Diciembre",
    dias: [
      { num: 27, apagado: true }, { num: 28, apagado: true }, { num: 29, apagado: true }, { num: 30, apagado: true },
      { num: 1 }, { num: 2 }, { num: 3 }, { num: 4 }, { num: 5 }, { num: 6 }, { num: 7 },
      { num: 8 }, { num: 9 }, { num: 10 }, { num: 11 }, { num: 12 }, { num: 13 }, { num: 14 },
      { num: 15, tipo: 'cine' }, { num: 16 }, { num: 17 }, { num: 18 }, { num: 19 }, { num: 20 }, { num: 21 },
      { num: 22 }, { num: 23 }, { num: 24 }, { num: 25, tipo: 'musica' }, { num: 26 }, { num: 27 }, { num: 28 },
      { num: 29 }, { num: 30 }, { num: 1, apagado: true }, { num: 2, apagado: true }, { num: 3, apagado: true }
    ],
    listaEventos: [
      { fecha: "Vie 15 de noviembre - 20:00", titulo: "Festival de Cine Independiente", lugar: "Cine Gaumont", tipo: "cine", grupo: "8 Van" },
      { fecha: "Mar 25 de noviembre - 21:00", titulo: "Duki - Mini Show Acústico", lugar: "Niceto Club", tipo: "musica", grupo: "14 Van" },
      { fecha: "Jue 27 de noviembre - 19:30", titulo: "Muestra: Nuevas miradas", lugar: "Centro Cultural Recoleta", tipo: "festival", grupo: "6 Van" },
      { fecha: "Sab 29 de noviembre - 18:00", titulo: "Cine al aire libre", lugar: "Parque Centenario", tipo: "cine", grupo: "11 Van" }
    ]
  },
  diciembre: {
    nombre: "Diciembre",
    prev: "Noviembre",
    next: "Enero",
    dias: [
      { num: 30, apagado: true }, { num: 1 }, { num: 2 }, { num: 3 }, { num: 4 }, { num: 5, tipo: 'musica' }, { num: 6 },
      { num: 7 }, { num: 8 }, { num: 9 }, { num: 10, tipo: 'festival' }, { num: 11 }, { num: 12 }, { num: 13 },
      { num: 14 }, { num: 15 }, { num: 16 }, { num: 17 }, { num: 18 }, { num: 19 }, { num: 20 },
      { num: 21 }, { num: 22 }, { num: 23 }, { num: 24 }, { num: 25 }, { num: 26 }, { num: 27 },
      { num: 28 }, { num: 29 }, { num: 30 }, { num: 31 }, { num: 1, apagado: true }, { num: 2, apagado: true }, { num: 3, apagado: true }
    ],
    listaEventos: [
      { fecha: "Mie 10 de diciembre - 19:00", titulo: "Ciclo Godard - Malba", lugar: "Palermo, Buenos Aires", tipo: "cine", grupo: "5 Van" },
      { fecha: "Sab 14 de diciembre - 15:00", titulo: "Primavera Sound", lugar: "Parque Sarmiento", tipo: "festival", grupo: "31 Van" },
      { fecha: "Jue 18 de diciembre - 20:00", titulo: "Toy Story 5", lugar: "Cine Gaumont", tipo: "cine", grupo: "9 Van" },
      { fecha: "Dom 21 de diciembre - 18:30", titulo: "Noche de los museos", lugar: "Museo Nacional de Bellas Artes", tipo: "festival", grupo: "18 Van" },
      { fecha: "Dom 28 de diciembre - 21:00", titulo: "Airbag en vivo", lugar: "Estadio Vélez", tipo: "musica", grupo: "42 Van" }
    ]
  },
  enero: {
    nombre: "Enero",
    prev: "Diciembre",
    next: "Febrero",
    dias: [
      { num: 28, apagado: true }, { num: 29, apagado: true }, { num: 30, apagado: true }, { num: 31, apagado: true },
      { num: 1 }, { num: 2 }, { num: 3 }, { num: 4 }, { num: 5 }, { num: 6 }, { num: 7 },
      { num: 8 }, { num: 9 }, { num: 10 }, { num: 11 }, { num: 12 }, { num: 13 }, { num: 14 },
      { num: 15 }, { num: 16 }, { num: 17 }, { num: 18 }, { num: 19, tipo: 'festival' }, { num: 20 }, { num: 21 },
      { num: 22 }, { num: 23 }, { num: 24 }, { num: 25 }, { num: 26 }, { num: 27 }, { num: 28 },
      { num: 29 }, { num: 30 }, { num: 31 }, { num: 1, apagado: true }, { num: 2, apagado: true }
    ],
    listaEventos: [
      { fecha: "Vie 19 de enero - 16:00", titulo: "Parador Indie Verano", lugar: "Mar del Plata", tipo: "festival", grupo: "50 Van" },
      { fecha: "Sab 20 de enero - 21:00", titulo: "Noche de vinilos", lugar: "Villa Gesell", tipo: "musica", grupo: "12 Van" },
      { fecha: "Dom 21 de enero - 19:00", titulo: "Cine bajo las estrellas", lugar: "Mar del Plata", tipo: "cine", grupo: "7 Van" },
      { fecha: "Vie 26 de enero - 18:00", titulo: "Feria de diseño independiente", lugar: "Pinamar", tipo: "festival", grupo: "16 Van" }
    ]
  }
};

const ordenMeses = ["noviembre", "diciembre", "enero"];
let mesActualIndex = 1; // Base inicial en Diciembre

function cargarMes(keyMes) {
  const info = datosMeses[keyMes];
  if (!info) return;
  
  // 1. Actualizar títulos superiores del selector (Usando el ID correcto para la sección)
  const txtPrev = document.getElementById("mes-texto-prev");
  const txtActual = document.getElementById("mes-texto-cal"); // <-- CORREGIDO: Apunta a la sección, no a la home
  const txtNext = document.getElementById("mes-texto-next");
  const indiceMes = ordenMeses.indexOf(keyMes);
  const keyPrev = ordenMeses[indiceMes - 1];
  const keyNext = ordenMeses[indiceMes + 1];

  if (txtPrev) txtPrev.innerText = keyPrev ? datosMeses[keyPrev].nombre : "";
  if (txtActual) txtActual.innerText = info.nombre;
  if (txtNext) txtNext.innerText = keyNext ? datosMeses[keyNext].nombre : "";
  
  // 2. Inyectar números en la grilla del calendario
  const grillaDias = document.querySelector(".dias-num-grid");
  if (grillaDias) {
    grillaDias.innerHTML = "";
    info.dias.forEach(dia => {
      const divDia = document.createElement("div");
      if (dia.apagado) {
        divDia.classList.add("dia-apagado");
        divDia.innerText = dia.num;
      } else if (dia.tipo) {
        divDia.classList.add("dia-con-evento", `evento-${dia.tipo}-img`);
        divDia.innerHTML = `<span>${dia.num}</span>`;
      } else {
        divDia.innerText = dia.num;
      }
      grillaDias.appendChild(divDia);
    });
  }
  
  // 3. Inyectar tarjetas laterales correspondientes al mes
  const contenedorEventos = document.querySelector(".contenedor-lista-eventos");
  if (contenedorEventos) {
    contenedorEventos.innerHTML = "";
    if (info.listaEventos.length === 0) {
      contenedorEventos.innerHTML = `<p style="color: #666; font-size: 0.9rem; margin-top: 20px;">No hay eventos agendados para este mes.</p>`;
    } else {
      info.listaEventos.forEach(ev => {
        const card = document.createElement("div");
        card.classList.add("card-evento-mini", `card-borde-${ev.tipo}`);
        card.innerHTML = `
          <div class="card-ev-detalles">
            <span class="ev-fecha"><i class="fa-regular fa-calendar"></i> ${ev.fecha}</span>
            <h4>${ev.titulo}</h4>
            <span class="ev-lugar"><i class="fa-solid fa-location-dot"></i> ${ev.lugar}</span>
            <span class="ev-badge-grupo badge-${ev.tipo}"><i class="fa-regular fa-user"></i> ${ev.grupo} del grupo</span>
          </div>`;
        contenedorEventos.appendChild(card);
      });
    }
  }
}

// Inicialización de Eventos del Calendario al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
  // Arrancar mostrando Diciembre en la sección
  cargarMes(ordenMeses[mesActualIndex]);

  // Manejo de clicks en flecha izquierda (<) de la SECCIÓN
  const btnPrevMesCal = document.getElementById("btn-prev-mes-cal"); // <-- CORREGIDO: Escucha el botón de la sección
  if (btnPrevMesCal) {
    btnPrevMesCal.addEventListener("click", () => {
      if (mesActualIndex > 0) {
        mesActualIndex--;
        cargarMes(ordenMeses[mesActualIndex]);
      }
    });
  }

  // Manejo de clicks en flecha derecha (>) de la SECCIÓN
  const btnNextMesCal = document.getElementById("btn-next-mes-cal"); // <-- CORREGIDO: Escucha el botón de la sección
  if (btnNextMesCal) {
    btnNextMesCal.addEventListener("click", () => {
      if (mesActualIndex < ordenMeses.length - 1) {
        mesActualIndex++;
        cargarMes(ordenMeses[mesActualIndex]);
      }
    });
  }
});

// =======================================================================
// 🟧 PARTE 5: INICIALIZACIÓN Y TABS DE TICKETS VS CALENDARIO
// =======================================================================
document.addEventListener("DOMContentLoaded", () => {
  cargarMes(ordenMeses[mesActualIndex]);

  const btnPrevMesCalOriginal = document.getElementById("btn-prev-mes-cal");
  const btnNextMesCalOriginal = document.getElementById("btn-next-mes-cal");
  const btnPrevMesCal = btnPrevMesCalOriginal ? btnPrevMesCalOriginal.cloneNode(true) : null;
  const btnNextMesCal = btnNextMesCalOriginal ? btnNextMesCalOriginal.cloneNode(true) : null;

  if (btnPrevMesCalOriginal && btnPrevMesCal) btnPrevMesCalOriginal.replaceWith(btnPrevMesCal);
  if (btnNextMesCalOriginal && btnNextMesCal) btnNextMesCalOriginal.replaceWith(btnNextMesCal);

  if (btnPrevMesCal) btnPrevMesCal.addEventListener("click", () => { if (mesActualIndex > 0) { mesActualIndex--; cargarMes(ordenMeses[mesActualIndex]); } });

  if (btnNextMesCal) btnNextMesCal.addEventListener("click", () => { if (mesActualIndex < ordenMeses.length - 1) { mesActualIndex++; cargarMes(ordenMeses[mesActualIndex]); } });

  // Lógica de pestañas: Tickets vs Calendario Grilla
  const btnTabTickets = document.getElementById("btn-tab-tickets");
  const btnTabCalendario = document.getElementById("btn-tab-calendario");
  const bloqueGrilla = document.getElementById("bloque-calendario-grilla");
  const bloqueCalendarioExtra = document.getElementById("bloque-calendario-extra");
  const bloqueTickets = document.getElementById("bloque-calendario-tickets");
  const bloqueCalendarioMusica = document.getElementById("bloque-calendario-musica");
  const btnCategoriaMusica = document.getElementById("btn-categoria-musica");

  if (btnTabTickets && btnTabCalendario && bloqueGrilla && bloqueCalendarioExtra && bloqueTickets) {
      
      // Al hacer click en "Tickets"
      btnTabTickets.addEventListener("click", () => {
          vistaCalendario?.classList.remove("mostrando-tickets-musica");
          // Cambiar diseño activo
          btnTabTickets.classList.add("activo-azul");
          btnTabTickets.setAttribute("aria-pressed", "true");
          
          btnTabCalendario.classList.remove("activo-azul");
          btnTabCalendario.setAttribute("aria-pressed", "false");

          // Intercambiar contenedores
          bloqueGrilla.style.display = "none";
          bloqueCalendarioExtra.style.display = "none";
          bloqueTickets.style.display = "grid"; 
          if (bloqueCalendarioMusica) bloqueCalendarioMusica.style.display = "none";
          actualizarBarraFlotante('vista-calendario');
      });

      // Al hacer click en "Calendario"
      btnTabCalendario.addEventListener("click", () => {
          vistaCalendario?.classList.remove("mostrando-tickets-musica");
          // Cambiar diseño activo
          btnTabCalendario.classList.add("activo-azul");
          btnTabCalendario.setAttribute("aria-pressed", "true");
          
          btnTabTickets.classList.remove("activo-azul");
          btnTabTickets.setAttribute("aria-pressed", "false");

          // Intercambiar contenedores
          bloqueTickets.style.display = "none";
          bloqueGrilla.style.display = "grid"; 
          bloqueCalendarioExtra.style.display = "block";
          if (bloqueCalendarioMusica) bloqueCalendarioMusica.style.display = "none";
          actualizarBarraFlotante('vista-calendario');
      });

      // La categorÃ­a verde de MÃºsica abre los tickets musicales con sus datos.
      if (btnCategoriaMusica && bloqueCalendarioMusica) {
          btnCategoriaMusica.addEventListener("click", () => {
              vistaCalendario?.classList.add("mostrando-tickets-musica");
              btnTabCalendario.classList.add("activo-azul");
              btnTabCalendario.setAttribute("aria-pressed", "true");
              btnTabTickets.classList.remove("activo-azul");
              btnTabTickets.setAttribute("aria-pressed", "false");

              bloqueGrilla.style.display = "none";
              bloqueCalendarioExtra.style.display = "none";
              bloqueTickets.style.display = "none";
              bloqueCalendarioMusica.style.display = "block";
              actualizarBarraFlotante('vista-calendario');
              window.scrollTo({ top: 0, behavior: "smooth" });
          });
      }
  }
});


