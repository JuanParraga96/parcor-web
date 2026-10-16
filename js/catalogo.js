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
  {"id": "enrollados", "nombre": "Colchones enrollados", "sub": "Azame · llegan comprimidos a cualquier ciudad", "img": "img/enrollados/azahar-2.jpg"},
  {"id": "extendidos", "nombre": "Colchones extendidos", "sub": "Casa Di Luna · nuestra línea propia", "img": "img/extendidos/cymbidium-1.jpg"},
  {"id": "somieres", "nombre": "Somieres y camas", "sub": "Bases, cabeceros y camas nido", "img": ""},
  {"id": "almohadas", "nombre": "Almohadas", "sub": "Fibra, memory foam y gel", "img": "img/hogar/almohada-memory-60x40x12.jpg"},
  {"id": "protectores", "nombre": "Protectores", "sub": "Para colchón y almohada", "img": "img/hogar/protector-de-colchon-cold-touch.jpg"},
  {"id": "sabanas", "nombre": "Sábanas y duvets", "sub": "De 144 a 300 hilos", "img": "img/hogar/juego-de-sabanas-platinum-180-hilos.jpg"},
  {"id": "cobijas", "nombre": "Cobijas", "sub": "Piel de durazno y felpa", "img": "img/hogar/cobija-malu-310gr.jpg"},
  {"id": "toallas", "nombre": "Toallas", "sub": "De 400 a 700 gramos", "img": "img/hogar/toalla-roma-550-gr.jpg"}
];

/* =====================================================================
   PRODUCTOS — generado desde precios_pagina_web.xlsx (tools/gen_catalogo.py)
   Precios redondeados a la centena, IVA incluido.
   ===================================================================== */
