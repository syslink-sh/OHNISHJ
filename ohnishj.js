var Ohnishj = (function() {
  var template = 'john';
  
  function textToBits(str) {
    var bits = '';
    for (var i = 0; i < str.length; i++) {
      var code = str.charCodeAt(i) & 0x7F;
      var binary = code.toString(2);
      while (binary.length < 7) {
        binary = '0' + binary;
      }
      bits += binary;
    }
    return bits;
  }
  
  function bitsToJohn(fourBits) {
    var word = '';
    for (var i = 0; i < 4; i++) {
      var letter = template.charAt(i);
      if (fourBits.charAt(i) === '1') {
        word += letter.toUpperCase();
      } else {
        word += letter;
      }
    }
    return word;
  }
  
  function encode(text) {
    if (!text) throw new Error('Empty input');
    
    var bits = textToBits(text);
    var words = [];
    
    for (var i = 0; i < bits.length; i += 7) {
      var seven = bits.substring(i, i + 7);
      var eight = seven + '0';
      if (eight.length > 8) eight = eight.substring(0, 8);
      
      words.push(bitsToJohn(eight.substring(0, 4)));
      words.push(bitsToJohn(eight.substring(4, 8)));
    }
    
    return words.join(' ');
  }
  
  function decode(ohnishjText) {
    if (!ohnishjText) throw new Error('Empty input');
    
    var text = ohnishjText.replace(/\s/g, '');
    
    if (!/^[johnJOHN]+$/.test(text)) {
      throw new Error('Invalid characters');
    }
    
    var bits = '';
    for (var i = 0; i < text.length; i++) {
      var ch = text.charAt(i);
      bits += (ch === ch.toUpperCase()) ? '1' : '0';
    }
    
    var result = '';
    for (var i = 0; i < bits.length; i += 8) {
      var byte = bits.substring(i, i + 8);
      if (byte.length < 7) break;
      
      var seven = byte.substring(0, 7);
      var num = parseInt(seven, 2);
      if (num > 0) {
        result += String.fromCharCode(num);
      }
    }
    
    return result;
  }
  
  return {
    encode: encode,
    decode: decode
  };
})();

window.Ohnishj = Ohnishj;

