const COMMON_VERBS = new Set([
    'is', 'am', 'are', 'was', 'were', 'be', 'been', 'being',
    'have', 'has', 'had', 'do', 'does', 'did',
    'can', 'could', 'shall', 'should', 'will', 'would', 'may', 'might', 'must',
    'go', 'went', 'gone', 'going', 'goes',
    'say', 'said', 'says', 'saying',
    'get', 'got', 'getting', 'gets',
    'make', 'made', 'making', 'makes',
    'know', 'knew', 'known', 'knowing', 'knows',
    'think', 'thought', 'thinking', 'thinks',
    'take', 'took', 'taken', 'taking', 'takes',
    'see', 'saw', 'seen', 'seeing', 'sees',
    'come', 'came', 'coming', 'comes',
    'want', 'wanted', 'wanting', 'wants',
    'use', 'used', 'using', 'uses',
    'find', 'found', 'finding', 'finds',
    'give', 'gave', 'given', 'giving', 'gives',
    'tell', 'told', 'telling', 'tells',
    'work', 'worked', 'working', 'works',
    'call', 'called', 'calling', 'calls',
    'try', 'tried', 'trying', 'tries',
    'ask', 'asked', 'asking', 'asks',
    'need', 'needed', 'needing', 'needs',
    'feel', 'felt', 'feeling', 'feels',
    'become', 'became', 'becoming', 'becomes',
    'leave', 'left', 'leaving', 'leaves',
    'put', 'put', 'putting', 'puts',
    'mean', 'meant', 'meaning', 'means',
    'keep', 'kept', 'keeping', 'keeps',
    'let', 'let', 'letting', 'lets',
    'begin', 'began', 'begun', 'beginning', 'begins',
    'seem', 'seemed', 'seeming', 'seems',
    'help', 'helped', 'helping', 'helps',
    'talk', 'talked', 'talking', 'talks',
    'turn', 'turned', 'turning', 'turns',
    'start', 'started', 'starting', 'starts',
    'show', 'showed', 'shown', 'showing', 'shows',
    'hear', 'heard', 'hearing', 'hears',
    'play', 'played', 'playing', 'plays',
    'run', 'ran', 'running', 'runs',
    'move', 'moved', 'moving', 'moves',
    'live', 'lived', 'living', 'lives',
    'believe', 'believed', 'believing', 'believes',
    'bring', 'brought', 'bringing', 'brings',
    'happen', 'happened', 'happening', 'happens',
    'write', 'wrote', 'written', 'writing', 'writes',
    'sit', 'sat', 'sitting', 'sits',
    'stand', 'stood', 'standing', 'stands',
    'lose', 'lost', 'losing', 'loses',
    'pay', 'paid', 'paying', 'pays',
    'meet', 'met', 'meeting', 'meets',
    'include', 'included', 'including', 'includes',
    'continue', 'continued', 'continuing', 'continues',
    'set', 'setting', 'sets',
    'learn', 'learned', 'learning', 'learns',
    'change', 'changed', 'changing', 'changes',
    'lead', 'led', 'leading', 'leads',
    'understand', 'understood', 'understanding', 'understands',
    'watch', 'watched', 'watching', 'watches',
    'follow', 'followed', 'following', 'follows',
    'stop', 'stopped', 'stopping', 'stops',
    'create', 'created', 'creating', 'creates',
    'speak', 'spoke', 'spoken', 'speaking', 'speaks',
    'read', 'read', 'reading', 'reads',
    'allow', 'allowed', 'allowing', 'allows',
    'add', 'added', 'adding', 'adds',
    'spend', 'spent', 'spending', 'spends',
    'grow', 'grew', 'grown', 'growing', 'grows',
    'open', 'opened', 'opening', 'opens',
    'walk', 'walked', 'walking', 'walks',
    'win', 'won', 'winning', 'wins',
    'offer', 'offered', 'offering', 'offers',
    'remember', 'remembered', 'remembering', 'remembers',
    'love', 'loved', 'loving', 'loves',
    'buy', 'bought', 'buying', 'buys',
    'wait', 'waited', 'waiting', 'waits',
    'serve', 'served', 'serving', 'serves',
    'die', 'died', 'dying', 'dies',
    'send', 'sent', 'sending', 'sends',
    'expect', 'expected', 'expecting', 'expects',
    'build', 'built', 'building', 'builds',
    'stay', 'stayed', 'staying', 'stays',
    'fall', 'fell', 'fallen', 'falling', 'falls',
    'cut', 'cutting', 'cuts',
    'kill', 'killed', 'killing', 'kills',
    'reach', 'reached', 'reaching', 'reaches',
    'jumps', 'jumped', 'jumping', 'jump'
]);

