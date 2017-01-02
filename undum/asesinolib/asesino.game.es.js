// ---------------------------------------------------------------------------
// Edit this file to define your game. It should have at least four
// sets of content: undum.game.situations, undum.game.start,
// undum.game.qualities, and undum.game.init.
// ---------------------------------------------------------------------------

/* A string indicating what version of the game this is. Versions are
 * used to control saved-games. If you change the content of a game,
 * the saved games are unlikely to work. Changing this version number
 * prevents Undum from trying to load the saved-game and crashing. */
undum.game.version = "1.20120810";

/* A unique id for your game. This is never displayed. I use a UUID,
 * but you can use anything that is guaranteed unique (a URL you own,
 * or a variation on your email address, for example). */
undum.game.id = "baltasarq.asesino." + undum.game.version;

/*
 * Some defs
 */
    defs = {
        "nombreVictima": "Julia"
    }
 

/*
 *  Game locs
 */

    // Loc normal
    Loc = {
        "numVisitas"    : 0,
        "setLinks"      : function() {},
        "getDesc"       : function() {
                                this.numVisitas++;
                                this.setLinks();
                                return ( this.composeMainDesc() + this.links );
                            },
        "composeMainDesc" : function () {
                                var toret = 0;
                                
                                if ( this.numVisitas > this.desc.length ) {
                                    toret = this.desc.length -1;
                                } else {
                                    toret = this.numVisitas -1;
                                }
                
                                return this.desc[ toret ];
                            },
    }
    
    // Loc decorada
    GrfLoc = {}
    $.extend( GrfLoc, Loc );
    GrfLoc.getDesc = function() {
        this.numVisitas++;
        this.setLinks();
        
        if ( this.numVisitas > 1 ) {
            return ( this.composeMainDesc() + this.links );
        } else {
            return ( this.img + this.composeMainDesc() + this.links );
        }
    }
 
    // Iglesia
    locIglesia = {
        "estaMuerto": false,
        "estaLlamadaHecha": false,
        "fueExaminado": false,
        "fuePegado": false,
        "linkSalir" : "<p class='transient'><i>Sal de la <a href='plaza'>iglesia</a></i>.</p>",
        "linkExaminar" : "<p class='transient'><i>Examina al <a class='once' href='hombre'>hombre</a></i>.</p>",
        "linkPegar" : "<p class='transient'><i>Sigue <a href='pegarle'>peg&aacute;ndole</a></i>.</p>",
        "linkMatar" : "<p class='transient'><i><a href='matarle'>M&aacute;tale</a></i>.</p>",
        "img" : "<p align='center'><img src='asesinolib/pic/interiorIglesia.png'></p>",
        "desc" : [
           "<p>La penumbra invade la sacrist&iacute;a, solamente rota a trozos en aquellos lugares\
           donde las grietas de las paredes permiten la entrada de los rayos\
           del sol. Llena de muebles inservibles, los desechos se acumulan en las\
           esquinas, si bien el centro ha sido despejado para dejar tan solo una\
           silla. Y en la silla, un hombre.</p>",
           "<p>El hombre te mira desde su silla, aterrorizado. No es que sientas precisamente\
               empat&iacute;a en este momento, sin embargo.</p>",
           "<p>La destrozada sacrist&iacute;a revela en su interior al hombre objeto de tu ira.</p>",
           "<p>La silla se mueve ligeramente cuando el hombre trata de saltar... grita\
               de frustraci&oacute;n. Sabes que no podr&aacute; ir a ninguna parte.</p>",
           "<p>El hombre atado a la silla se encuentra dentro de la destrozada sacrist&iacute;a.</p>"
        ]
    }
    $.extend( locIglesia, GrfLoc );
    locIglesia.setLinks = function() {
        this.links = "";
        
        if ( !this.estaMuerto ) {
            if ( !this.fueExaminado ) {
                this.links += this.linkExaminar;
            }
            
            if ( locTelefono.estaLlamadaHecha ) {
                this.links += this.linkMatar;
            } else {
                if ( !this.fuePegado ) {
                    this.links += this.linkPegar;
                }
            }
        } else {
            this.desc = [ "<p>Del cad&aacute;ver del hombre gotea ahora un \
                         l&iacute;quido mezcla de sangre y saliva.</p>" ];
        }

        this.links += this.linkSalir;
        return;
    }
    
    locPlaza = {
        "desc": [
            "<p>La antigua plaza mayor de Fraguas se esconde entre los matojos que ahora\
            la invaden. Trozos de alba&ntilde;iler&iacute;a alfombran el suelo, all&iacute;\
            donde la flora no lo ha conquistado. Has dejado la furgoneta aqu&iacute; aparcada.</p>",
            "<p>La antigua plaza est&aacute; realmente destrozada, aunque a&uacute;n es claramente visible\
             la iglesia desde aqu&iacute;, mientras el camino al cementerio s&oacute;lo se adivina.\
              Has dejado la furgoneta aqu&iacute; aparcada.",
            "<p>La antigua plaza mayor de Fraguas apenas se distingue de entre los escombros\
                y los matojos. Has dejado la furgoneta aqu&iacute; aparcada.</p>"
        ],
        "img": "<p align='center'><img src='asesinolib/pic/iglesia.png'></p>",
        "links":
            "<p class='transient'><i><a href='iglesia'>Vuelve dentro</a></i>.</p>\
            <p class='transient'><i><a href='camino'>Ve hacia el cementerio</a></i>.</p>"
    }
    $.extend( locPlaza, GrfLoc );
    
    locCamino = {
        "fueMiliRecordada": false,
        "desc": [
            "<p>Camino de la plaza al cementerio, los restos de una peque&ntilde;a casa se sit&uacute;an\
                 a un lado de la senda.</p>",
            "<p>Una derruida casa descansa a un lado del camino.</p>",
            "<p>El sol se filtra por entre los restos de una peque&ntilde;a casa.</p>",
            "<p>A un lado de la senda se yerguen los restos de una casa.</p>"
        ],
        "img": "<p align='center'><img src='asesinolib/pic/casa.png'></p>",
        "linkRecuerda": "<p class='transient'><i><a href='recuerda-mili'>Esta casa te trae recuerdos...</a></i>.</p>",
        "linksSalidas":
            "<p class='transient'><i><a href='cementerio'>Contin&uacute;a hacia el cementerio</a></i>.</p>"
    }
    $.extend( locCamino, GrfLoc );
    locCamino.setLinks = function() {
        this.links = "";
        
        if ( !this.fueMiliRecordada ) {
            this.links += this.linkRecuerda;
        } else {
            this.links += this.linksSalidas;
        }
        
        return;
    }
    
    locCementerio = {
        "fueRecordado": false,
        "desc": [
            "<p>Al mirar abajo, reparas en una solitaria tumba, sin l&aacute;pida, casi invisible por las\
                zarzas. Unas flores, tambi&eacute;n min&uacute;sculas, crecen en su cabecera. Su sola visi&oacute;n\
                nubla tu mente, llen&aacute;ndola de dolor.</p>",
            "<p>La tumba parece querer llamar m&aacute;s y m&aacute;s dolor.</p>"
        ],
        "img": "<p align='center'><img src='asesinolib/pic/cementerio.png'></p>",
        "linkSalir":
            "<p class='transient'><i><a href='plaza'>Asciende por el camino hasta el pueblo</a></i>.</p>",
        "linkRecordar":
            "<p class='transient'><i><a href='recuerdo-cementerio'>Recuerdos...</a></i>.</p>"
    }
    $.extend( locCementerio, GrfLoc );
    locCementerio.setLinks = function() {
        if ( !this.fueRecordado ) {
            this.links = this.linkRecordar;
        } else {
            this.links = this.linkSalir;
            locPlaza.links = "<p class='transient'><i><a href='iglesia'>Vuelve dentro de la iglesia</a></i>.</p>\
                              <p class='transient'><i><a href='furgoneta'>Entra en la furgoneta</a></i>.</p>";
        }

        return;
    }
    
    locFurgoneta = {
        "fueRecordado": false,
        "desc": [
                "<p>El interior de la furgoneta huele a vejez y humedad.\
                El tapizado, que muestra trozos de tela rasgados en varios lugares,\
                se encuentra brillante y liso en aquellas zonas de roce m&aacute;s comunes.\
                Una peque&ntilde;a guantera y un simple salpicadero son los complementos del conductor.</p>",
                "<p>Observas la plaza desde el interior de la furgoneta, a trav&eacute;s del sucio parabrisas.</p>",
                "<p>En el asiento del conductor de la furgoneta.</p>"
        ],
        "linkRecordar": "<p class='transient'><i><a href='recuerdo-furgo'>Esa manta en la parte trasera...</a></i></p>",
        "linkLlamar": "<p class='transient'><i><a href='telefono'>Puedes coger tu tel&eacute;fono m&oacute;vil en la guantera</a></i>.</p>",
        "linksSalir": "<p class='transient'><i><a href='plaza'>Baja de la furgoneta</a></i>.</p>\
                      <p class='transient'><i><a href='conduccion'>Te entran ganas de conducir, dejando el t&eacute;trico pueblo atr&aacute;s</a></i>.</p>"

    }
    $.extend( locFurgoneta, Loc );
    locFurgoneta.setLinks = function() {
        this.links = "";

        if ( !this.fueRecordado ) {
            this.links += this.linkRecordar;
        } else {
            if ( !locTelefono.estaLlamadaHecha ) {
                this.links += this.linkLlamar;
            }

            this.links += this.linksSalir;
        }

        return;
    }
    
    locTelefono = {
        "estaLlamadaHecha": false,
        "desc": [
                "<p>Sentado en el asiento del conductor, contemplas tu tel&eacute;fono m&oacute;vil, como\
                    si de la pantalla fueses a obtener una pista sobre qu&eacute; hacer\
                    a continuaci&oacute;n.</p>",
                "<p>Contemplas la pantalla inanimada del tel&eacute;fono.</p>"
        ],
        "links": "<p class='transient'><i><a href='furgoneta'>Deja el tel&eacute;fono</a></i>.</p>\
                  <p class='transient'><i><a href='telefono-poli'>Llama a la polic&iacute;a</a></i>.</p>"
    }
    $.extend( locTelefono, Loc );

    locConduccion = {
        "desc": [
            "<p><h1>Pista forestal</h1>\
            <b>Martes, 8 de Octubre de 2001, 21h.</b><br>\
            Conduces la furgoneta por entre los baches de la pista forestal. Atr&aacute;s, queda\
            Fraguas, y... su iglesia.</p>"
        ],
        "img": "<p align='center'><img src='asesinolib/pic/pistaForestalNoche.png'></p>",
        "finalInanicion": "<p>Supones qu&eacute; es lo que le suceder&aacute;: morir&aacute; de hambre y sed,\
            viendo pasar las horas, primero, los d&iacute;as -pocos- despu&eacute;s. Su suerte est&aacute; echada, s&iacute;, pero...\
            <i>¿A qui&eacute;n le importa?</i><p><i>Esto es lo que quer&iacute;as, ¿no?</i></p>",
        "finalMuere": "<p>Intentas darte prisa, no puedes imaginar c&oacute;mo de r&aacute;pido reaccionar&aacute; la polic&iacute;a,\
                        as&iacute; que le pisas a fondo, y no vuelves a respirar con calma hasta dejar la pista\
                        y tomar la carretera. Sabes que no te coger&aacute;n, pero tu alma no est&aacute; tranquila.\
                        Es curioso. Siempre pensaste que hacer esto terminar&iacute;a con todo.\
                        <i>Sin embargo, no parece haber mejorado.</i></p>",
        "finalVive": "<p>Intentas darte prisa, no puedes imaginar c&oacute;mo de r&aacute;pido reaccionar&aacute; la polic&iacute;a,\
                        as&iacute; que le pisas a fondo, y no vuelves a respirar con calma hasta dejar la pista\
                        y tomar la carretera. Dudas de si te coger&aacute;n, si te reconocer&aacute; el maldito, si\
                        estar&aacute; dispuesto a declarar... tantas dudas, tanta ansiedad... pero lo que\
                        realmente te atenaza el est&oacute;mago es pensar que <i>ten&iacute;as que haberlo matado.</i></p>",
    }
    $.extend( locConduccion, GrfLoc );

    locConduccion.composeMainDesc = function() {
        toret = this.desc[ 0 ];

        if ( !locTelefono.estaLlamadaHecha ) {
             toret += this.finalInanicion;
        } else {
            if ( locIglesia.estaMuerto ) {
                toret += this.finalMuere;
            } else {
                toret += this.finalVive;
            }
        }

        return toret;
    }

