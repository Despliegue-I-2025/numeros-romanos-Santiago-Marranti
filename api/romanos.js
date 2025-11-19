const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const RomanSimbols = {"I":1,"V":5, "X":10, 
                      "L":50, "C":100, "D":500, 
                      "M":1000};


// Romanos a Arabigos
app.get('/r2a', (req, res) => {
  const romanNumeral = req.query.roman;
  if (!romanNumeral) {
    return res.status(400).json({ error: 'Parametro roman requerido.' });
  }

  const arabicNumber = romanToArabic(romanNumeral);
  if (arabicNumber === null) {
    return res.status(400).json({ error: 'Numero romano invalido.' });
  }

  return res.json({ arabic: arabicNumber });
});

// Arabigos a Romanos
app.get('/a2r', (req, res) => {
  const arabicNumber = parseInt(req.query.arabic, 10);
  if (isNaN(arabicNumber)) {
    return res.status(400).json({ error: 'Parametro arabic requerido.' });
  }

  const romanNumeral = arabicToRoman(arabicNumber);
  if (romanNumeral === null) {
    return res.status(400).json({ error: 'Numero arabico invalido.' });
  }

  return res.json({ roman: romanNumeral });
});

function romanToArabic(roman) {
  let decimal = 0;
    let val = 0;

    let lastSimbol = "";
    let repeticiones = 0;
    let char = '';

    for(let i=0; i<roman.length; i++){
        char = roman[i];
        val = RomanSimbols[char]
        
        //No es un numero romano válido
        if(lastSimbol == char == "V" || lastSimbol == char == "L" || (lastSimbol == "V" && char == "L")){
            return -1;
        }

        //Si se repite mas de 3 veces no es un numero romano válido
        if(lastSimbol == char)
            repeticiones++; 
            
            //Si se repite salimos
            if(repeticiones > 3){
                return -1;
            }
        else
            repeticiones = 0;
        
        if(val <= decimal)
            decimal += val;
        else // val > decimal

            if(char !== lastSimbol) 
                decimal = decimal; //-= val;
            else
                  decimal += val;

        lastSimbol = char;
    }

    return decimal;
}

function arabicToRoman(arabic) {
}

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor de romanos escuchando en el puerto ${PORT}`);
  });
}


module.exports = { app, romanToArabic, arabicToRoman };