const SUBJECT_STARTERS = new Set([
    'the', 'a', 'an', 'this', 'that', 'these', 'those',
    'my', 'your', 'his', 'her', 'its', 'our', 'their', 'whom', 'whose',
    'I', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'them', 'us'
]);

function scrambleWord(word: string): string {
    if (word.length <= 1) return word;
    return word.slice(1) + word[0];
}

function unscrambleWord(word: string): string {
    if (word.length <= 1) return word;
    return word[word.length - 1] + word.slice(0, -1);
}

interface Token {
    type: 'word' | 'punct';
    value: string;
}

function tokenize(text: string): Token[] {
    const parts: Token[] = [];
    let currentWord = '';

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (/[a-zA-Z]/.test(char)) {
            currentWord += char;
        } else {
            if (currentWord) {
                parts.push({ type: 'word', value: currentWord });
                currentWord = '';
            }
            parts.push({ type: 'punct', value: char });
        }
    }
    if (currentWord) {
        parts.push({ type: 'word', value: currentWord });
    }
    return parts;
}

function findVerbSplit(parts: Token[]): number {
    for (let i = 0; i < parts.length; i++) {
        if (parts[i].type === 'word' && COMMON_VERBS.has(parts[i].value.toLowerCase())) {
            return i;
        }
    }
    return Math.floor(parts.length * 0.4);
}

function encodeSentence(sentence: string): string {
    if (!sentence.trim()) return sentence;

    const parts = tokenize(sentence);
    const splitIdx = findVerbSplit(parts);

    const scrambledParts = parts.map(p => {
        if (p.type === 'word') {
            return { ...p, value: scrambleWord(p.value) };
        }
        return p;
    });

    const subject = scrambledParts.slice(0, splitIdx);
    const verbObject = scrambledParts.slice(splitIdx);

    const subjectStr = subject.map(p => p.value).join('');
    const verbObjectStr = verbObject.map(p => p.value).join('');

    return `${verbObjectStr}> ${subjectStr}`;
}

function decodeSentence(sentence: string): string {
    if (!sentence.includes('>')) {
        return tokenize(sentence).map(p => {
            if (p.type === 'word') return unscrambleWord(p.value);
            return p.value;
        }).join('');
    }

    const parts = sentence.split('>');
    const verbObjectStr = parts[0];
    const subjectStr = parts.slice(1).join('>');

    const cleanSubjectStr = subjectStr.startsWith(' ') ? subjectStr.slice(1) : subjectStr;
    const reconstructed = cleanSubjectStr + verbObjectStr;

    return tokenize(reconstructed).map(p => {
        if (p.type === 'word') return unscrambleWord(p.value);
        return p.value;
    }).join('');
}

export const Ohnishj = {
    encode(text: string): string {
        if (!text) return '';
        const sentences = text.match(/[^.!?⸮⽽]+[.!?⸮⽽]*|/g) || [];
        return sentences
            .filter(s => s.trim())
            .map(s => encodeSentence(s))
            .join(' ');
    },

    decode(text: string): string {
        if (!text) return '';
        const chunks = text.split(/(?<=[.!?⸮⽽] )(?=\S+> )/);
        return chunks
            .filter(p => p.trim())
            .map(p => decodeSentence(p))
            .join(' ');
    }
};
