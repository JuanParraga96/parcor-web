/* =====================================================================
   PARCOR DISTRIBUCIONES — CATÁLOGO Y CONFIGURACIÓN
   Este es el ÚNICO archivo que necesitas editar para cambiar precios,
   textos de productos o datos de contacto.
   Precios en pesos colombianos, IVA incluido. Fuente: Precios Sept 2026
   (colchones) y Parcor_Lista_Precios_Maestra (hogar).
   ===================================================================== */

const CONFIG = {
  // true  = muestra etiquetas ámbar y el panel "Pendientes" (uso interno).
  // false = modo público: placeholders elegantes y "Consultar por WhatsApp".
  MODO_REVISION: true,

  WHATSAPP: '573184416666',          // sin "+", sin espacios
  EMAIL: 'parcorsas@gmail.com',
  CIUDAD: 'Barranquilla, Colombia',
  REDES: {                            // deja '' para ocultar el ícono
    instagram: '',                    // ej: 'https://instagram.com/parcordistribuciones'
    tiktok: '',
    facebook: '',
    linkedin: ''
  },
  GARANTIA_COLCHONES: '10 años',

  // Descuento que se muestra en toda la tienda. El precio real de venta es el
  // que está en este archivo; el "precio de lista" tachado se calcula como
  // precio ÷ (1 − DESCUENTO_PCT/100), para que la etiqueta "-30%" sea exacta.
  // Pon 0 para no mostrar descuentos.
  DESCUENTO_PCT: 30,

  // Barra de anuncio arriba del header. Deja '' para ocultarla.
  ANUNCIO: '30% de descuento de lanzamiento en toda la tienda. Envío a toda Colombia.',
  FORMAS_PAGO: ['Transferencia bancaria', 'Llave (Bre-B)', 'Tarjeta de crédito o débito', 'Link de pago']
};

/* Tallas de colchón: clave → etiqueta */
const TALLAS = {
  '100x190': 'Sencillo',
  '120x190': 'Semidoble',
  '140x190': 'Doble',
  '160x190': 'Queen',
  '200x200': 'King'
};

/* Categorías (orden en que aparecen) */
const CATEGORIAS = [
  { id: 'enrollados',  nombre: 'Colchones enrollados',  sub: 'Azame · llegan comprimidos a cualquier ciudad', img: 'img/enrollados/azahar-2.jpg' },
  { id: 'extendidos',  nombre: 'Colchones extendidos',  sub: 'Casa Di Luna · nuestra línea propia',             img: 'img/extendidos/cymbidium-1.jpg' },
  { id: 'almohadas',   nombre: 'Almohadas',             sub: 'Fibra, memory foam y gel',                        img: 'img/hogar/almohada-memory-60x40x12.jpg' },
  { id: 'protectores', nombre: 'Protectores',           sub: 'Para colchón y almohada',                         img: 'img/hogar/protector-de-colchon-cold-touch.jpg' },
  { id: 'sabanas',     nombre: 'Sábanas y duvets',      sub: 'De 144 a 300 hilos',                              img: 'img/hogar/juego-de-sabanas-platinum-180-hilos.jpg' },
  { id: 'cobijas',     nombre: 'Cobijas',               sub: 'Piel de durazno y felpa',                         img: 'img/hogar/cobija-malu-310gr.jpg' },
  { id: 'toallas',     nombre: 'Toallas',               sub: 'De 400 a 700 gramos',                             img: 'img/hogar/toalla-roma-550-gr.jpg' },
  { id: 'somieres',    nombre: 'Somieres',              sub: 'Base para tu colchón',                            img: '' }
];

/* =====================================================================
   PRODUCTOS
   Campos comunes: id, cat, nombre, marca, desc, img[]
   Colchones: linea, altura (cm), nucleo, firmeza (1 suave … 5 firme),
              sensacion (texto), capas[], precios {talla: precio} ó
              alturas [{altura, precios}], atributos para el test:
              aisla (independencia de movimiento), fresco, soporte (kg)
   Hogar: precio (único) ó variantes [{nombre, sku, precio}]
   pendientes: ['foto','precio','medidas'] → aparecen en modo revisión
   ===================================================================== */
