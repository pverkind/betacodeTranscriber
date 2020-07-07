var beta = document.getElementById("beta");
var translit = document.getElementById("translit");
var arab = document.getElementById("arab");


function transliterate() {
  var text = beta.value;
  console.log(text);
  var ar = betacodeToArabic(text);
  console.log('ar: '+ar);
  arab.textContent = ar;
  var tr = betacodeToTranslit(text);
  console.log("tr: "+tr);
  //translit.textContent = tr;
  translit.value = tr;
}

beta.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        transliterate();
    }
});

function copyToClipboard () {
  translit.select();

  translit.setSelectionRange(0,9999);
  document.execCommand("copy");
}

var betacodeTranslit = {
// Alphabet letters
    '_a' : 'ā', // alif
    'b'  : 'b', // bā’
    't'  : 't', // tā’
    '_t' : 'ṯ', // thā’
    '^g' : 'ǧ', // jīm
    'j'  : 'ǧ', // jīm
    '^c' : 'č', // chīm / Persian
    '*h' : 'ḥ', // ḥā’
    '_h' : 'ḫ', // khā’
    'd'  : 'd', // dāl
    '_d' : 'ḏ', // dhāl
    'r'  : 'r', // rā’
    'z'  : 'z', // zayn
    's'  : 's', // sīn
    '^s' : 'š', // shīn
    '*s' : 'ṣ', // ṣād
    '*d' : 'ḍ', // ḍād
    '*t' : 'ṭ', // ṭā’
    '*z' : 'ẓ', // ẓā’
    '`'  : 'ʿ', // ‘ayn
    '*g' : 'ġ', // ghayn
    'f'  : 'f', // fā’
    '*k' : 'ḳ', // qāf
    'k'  : 'k', // kāf
    'g'  : 'g', // gāf / Persian
    'l'  : 'l', // lām
    'm'  : 'm', // mīm
    'n'  : 'n', // nūn
    'h'  : 'h', // hā’
    'w'  : 'w', // wāw
    '_u' : 'ū', // wāw
    'y'  : 'y', // yā’
    '_i' : 'ī', // yā’
// Non-alphabetic letters
    "'" : 'ʾ', // hamzaŧ
    '/a' : 'á', // alif maqṣūraŧ
    '=t' : 'ŧ', // tā’ marbūṭaŧ, this is preferable for Alpheios
// Vowels
    '~a' : 'ã', // dagger alif
    'u'  : 'u', // ḍammaŧ
    'i'  : 'i', // kasraŧ
    'a'  : 'a', // fatḥaŧ
    '?u'  : 'ủ', // ḍammaŧ
    '?i'  : 'ỉ', // kasraŧ
    '?a'  : 'ả', // fatḥaŧ
    '*n' : 'ȵ',   // n of tanwīn
    '*w' : 'ů',  // silent w, like in `Amru.n.w
    '*a' : 'å'  // silent alif, like in fa`al_u.a
    }

