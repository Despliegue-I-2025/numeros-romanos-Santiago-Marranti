const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Romanos a Arabigos
app.get('/r2a', (req, res) => {
  const strRoman = req.query.roman;

  //Controlamos excepciones para devolver codigo de error 400 bad request
  try{
    const arabicNumber = romanToArabic(strRoman);

    return res.json({ arabic: arabicNumber });

  } catch(error) {

    return res.status(400).json({error: error.message})
  }
});

// Arabigos a Romanos
app.get('/a2r', (req, res) => {

  //Controlamos excepciones para devolver codigo de error 400 bad request
  try{
    const strArabic = req.query.arabic;

    const romanarabiceral = arabicToRoman(strArabic);

    return res.json({ roman: romanarabiceral});

  } catch (error){
    res.status(400).json({error: error.message})
  }

});


function romanToArabic(roman) {
  if (typeof roman !== "string" || roman.length === 0) {
    throw new Error("No se ha ingresado un valor romano.");
  }

  roman = roman.toUpperCase();

  // Caracteres válidos
  if (!/^[IVXLCDM]+$/.test(roman)) {
    throw new Error("El número romano contiene caracteres inválidos.");
  }

  // Repeticiones no permitidas
  if (/IIII|XXXX|CCCC|MMMM/.test(roman)) {
    throw new Error("Demasiadas repeticiones en números romanos.");
  }

  if (/VV|LL|DD/.test(roman)) {
    throw new Error("Caracteres repetidos inválidamente en números romanos.");
  }

  // Restas inválidas
  if (/IL|IC|ID|IM|XD|XM|VX|VL|VC|VD|VM|LC|LD|LM|DM/.test(roman)) {
    throw new Error("Número romano inválido.");
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
  // LOS ROMANOS NO PUEDEN REPRESENTAR EL 0. Solo los numeros naturales.
  if(/[^0-9]/.test(arabic)){
    throw new Error("Numero arábico no válido.");
  }

  if(arabic === ""){
    throw new Error("No se ha ingresado un valor.");
  }

  let num = parseInt(arabic);

  // Limite de numeros romanos.
  if(num > 3999){
    throw new Error("El numero arábico ingresado excede el limite que puede ser procesado.");
  }

  //No comparamos negativo porque el primer if no pasa ya que tiene un guion "-"
  if (num === 0){
    throw new Error("El numero arábico ingresado no es representable.");
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
//module.exports = (req, res) => app(req, res);
module.exports = {
  "handler": (req, res) => app(req, res),
  romanToArabic,
  arabicToRoman
};

