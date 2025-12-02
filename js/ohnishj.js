var Ohnishj = (function() {
  'use strict';
  
  // Rotate first char to end
  function scrambleWord(word) {
    if (!word || word.length <= 1) return word;
    return word.substring(1) + word.charAt(0);
  }
  
  // Rotate last char to front
  function unscrambleWord(word) {
    if (!word || word.length <= 1) return word;
    return word.charAt(word.length - 1) + word.substring(0, word.length - 1);
  }
  
  // Split into words/punctuation
  function tokenize(text) {
    var tokens = [];
    var current = '';
    var isWord = false;
    
    for (var i = 0; i < text.length; i++) {
      var ch = text.charAt(i);
      var isLetter = /[a-zA-Z]/.test(ch);
      
      if (isLetter) {
        if (!isWord && current) {
          tokens.push({type: 'punct', value: current});
          current = '';
        }
        isWord = true;
        current += ch;
      } else {
        if (isWord && current) {
          tokens.push({type: 'word', value: current});
          current = '';
        }
        isWord = false;
        current += ch;
      }
    }
    
    // Final token
    if (current) {
      tokens.push({type: isWord ? 'word' : 'punct', value: current});
    }
    
    return tokens;
  }
  
  // Find verb position
  function findVerbSplit(tokens, wordIndices) {
    if (wordIndices.length === 0) return 0;
    if (wordIndices.length === 1) return wordIndices[0];
    
    // Common verbs pattern
    var commonVerbs = /^(is|are|was|were|be|been|being|have|has|had|do|does|did|will|would|should|could|may|might|must|can|shall|jump|jumps|run|runs|walk|walks|go|goes|went|see|sees|saw|get|gets|got|make|makes|made|take|takes|took|come|comes|came|think|thinks|thought|say|says|said|tell|tells|told|give|gives|gave|find|finds|found|know|knows|knew|feel|feels|felt|become|becomes|became|leave|leaves|left|put|puts|seem|seems|seemed|keep|keeps|kept|let|lets|begin|begins|began|help|helps|helped|show|shows|showed|hear|hears|heard|play|plays|played|move|moves|moved|live|lives|lived|believe|believes|believed|bring|brings|brought|happen|happens|happened|write|writes|wrote|sit|sits|sat|stand|stands|stood|lose|loses|lost|pay|pays|paid|meet|meets|met|include|includes|included|continue|continues|continued|set|sets|learn|learns|learned|change|changes|changed|lead|leads|led|understand|understands|understood|watch|watches|watched|follow|follows|followed|stop|stops|stopped|create|creates|created|speak|speaks|spoke|read|reads|allow|allows|allowed|add|adds|added|spend|spends|spent|grow|grows|grew|open|opens|opened|win|wins|won|offer|offers|offered|remember|remembers|remembered|love|loves|loved|consider|considers|considered|appear|appears|appeared|buy|buys|bought|wait|waits|waited|serve|serves|served|die|dies|died|send|sends|sent|expect|expects|expected|build|builds|built|stay|stays|stayed|fall|falls|fell|cut|cuts|reach|reaches|reached|kill|kills|killed|remain|remains|remained|suggest|suggests|suggested|raise|raises|raised|pass|passes|passed|sell|sells|sold|require|requires|required|report|reports|reported|decide|decides|decided|pull|pulls|pulled)s?$/i;
    
    // Determiners and articles
    var subjectStarters = /^(the|a|an|this|that|these|those|my|your|his|her|its|our|their|some|any|each|every|all|both|few|many|several|most)$/i;
    
    var inSubject = true;
    var subjectWordCount = 0;
    
    // Scan for verb
    for (var i = 0; i < wordIndices.length; i++) {
      var tokenIdx = wordIndices[i];
      var word = tokens[tokenIdx].value.toLowerCase().replace(/[^a-z]/g, '');
      
      if (inSubject) {
        // Found verb
        if (commonVerbs.test(word)) {
          return tokenIdx;
        }
        
        subjectWordCount++;
        
        // Check next word
        if (subjectWordCount > 1 && !subjectStarters.test(word)) {
          if (i + 1 < wordIndices.length) {
            var nextIdx = wordIndices[i + 1];
            var nextWord = tokens[nextIdx].value.toLowerCase().replace(/[^a-z]/g, '');
            if (commonVerbs.test(nextWord)) {
              return nextIdx;
            }
          }
        }
      }
    }
    
    // Fallback: 40% point
    var splitPoint = Math.floor(wordIndices.length * 0.4);
    if (splitPoint === 0) splitPoint = 1;
    if (splitPoint >= wordIndices.length) splitPoint = wordIndices.length - 1;
    
    return wordIndices[splitPoint];
  }
  
  // Split by sentences
  function splitSentences(text) {
    var sentences = [];
    var current = '';
    
    for (var i = 0; i < text.length; i++) {
      var ch = text.charAt(i);
      current += ch;
      
      // Sentence terminators
      if (ch === '.' || ch === '!' || ch === '?' || ch === '⸮' || ch === '‽') {
        sentences.push(current);
        current = '';
      }
    }
    
    // Remaining text
    if (current.trim()) {
      sentences.push(current);
    }
    
    return sentences;
  }
  
  // Encode single sentence
  function encodeSentence(text) {
    var tokens = tokenize(text);
    var wordIndices = [];
    
    // Scramble words
    for (var i = 0; i < tokens.length; i++) {
      if (tokens[i].type === 'word') {
        tokens[i].value = scrambleWord(tokens[i].value);
        wordIndices.push(i);
      }
    }
    
    // No words found
    if (wordIndices.length === 0) {
      return text;
    }
    
    var splitIndex = findVerbSplit(tokens, wordIndices);
    
    var subject = '';
    var verbObject = '';
    
    // Split at verb
    for (var i = 0; i < tokens.length; i++) {
      if (i < splitIndex) {
        subject += tokens[i].value;
      } else {
        verbObject += tokens[i].value;
      }
    }
    
    // Format: verb/object> subject
    return verbObject.trimEnd() + '> ' + subject.trimEnd();
  }
  
  // Encode text
  function encode(text) {
    if (!text || !text.trim()) {
      throw new Error('Empty input');
    }
    
    var sentences = splitSentences(text);
    var encoded = [];
    
    // Process each sentence
    for (var i = 0; i < sentences.length; i++) {
      var sentence = sentences[i].trim();
      if (sentence) {
        encoded.push(encodeSentence(sentence));
      }
    }
    
    return encoded.join(' ');
  }
  
  // Decode single sentence
  function decodeSentence(ohnishjText) {
    var markerIndex = ohnishjText.indexOf('>');
    
    // Validate marker
    if (markerIndex === -1) {
      throw new Error('Invalid OHNISHJ text: missing ">" marker');
    }
    
    var verbObject = ohnishjText.substring(0, markerIndex).trim();
    var subject = ohnishjText.substring(markerIndex + 1).trim();
    
    // Reconstruct order
    var result = subject;
    if (verbObject) {
      result += ' ' + verbObject;
    }
    
    // Unscramble words
    var tokens = tokenize(result);
    result = '';
    for (var i = 0; i < tokens.length; i++) {
      if (tokens[i].type === 'word') {
        result += unscrambleWord(tokens[i].value);
      } else {
        result += tokens[i].value;
      }
    }
    
    return result;
  }
  
  // Decode text
  function decode(ohnishjText) {
    if (!ohnishjText || !ohnishjText.trim()) {
      throw new Error('Empty input');
    }
    
    // Split by sentence markers
    var parts = ohnishjText.split(/(?<=>)\s+(?=[^>]*>)/);
    var decoded = [];
    
    // Process each part
    for (var i = 0; i < parts.length; i++) {
      var part = parts[i].trim();
      if (part) {
        decoded.push(decodeSentence(part));
      }
    }
    
    return decoded.join(' ');
  }
  
  // Public API
  return {
    encode: encode,
    decode: decode
  };
})();

// Export globally
window.Ohnishj = Ohnishj;