var translitArabic = {
// Alphabet letters
    'ā' : ' ا ',  // alif
    'b' : ' ب ',  // bāʾ
    't' : ' ت ',  // tāʾ
    'ṯ' : ' ث ', // thāʾ
    'ǧ' : ' ج ',  // jīm
    'č' : ' چ ', // chīm / Persian
    'ḥ' : ' ح ',  // ḥāʾ
    'ḫ' : ' خ ', // khāʾ
    'd' : ' د ',  // dāl
    'ḏ' : ' ذ ', // dhāl
    'r' : ' ر ',  // rāʾ
    'z' : ' ز ',  // zayn
    's' : ' س ',  // sīn
    'š' : ' ش ', // shīn
    'ṣ' : ' ص ',  // ṣād
    'ḍ' : ' ض ',  // ḍād
    'ṭ' : ' ط ',  // ṭāʾ
    'ẓ' : ' ظ ',  // ẓāʾ
    'ʿ' : ' ع ',  // ʿayn
    'ġ' : ' غ ', // ghayn
    'f' : ' ف ',  // fā’
    'ḳ' : ' ق ',  // qāf
    'q' : ' ق ',  // qāf
    'k' : ' ك ',  // kāf
    'g' : ' گ ',  // gāf / Persian
    'l' : ' ل ',  // lām
    'm' : ' م ',  // mīm
    'n' : ' ن ',  // nūn
    'h' : ' ه ',  // hāʾ
    'w' : ' و ',  // wāw
    'ū' : ' و ',  // wāw
    'y' : ' ي ',  // yāʾ
    'ī' : ' ي ',  // yāʾ
// Non-alphabetic letters
    'ʾ' : ' ء ',  // hamza
    'á' : ' ٰى ',  // alif maqṣūraŧ
    'ŧ' : ' ة ',  // tāʾ marbūṭaŧ
// Vowels
    'ã'  : ' ٰ ',  // dagger alif
    'a'  : ' َ ',  // fatḥaŧ
    'u'  : ' ُ ',  // ḍammaŧ
    'i'  : ' ِ ',  // kasraŧ
    'aȵ' : ' ً ',  // tanwīn fatḥ
    'uȵ' : ' ٌ ',  // tanwīn ḍamm
    'iȵ' : ' ٍ ',  // tanwīn kasr
    'ů' : ' و ',  // silent w, like in `Amru.n.w
    'å' : ' ا ',  // silent alif, like in fa`al_u.a
    'ả' : ' َ ',  // final fatḥaŧ
    'ỉ' : ' ِ ',  // final ḍammaŧ
    'ủ' : ' ُ ',  // final kasraŧ
}


function dictReplace(text, d) {
    for (var [k,v] of Object.entries(d)) {
      k = k.trim();
      v = v.trim();
      console.log(k+">"+v);
      text = text.replace(k,v);
      console.log(text);
      console.log(k.toUpperCase()+">"+v.toUpperCase());
      text = text.replace(k.toUpperCase(), v.toUpperCase());
      console.log(text);
      if (k.length > 1) {
        k = k[0].toUpperCase()+k.slice(1,);
        text = text.replace(k,v);
      }

      //console.log(text);
    }
    return text;
}

function betacodeToTranslit(text) {
    text = dictReplace(text, betacodeTranslit);
    return text
}