const PRODUCTOS = [
{
    id: "azahar",
    cat: "enrollados",
    linea: "enrollado",
    marca: "Azame",
    nombre: "Azahar",
    altura: 35,
    nucleo: "Resortes pocket + doble pillow top",
    firmeza: 3,
    sensacion: "Media, muy acolchada",
    desc: "El más mullido de la familia. Doble pillow top sobre un núcleo de resortes pocket independientes: te recibe suave y te sostiene firme por debajo. Doble cara, para voltearlo y que dure.",
    capas: ["Tela jacquard con algodón orgánico, antiflama (FR)", "Pillow top acolchado (ambas caras)", "Espuma penta de alta resiliencia", "Espuma densidad 26", "Núcleo de resortes pocket encajonado en espuma"],
    fresco: true,
    soporte: 100,
    dobleCara: true,
    img: ["img/enrollados/azahar-1.jpg", "img/enrollados/azahar-2.jpg", "img/enrollados/azahar-3.jpg"],
    precios: {"100x190": 1245300, "120x190": 1494400, "140x190": 1743400, "160x190": 1992500, "200x200": 2739700},
    pendientes: [],
    aisla: true,
    caracteristicas: ["Tela jacquard con algodón orgánico", "No transfiere calor", "Independencia de movimiento", "Tela FR: evita la propagación del fuego", "Garantía de 10 años"]
  },
{
    id: "deluxe",
    cat: "enrollados",
    linea: "enrollado",
    marca: "Azame",
    nombre: "Deluxe",
    altura: 30,
    nucleo: "Resortes pocket",
    firmeza: 3,
    sensacion: "Media",
    desc: "Resortes pocket independientes y espuma penta en una altura de 30 cm. Equilibrio entre soporte ortopédico e independencia de movimiento: si tu pareja se mueve, tú no lo sientes.",
    capas: ["Tela jacquard con algodón orgánico, antiflama (FR)", "Espuma penta de alta resiliencia", "Espuma densidad 26", "Núcleo de resortes pocket encajonado"],
    fresco: true,
    soporte: 100,
    dobleCara: true,
    img: ["img/enrollados/deluxe-1.jpg", "img/enrollados/deluxe-2.jpg", "img/enrollados/deluxe-3.jpg"],
    precios: {"100x190": 916600, "120x190": 1100000, "140x190": 1283300, "160x190": 1466600, "200x200": 2016600},
    pendientes: [],
    aisla: true,
    caracteristicas: ["Tela jacquard con algodón orgánico", "No transfiere calor", "Independencia de movimiento", "Tela FR: evita la propagación del fuego", "Garantía de 10 años"]
  },
{
    id: "luxury",
    cat: "enrollados",
    linea: "enrollado",
    marca: "Azame",
    nombre: "Luxury",
    altura: 30,
    nucleo: "Resortes pocket + pillow top interno",
    firmeza: 2,
    sensacion: "Media-suave",
    desc: "Híbrido de espuma y resortes pocket con un pillow top interno que suaviza el contacto sin perder el soporte. Jacquard antiflama, 30 cm y garantía de 10 años.",
    capas: ["Tela jacquard con algodón orgánico, antiflama (FR)", "Pillow top interno", "Espuma penta de alta resiliencia", "Espuma densidad 26", "Núcleo de resortes pocket"],
    fresco: true,
    soporte: 100,
    dobleCara: false,
    img: ["img/enrollados/luxury-1.jpg", "img/enrollados/luxury-2.jpg", "img/enrollados/luxury-3.jpg"],
    precios: {"100x190": 778000, "120x190": 933700, "140x190": 1089300, "160x190": 1244900, "200x200": 1711700},
    pendientes: [],
    aisla: true,
    caracteristicas: ["Tela jacquard con algodón orgánico", "No transfiere calor", "Independencia de movimiento", "Tela FR: evita la propagación del fuego", "Garantía de 10 años"]
  },
{
    id: "premium",
    cat: "enrollados",
    linea: "enrollado",
    marca: "Azame",
    nombre: "Premium",
    nucleo: "Espuma densidad 26, ortopédico",
    firmeza: 5,
    sensacion: "Firme",
    desc: "Espumado ortopédico de densidad 26 con capas de espuma penta por ambas caras. El más firme del catálogo, ideal para quien necesita soporte lumbar o duerme boca arriba. Elige la altura que prefieras.",
    capas: ["Tela tejido de punto con algodón orgánico, antiflama (FR)", "Espuma penta (ambas caras)", "Núcleo de espuma densidad 26"],
    fresco: false,
    soporte: 100,
    dobleCara: true,
    img: ["img/enrollados/premium-1.jpg", "img/enrollados/premium-2.jpg", "img/enrollados/premium-3.jpg"],
    alturas: [{"altura": 35, "precios": {"100x190": 1087900, "120x190": 1305500, "140x190": 1523100, "160x190": 1740600, "200x200": 2393400}}, {"altura": 30, "precios": {"100x190": 974000, "120x190": 1168900, "140x190": 1363700, "160x190": 1558500, "200x200": 2142900}}, {"altura": 25, "precios": {"100x190": 860200, "120x190": 1032200, "140x190": 1204300, "160x190": 1376300, "200x200": 1892400}}, {"altura": 15, "precios": {"90x190": 461700, "100x190": 461700}, "nota": "Versión delgada (NFR), ideal para camas nido o auxiliares"}],
    pendientes: [],
    aisla: true,
    caracteristicas: ["Tela jacquard con algodón orgánico", "No transfiere calor", "Independencia de movimiento", "Tela FR: evita la propagación del fuego", "Garantía de 10 años"]
  },
{
    id: "classic",
    cat: "enrollados",
    linea: "enrollado",
    marca: "Azame",
    nombre: "Classic",
    nucleo: "Resortes Bonell",
    firmeza: 2,
    sensacion: "Media-suave",
    desc: "La puerta de entrada a Azame: resortes Bonell, espuma penta y tela antiflama en 25 cm. Semi-ortopédico y liviano, perfecto para cuartos de invitados, niños o primer apartamento.",
    capas: ["Tela jacquard con algodón orgánico, antiflama (FR)", "Espuma penta", "Núcleo de resortes Bonell"],
    fresco: true,
    soporte: 90,
    dobleCara: true,
    img: ["img/enrollados/classic-1.jpg", "img/enrollados/classic-2.jpg", "img/enrollados/classic-3.jpg"],
    alturas: [{"altura": 25, "precios": {"100x190": 770000, "120x190": 924000, "140x190": 1078000, "160x190": 1232000, "200x200": 1694000}}, {"altura": 15, "precios": {"100x190": 350000}, "nota": "Versión delgada (NFR)"}],
    pendientes: [],
    aisla: true,
    caracteristicas: ["Tela jacquard con algodón orgánico", "No transfiere calor", "Independencia de movimiento", "Tela FR: evita la propagación del fuego", "Garantía de 10 años"]
  },
{
    id: "cymbidium",
    cat: "extendidos",
    linea: "extendido",
    marca: "Casa Di Luna",
    nombre: "Cymbidium",
    altura: 35,
    nucleo: "Resortado, doble pillow top",
    firmeza: 2,
    sensacion: "Media-suave, muy acolchada",
    desc: "El tope de la línea Casa Di Luna: 35 cm con doble pillow top y doble lado. La sensación de hotel, entregado extendido y listo para usar.",
    capas: ["Tela jacquard con algodón orgánico, antiflama (FR)", "Doble pillow top", "Espumas de confort", "Núcleo resortado"],
    fresco: true,
    soporte: 100,
    dobleCara: true,
    img: ["img/extendidos/cymbidium-1.jpg", "img/extendidos/cymbidium-2.jpg"],
    precios: {"100x190": 810200, "120x190": 939900, "140x190": 1082500, "160x190": 1214300, "200x200": 1582100},
    pendientes: [],
    aisla: true,
    caracteristicas: ["Tela jacquard con algodón orgánico", "No transfiere calor", "Independencia de movimiento", "Tela FR: evita la propagación del fuego", "Garantía de 10 años"]
  },
{
    id: "cataleya",
    cat: "extendidos",
    linea: "extendido",
    marca: "Casa Di Luna",
    nombre: "Cataleya",
    altura: 30,
    nucleo: "Resortes pocket, doble lado",
    firmeza: 3,
    sensacion: "Media",
    desc: "Resortes pocket independientes en 30 cm y doble lado para voltearlo. Soporte parejo e independencia de movimiento a un precio de línea propia.",
    capas: ["Tela jacquard con algodón orgánico, antiflama (FR)", "Espumas de confort (ambas caras)", "Núcleo de resortes pocket"],
    fresco: true,
    soporte: 100,
    dobleCara: true,
    img: ["img/extendidos/catelaya-1.jpg", "img/extendidos/catelaya-2.jpg"],
    precios: {"100x190": 768800, "120x190": 914600, "140x190": 1035700, "160x190": 1166700, "200x200": 1439000},
    pendientes: [],
    aisla: true,
    caracteristicas: ["Tela jacquard con algodón orgánico", "No transfiere calor", "Independencia de movimiento", "Tela FR: evita la propagación del fuego", "Garantía de 10 años"]
  },
{
    id: "midnight",
    cat: "extendidos",
    linea: "extendido",
    marca: "Casa Di Luna",
    nombre: "Midnight",
    altura: 32,
    nucleo: "Cassata, núcleo D80, pillow top",
    firmeza: 3,
    sensacion: "Media",
    desc: "Estructura cassata con núcleo de densidad 80 y pillow top: firme por dentro, acolchado por fuera. 32 cm de altura.",
    capas: ["Tela jacquard con algodón orgánico, antiflama (FR)", "Pillow top", "Espumas de confort", "Núcleo cassata D80"],
    fresco: false,
    soporte: 100,
    dobleCara: false,
    img: ["img/extendidos/midnight-1.jpg", "img/extendidos/midnight-2.jpg"],
    precios: {"100x190": 824900, "120x190": 981600, "140x190": 1325400, "160x190": 1312700, "200x200": 1564800},
    pendientes: [],
    aisla: true,
    caracteristicas: ["Tela jacquard con algodón orgánico", "No transfiere calor", "Independencia de movimiento", "Tela FR: evita la propagación del fuego", "Garantía de 10 años"]
  },
{
    id: "cambria",
    cat: "extendidos",
    linea: "extendido",
    marca: "Casa Di Luna",
    nombre: "Cambria",
    altura: 27,
    nucleo: "Cassata, núcleo D80, euro top jacquard",
    firmeza: 4,
    sensacion: "Media-firme",
    desc: "Núcleo cassata de densidad 80 con euro top en jacquard. Más firme que el Midnight y más bajo (27 cm): soporte sólido para quien duerme boca arriba.",
    capas: ["Tela jacquard con algodón orgánico, antiflama (FR)", "Euro top", "Espumas de confort", "Núcleo cassata D80"],
    fresco: false,
    soporte: 100,
    dobleCara: false,
    img: ["img/extendidos/cambria-1.jpg", "img/extendidos/cambria-2.jpg"],
    precios: {"100x190": 645700, "120x190": 757700, "140x190": 859700, "160x190": 976800, "200x200": 1206500},
    pendientes: [],
    aisla: true,
    caracteristicas: ["Tela jacquard con algodón orgánico", "No transfiere calor", "Independencia de movimiento", "Tela FR: evita la propagación del fuego", "Garantía de 10 años"]
  },
{
    id: "classic-flex",
    cat: "extendidos",
    linea: "extendido",
    marca: "Casa Di Luna",
    nombre: "Classic Flex",
    altura: 27,
    nucleo: "Resortes Bonnell con marco Z, euro top",
    firmeza: 3,
    sensacion: "Media",
    desc: "Resortes Bonnell reforzados con marco en Z para que los bordes no cedan, y euro top acolchado. La opción resortada más económica de Casa Di Luna.",
    capas: ["Tela jacquard con algodón orgánico, antiflama (FR)", "Euro top", "Espumas de confort", "Núcleo Bonnell con marco Z"],
    fresco: true,
    soporte: 90,
    dobleCara: false,
    img: ["img/extendidos/classic-flex-1.jpg", "img/extendidos/classic-flex-2.jpg"],
    precios: {"100x190": 608200, "120x190": 703300, "140x190": 798100, "160x190": 929600, "200x200": 1132100},
    pendientes: [],
    aisla: true,
    caracteristicas: ["Tela jacquard con algodón orgánico", "No transfiere calor", "Independencia de movimiento", "Tela FR: evita la propagación del fuego", "Garantía de 10 años"]
  },
{
    id: "anatomico",
    cat: "extendidos",
    linea: "extendido",
    marca: "Casa Di Luna",
    nombre: "Anatómico",
    nucleo: "Espuma densidad 23, tela satín",
    firmeza: 4,
    sensacion: "Firme",
    desc: "Espumado de densidad 23 con tela satín. Sencillo, firme y el más accesible del catálogo: ideal para niños, estudios y cuartos de invitados.",
    capas: ["Tela satín con algodón orgánico, antiflama (FR)", "Núcleo de espuma densidad 23"],
    fresco: false,
    soporte: 80,
    dobleCara: true,
    img: ["img/extendidos/anatomico-1.jpg", "img/extendidos/anatomico-2.jpg"],
    alturas: [{"altura": 30, "precios": {"100x190": 550000, "120x190": 633300, "140x190": 716700, "160x190": 800000, "200x200": 1050000}}, {"altura": 25, "precios": {"100x190": 490500, "120x190": 561900, "140x190": 633300, "160x190": 704800, "200x200": 919000}}, {"altura": 20, "precios": {"100x190": 466700}, "nota": "Marca Serrati, solo sencillo"}],
    pendientes: [],
    aisla: true,
    caracteristicas: ["Tela jacquard con algodón orgánico", "No transfiere calor", "Independencia de movimiento", "Tela FR: evita la propagación del fuego", "Garantía de 10 años"]
  },
{
    id: "somier",
    cat: "somieres",
    nombre: "Somier Casa Di Luna",
    desc: "Base cama en madera, encajonada y tapizada en jacquard acolchado, 25 cm de alto. Para colchones de cualquier altura.",
    img: [],
    entrega: "Entrega en Barranquilla y alrededores",
    variantes: [{"nombre": "Sencillo 100 × 190", "sku": "A-0074", "precio": 491700}, {"nombre": "Semidoble 120 × 190", "sku": "A-0075", "precio": 541700}, {"nombre": "Doble 140 × 190", "sku": "A-0076", "precio": 541700}, {"nombre": "Queen 160 × 190", "sku": "A-0077", "precio": 608300}, {"nombre": "King 200 × 200", "sku": "A-0078", "precio": 850000}, {"nombre": "100 × 200", "sku": "A-0079", "precio": 483300}, {"nombre": "95 × 160", "sku": "A-0115", "precio": 483300}],
    pendientes: ["foto"]
  },
{
    id: "somier-cabecero",
    cat: "somieres",
    nombre: "Somier con cabecero",
    desc: "Base cama entamborada en roble y cedro con cabecero integrado, tapizada en tela antifluido. 25 cm de alto.",
    img: [],
    entrega: "Entrega en Barranquilla y alrededores",
    variantes: [{"nombre": "Sencillo 100 × 190", "sku": "A-0089", "precio": 975000}, {"nombre": "Semidoble 120 × 190", "sku": "A-0090", "precio": 1108300}, {"nombre": "Doble 140 × 190", "sku": "A-0091", "precio": 1108300}, {"nombre": "Queen 160 × 190", "sku": "A-0092", "precio": 1258300}, {"nombre": "King 200 × 200", "sku": "A-0093", "precio": 1583300}],
    pendientes: ["foto"]
  },
{
    id: "cabecero",
    cat: "somieres",
    nombre: "Cabecero",
    desc: "Cabecero tapizado en tela antifluido, para combinar con tu somier.",
    img: [],
    entrega: "Entrega en Barranquilla y alrededores",
    variantes: [{"nombre": "100 cm", "sku": "A-0094", "precio": 483300}, {"nombre": "120 cm", "sku": "A-0095", "precio": 566700}, {"nombre": "140 cm", "sku": "A-0096", "precio": 566700}, {"nombre": "160 cm", "sku": "A-0097", "precio": 650000}, {"nombre": "200 cm", "sku": "A-0098", "precio": 733300}],
    pendientes: ["foto"]
  },
{
    id: "cama-nido",
    cat: "somieres",
    nombre: "Cama nido",
    desc: "Cama con segunda cama auxiliar que se guarda debajo. Roble y cedro entamborados, tela antifluido, 35 cm de alto. Ideal para cuartos infantiles y de invitados.",
    img: [],
    entrega: "Entrega en Barranquilla y alrededores",
    variantes: [{"nombre": "Sencillo 100 × 190", "sku": "A-0087", "precio": 1283300}, {"nombre": "Semidoble 120 × 190", "sku": "A-0088", "precio": 1533300}, {"nombre": "Doble 140 × 190", "sku": "A-0086", "precio": 1616700}],
    pendientes: ["foto"]
  },
{
    id: "almohada-tacto-ganso",
    cat: "almohadas",
    nombre: "Almohada Tacto Ganso",
    nombreLargo: "Almohada Tacto Ganso 50×70",
    sku: "A-0113",
    desc: "Fibra siliconada que imita la suavidad del plumón de ganso, sin plumas. Lavable y hipoalergénica.",
    img: ["img/hogar/almohada-tacto-ganso-50x70.jpg"],
    precio: 60000,
    pendientes: []
  },
{
    id: "almohada-tradicional",
    cat: "almohadas",
    nombre: "Almohada Tradicional",
    desc: "La almohada de todos los días: relleno de fibra siliconada y tela de microfibra, en dos tamaños.",
    img: ["img/hogar/almohada-50x70.jpg", "img/hogar/almohada-50-x-90.jpg"],
    variantes: [{"nombre": "50×70 cm", "sku": "A-0136", "precio": 26700}, {"nombre": "50×90 cm", "sku": "A-0137", "precio": 40800}],
    pendientes: []
  },
{
    id: "almohada-pillow",
    cat: "almohadas",
    nombre: "Almohada Pillow",
    desc: "Fibra siliconada con pillow: más relleno y más altura que la tradicional. Para quien duerme de lado o le gusta la almohada alta.",
    img: ["img/hogar/almohada-pillow-50x70.jpg", "img/hogar/almohada-pillow-50x90.jpg"],
    variantes: [{"nombre": "50×70 cm", "sku": "A-0138", "precio": 37500}, {"nombre": "50×90 cm", "sku": "A-0139", "precio": 40800}],
    pendientes: []
  },
{
    id: "almohada-antifluido",
    cat: "almohadas",
    nombre: "Almohada Antifluido",
    nombreLargo: "Almohada Antifluido 50×70",
    sku: "A-0140",
    desc: "Tela antifluido que repele líquidos y manchas, relleno de fibra siliconada. Pensada para hoteles, clínicas y casas con niños.",
    img: ["img/hogar/almohada-antifluido-50-x-70.jpg"],
    precio: 46700,
    pendientes: []
  },
{
    id: "almohada-memory-cervical",
    cat: "almohadas",
    nombre: "Almohada Memory Dream Cervical",
    nombreLargo: "Memory Dream Cervical Gel 55×35×11",
    sku: "A-0210",
    desc: "Memory foam con gel y forma ergonómica que sostiene el cuello en su curva natural. Para dolor cervical o quien duerme boca arriba.",
    img: ["img/hogar/almohada-memory-dream-cervical-55x35x11.jpg"],
    precio: 116700,
    pendientes: []
  },
{
    id: "almohada-memory-gel",
    cat: "almohadas",
    nombre: "Almohada Memory Dream Gel",
    nombreLargo: "Memory Dream Gel 60×40×12",
    sku: "A-0233",
    desc: "Memory foam con capa de gel refrescante en la superficie. Se adapta a tu cabeza y disipa el calor.",
    img: ["img/hogar/almohada-memory-60x40x12.jpg"],
    precio: 139200,
    pendientes: []
  },
{
    id: "almohada-serenity",
    cat: "almohadas",
    nombre: "Almohada Serenity Air Flow",
    nombreLargo: "Serenity Memory Air Flow 58×36",
    sku: "A-0234",
    desc: "Memory foam perforado para que el aire circule. Fresca y de altura media.",
    img: ["img/hogar/almohada-serenity-58x36.jpg"],
    precio: 87500,
    pendientes: []
  },
{
    id: "almohada-air-flow",
    cat: "almohadas",
    nombre: "Almohada Air Flow",
    nombreLargo: "Air Flow 60×40×12",
    sku: "A-0235",
    desc: "Memory foam de alta densidad con canales de ventilación y funda lavable. La más premium del catálogo.",
    img: ["img/hogar/almohada-air-flow-60x40x12.jpg"],
    precio: 174200,
    pendientes: []
  },
{
    id: "protector-colchon-cold-touch",
    cat: "protectores",
    nombre: "Protector de colchón Cold Touch",
    desc: "Microfibra 100% con tacto frío y capa antifluido. Protege el colchón y refresca en las noches calurosas.",
    img: ["img/hogar/protector-de-colchon-cold-touch.jpg"],
    variantes: [{"nombre": "Semidoble 120", "sku": "A-0104", "precio": 90800}, {"nombre": "Doble 140", "sku": "A-0105", "precio": 102500}, {"nombre": "Queen 160", "sku": "A-0106", "precio": 110800}, {"nombre": "King 200", "sku": "A-0107", "precio": 129200}],
    pendientes: []
  },
{
    id: "protector-colchon-antifluido",
    cat: "protectores",
    nombre: "Protector de colchón Elegant antifluido",
    desc: "Microfibra suavizada 100% con capa impermeable y transpirable. Protege el colchón sin sonar a plástico; se ajusta como sábana.",
    img: ["img/hogar/protector-de-colchon-antifluido.jpg"],
    variantes: [{"nombre": "Sencillo 100", "sku": "A-0117", "precio": 55800}, {"nombre": "Semidoble 120", "sku": "A-0118", "precio": 60000}, {"nombre": "Doble 140", "sku": "A-0119", "precio": 69200}, {"nombre": "Queen 160", "sku": "A-0120", "precio": 74200}, {"nombre": "King 200", "sku": "A-0121", "precio": 87500}],
    pendientes: []
  },
{
    id: "protector-colchon-acolchado",
    cat: "protectores",
    nombre: "Protector de colchón acolchado",
    desc: "Microfibra suavizada 100%, acolchado y blanco: suma una capa de confort y protege contra el desgaste diario.",
    img: ["img/hogar/protector-de-colchon-acolchado.jpg"],
    variantes: [{"nombre": "Sencillo 100", "sku": "A-0128", "precio": 59200}, {"nombre": "Semidoble 120", "sku": "A-0129", "precio": 65000}, {"nombre": "Doble 140", "sku": "A-0130", "precio": 76700}, {"nombre": "Queen 160", "sku": "A-0131", "precio": 80000}, {"nombre": "King 200", "sku": "A-0132", "precio": 97500}],
    pendientes: []
  },
{
    id: "protector-almohada-antifluido",
    cat: "protectores",
    nombre: "Protector de almohada antifluido (set × 2)",
    sku: "A-0116",
    desc: "Par de fundas impermeables en microfibra, 50×70. Protegen la almohada de líquidos, ácaros y manchas.",
    img: ["img/hogar/protector-almohada-antifluido.jpg"],
    precio: 30000,
    pendientes: []
  },
{
    id: "protector-almohada-cold-touch",
    cat: "protectores",
    nombre: "Protector de almohada Cold Touch",
    sku: "A-0146",
    desc: "Tecnología I-cool: tacto frío y a prueba de agua. 50×70.",
    img: ["img/hogar/protector-de-almohada-microfibra.jpg"],
    precio: 61700,
    pendientes: []
  },
{
    id: "sabanas-platinum",
    cat: "sabanas",
    nombre: "Juego de sábanas Platinum 180 hilos",
    desc: "Percal de 180 hilos, 48% algodón y 52% microfibra, en blanco. Sensación de hotel.",
    img: ["img/hogar/juego-de-sabanas-platinum-180-hilos.jpg"],
    variantes: [{"nombre": "Sencillo 100", "sku": "A-0108", "precio": 121700}, {"nombre": "Semidoble 120", "sku": "A-0109", "precio": 145800}, {"nombre": "Doble 140", "sku": "A-0110", "precio": 158300}, {"nombre": "Queen 160", "sku": "A-0111", "precio": 169200}, {"nombre": "King 200", "sku": "A-0112", "precio": 198300}],
    pendientes: []
  },
{
    id: "sabanas-elegant-home",
    cat: "sabanas",
    nombre: "Juego de sábanas Elegant Home 144 hilos",
    desc: "Línea blanca de 144 hilos, 48% algodón y 52% microfibra. Suave, fresca y fácil de lavar.",
    img: ["img/hogar/juego-de-sabanas-144-hilos.jpg"],
    variantes: [{"nombre": "Twin", "sku": "A-0141", "precio": 84200}, {"nombre": "Semidoble", "sku": "A-0142", "precio": 104200}, {"nombre": "Doble (Full)", "sku": "A-0143", "precio": 101700}, {"nombre": "Queen", "sku": "A-0144", "precio": 105000}, {"nombre": "King", "sku": "A-0145", "precio": 125000}],
    pendientes: []
  },
{
    id: "sabanas-my-house",
    cat: "sabanas",
    nombre: "Juego de sábanas My House",
    sku: "A-0211",
    desc: "Juego completo en blanco para cama sencilla (1,00 × 1,90).",
    img: [],
    precio: 71000,
    pendientes: ["foto"]
  },
{
    id: "sabanas-reactiva",
    cat: "sabanas",
    nombre: "Juego de sábanas Reactiva",
    desc: "Tela reactiva en blanco, de color estable que no destiñe con el lavado.",
    img: [],
    variantes: [{"nombre": "Twin", "sku": "A-0214", "precio": 54200}, {"nombre": "Semidoble", "sku": "A-0215", "precio": 60000}, {"nombre": "Doble (Full)", "sku": "A-0216", "precio": 61700}, {"nombre": "Queen", "sku": "A-0217", "precio": 70800}, {"nombre": "King", "sku": "A-0218", "precio": 87500}],
    pendientes: ["foto"]
  },
{
    id: "sabanas-mistura",
    cat: "sabanas",
    nombre: "Juego de sábanas Mistura",
    desc: "Mezcla de algodón y poliéster: la suavidad del algodón con la resistencia del poliéster.",
    img: [],
    variantes: [{"nombre": "Doble 140", "sku": "A-0219", "precio": 175800}, {"nombre": "Queen 160", "sku": "A-0220", "precio": 190000}, {"nombre": "King 200", "sku": "A-0221", "precio": 215800}],
    pendientes: ["foto"]
  },
{
    id: "sabanas-natural",
    cat: "sabanas",
    nombre: "Juego de sábanas Natural",
    desc: "Algodón natural de alto hilaje. La línea más suave y fresca para el clima de la costa.",
    img: [],
    variantes: [{"nombre": "Doble (Full)", "sku": "A-0222", "precio": 272500}, {"nombre": "Queen", "sku": "A-0223", "precio": 291700}, {"nombre": "King", "sku": "A-0224", "precio": 330000}],
    pendientes: ["foto"]
  },
{
    id: "duvet-t200",
    cat: "sabanas",
    nombre: "Duvet 200 hilos",
    desc: "Edredón ligero de 200 hilos con relleno siliconado. Abriga sin pesar.",
    img: ["img/hogar/duvet-200-300-hilos.jpg"],
    variantes: [{"nombre": "Doble 140", "sku": "A-0225", "precio": 228300}, {"nombre": "Queen 160", "sku": "A-0226", "precio": 245800}, {"nombre": "King 200", "sku": "A-0227", "precio": 280800}],
    pendientes: []
  },
{
    id: "duvet-t300",
    cat: "sabanas",
    nombre: "Duvet 300 hilos institucional",
    desc: "Tela de 300 hilos y costura reforzada para lavado industrial. Hoteles, hostales y Airbnb.",
    img: ["img/hogar/duvet-200-300-hilos.jpg"],
    variantes: [{"nombre": "Doble 140", "sku": "A-0228", "precio": 291700}, {"nombre": "Queen 160", "sku": "A-0229", "precio": 307500}, {"nombre": "King 200", "sku": "A-0230", "precio": 361700}],
    pendientes: []
  },
{
    id: "plumon-elegant-home",
    cat: "sabanas",
    nombre: "Plumón Elegant Home 300 hilos",
    desc: "Plumón en poliéster con fibra suavizada 100% y tela de 300 hilos. El más abrigado de la línea.",
    img: ["img/hogar/plumon-elegant-home-300-hilos.jpg"],
    variantes: [{"nombre": "Doble 140", "sku": "A-0147", "precio": 125000}, {"nombre": "Queen 160", "sku": "A-0148", "precio": 131700}, {"nombre": "King 200", "sku": "A-0149", "precio": 145800}],
    pendientes: []
  },
{
    id: "fundas-almohada",
    cat: "sabanas",
    nombre: "Fundas de almohada blancas (set × 2)",
    desc: "Par de fundas blancas, estándar hotelero. En microfibra o polyalgodón.",
    img: ["img/hogar/funda-para-almohada-x-2-microfibra-polyalgodon.jpg"],
    variantes: [{"nombre": "Microfibra", "sku": "A-0231", "precio": 12500}, {"nombre": "Polyalgodón", "sku": "A-0232", "precio": 20800}],
    pendientes: []
  },
{
    id: "cobija-piel-de-durazno",
    cat: "cobijas",
    nombre: "Cobija Piel de Durazno",
    nombreLargo: "Cobija Piel de Durazno 350 g · 180×200",
    sku: "A-0133",
    desc: "Tacto aterciopelado y liviano, 350 g/m², en blanco. Para cama doble (180×200 cm).",
    img: ["img/hogar/cobija-piel-de-durazno.jpg"],
    precio: 70000,
    pendientes: []
  },
{
    id: "cobija-malu",
    cat: "cobijas",
    nombre: "Cobija Malu",
    nombreLargo: "Cobija Malu 310 g · 180×200",
    sku: "A-0134",
    desc: "Felpa con textura acanalada de 310 g/m². Abriga bien sin dar calor. 180×200 cm.",
    img: ["img/hogar/cobija-malu-310gr.jpg"],
    precio: 74200,
    pendientes: []
  },
{
    id: "cobija-layan",
    cat: "cobijas",
    nombre: "Cobija Layan",
    nombreLargo: "Cobija Layan 450 g · 180×200",
    sku: "A-0135",
    desc: "Felpa gruesa de 450 g/m², tipo sherpa, en 5 tonos. La más abrigada y mullida. 180×200 cm.",
    img: ["img/hogar/cobija-layan-450-gr.jpg"],
    precio: 175800,
    pendientes: []
  },
{
    id: "toalla-elegant-400",
    cat: "toallas",
    nombre: "Toalla Elegant 400 g",
    nombreLargo: "Toalla Elegant 400 g · 60×120",
    sku: "A-0212",
    desc: "Algodón de 400 g/m², ligera y de secado rápido. Tamaño cuerpo 60×120.",
    img: [],
    precio: 43200,
    pendientes: ["foto"]
  },
{
    id: "toalla-elegant-550",
    cat: "toallas",
    nombre: "Toalla Elegant 550 g",
    desc: "Algodón 100% de 550 g/m², para hoteles, spas o uso personal.",
    img: ["img/hogar/toalla-elegant-550-gr.jpg"],
    variantes: [{"nombre": "Manos 40×70", "sku": "A-0150", "precio": 14200}, {"nombre": "Baño 70×140", "sku": "A-0151", "precio": 43300}],
    pendientes: []
  },
{
    id: "toalla-horizonte",
    cat: "toallas",
    nombre: "Toalla Horizonte 450 g",
    desc: "Rizo de 450 g/m² con franja tejida. Liviana y económica.",
    img: ["img/hogar/toalla-horizonte-450-gr.jpg"],
    variantes: [{"nombre": "Manos 40×70", "sku": "A-0236", "precio": 17500}, {"nombre": "Baño 70×140", "sku": "A-0237", "precio": 36700}],
    pendientes: []
  },
{
    id: "toalla-senda",
    cat: "toallas",
    nombre: "Toalla Senda 550 g",
    desc: "Rizo denso de 550 g/m² con cenefa en relieve.",
    img: ["img/hogar/toalla-senda-550-gr.jpg"],
    variantes: [{"nombre": "Manos 40×70", "sku": "A-0238", "precio": 20800}, {"nombre": "Baño 70×140", "sku": "A-0239", "precio": 60000}],
    pendientes: []
  },
{
    id: "toalla-roma",
    cat: "toallas",
    nombre: "Toalla Roma 550 g",
    desc: "Rizo de 550 g/m² con tejido tipo espiga en la cenefa.",
    img: ["img/hogar/toalla-roma-550-gr.jpg"],
    variantes: [{"nombre": "Manos 40×70", "sku": "A-0240", "precio": 22500}, {"nombre": "Baño 70×140", "sku": "A-0241", "precio": 65000}],
    pendientes: []
  },
{
    id: "toalla-mohda",
    cat: "toallas",
    nombre: "Toalla Mohda 600 g",
    desc: "Rizo de 600 g/m² con bordes acanalados. Gruesa y muy absorbente.",
    img: ["img/hogar/toalla-mohda-600-gr.jpg", "img/hogar/toalla-mohda-600-gr-2.jpg"],
    variantes: [{"nombre": "Manos 40×70", "sku": "A-0242", "precio": 24200}, {"nombre": "Baño 70×140", "sku": "A-0243", "precio": 65000}],
    pendientes: []
  },
{
    id: "toalla-hotelera",
    cat: "toallas",
    nombre: "Toalla Elegant Hotelera 650 g",
    desc: "Línea institucional de 650 g/m²: resiste lavados industriales y mantiene el blanco.",
    img: ["img/hogar/toalla-institucional-650-gr.jpg"],
    variantes: [{"nombre": "Manos 40×70", "sku": "A-0244", "precio": 31700}, {"nombre": "Cuerpo 60×120", "sku": "A-0245", "precio": 53300}, {"nombre": "Baño 70×140", "sku": "A-0246", "precio": 69200}],
    pendientes: []
  },
{
    id: "toalla-bamboo",
    cat: "toallas",
    nombre: "Toalla Bamboo 700 g",
    desc: "Fibra de bambú de 700 g/m²: la más suave y absorbente del catálogo, naturalmente antibacterial.",
    img: [],
    variantes: [{"nombre": "Manos 40×70", "sku": "A-0247", "precio": 26700}, {"nombre": "Baño 70×140", "sku": "A-0248", "precio": 77500}],
    pendientes: ["foto"]
  }
];
