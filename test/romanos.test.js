const converter = require("../api/romanos")

describe("Tests conversor de ARÁBICOS >> ROMANOS:", () => {
    test("El arábico 12abc no es válido", () => {
        expect(() => converter.arabicToRoman("12abc"))
            .toThrow("Numero arábico no válido.");
    });

    test("El arábico 0 no es representable.", () => {
        expect(() => converter.arabicToRoman("0"))
            .toThrow();
    });

    test("No acepta valores nulos.", () => {
        expect(() => converter.arabicToRoman(""))
            .toThrow();
    });

    test("No se acepta '1.1'.", () => {
        expect(() => converter.arabicToRoman("1.1"))
            .toThrow()
    });

    test("El arábico 256 en romano es CCLVI.", () => {
        expect(converter.arabicToRoman("256")).toBe("CCLVI");
    });

    test("No se puede convertir '10000'.", () => {
        expect(() => converter.arabicToRoman("10000"))
            .toThrow("El numero arábico ingresado excede el limite que puede ser procesado.");
    });

    test("El numero 3999 se debe poder convertir.", () => {
        expect(converter.arabicToRoman("3999")).toBe("MMMCMXCIX");
    });

    test("El numero 4000 no se puede convertir.", () => {
        expect(() => converter.arabicToRoman("4000"))
            .toThrow("El numero arábico ingresado excede el limite que puede ser procesado.");
    })
});

describe("Tests conversor de ROMANOS >> ARÁBICOS:", () => {
    test.each([
        ["X", 10],
        ["XX", 20],
        ["XXX", 30],
    ])("El romano %s es equivalente a %i.", (roman, esperado) => {
        expect(converter.romanToArabic(roman)).toBe(esperado);
    })

    test("El romano XXXX lanza una excepción porque no se puede convertir.", () => {
        expect(() => converter.romanToArabic("XXXX"))
            .toThrow("Demasiadas repeticiones en números romanos");
    });

    test("El romano ASD lanza una excepcion porque es inválido.", () => {
        expect(() => converter.romanToArabic("ASD"))
            .toThrow("El número romano contiene caracteres inválidos");
    });

    test("Si no se especifica un romano lanza una excepcion.", () => {
        expect(() => converter.romanToArabic(""))
            .toThrow("No se ha ingresado un valor romano.");
    });
});