function betacodeToArabic(text) {
    var cnsnnts = "btṯǧčḥḥḫdḏrzsšṣḍṭẓʿġfḳkglmnhwy";
    var cnsnnts = cnsnnts + cnsnnts.toUpperCase();

    text = dictReplace(text, betacodeTranslit);
    text = text.replace("+", "");

    // fix irrelevant variables for Arabic script
    text = text.toLowerCase();
    text = text.replace("ủ", "u");
    text = text.replace("ỉ", "i");
    text = text.replace("ả", "a");

    // complex combinations
    text = text.replace(/all[āã]h/g, "الله".trim()); // Convert God's Name
    text = text.replace(/li-?ll[āã]hi?/g, "لله".trim()); // Convert God's Name
    text = text.replace(/(?:(?<=[\s.,!?])|^)b\./g, "بن"); // Convert b. into ar bn

    //var sun = "([tṯdḏrzsšṣḍṭẓln])";
    //var re = new RegExp("\b[aA]l-"+sun, "g");
    text = text.replace(/(?:(?<=[\s.,!?])|^)[aA]l-([tṯdḏrzsšṣḍṭẓln])/g, 'ﭐل-$1$1'); // converts articles w/ sun letters
    text = text.replace(/(?:(?<=[\s.,!?])|^)[aA]l-/g, "ﭐلْ-"); // converts articles
    text = text.replace(/(?:(?<=[\s.,!?])|^)wa-a?l-/g, "وَﭐل-"); // converts articles

    text  = text.replace(",", "،"); // Convert commas

    // initial HAMZAs
    text = text.replace(/(?:(?<=[\s.,!?])|^)ʾ?a/g, "أَ");
    text = text.replace(/(?:(?<=[\s.,!?])|^)ʾ?i/g, "إِ");
    text = text.replace(/(?:(?<=[\s.,!?])|^)ʾ?u/g, "أُ");
    text = text.replace(/(?:(?<=[\s.,!?])|^)ʾ?ā/g, "آ");
    text = text.replace(/(?:(?<=[\s.,!?])|^)ʾ?ī/g, "إِي");
    text = text.replace(/(?:(?<=[\s.,!?])|^)ʾ?ū/g, "أُو");

    text = text.replace(/-|_/g, "");

    // final HAMZAs
    text = text.replace('yʾaȵ', "يْئًا");
    text = text.replace(/([btṯǧčḥḥḫdḏrzsšṣḍṭẓʿġfḳkglmnhwy])ʾuȵ/g, '$1ْءٌ');
    text = text.replace(/([btṯǧčḥḥḫdḏrzsšṣḍṭẓʿġfḳkglmnhwy])ʾiȵ/g, '$1ْءٍ');
    text = text.replace(/([btṯǧčḥḥḫdḏrzsšṣḍṭẓʿġfḳkglmnhwy])ʾaȵ/g, '$1ْءًا');


    // short, hamza, tanwin
    text = text.replace('uʾuȵ', "ُؤٌ");
    text = text.replace('uʾiȵ', "ُؤٍ");
    text = text.replace('uʾaȵ', "ُؤًا");

    text = text.replace('iʾuȵ', "ِئٌ");
    text = text.replace('iʾiȵ', "ِئٍ");
    text = text.replace('iʾaȵ', "ِئًا");

    text = text.replace('aʾuȵ', "َأٌ");
    text = text.replace('aʾiȵ', "َأٍ");
    text = text.replace('aʾaȵ', "َأً");

    // long, hamza, tanwin
    text = text.replace('ūʾuȵ', "وءٌ");
    text = text.replace('ūʾiȵ', "وءٍ");
    text = text.replace('ūʾaȵ', "وءً");

    text = text.replace('īʾuȵ', "يءٌ");
    text = text.replace('īʾiȵ', "يءٍ");
    text = text.replace('īʾaȵ', "يءً");

    text = text.replace('āʾuȵ', "اءٌ");
    text = text.replace('āʾiȵ', "اءٍ");
    text = text.replace('āʾaȵ', "اءً");

    // long, hamza, diptote
    text = text.replace(/āʾu(?:(?=[\s.,!?])|$)/g, "اءُ");
    text = text.replace(/āʾi(?:(?=[\s.,!?])|$)/g, "اءِ");
    text = text.replace(/āʾa(?:(?=[\s.,!?])|$)/g, "اءَ");

    // medial HAMZAs
    text = text.replace("aʾū", "َؤُو");
    text = text.replace("uʾa", "ُؤَ");
    text = text.replace("uʾi", "ُئِ");

    text = text.replace("ūʾu", "ُوؤُ");
    text = text.replace("ūʾi", "ُوئِ");
    text = text.replace("awʾa", "َوْءَ");
    text = text.replace("awʾu", "َوْءُ");

    text = text.replace("āʾi", "ائِ");
    text = text.replace("aʾī", "َئِي");
    text = text.replace("āʾī", "ائِي");
    text = text.replace("āʾu", "اؤُ");
    text = text.replace("uʾā", "ُؤَا");

    text = text.replace("aʾa", "َأَ");
    text = text.replace("aʾi", "َئِ");
    text = text.replace("aʾu", "َؤُ");

    text = text.replace("iʾu", "ِئُ");
    text = text.replace("iʾi", "ِئِ");
    text = text.replace("iʾa", "ِئَ");
    text = text.replace("īʾa", "ِيئَ");
    text = text.replace("īʾu", "ِيؤُ");
    text = text.replace("iʾā", "ِئَا");

    text = text.replace(/([btṯǧčḥḥḫdḏrzsšṣḍṭẓʿġfḳkglmnhwy])ʾa/g, '$1ْأَ');
    text = text.replace(/([btṯǧčḥḥḫdḏrzsšṣḍṭẓʿġfḳkglmnhwy])ʾu/g, '$1ْؤُ');
    text = text.replace(/([btṯǧčḥḥḫdḏrzsšṣḍṭẓʿġfḳkglmnhwy])ʾū/g, '$1ْؤُ');
    text = text.replace(/([btṯǧčḥḥḫdḏrzsšṣḍṭẓʿġfḳkglmnhwy])ʾi/g, '$1ْءٍ');

    text = text.replace("uʾu", "ُؤُ");
    text = text.replace("uʾū", "ُؤُو");

    text = text.replace("aʾʾā", "َأَّا"); // geminnated hamza // dagger alif "َأّٰ", ordinary alif ""
    text = text.replace("aʾī", "َئِي");
    text = text.replace("āʾī", "ائِي");
    text = text.replace("uʾā", "ُؤَا");

    text = text.replace(/uʾ([btṯǧčḥḥḫdḏrzsšṣḍṭẓʿġfḳkglmnhwy])/g, 'ُؤْ$1');
    text = text.replace(/iʾ([btṯǧčḥḥḫdḏrzsšṣḍṭẓʿġfḳkglmnhwy])/g, 'ِئْ$1');
    text = text.replace(/aʾ([btṯǧčḥḥḫdḏrzsšṣḍṭẓʿġfḳkglmnhwy])/g, 'َأْ$1');

    text = text.replace("aʾā", "َآ"); // madda: hamza, long a
    text = text.replace(/([btṯǧčḥḥḫdḏrzsšṣḍṭẓʿġfḳkglmnhwy])ʾā/g, '$1ْآ'); // madda: sukun, hamza, long a

    // pronominal suffixes
    //text = text.replace("-(h[ui]|hā|k[ai]|h[ui]mā?|kumā|h[ui]nna|)\b", r"\1");
    console.log(1+text);
    // consonant combinations
    text = text.replace(/([btṯǧčḥḥḫdḏrzsšṣḍṭẓʿġfḳkglmnhwy])\1/g, '$1ّ');
    console.log(2+text);
    // two consonants into C-sukun-C
    text = text.replace(/([btṯǧčḥḥḫdḏrzsšṣḍṭẓʿġfḳkglmnhwy])([btṯǧčḥḥḫdḏrzsšṣḍṭẓʿġfḳkglmnhwy])/g, '$1ْ$2');
    //text = text.replace("([%s])([%s])" % (cnsnnts,cnsnnts), r"\1%s\2" % " ْ ".trim());
    // final consonant into C-sukun
    text = text.replace(/([btṯǧčḥḥḫdḏrzsšṣḍṭẓʿġfḳkglmnhwy])(\s|$)/g, '$1ْ$2');
    // consonant + long vowel into C-shortV-longV
    text = text.replace(/([btṯǧčḥḥḫdḏrzsšṣḍṭẓʿġfḳkglmnhwy])(ā)/g, '$1َ$2');
    text = text.replace(/([btṯǧčḥḥḫdḏrzsšṣḍṭẓʿġfḳkglmnhwy])(ī)/g, '$1ِ$2');
    text = text.replace(/([btṯǧčḥḥḫdḏrzsšṣḍṭẓʿġfḳkglmnhwy])(ū)/g, '$1ُ$2');

    // tanwins
    text = text.replace(/([btṯǧḥḥḫdḏrzsšṣḍṭẓʿġfḳklmnhwy])aȵ/g, '$1اً');
    text = text.replace('aȵ' , ' ً '.trim());
    text = text.replace('uȵ' , ' ٌ '.trim());
    text = text.replace('iȵ' , ' ٍ '.trim());

    // silent letters
    text = text.replace('ů' , "و");
    text = text.replace('å' , "ا");
    console.log(3+text);
    text = dictReplace(text, translitArabic);
    console.log(4+text);
    return text;
}