const PRODUCTOS = [

  /* ---------------- COLCHONES ENROLLADOS — AZAME ---------------- */
  {
    id: 'azahar', cat: 'enrollados', linea: 'enrollado', marca: 'Azame',
    nombre: 'Azahar', altura: 35, nucleo: 'Resortes pocket + doble pillow top',
    firmeza: 3, sensacion: 'Media, muy acolchada',
    desc: 'El más mullido de la familia. Doble pillow top sobre un núcleo de resortes pocket independientes: te recibe suave y te sostiene firme por debajo. Doble cara, para voltearlo y que dure.',
    capas: ['Tela jacquard antiflama', 'Pillow top acolchado (ambas caras)', 'Espuma penta de alta resiliencia', 'Espuma densidad 26', 'Núcleo de resortes pocket encajonado en espuma'],
    aisla: true, fresco: true, soporte: 100, dobleCara: true,
    img: ['img/enrollados/azahar-1.jpg', 'img/enrollados/azahar-2.jpg', 'img/enrollados/azahar-3.jpg'],
    precios: { '100x190': 909069, '120x190': 1090883, '140x190': 1272697, '160x190': 1454510, '200x200': 1999952 },
    pendientes: []
  },
  {
    id: 'deluxe', cat: 'enrollados', linea: 'enrollado', marca: 'Azame',
    nombre: 'Deluxe', altura: 30, nucleo: 'Resortes pocket',
    firmeza: 3, sensacion: 'Media',
    desc: 'Resortes pocket independientes y espuma penta en una altura de 30 cm. Equilibrio entre soporte ortopédico e independencia de movimiento: si tu pareja se mueve, tú no lo sientes.',
    capas: ['Tela jacquard antiflama', 'Espuma penta de alta resiliencia', 'Espuma densidad 26', 'Núcleo de resortes pocket encajonado'],
    aisla: true, fresco: true, soporte: 100, dobleCara: true,
    img: ['img/enrollados/deluxe-1.jpg', 'img/enrollados/deluxe-2.jpg', 'img/enrollados/deluxe-3.jpg'],
    precios: { '100x190': 669155, '120x190': 802985, '140x190': 936816, '160x190': 1070647, '200x200': 1472140 },
    pendientes: ['foto'],   // fotos 2 y 3 son las mismas del Classic
    notaPendiente: 'Las fotos 2 y 3 son idénticas a las del Classic.'
  },
  {
    id: 'luxury', cat: 'enrollados', linea: 'enrollado', marca: 'Azame',
    nombre: 'Luxury', altura: 30, nucleo: 'Resortes pocket + pillow top interno',
    firmeza: 2, sensacion: 'Media-suave',
    desc: 'Híbrido de espuma y resortes pocket con un pillow top interno que suaviza el contacto sin perder el soporte. Jacquard antiflama, 30 cm y garantía de 10 años.',
    capas: ['Tela jacquard antiflama', 'Pillow top interno', 'Espuma penta de alta resiliencia', 'Espuma densidad 26', 'Núcleo de resortes pocket'],
    aisla: true, fresco: true, soporte: 100, dobleCara: false,
    img: ['img/enrollados/luxury-1.jpg', 'img/enrollados/luxury-2.jpg', 'img/enrollados/luxury-3.jpg'],
    precios: { '100x190': 567977, '120x190': 681572, '140x190': 795167, '160x190': 908762, '200x200': 1249548 },
    pendientes: []
  },
  {
    id: 'premium', cat: 'enrollados', linea: 'enrollado', marca: 'Azame',
    nombre: 'Premium', nucleo: 'Espuma densidad 26, ortopédico',
    firmeza: 5, sensacion: 'Firme',
    desc: 'Espumado ortopédico de densidad 26 con capas de espuma penta por ambas caras. El más firme del catálogo, ideal para quien necesita soporte lumbar o duerme boca arriba. Elige la altura que prefieras.',
    capas: ['Tela tejido de punto antiflama', 'Espuma penta (ambas caras)', 'Núcleo de espuma densidad 26'],
    aisla: true, fresco: false, soporte: 100, dobleCara: true,
    img: ['img/enrollados/premium-1.jpg', 'img/enrollados/premium-2.jpg', 'img/enrollados/premium-3.jpg'],
    alturas: [
      { altura: 35, precios: { '100x190': 794167, '120x190': 953000, '140x190': 1111834, '160x190': 1270667, '200x200': 1747167 } },
      { altura: 30, precios: { '100x190': 711057, '120x190': 853268, '140x190': 995479, '160x190': 1137690, '200x200': 1564324 } },
      { altura: 25, precios: { '100x190': 627946, '120x190': 753535, '140x190': 879124, '160x190': 1004714, '200x200': 1381481 } },
      { altura: 15, precios: { '90x190': 337017, '100x190': 337017 }, nota: 'Versión delgada (NFR), ideal para camas nido o auxiliares' }
    ],
    pendientes: []
  },
  {
    id: 'classic', cat: 'enrollados', linea: 'enrollado', marca: 'Azame',
    nombre: 'Classic', altura: 25, nucleo: 'Resortes Bonell',
    firmeza: 2, sensacion: 'Media-suave',
    desc: 'La puerta de entrada a Azame: resortes Bonell interconectados, espuma penta y tela antiflama en 25 cm. Semi-ortopédico y liviano, perfecto para cuartos de invitados, niños o primer apartamento.',
    capas: ['Tela jacquard antiflama', 'Espuma penta', 'Núcleo de resortes Bonell'],
    aisla: false, fresco: true, soporte: 90, dobleCara: true,
    img: ['img/enrollados/classic-1.jpg', 'img/enrollados/classic-2.jpg', 'img/enrollados/classic-3.jpg'],
    alturas: [
      { altura: 25, precios: { '100x190': 562100, '120x190': 674520, '140x190': 786940, '160x190': 899360, '200x200': 1236620 } },
      { altura: 15, precios: { '100x190': 255500 }, nota: 'Versión delgada (NFR)' }
    ],
    pendientes: ['foto'],
    notaPendiente: 'Las fotos 2 y 3 son idénticas a las del Deluxe. En la lista el Classic 15 cm aparece con la descripción del Premium; confirmar.'
  },

  /* ---------------- COLCHONES EXTENDIDOS — CASA DI LUNA ---------------- */
  {
    id: 'cymbidium', cat: 'extendidos', linea: 'extendido', marca: 'Casa Di Luna',
    nombre: 'Cymbidium', altura: 35, nucleo: 'Resortado, doble pillow top',
    firmeza: 2, sensacion: 'Media-suave, muy acolchada',
    desc: 'El tope de la línea Casa Di Luna: 35 cm con doble pillow top y doble lado. La sensación de hotel, entregado extendido y listo para usar.',
    capas: ['Tela acolchada', 'Doble pillow top', 'Espumas de confort', 'Núcleo resortado'],
    aisla: true, fresco: true, soporte: 100, dobleCara: true,
    img: ['img/extendidos/cymbidium-1.jpg', 'img/extendidos/cymbidium-2.jpg'],
    precios: { '100x190': 561878, '120x190': 651814, '140x190': 750728, '160x190': 825000, '200x200': 1097215 },
    pendientes: []
  },
  {
    id: 'cataleya', cat: 'extendidos', linea: 'extendido', marca: 'Casa Di Luna',
    nombre: 'Cataleya', altura: 30, nucleo: 'Resortes pocket, doble lado',
    firmeza: 3, sensacion: 'Media',
    desc: 'Resortes pocket independientes en 30 cm y doble lado para voltearlo. Soporte parejo e independencia de movimiento a un precio de línea propia.',
    capas: ['Tela acolchada', 'Espumas de confort (ambas caras)', 'Núcleo de resortes pocket'],
    aisla: true, fresco: true, soporte: 100, dobleCara: true,
    img: ['img/extendidos/catelaya-1.jpg', 'img/extendidos/catelaya-2.jpg'],
    precios: { '100x190': 533170, '120x190': 634276, '140x190': 718262, '160x190': 809085, '200x200': 997936 },
    pendientes: ['foto'], notaPendiente: 'Usa las mismas fotos genéricas que Anatómico, Cambria, Midnight y Classic Flex.'
  },
  {
    id: 'midnight', cat: 'extendidos', linea: 'extendido', marca: 'Casa Di Luna',
    nombre: 'Midnight', altura: 32, nucleo: 'Cassata, núcleo D80, pillow top',
    firmeza: 3, sensacion: 'Media',
    desc: 'Estructura cassata con núcleo de densidad 80 y pillow top: firme por dentro, acolchado por fuera. 32 cm de altura.',
    capas: ['Tela acolchada', 'Pillow top', 'Espumas de confort', 'Núcleo cassata D80'],
    aisla: true, fresco: false, soporte: 100, dobleCara: false,
    img: ['img/extendidos/midnight-1.jpg', 'img/extendidos/midnight-2.jpg'],
    precios: { '100x190': 572057, '120x190': 680732, '140x190': 919170, '160x190': 910348, '200x200': 1085157 },
    pendientes: ['foto', 'precio'],
    notaPendiente: 'Foto genérica. El precio Doble (919.170) es mayor que Queen (910.348): revisar en la lista.'
  },
  {
    id: 'cambria', cat: 'extendidos', linea: 'extendido', marca: 'Casa Di Luna',
    nombre: 'Cambria', altura: 27, nucleo: 'Cassata, núcleo D80, euro top jacquard',
    firmeza: 4, sensacion: 'Media-firme',
    desc: 'Núcleo cassata de densidad 80 con euro top en jacquard. Más firme que el Midnight y más bajo (27 cm): soporte sólido para quien duerme boca arriba.',
    capas: ['Tela jacquard', 'Euro top', 'Espumas de confort', 'Núcleo cassata D80'],
    aisla: true, fresco: false, soporte: 100, dobleCara: false,
    img: ['img/extendidos/cambria-1.jpg', 'img/extendidos/cambria-2.jpg'],
    precios: { '100x190': 447827, '120x190': 525444, '140x190': 596172, '160x190': 677391, '200x200': 836698 },
    pendientes: ['foto'], notaPendiente: 'Foto genérica.'
  },
  {
    id: 'classic-flex', cat: 'extendidos', linea: 'extendido', marca: 'Casa Di Luna',
    nombre: 'Classic Flex', altura: 27, nucleo: 'Resortes Bonnell con marco Z, euro top',
    firmeza: 3, sensacion: 'Media',
    desc: 'Resortes Bonnell reforzados con marco en Z para que los bordes no cedan, y euro top acolchado. La opción resortada más económica de Casa Di Luna.',
    capas: ['Tela acolchada', 'Euro top', 'Espumas de confort', 'Núcleo Bonnell con marco Z'],
    aisla: false, fresco: true, soporte: 90, dobleCara: false,
    img: ['img/extendidos/classic-flex-1.jpg', 'img/extendidos/classic-flex-2.jpg'],
    precios: { '100x190': 421780, '120x190': 487758, '140x190': 553505, '160x190': 644663, '200x200': 785127 },
    pendientes: ['foto'], notaPendiente: 'Foto genérica.'
  },
  {
    id: 'anatomico', cat: 'extendidos', linea: 'extendido', marca: 'Casa Di Luna',
    nombre: 'Anatómico', nucleo: 'Espuma densidad 23, tela satín',
    firmeza: 4, sensacion: 'Firme',
    desc: 'Espumado de densidad 23 con tela satín. Sencillo, firme y el más accesible del catálogo: ideal para niños, estudios y cuartos de invitados.',
    capas: ['Tela satín', 'Núcleo de espuma densidad 23'],
    aisla: true, fresco: false, soporte: 80, dobleCara: true,
    img: ['img/extendidos/anatomico-1.jpg', 'img/extendidos/anatomico-2.jpg'],
    alturas: [
      { altura: 30, precios: { '100x190': 322000, '120x190': 439217, '140x190': 441000, '160x190': 554800, '200x200': 728175 } },
      { altura: 25, precios: { '100x190': 340146, '120x190': 389681, '140x190': 439217, '160x190': 488752, '200x200': 637360 } }
    ],
    pendientes: ['foto', 'precio'],
    notaPendiente: 'Foto genérica. El de 30 cm Sencillo (322.000) cuesta menos que el de 25 cm (340.146): revisar.'
  },

  /* ---------------- ALMOHADAS ---------------- */
  { id: 'almohada-tacto-ganso', cat: 'almohadas', nombre: 'Almohada Tacto Ganso', nombreLargo: 'Almohada Tacto Ganso 50×70', sku: 'A-0113',
    desc: 'Fibra siliconada que imita la suavidad del plumón de ganso, sin plumas. Lavable y hipoalergénica.',
    img: ['img/hogar/almohada-tacto-ganso-50x70.jpg'], precio: 60000, pendientes: [] },
  { id: 'almohada-tradicional', cat: 'almohadas', nombre: 'Almohada Tradicional',
    desc: 'La almohada de todos los días: fibra de poliéster, tela de microfibra, dos tamaños.',
    img: ['img/hogar/almohada-50x70.jpg', 'img/hogar/almohada-50-x-90.jpg'],
    variantes: [ { nombre: '50×70 cm', sku: 'A-0136', precio: 26667 }, { nombre: '50×90 cm', sku: 'A-0137', precio: 40833 } ], pendientes: [] },
  { id: 'almohada-pillow', cat: 'almohadas', nombre: 'Almohada Pillow',
    desc: 'Más relleno y más altura que la tradicional. Para quien duerme de lado o le gusta la almohada alta.',
    img: ['img/hogar/almohada-pillow-50x70.jpg', 'img/hogar/almohada-pillow-50x90.jpg'],
    variantes: [ { nombre: '50×70 cm', sku: 'A-0138', precio: 37500 }, { nombre: '50×90 cm', sku: 'A-0139', precio: 40833 } ], pendientes: [] },
  { id: 'almohada-antifluido', cat: 'almohadas', nombre: 'Almohada Antifluido', nombreLargo: 'Almohada Antifluido 50×70', sku: 'A-0140',
    desc: 'Tela antifluido que repele líquidos y manchas. Pensada para hoteles, clínicas y casas con niños.',
    img: ['img/hogar/almohada-antifluido-50-x-70.jpg'], precio: 46667, pendientes: [] },
  { id: 'almohada-memory-cervical', cat: 'almohadas', nombre: 'Almohada Memory Dream Cervical', nombreLargo: 'Memory Dream Cervical 55×35×11', sku: 'A-0210',
    desc: 'Memory foam con forma ergonómica que sostiene el cuello en su curva natural. Para dolor cervical o quien duerme boca arriba.',
    img: ['img/hogar/almohada-memory-dream-cervical-55x35x11.jpg'], precio: 116667, pendientes: [] },
  { id: 'almohada-memory-gel', cat: 'almohadas', nombre: 'Almohada Memory Dream Gel', nombreLargo: 'Memory Dream Gel 60×40×12', sku: 'A-0233',
    desc: 'Memory foam con capa de gel refrescante en la superficie. Se adapta a tu cabeza y disipa el calor.',
    img: ['img/hogar/almohada-memory-60x40x12.jpg'], precio: 139167, pendientes: [] },
  { id: 'almohada-serenity', cat: 'almohadas', nombre: 'Almohada Serenity Air Flow', nombreLargo: 'Serenity Air Flow 58×36', sku: 'A-0234',
    desc: 'Memory foam perforado para que el aire circule. Fresca y de altura media.',
    img: ['img/hogar/almohada-serenity-58x36.jpg'], precio: 87500, pendientes: [] },
  { id: 'almohada-air-flow', cat: 'almohadas', nombre: 'Almohada Air Flow', nombreLargo: 'Air Flow 60×40×12', sku: 'A-0235',
    desc: 'Memory foam de alta densidad con canales de ventilación y funda lavable. La más premium del catálogo.',
    img: ['img/hogar/almohada-air-flow-60x40x12.jpg'], precio: 174167, pendientes: [] },

  /* ---------------- PROTECTORES ---------------- */
  { id: 'protector-almohada-antifluido', cat: 'protectores', nombre: 'Protector de almohada antifluido', sku: 'A-0116',
    desc: 'Funda impermeable con cierre. Protege la almohada de líquidos, ácaros y manchas.',
    img: ['img/hogar/protector-almohada-antifluido.jpg'], precio: 30000, pendientes: [] },
  { id: 'protector-almohada-microfibra', cat: 'protectores', nombre: 'Protector de almohada microfibra',
    desc: 'Funda acolchada de microfibra que alarga la vida de la almohada.',
    img: ['img/hogar/protector-de-almohada-microfibra.jpg'], precio: null, pendientes: ['precio'] },
  { id: 'protector-colchon-antifluido', cat: 'protectores', nombre: 'Protector de colchón antifluido',
    desc: 'Capa impermeable y transpirable que protege el colchón sin sonar a plástico. Se ajusta como sábana.',
    img: ['img/hogar/protector-de-colchon-antifluido.jpg'], precio: null, pendientes: ['precio', 'medidas'] },
  { id: 'protector-colchon-acolchado', cat: 'protectores', nombre: 'Protector de colchón acolchado',
    desc: 'Acolchado y suave: suma una capa de confort y protege contra el desgaste diario.',
    img: ['img/hogar/protector-de-colchon-acolchado.jpg'], precio: null, pendientes: ['precio', 'medidas'] },
  { id: 'protector-colchon-cold-touch', cat: 'protectores', nombre: 'Protector de colchón Cold Touch',
    desc: 'Tela de tacto frío para noches calurosas. Protege y refresca.',
    img: ['img/hogar/protector-de-colchon-cold-touch.jpg'], precio: null, pendientes: ['precio', 'medidas'] },

  /* ---------------- SÁBANAS Y DUVETS ---------------- */
  { id: 'sabanas-my-house', cat: 'sabanas', nombre: 'Juego de sábanas My House 144 hilos', sku: 'A-0211',
    desc: 'Juego completo en 144 hilos para cama sencilla (1,00 × 1,90). Suave, fresco y fácil de lavar.',
    img: ['img/hogar/juego-de-sabanas-144-hilos.jpg'], precio: 71050, pendientes: [],
    notaPendiente: 'Confirmar que la foto "144 hilos" corresponde a My House.' },
  { id: 'sabanas-reactiva', cat: 'sabanas', nombre: 'Juego de sábanas Reactiva',
    desc: 'Tela reactiva de color estable que no destiñe con el lavado. Disponible en todas las tallas.',
    img: [],
    variantes: [ { nombre: 'Twin', sku: 'A-0214', precio: 54167 }, { nombre: 'Semidoble', sku: 'A-0215', precio: 60000 }, { nombre: 'Doble', sku: 'A-0216', precio: 61667 }, { nombre: 'Queen', sku: 'A-0217', precio: 70833 }, { nombre: 'King', sku: 'A-0218', precio: 87500 } ],
    pendientes: ['foto'] },
  { id: 'sabanas-mistura', cat: 'sabanas', nombre: 'Juego de sábanas Mistura',
    desc: 'Mezcla de algodón y poliéster: la suavidad del algodón con la resistencia del poliéster.',
    img: [],
    variantes: [ { nombre: 'Doble', sku: 'A-0219', precio: 175833 }, { nombre: 'Queen', sku: 'A-0220', precio: 190000 }, { nombre: 'King', sku: 'A-0221', precio: 215833 } ],
    pendientes: ['foto'] },
  { id: 'sabanas-natural', cat: 'sabanas', nombre: 'Juego de sábanas Natural',
    desc: 'Algodón natural de alto hilaje. La línea más suave y fresca para el clima de la costa.',
    img: [],
    variantes: [ { nombre: 'Doble', sku: 'A-0222', precio: 272500 }, { nombre: 'Queen', sku: 'A-0223', precio: 291667 }, { nombre: 'King', sku: 'A-0224', precio: 330000 } ],
    pendientes: ['foto'] },
  { id: 'sabanas-platinum', cat: 'sabanas', nombre: 'Juego de sábanas Platinum 180 hilos',
    desc: 'Percal de 180 hilos con acabado liso. Sensación de hotel.',
    img: ['img/hogar/juego-de-sabanas-platinum-180-hilos.jpg'], precio: null, pendientes: ['precio', 'medidas'] },
  { id: 'duvet-t200', cat: 'sabanas', nombre: 'Duvet 200 hilos',
    desc: 'Edredón ligero de 200 hilos con relleno siliconado. Abriga sin pesar.',
    img: ['img/hogar/duvet-200-300-hilos.jpg'],
    variantes: [ { nombre: 'Doble', sku: 'A-0225', precio: 228333 }, { nombre: 'Queen', sku: 'A-0226', precio: 245833 }, { nombre: 'King', sku: 'A-0227', precio: 280833 } ], pendientes: [] },
  { id: 'duvet-t300', cat: 'sabanas', nombre: 'Duvet 300 hilos institucional',
    desc: 'Tela de 300 hilos y costura reforzada para lavado industrial. Hoteles, hostales y Airbnb.',
    img: ['img/hogar/duvet-200-300-hilos.jpg'],
    variantes: [ { nombre: 'Doble', sku: 'A-0228', precio: 291667 }, { nombre: 'Queen', sku: 'A-0229', precio: 307500 }, { nombre: 'King', sku: 'A-0230', precio: 361667 } ], pendientes: [] },
  { id: 'plumon-elegant-home', cat: 'sabanas', nombre: 'Plumón Elegant Home 300 hilos',
    desc: 'Plumón acolchado de 300 hilos, el más abrigado de la línea.',
    img: ['img/hogar/plumon-elegant-home-300-hilos.jpg'], precio: null, pendientes: ['precio', 'medidas'] },
  { id: 'fundas-almohada', cat: 'sabanas', nombre: 'Fundas de almohada blancas (set × 2)',
    desc: 'Par de fundas blancas, estándar hotelero. En microfibra o polyalgodón.',
    img: ['img/hogar/funda-para-almohada-x-2-microfibra-polyalgodon.jpg'],
    variantes: [ { nombre: 'Microfibra', sku: 'A-0231', precio: 12500 }, { nombre: 'Polyalgodón', sku: 'A-0232', precio: 20833 } ], pendientes: [] },

  /* ---------------- COBIJAS ---------------- */
  { id: 'cobija-piel-de-durazno', cat: 'cobijas', nombre: 'Cobija Piel de Durazno', sku: 'A-0133',
    desc: 'Tacto aterciopelado y liviano. La cobija de sofá y de siesta.',
    img: ['img/hogar/cobija-piel-de-durazno.jpg'], precio: 70000, pendientes: ['medidas'] },
  { id: 'cobija-malu', cat: 'cobijas', nombre: 'Cobija Malu 310 g', sku: 'A-0134',
    desc: 'Felpa acanalada de 310 g/m². Abriga bien sin dar calor.',
    img: ['img/hogar/cobija-malu-310gr.jpg'], precio: 74167, pendientes: ['medidas'] },
  { id: 'cobija-layan', cat: 'cobijas', nombre: 'Cobija Layan 450 g', sku: 'A-0135',
    desc: 'Felpa gruesa de 450 g/m², tipo sherpa. La más abrigada y mullida.',
    img: ['img/hogar/cobija-layan-450-gr.jpg'], precio: 175833, pendientes: ['medidas'] },

  /* ---------------- TOALLAS ---------------- */
  { id: 'toalla-elegant-400', cat: 'toallas', nombre: 'Toalla Elegant 400 g', sku: 'A-0212',
    desc: 'Algodón de 400 g/m², ligera y de secado rápido.',
    img: [], precio: 43167, pendientes: ['foto', 'medidas'] },
  { id: 'toalla-elegant-550', cat: 'toallas', nombre: 'Toalla Elegant 550 g',
    desc: 'Algodón de 550 g/m², el punto medio entre absorción y secado.',
    img: ['img/hogar/toalla-elegant-550-gr.jpg'],
    variantes: [ { nombre: 'Manos 40×70', sku: 'A-0150', precio: 14167 }, { nombre: 'Baño 70×140', sku: 'A-0151', precio: 43333 } ], pendientes: [] },
  { id: 'toalla-horizonte', cat: 'toallas', nombre: 'Toalla Horizonte 450 g',
    desc: 'Rizo de 450 g/m² con franja tejida. Liviana y económica.',
    img: ['img/hogar/toalla-horizonte-450-gr.jpg'],
    variantes: [ { nombre: 'Manos 40×70', sku: 'A-0236', precio: 17500 }, { nombre: 'Baño 70×140', sku: 'A-0237', precio: 36667 } ], pendientes: [] },
  { id: 'toalla-senda', cat: 'toallas', nombre: 'Toalla Senda 550 g',
    desc: 'Rizo denso de 550 g/m² con cenefa en relieve.',
    img: ['img/hogar/toalla-senda-550-gr.jpg'],
    variantes: [ { nombre: 'Manos 40×70', sku: 'A-0238', precio: 20833 }, { nombre: 'Baño 70×140', sku: 'A-0239', precio: 60000 } ], pendientes: [] },
  { id: 'toalla-roma', cat: 'toallas', nombre: 'Toalla Roma 550 g',
    desc: 'Rizo de 550 g/m² con tejido tipo espiga en la cenefa.',
    img: ['img/hogar/toalla-roma-550-gr.jpg'],
    variantes: [ { nombre: 'Manos 40×70', sku: 'A-0240', precio: 22500 }, { nombre: 'Baño 70×140', sku: 'A-0241', precio: 65000 } ], pendientes: [] },
  { id: 'toalla-mohda', cat: 'toallas', nombre: 'Toalla Mohda 600 g',
    desc: 'Rizo de 600 g/m² con bordes acanalados. Gruesa y muy absorbente.',
    img: ['img/hogar/toalla-mohda-600-gr.jpg', 'img/hogar/toalla-mohda-600-gr-2.jpg'],
    variantes: [ { nombre: 'Manos 40×70', sku: 'A-0242', precio: 24167 }, { nombre: 'Baño 70×140', sku: 'A-0243', precio: 65000 } ], pendientes: [] },
  { id: 'toalla-hotelera', cat: 'toallas', nombre: 'Toalla Elegant Hotelera 650 g',
    desc: 'Línea institucional de 650 g/m²: resiste lavados industriales y mantiene el blanco.',
    img: ['img/hogar/toalla-institucional-650-gr.jpg'],
    variantes: [ { nombre: 'Manos 40×70', sku: 'A-0244', precio: 31667 }, { nombre: 'Cuerpo 60×120', sku: 'A-0245', precio: 53333 }, { nombre: 'Baño 70×140', sku: 'A-0246', precio: 69167 } ], pendientes: [] },
  { id: 'toalla-bamboo', cat: 'toallas', nombre: 'Toalla Bamboo 700 g',
    desc: 'Fibra de bambú de 700 g/m²: la más suave y absorbente del catálogo, naturalmente antibacterial.',
    img: [],
    variantes: [ { nombre: 'Manos 40×70', sku: 'A-0247', precio: 26667 }, { nombre: 'Baño 70×140', sku: 'A-0248', precio: 77500 } ], pendientes: ['foto'] },

  /* ---------------- SOMIERES ---------------- */
  { id: 'somier', cat: 'somieres', nombre: 'Somier Casa Di Luna',
    desc: 'Base tapizada con estructura en madera para colchones de cualquier altura. Disponible en todas las tallas.',
    img: [], precio: null, pendientes: ['foto', 'precio', 'medidas'],
    notaPendiente: 'Lista de precios de somieres con medidas corregidas pendiente.' }
];