// =============================================================================

/* The situations that the game can be in. Each has a unique ID. */
undum.game.situations = {
    "intro": new undum.SimpleSituation(
         "<h1>Iglesia de Fraguas, Guadalajara</h1>\
         <b>Martes, 8 de Octubre de 2001, 19h27</b>\
         <p>Te examinas las manos. Tu mirada, distra&iacute;da, apunta mucho m&aacute;s alla de los nudillos\
         doloridos, enrojecidos por tu\
         propia sangre... y por la suya. Te sientes bien. Por primera vez\
         en mucho tiempo, te sientes extra&ntilde;amente bien.</p>\
         <p class='transient'><i><a href='iglesia'>...bien ...</a></i></p>"
    ),
    "iglesia": new undum.Situation( {
        enter: function(character, system, from) {
            system.write( locIglesia.getDesc() );
        }
    }),
    "hombre": new undum.SimpleSituation(
        "<p>Su aspecto es lamentable. Est&aacute; fuertemente atado, y ya has\
            empezado a pegarle con ciertas ganas. Tiene los ojos amoratados,\
            sangre en la mejilla y en la boca, y gimotea pidiendo que le desates\
            y le dejes en paz.</p>\
         <p class='transient'><i><a href='iglesia'>Paz...</a></i></p>",
        {
            exit: function(character, system, from) {
                locIglesia.fueExaminado = true;
            }
        }
    ),
    "pegarle": new undum.SimpleSituation(
        "<p>S&iacute;, su aspecto es lamentable... Pero eso no te amilana. Aprietas los pu&ntilde;os,\
            y casi autom&aacute;ticamente estrellas tus manos contra el aborrecible rostro.\
            Podr&iacute;as estar as&iacute; horas...\
            .</p>\
         <p class='transient'><i><a href='iglesia'>Descansas, apoyado contra la pared...</a></i>.</p>",
        {
            exit: function(character, system, from) {
                locIglesia.fuePegado = true;
            }
        }
    ),
    "matarle": new undum.SimpleSituation(
        "<p>La decisi&oacute;n toma forma lentamente dentro de tu cabeza.\
            <p><i>En realidad, es lo justo.</i>\
            Situ&aacute;ndote por detr&aacute;s de &eacute;l, tomas uno de\
            tantos cascotes del suelo, y lentamente, lo levantas por\
            encima de ti, estirando los brazos.\
            Tu respiraci&oacute;n se acelera, tensas los\
            m&uacute;sculos... <p><i>En realidad, es lo justo.</i>\
            Ya al borde de la hiperventilaci&oacute;n, aprietas los dientes, y la furia\
            te invade. Tu rostro se enciende, y justo antes de iniciar\
            el fat&iacute;dico arco, los m&uacute;sculos de tus brazos adquieren una capacidad\
            brutal, o al menos as&iacute; te lo parece.\
            <p><i>En realidad, es lo justo.</i>\
            Casi puedes notar su cabeza abri&eacute;ndose por la fuerza del impacto.\
            Un ruido sordo, como el de una nuez abri&eacute;ndose, acompa&ntilde;a el retorno de la\
            piedra al suelo.<p><i>En realidad, es lo justo.</i>\
            El impacto de la piedra te toma desprevenido, como si una fuerza\
            estuviera a punto de impactarte a ti.\
            Est&aacute; hecho. <p><i>En realidad, es lo justo.</i></p>\
         <p class='transient'><i><a href='iglesia'>Est&aacute; hecho...</a></i>.</p>",
        {
            exit: function(character, system, from) {
                locIglesia.estaMuerto = true;
            }
        }
    ),
    "plaza": new undum.Situation(
        {
            enter: function(character, system, from) {
                system.write( locPlaza.getDesc() );
            }
        }
    ),
    "camino": new undum.Situation(
        {
            enter: function(character, system, from) {
                system.write( locCamino.getDesc() );
            }
        }
    ),
    "recuerda-mili": new undum.SimpleSituation(
        "<p><h1>Guadalajara</h1>\
        <b>Lunes, 11 de Mayo de 2001, 11h42.</b><br>\
        Sentado c&oacute;modamente frente a una mesa, en una habitaci&oacute;n en casa que ahora usas como\
        centro de planificaci&oacute;n para tu objetivo, despliegas un mapa de las cercan&iacute;as\
        de Guadalajara. Buscas un lugar apartado, un lugar donde la venganza que has planeado\
        durante tanto tiempo pueda llevarse a t&eacute;rmino. Tus ojos pasean nerviosos por el mapa,\
        sabes que hay algo que se te est&aacute; escapando, el lugar est&aacute; ah&iacute;, pero se esconde de tu\
        febril mente. ¡Claro! Tiene que ser Fraguas... aquel pueblo abandonado en donde\
        el ej&eacute;rcito hac&iacute;a maniobras.\
        <p>...<br><br></p>\
        <p class='transient'><i><a href='recuerda-mili-cont'>Vaya &eacute;poca...</a></i>.</p>",
        {
            exit: function(character, system, from) {
                locCamino.fueMiliRecordada = true;
            }
        }
    ),
    "recuerda-mili-cont": new undum.SimpleSituation(
        "<p>Recuerdas con cari&ntilde;o aquella &eacute;poca de tu vida.\
        Aquello sucedi&oacute; durante <i>la mili</i>, como se\
        la conoc&iacute;a entonces. Las pr&aacute;cticas con fuego real de aquel verano, en el ya\
        abandonado Fraguas, terminaron de desmoronar peque&ntilde;as casas como esta. Un lugar\
        apartado y sin inter&eacute;s para nadie, muy &uacute;til para tus prop&oacute;sitos.</p>\
        <p class='transient'><i><a href='camino'>Son recuerdos...</a></i>.</p>"
    ),
    "recuerdo-cementerio": new undum.SimpleSituation(
        "<p><h1>Secretar&iacute;a del juzgado central de Madrid, nº 1</h1><b>\
        Jueves, 11 de Mayo de 2001, 11h42</b><br>Papeles.\
               Todo est&aacute; lleno de papeles y carpetas. El hombre que tienes delante,\
               un administrativo, est&aacute; rodeado de pilas de documentos, que amenazan\
               a cada minuto con sepultarle con su peso.<br>\
               Aunque parece un hombre comprensivo, amable, que te mira con tristeza y empat&iacute;a...\
               Es obvio que no quiere hacerte da&ntilde;o pero la conversaci&oacute;n con &eacute;l te est&aacute; reventando\
               el est&oacute;mago. El h&iacute;gado. Todo tu ser. Te est&aacute; reventando por dentro, y dentro de tu\
               cabeza, las cosas no est&aacute;n mejor.</p>\
        <p class='transient'><i>¡Debe <a href='recuerdo-cementerio-cont'>entenderlo</a>!</i></p>",
        {
            exit: function(character, system, from) {
                locCementerio.fueRecordado = true;
            }
        }
    ),
    "recuerdo-cementerio-cont": new undum.SimpleSituation(
        "<p>Tratas de hacerle comprender.<i>\
               <p> - No puede ser, ¡no puede ser...!\
               <p> - Me temo que as&iacute; es.\
               <p> - Ella muri&oacute;... ¡maldita sea! Muri&oacute; a sus manos, no puede salir impune.\
               <p> - Por favor, c&aacute;lmese, esto no es culpa de nadie.\
               <p> - ¡¿No es culpa de nadie!? ¡¿De nadie?! ¿Pero usted se est&aacute; oyendo?\
               <p> - Le aconsejo que se calme. O mejor a&uacute;n, v&aacute;yase. Aqu&iacute; no puede hacer ya nada.\
               <p> - Pero...\
               <p>El hombre movi&oacute; pesadamente la cabeza hacia los lados.\
               <p> - No hay nada que hacer.</i></p>\
        <p class='transient'><i><a href='recuerdo-cementerio-cont2'>Nada que hacer</a>...</i>.</p>"
    ),
    "recuerdo-cementerio-cont2": new undum.SimpleSituation(
        "<p>Desolado, abandonas el juzgado. No puedes creerlo. Él la mat&oacute;, y ahora... ahora\
               sale libre. No puedes creerlo.</p>\
               <p>Fue all&iacute; cuando naci&oacute; una determinaci&oacute;n, un convencimiento.\
               <br><small><i>- " + defs.nombreVictima + "...</i></small></p>\
               <p>...<br><br></p>\
        <p class='transient'><i><a href='cementerio'>S&oacute;lo quiero no pensar</a></i>.</p>"
    ),
    "cementerio": new undum.Situation(
        {
            enter: function(character, system, from) {
                system.write( locCementerio.getDesc() );
            }
        }
    ),
    "furgoneta": new undum.Situation(
        {
            enter: function(character, system, from) {
                system.write( locFurgoneta.getDesc() );
            }
        }
    ),
    "recuerdo-furgo": new undum.SimpleSituation(
        "<p>Esa manta...</p>\
        <p><h1>Pista forestal</h1>\
        <b> Martes, 8 de Octubre de 2001, 18h11.</b><br>\
        <p align='center'><img src='asesinolib/pic/pistaForestal.png'></p>\
        La furgoneta de alquiler se sacude entre los baches de la pista forestal,\
        avanzando mientras deja un rastro de polvo de unos veinte metros por la trasera.\
        La zona es desoladora, llena de las t&iacute;picas, tristes hileras de &aacute;rboles replantados.\
        <p>Bajo la manta, un bulto grande se mueve con peque&ntilde;os y lentos espasmos.\
        Tu v&iacute;ctima est&aacute; comenzando a despertar, aunque esto no supone ning&uacute;n problema:\
        para cuando despierte totalmente, estar&aacute; bien atado.</p>\
        <p>Sientes una gran satisfacci&oacute;n; tanto tiempo prepar&aacute;ndolo, y ahora, por fin,\
        est&aacute; empezando a suceder.</p>\
        <p>Estacionas la furgoneta, satisfecho, en la plaza del antiguo Fraguas.</p>\
        <p><i>Lentamente, como despejando una densa bruma, abandonas tu enso&ntilde;aci&oacute;n,\
        para descubrirte a ti mismo mirando fijamente la manta.</i>\</p>\
        <p>...</p><br/><br/>\
        <p class='transient'><i><a href='furgoneta'>Todo eso ya pas&oacute;...</a></i>.</p>",
        {
            exit: function(character, system, from) {
                locFurgoneta.fueRecordado = true;
            }
        }
    ),
    "conduccion": new undum.Situation(
        {
            enter: function(character, system, from) {
                system.write( locConduccion.getDesc() );
            }
        }
    ),
    "telefono": new undum.Situation(
        {
            enter: function(character, system, from) {
                system.write( locTelefono.getDesc() );
            }
        }
    ),
    "telefono-poli": new undum.SimpleSituation(
        "<p>Lentamente, marcas el tel&eacute;fono de emergencias. Lejanos, los tonos\
            de llamada llegan hasta tu o&iacute;do.</p>\
        <p><i><b> - Emergencias</b>,¿D&iacute;game?</i>\
        <p><i> - He encontrado a un hombre atado a una silla, en la iglesia de Fraguas.</i>\
        <p><i> - Disculpe, ¿en d&oacute;nde?</i>\
        <p><i> - Fraguas, al norte de Guadalajara</i>\
        <p><i> - ¿Puede darme un tel&eacute;fono o una direcci&oacute;n de contac...?</i>\
        <p><i> - Dense prisa, est&aacute; muy mal.</i>\
        <p><b>Cuelgas</b>.\
        <p>Le sacas la tarjeta al tel&eacute;fono, la rompes y arrojas todo a un gran charco\
           pestilente que se ha formado en una zona de penumbra de la iglesia.\
        <p class='transient'><i><a href='furgoneta'>As&iacute; servir&aacute;.</a></i></p>",
        {
            exit: function(character, system, from) {
                locTelefono.estaLlamadaHecha = true;
            }
        }
    ),
};

// ---------------------------------------------------------------------------
/* The Id of the starting situation. */
undum.game.start = "intro";

// ---------------------------------------------------------------------------
/* Here we define all the qualities that our characters could
 * possess. We don't have to be exhaustive, but if we miss one out then
 * that quality will never show up in the character bar in the UI. */
undum.game.qualities = {
};

// ---------------------------------------------------------------------------
/* The qualities are displayed in groups in the character bar. This
 * determines the groups, their heading (which can be null for no
 * heading) and ordering. QualityDefinitions without a group appear at
 * the end. It is an error to have a quality definition belong to a
 * non-existent group. */
undum.game.qualityGroups = {
};

// ---------------------------------------------------------------------------
/* This function gets run before the game begins. It is normally used
 * to configure the character at the start of play. */
undum.game.init = function(character, system) { 
};
