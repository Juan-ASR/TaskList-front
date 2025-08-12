//unknown

function imprimirAlgo(que: unknown){
    if (typeof que == "number"){
        const algo: number = que;
        console.log(algo)
    }
    if (typeof que == "string"){
        const algo: string = que;
        console.log(algo)
    }
    if (typeof que == "boolean"){
        const algo: boolean = que;
        console.log(algo)
    }

}

imprimirAlgo("hola");
imprimirAlgo(123);
imprimirAlgo(true);

//inferencia

const numerito = 23;
console.log(numerito);

// asercion confia en mi

const personaApi = {
    nombre:"Juan",
    edad: 23
}

interface TipoPersona{
    nombre: string;
    // edad: number;
}

const nuevaPersona: TipoPersona = personaApi as TipoPersona
console.log(nuevaPersona);

//enums

enum Rol{
    Admin,
    Cliente,
    Soporte
}

let rolSam: Rol = Rol.Admin;
rolSam = Rol.Cliente;
console.log(rolSam);