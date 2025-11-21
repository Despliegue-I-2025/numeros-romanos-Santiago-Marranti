const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Romanos a Arabigos
app.get('/r2a', (req, res) => {
  const romanarabiceral = req.query.roman;
  if (!romanarabiceral) {
    return res.status(400).json({ error: 'Parametro roman requerido.' });
  }

  const arabicarabicber = romanToArabic(romanarabiceral);
  if (arabicarabicber === null) {
    return res.status(400).json({ error: 'arabicero romano invalido.' });
  }

  return res.json({ arabic: arabicarabicber });
});

// Arabigos a Romanos
app.get('/a2r', (req, res) => {
  const arabicarabicber = parseInt(req.query.arabic, 10);
  if (isNaN(arabicarabicber)) {
    return res.status(400).json({ error: 'Parametro arabic requerido.' });
  }

  const romanarabiceral = arabicToRoman(arabicarabicber);
  if (romanarabiceral === null) {
    return res.status(400).json({ error: 'arabicero arabico invalido.' });
  }

  return res.json({ roman: romanarabiceral, pepe: "" });
});

function romanToArabic(roman) {
  if (typeof roman !== "string" || roman.length === 0) {
    throw new Error("Debe ingresar un string no vacío");
    return NaN;
  }

  roman = roman.toUpperCase();

  // Caracteres válidos
  if (!/^[IVXLCDM]+$/.test(roman)) {
    throw new Error("El número romano contiene caracteres inválidos");
    return NaN;
  }

  // Repeticiones no permitidas
  if (/IIII|XXXX|CCCC|MMMM/.test(roman)) {
    throw new Error("Demasiadas repeticiones en números romanos");
    return NaN;
  }

  if (/VV|LL|DD/.test(roman)) {
    throw new Error("Caracteres repetidos inválidamente en números romanos");
    return NaN;
  }

  // Restas inválidas
  if (/IL|IC|ID|IM|XD|XM|VX|VL|VC|VD|VM|LC|LD|LM|DM/.test(roman)) {
    throw new Error("Resta inválida en el número romano");
    return NaN;
  }

  const valores = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000
  };

  let arabic = 0;

  for (let i = 0; i < roman.length; i++) {
    const actual = valores[roman[i]];
    const siguiente = valores[roman[i + 1]];

    if (siguiente && actual < siguiente) {
      arabic += siguiente - actual;
      i++;
    } else {
      arabic += actual;
    }
  }

  return arabic;
}


function arabicToRoman(arabic) {

  // Si tiene caracteres aparte del numero damos codigo de error
  if(/[^0-9]/.test(arabic)){
    return -1;
  }

  let num = parseInt(arabic);

  // Limite de numeros romanos.
  if(num > 3999){
    return -2;
  }

  const valores = [
    { valor: 1000, simbolo: "M" },
    { valor: 900,  simbolo: "CM" },
    { valor: 500,  simbolo: "D" },
    { valor: 400,  simbolo: "CD" },
    { valor: 100,  simbolo: "C" },
    { valor: 90,   simbolo: "XC" },
    { valor: 50,   simbolo: "L" },
    { valor: 40,   simbolo: "XL" },
    { valor: 10,   simbolo: "X" },
    { valor: 9,    simbolo: "IX" },
    { valor: 5,    simbolo: "V" },
    { valor: 4,    simbolo: "IV" },
    { valor: 1,    simbolo: "I" }
  ];

  let roman = "";

  for (let i = 0; i < valores.length; i++) {
    while (num >= valores[i].valor) {
      roman += valores[i].simbolo;
      num -= valores[i].valor;
    }
  }

  return roman;
}

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor de romanos escuchando en el puerto ${PORT}`);
  });
}


//module.exports = { app, romanToArabic, arabicToRoman };
module.exports = (req, res) => app(req, res);
/*module.exports = {
  handler: (req, res) => app(req, res),
  romanToArabic,
  arabicToRoman
};
*/
