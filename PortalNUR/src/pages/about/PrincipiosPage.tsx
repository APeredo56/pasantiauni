import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Accordion, AccordionBody, AccordionHeader, Typography } from "@material-tailwind/react";
import { useState } from "react";

const PrincipiosPage = () => {
    const [openPrinciple, setOpenPrinciple] = useState(0);
    const [openValue, setOpenValue] = useState(0);

    const handleOpenPrinciple = (principle: number) => {
        setOpenPrinciple(openPrinciple === principle ? 0 : principle);
    };

    const handleOpenValue = (value: number) => {
        setOpenValue(openValue === value ? 0 : value);
    };

    return (<>
        <header>
            <img
                className="mx-auto w-full object-cover object-center mb-5"
                src="/images/about/Principios-y-Valores-Institucionales.jpg"
                alt="Principios y Valores Institucionales"
            />
        </header>
        <section className="max-w-[650px] mx-auto">
            <Typography as="h1" className="text-3xl mb-3 font-bold text-center">
                PRINCIPIOS Y VALORES INSTITUCIONALES
            </Typography>
            <Typography as="p" className="text-md text-justify mb-3" color="blue-gray">
                Los principios sobre los cuales está basada la filosofía de la Universidad Núr,
                provienen de las enseñanzas de la Fe Bahá’í. Estos principios afirman valores
                espirituales y universales, inculcan respeto hacia todas las ideas y el aprecio
                hacia todas las Religiones y culturas, y promueven la unidad en diversidad de toda
                la humanidad.
            </Typography>
            <Typography as="p" className="text-md text-justify mb-3" color="blue-gray">
                La Universidad Núr es una iniciativa particular de un grupo de seguidores de la Fe
                Bahá’í. No es una Universidad confesional; es decir, no es un órgano o una parte de
                las instituciones de esta Fe, ni dependiente de ellas en sus gestiones académica,
                económica y administrativa.
            </Typography>
            <Typography as="p" className="text-md text-justify mb-3" color="blue-gray">
                No existe forma alguna de imposición o adoctrinamiento en el ejercicio de sus
                actividades ya que, obviamente, cualquier exigencia para acondicionar a los
                estudiantes en sus convicciones doctrinarias, sean éstas políticas o religiosas,
                sería una limitación a la conciencia del estudiante, una contradicción al espíritu
                mismo de la Universidad y sus principios básicos, particularmente al de “la libre
                investigación de la verdad”. Este principio, que es considerado el fundamento esencial
                de proceso educativo para “crear un ambiente intelectual que aliente la libertad
                académica requerida para descubrir la verdad en todas sus manifestaciones”.
            </Typography>
        </section>
        <section className="mb-5 max-w-[650px] mx-auto">
            <Typography as="h2" className="text-xl mb-3 font-bold text-center">
                Los principios que la Núr promueve institucionalmente son:
            </Typography>
            <ul>
                <li>
                    <Accordion open={openPrinciple === 1} >
                        <AccordionHeader onClick={() => handleOpenPrinciple(1)}
                            className={`!justify-normal text-lg font-bold ${openPrinciple === 1 ? 'focus:text-blue-500' : 'text-black'}`}>
                            <FontAwesomeIcon icon={faCaretRight}
                                className={`h-5 w-5 me-3 transition-transform ${openPrinciple === 1 ? "-rotate-90" : ""}`} />
                            LA LIBRE INVESTIGACIÓN DE LA VERDAD
                        </AccordionHeader>
                        <AccordionBody>
                            <Typography as="p" className="text-lg text-justify mb-3" color="blue-gray">
                                Es imposible ser libres y alcanzar la justicia sin que exista una libre investigación de la verdad. Una de las muestras de los procesos de dominación es imponer una determinada perspectiva de la verdad, buscando que un enfoque sea el predominante sin ni siquiera conocer diferentes planteamientos, en las curriculas de la Nur se incorporan diferentes enfoques y teorías ya sea en economía, sistemas, comunicación, etc. Los estudiantes tienen que sentirse libres de escudriñar las diferentes teorías e información y llegar a sus propias conclusiones lo que fomentará este espíritu de igual modo en el campo profesional.
                            </Typography>
                            <Typography as="p" className="text-lg text-justify mb-3" color="blue-gray">
                                Si sólo investigáramos la verdad, los seres humanos nos veríamos unidos, ya que la división no se genera por la diferencia de perspectivas sino por la opresión y la falta de libertad.
                            </Typography>
                            <Typography as="p" className="text-lg text-justify" color="blue-gray">
                                El hombre debe desligarse por completo de todo prejuicio y de todo resultado de su propia imaginación, para que pueda buscar la luz de la verdad sin impedimentos.
                            </Typography>
                        </AccordionBody>
                    </Accordion>
                </li>

                <li>
                    <Accordion open={openPrinciple === 2} >
                        <AccordionHeader onClick={() => handleOpenPrinciple(2)}
                            className={`!justify-normal text-lg font-bold ${openPrinciple === 2 ? 'focus:text-blue-500' : 'text-black'}`}>
                            <FontAwesomeIcon icon={faCaretRight}
                                className={`h-5 w-5 me-3 transition-transform ${openPrinciple === 2 ? "-rotate-90" : ""}`} />
                            ELIMINACIÓN DE LOS EXTREMOS DE RIQUEZA Y POBREZA
                        </AccordionHeader>
                        <AccordionBody>
                            <Typography as="p" className="text-lg text-justify mb-3" color="blue-gray">
                                Los extremos generan desequilibrios que deterioran una sociedad, consideramos que la universidad es una plataforma para contribuir a disminuir los extremos económicos, es así que por un lado trabajamos en diseñar mecanismos que generan acceso a la educación tanto de ricos como pobres y que interactúen en los espacios en los espacios académicos y por otro lado en los programas académicos promovemos la reflexión de cómo podemos promover un mayor grado de equidad en la distribución de la riqueza. Dentro de la administración de la universidad buscamos aplicar este principio definiendo la política de que en los salarios nunca puede existir una deferencia mayor de 1 a 10 entre los que ganan más y los que ganan menos.
                            </Typography>
                            <Typography as="p" className="text-lg text-justify" color="blue-gray">
                                Como explica Abdu´I-Baha «Por un lado, vemos entre nosotros a personas que están sobrecargadas de riquezas, y por otro lado, otras desafortunadas que desfallecen por no tener ni qué comer… Esta situación es injusta, y debe ser remediada. Pero el remedio deberá emprenderse con sumo cuidado. no puede hacerse de manera que haya absoluta igualdad entre las personas. ¡La igualdad es una quimera! ¡Es completamente impracticable! Aun cuando la igualdad se alcanzara, no tendría continuidad, y si su existencia fuese posible, todo el orden del mundo sería destruido. La ley del orden debe existir siempre en el mundo de la humanidad. Éste es un decreto divino aplicado a la creación del ser humano… Cuando vemos que la pobreza alcanza los limites del hambre, es un signo seguro de que en alguna parte existe tiranía.»
                            </Typography>
                        </AccordionBody>
                    </Accordion>
                </li>

                <li>
                    <Accordion open={openPrinciple === 3} >
                        <AccordionHeader onClick={() => handleOpenPrinciple(3)}
                            className={`!justify-normal text-lg font-bold ${openPrinciple === 3 ? 'focus:text-blue-500' : 'text-black'}`}>
                            <FontAwesomeIcon icon={faCaretRight}
                                className={`h-5 w-5 me-3 transition-transform ${openPrinciple === 3 ? "-rotate-90" : ""}`} />
                            ARMONÍA ENTRE CIENCIA Y RELIGION
                        </AccordionHeader>
                        <AccordionBody>
                            <Typography as="p" className="text-lg text-justify mb-3" color="blue-gray">
                                La humanidad a lo largo de su historia ha estado dominada ya sea por la ciencia o por la religión, sin embargo no hemos logrado una armonía entre estas dos fuerzas. En todas las actividades institucionales buscamos promover tanto las dimensiones científico materiales como las espirituales religiosas.
                            </Typography>
                            <Typography as="p" className="text-lg text-justify" color="blue-gray">
                                «Podemos pensar que la ciencia es como un ala, y la religión es como la otra; un pájaro necesita dos alas para volar, una sola le sería inútil. Cualquier religión que contradiga a la ciencia o se oponga a ella, es sólo ignorancia, pues la ignorancia es lo opuesto al conocimiento.» (Abdu´I-Baha, Paris Talks)
                            </Typography>
                        </AccordionBody>
                    </Accordion>
                </li>

                <li>
                    <Accordion open={openPrinciple === 4} >
                        <AccordionHeader onClick={() => handleOpenPrinciple(4)}
                            className={`!justify-normal text-lg font-bold ${openPrinciple === 4 ? 'focus:text-blue-500' : 'text-black'}`}>
                            <FontAwesomeIcon icon={faCaretRight}
                                className={`h-5 w-5 me-3 transition-transform ${openPrinciple === 4 ? "-rotate-90" : ""}`} />
                            IGUALDAD DE DERECHOS Y OPORTUNIDADES PARA EL HOMBRE Y LA MUJER
                        </AccordionHeader>
                        <AccordionBody>
                            <Typography as="p" className="text-lg text-justify mb-3" color="blue-gray">
                                A lo largo de la historia en la actualidad se ha privado de muchos derechos y oportunidades a las Mujeres, esto debe cambiar, es imposible para humanidad progresar si esta injusticia y desequilibrio persiste. Por esta razón y algunas otras la universidad diseñó una modalidad semipresencial que permita a las mujeres acceder a la educación superior.
                            </Typography>
                            <Typography as="p" className="text-lg text-justify" color="blue-gray">
                                «En el mundo de la humanidad encontramos una gran diferencia; el sexo femenino es tratado como si fuese inferior, y no se le conceden los mismos derechos y privilegios. Esta condición no es debida a la naturales, sino a la educación. En la creación divina no existe tal distinción. A la vista de Dios, ningún sexo es superior al otro. ¿Por qué, entonces, un sexo debe firmar la inferioridad del otro, adjudicándose derechos y privilegios como si Dios les hubiese concedido Su autoridad para tal modo de actuar? Si las mujeres recibieran las mismas oportunidades educativas que los hombres, el resultado demostraría la igualdad de capacidades de ambos para la adquisición del saber.» (Abdu´I-Baha, Paris Talks)
                            </Typography>
                        </AccordionBody>
                    </Accordion>
                </li>

                <li>
                    <Accordion open={openPrinciple === 5} >
                        <AccordionHeader onClick={() => handleOpenPrinciple(5)}
                            className={`!justify-normal text-lg font-bold ${openPrinciple === 5 ? 'focus:text-blue-500' : 'text-black'}`}>
                            <FontAwesomeIcon icon={faCaretRight}
                                className={`h-5 w-5 me-3 transition-transform ${openPrinciple === 5 ? "-rotate-90" : ""}`} />
                            UNIDAD DE LA RAZA HUMANA
                        </AccordionHeader>
                        <AccordionBody>
                            <Typography as="p" className="text-lg text-justify mb-3" color="blue-gray">
                                La Nur busca ser una universidad inclusiva y no así exclusiva, trabajamos en generar los mecanismos para que diferentes sectores de la sociedad participen del proceso de desarrollo que lleva delante la universidad y que en los diferentes programas se generen interacciones que permitan que estos actores de diferentes sectores se acerquen y se integren.
                            </Typography>
                            <Typography as="p" className="text-lg text-justify" color="blue-gray">
                                «Todos los seres humanos son las hojas y los frutos de un mismo árbol; todos ellos son ramas del árbol de Adán, todos tienen el mismo origen. La misma lluvia ha caído sobre todos ellos, el mismo sol ardiente les hace crecer, todos se refrescan con la misma brisa. Las únicas diferencias que existen y que los mantienen apartados son éstas: hay niños que necesitan ser guiados, ignorantes que deben ser instruidos, enfermos que deben ser atendidos y curados… Todos los seres humanos son iguales ante Dios. Él no hace distinción entre las personas.» (Abdu´I-Baha, Paris Talks)
                            </Typography>
                        </AccordionBody>
                    </Accordion>
                </li>

                <li>
                    <Accordion open={openPrinciple === 6} >
                        <AccordionHeader onClick={() => handleOpenPrinciple(6)}
                            className={`!justify-normal text-lg font-bold ${openPrinciple === 6 ? 'focus:text-blue-500' : 'text-black'}`}>
                            <FontAwesomeIcon icon={faCaretRight}
                                className={`h-5 w-5 me-3 transition-transform ${openPrinciple === 6 ? "-rotate-90" : ""}`} />
                            ELIMINACIÓN DE TODA CLASE DE PREJUICIOS
                        </AccordionHeader>
                        <AccordionBody>
                            <Typography as="p" className="text-lg text-justify" color="blue-gray">
                                Los prejuicios son como un cáncer silencioso que está carcomiendo el mundo actual, generamos divisiones que no existen por nuestra propia ignorancia o intereses. En la Nur consideramos que la promoción de la diversidad entre los estudiantes, la exposición a diferentes enfoques y formas de pensar y la reflexión directa sobre esta problemática nos ayudará a eliminar algunos de nuestros prejuicios. «La única división real es ésta: Existen seres humanos celestiales y seres humanos terrenales; servidores de la humanidad que se sacrifican por el amor del Altísimo, trayendo armonía y unidad, enseñando la paz y la buena voluntad entre las gentes y, por otra parte, personas egoístas, que odian a sus semejantes, en cuyos corazones el prejuicio ha reemplazado a la amorosa bondad, y cuya influencia crea discordia y contienda… No tenemos derecho a considerar a ninguno de nuestros semejantes como si fuera malvado… Enseñemos al ignorante, y cuidemos al niño hasta que alcance la madurez. Cuando encontremos una persona que ha caído en las profundidades de la miseria o del pecado, debemos ser bondadosos con ella; tomadla de la mano y ayudadla a recobrar su equilibrio, su fuerza; debemos guiarla con amor y ternura, tratarla como a un amigo, no como a un enemigo.» (Abdu´I-Baha, Paris Talks)
                            </Typography>
                        </AccordionBody>
                    </Accordion>
                </li>
            </ul>
        </section>

        <img
            className="mx-auto w-full object-cover object-center mb-5 p-4 shadow-3xl"
            src="/images/about/PRINCIPIOS.jpg"
            alt="Principios"
        />

        <section className="mb-5 max-w-[650px] mx-auto">
            <Typography as="h2" className="text-xl mb-3 font-bold text-center">
                Los Valores que la Núr promueve institucionalmente son:
            </Typography>
            <ul>
                <li>
                    <Accordion open={openValue === 1} >
                        <AccordionHeader onClick={() => handleOpenValue(1)}
                            className={`!justify-normal text-lg font-bold ${openValue === 1 ? 'focus:text-blue-500' : 'text-black'}`}>
                            <FontAwesomeIcon icon={faCaretRight}
                                className={`h-5 w-5 me-3 transition-transform ${openValue === 1 ? "-rotate-90" : ""}`} />
                            SERVICIO
                        </AccordionHeader>
                        <AccordionBody>
                            <Typography as="p" className="text-lg text-justify" color="blue-gray">
                                Todas las acciones deben estar orientadas al servicio de la humanidad, esto da un propósito a la vida. Es nuestro objetivo que la comunidad universitaria se destaque por su espíritu de servicio, como dice Bahá´U´Llah «EL mérito del hombre reside en el servicio y la virtud, y no en el fausto de la opulencia y las riquezas.»
                            </Typography>
                        </AccordionBody>
                    </Accordion>
                </li>

                <li>
                    <Accordion open={openValue === 2} >
                        <AccordionHeader onClick={() => handleOpenValue(2)}
                            className={`!justify-normal text-lg font-bold ${openValue === 2 ? 'focus:text-blue-500' : 'text-black'}`}>
                            <FontAwesomeIcon icon={faCaretRight}
                                className={`h-5 w-5 me-3 transition-transform ${openValue === 2 ? "-rotate-90" : ""}`} />
                            COOPERACIÓN
                        </AccordionHeader>
                        <AccordionBody>
                            <Typography as="p" className="text-lg text-justify" color="blue-gray">
                                Como actitud humana, la cooperación es una formula noble y constructiva de conducta que mueve al hombre a vivir en armonía con sus semejantes.
                            </Typography>
                        </AccordionBody>
                    </Accordion>
                </li>

                <li>
                    <Accordion open={openValue === 3} >
                        <AccordionHeader onClick={() => handleOpenValue(3)}
                            className={`!justify-normal text-lg font-bold ${openValue === 3 ? 'focus:text-blue-500' : 'text-black'}`}>
                            <FontAwesomeIcon icon={faCaretRight}
                                className={`h-5 w-5 me-3 transition-transform ${openValue === 3 ? "-rotate-90" : ""}`} />
                            RESPETO
                        </AccordionHeader>
                        <AccordionBody>
                            <Typography as="p" className="text-lg text-justify" color="blue-gray">
                                Ser considerado y valorar a los demás permite aceptar los diferentes puntos de vista y las diferencias. Es uno de los valores fundamentales que el ser humano debe tener presente a la hora de interactuar con personas de su entorno.
                            </Typography>
                        </AccordionBody>
                    </Accordion>
                </li>

                <li>
                    <Accordion open={openValue === 4} >
                        <AccordionHeader onClick={() => handleOpenValue(4)}
                            className={`!justify-normal text-lg font-bold ${openValue === 4 ? 'focus:text-blue-500' : 'text-black'}`}>
                            <FontAwesomeIcon icon={faCaretRight}
                                className={`h-5 w-5 me-3 transition-transform ${openValue === 4 ? "-rotate-90" : ""}`} />
                            CORTESÍA
                        </AccordionHeader>
                        <AccordionBody>
                            <Typography as="p" className="text-lg text-justify mb-3" color="blue-gray">
                                Ser amables, respetuosos, atentos, y cuidadosos al tratar a los demás.
                            </Typography>
                            <blockquote className="text-lg text-blue-gray-900">«Que la veracidad y la cortesía sean vuestro adorno. …Cuidado, oh pueblo de Bahá, no sea que andéis por los caminos de aquellos cuyas palabras difieren de sus hechos.» </blockquote>
                            <cite className="justify-end flex text-blue-gray-900">Bahá`u`lláh, PEB, pág. 202</cite>
                        </AccordionBody>
                    </Accordion>
                </li>

                <li>
                    <Accordion open={openValue === 5} >
                        <AccordionHeader onClick={() => handleOpenValue(5)}
                            className={`!justify-normal text-lg font-bold ${openValue === 5 ? 'focus:text-blue-500' : 'text-black'}`}>
                            <FontAwesomeIcon icon={faCaretRight}
                                className={`h-5 w-5 me-3 transition-transform ${openValue === 5 ? "-rotate-90" : ""}`} />
                            GRATITUD
                        </AccordionHeader>
                        <AccordionBody>
                            <Typography as="p" className="text-lg text-justify mb-3" color="blue-gray">
                                Reconocer, valorar y estimar a través de palabras o gestos un beneficio recibido.
                            </Typography>
                            <Typography as="p" className="text-lg text-justify mb-3" color="blue-gray">
                                …la verdadera gratitud es la cordial acción de dar gracias de corazón.
                            </Typography>
                            <Typography as="p" className="text-lg text-justify mb-3" color="blue-gray">
                                …Para poder expresar su gratitud por los favores de Dios, el hombre debe demostrar acciones dignas de alabanza.
                            </Typography>
                            <cite className="justify-end flex text-blue-gray-900">´Abdu`l-Bahá, MVB, pág. 104</cite>
                        </AccordionBody>
                    </Accordion>
                </li>

                <li>
                    <Accordion open={openValue === 6} >
                        <AccordionHeader onClick={() => handleOpenValue(6)}
                            className={`!justify-normal text-lg font-bold ${openValue === 6 ? 'focus:text-blue-500' : 'text-black'}`}>
                            <FontAwesomeIcon icon={faCaretRight}
                                className={`h-5 w-5 me-3 transition-transform ${openValue === 6 ? "-rotate-90" : ""}`} />
                            CONSULTA
                        </AccordionHeader>
                        <AccordionBody>
                            <Typography as="p" className="text-lg text-justify mb-3" color="blue-gray">
                                Consultar es una forma de diálogo dirigida a la toma de decisiones en forma cooperativa. Se caracteriza por el intercambio de perspectivas sobre un tema o problema con el fin de llegar a una conclusión que integra la riqueza de una diversidad de enfoques. Considerar e integrar los distintos enfoques por medio de la consulta permite «alcanzar la luz de la verdad sobre las cuestiones presentadas»
                            </Typography>
                            <cite className="justify-end flex text-blue-gray-900">Eloy Anello y Juanita Hernández</cite>
                            <cite className="justify-end flex text-blue-gray-900">La Consulta: La capacidad de participar efectivamente en ella</cite>
                        </AccordionBody>
                    </Accordion>
                </li>
            </ul>
        </section>
    </>);
}

export default PrincipiosPage;