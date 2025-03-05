var beta = document.getElementById("beta");
var translit = document.getElementById("translit");
var arab = document.getElementById("arab");
var ar_check = document.getElementById("ar_check");

function transliterate() {
  var text = beta.value;

  text = convertDate(text);

  if (ar_check.checked == true) {
    var ar = betacodeToArabic(text);
    arab.textContent = ar;
  }
  
  var tr = betacodeToTranslit(text);
  translit.value = tr;
}

beta.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        transliterate();
    }
});

ar_check.addEventListener("change", function(event) {
  if (this.checked) {
    transliterate();
  }
})

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
    '^g' : 'j', // jīm
    'ǧ'  : 'j', // jīm
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
    'j' : ' ج ',  // jīm
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
      //console.log(k+">"+v);
      //text = text.replace(k,v); // replaces only the first occurrence
      //kr = new RegExp(k, "g");
      //text = text.replace(kr,v); // does not work with k values starting with *
      text = text.split(k).join(v);
      //console.log(text);
      //console.log(k.toUpperCase()+">"+v.toUpperCase());
      //text = text.replace(k.toUpperCase(), v.toUpperCase()); // replaces only the first occurrence
      //kr = new RegExp(k.toUpperCase(), "g");
      //text = text.replace(kr, v.toUpperCase()); // does not work with k values starting with *
      text = text.split(k.toUpperCase()).join(v.toUpperCase());
      //console.log(text);
      if (k.length > 1) {
        k = k[0].toUpperCase()+k.slice(1,);
        //text = text.replace(k,v) // replaces only the first occurrence
        //kr = new RegExp(k, "g");
        //text = text.replace(kr,v); // does not work with k values starting with *
        text = text.split(k).join(v);
      }

      //console.log(text);
    }
    return text;
}

function betacodeToTranslit(text) {
    text = dictReplace(text, betacodeTranslit);
    return text
}

const arabicDigits = "٠١٢٣٤٥٦٧٨٩";


function betacodeToArabic(text) {
    var cnsnnts = "btṯǧčḥḥḫdḏrzsšṣḍṭẓʿġfḳkglmnhwy";
    var cnsnnts = cnsnnts + cnsnnts.toUpperCase();

    // convert dates to Arabic
    const arabicDigits = "٠١٢٣٤٥٦٧٨٩";
    const textArabicDigits = text.replace(/\d/g, (digit) => arabicDigits[digit]);
    text =  textArabicDigits.replace(/(\d+)\s*\/\s*(\d+)/g, "$1 هـ / $2 م");

    // deal with shadda:
    shadda = "  ّ  ".trim();
    // it must match only letters (not numbers nor underscore)
    text = text.replace(/([\p{L}])\1/gu, "$1" + shadda);

    // convert text:

    text = dictReplace(text, betacodeTranslit);
    text = text.replace(/\+/g, "");

    // fix irrelevant variables for Arabic script
    text = text.toLowerCase();
    text = text.replace(/ủ/g, "u");
    text = text.replace(/ỉ/g, "i");
    text = text.replace(/ả/g, "a");

    // complex combinations
    text = text.replace(/all[āã]h[ua]?/g, "الله".trim()); // Convert God's Name
    text = text.replace(/li-?ll[āã]hi?/g, " لِـلّٰـهِ ".trim()); // Convert God's Name
    text = text.replace(/bi-?ll[āã]hi?/g, "بِاللهِ".trim()); // Convert God's Name
    text = text.replace(/wa-?ll[āã]hi?/g, "وَاللهِ".trim()); // Convert God's Name
    text = text.replace(/(?:(?<=[\s.,!?:\-])|^)b\./g, "بن"); // Convert b. into ar bn

    //var sun = "([tṯdḏrzsšṣḍṭẓln])";
    //var re = new RegExp("\b[aA]l-"+sun, "g");
    text = text.replace(/(?:(?<=[\s.,!?:\-])|^)[aA]l-([tṯdḏrzsšṣḍṭẓln])/g, 'ﭐل-$1$1'); // converts articles w/ sun letters
    text = text.replace(/(?:(?<=[\s.,!?:\-])|^)[aA]l-/g, "ﭐلْ-"); // converts articles
    text = text.replace(/(?:(?<=[\s.,!?:\-])|^)wa-a?l-/g, "وَﭐل-"); // converts articles

    // initial HAMZAs
    text = text.replace(/(?:(?<=[\s.,!?:\-])|^)ʾ?a/g, "أَ");
    text = text.replace(/(?:(?<=[\s.,!?:\-])|^)ʾi/g, "إِ");
    text = text.replace(/(?:(?<=[\s.,!?:\-])|^)i/g, "ﭐ");
    text = text.replace(/(?:(?<=[\s.,!?:\-])|^)ʾ?u/g, "أُ");
    text = text.replace(/(?:(?<=[\s.,!?:\-])|^)ʾ?ā/g, "آ");
    text = text.replace(/(?:(?<=[\s.,!?:\-])|^)ʾ?ī/g, "إِي");
    text = text.replace(/(?:(?<=[\s.,!?:\-])|^)ʾ?ū/g, "أُو");


    // final HAMZAs
  
    text = text.replace(/aʾ(?:(?=[\s.,!?:])|$)/g, "أ")
    text = text.replace(/uʾ(?:(?=[\s.,!?:])|$)/g, "ؤ")
    text = text.replace(/iʾ(?:(?=[\s.,!?:])|$)/g, "ئ")  
    text = text.replace(/yʾaȵ/g, "يْئًا");
    text = text.replace(/([btṯǧčḥḥḫdḏrzsšṣḍṭẓʿġfḳkglmnhwy])ʾuȵ/g, '$1ْءٌ');
    text = text.replace(/([btṯǧčḥḥḫdḏrzsšṣḍṭẓʿġfḳkglmnhwy])ʾiȵ/g, '$1ْءٍ');
    text = text.replace(/([btṯǧčḥḥḫdḏrzsšṣḍṭẓʿġfḳkglmnhwy])ʾaȵ/g, '$1ْءًا');


    // short, hamza, tanwin
    text = text.replace(/uʾuȵ/g, "ُؤٌ");
    text = text.replace(/uʾiȵ/g, "ُؤٍ");
    text = text.replace(/uʾaȵ/g, "ُؤًا");

    text = text.replace(/iʾuȵ/g, "ِئٌ");
    text = text.replace(/iʾiȵ/g, "ِئٍ");
    text = text.replace(/iʾaȵ/g, "ِئًا");

    text = text.replace(/aʾuȵ/g, "َأٌ");
    text = text.replace(/aʾiȵ/g, "َأٍ");
    text = text.replace(/aʾaȵ/g, "َأً");

    // long, hamza, tanwin
    text = text.replace(/ūʾuȵ/g, "وءٌ");
    text = text.replace(/ūʾiȵ/g, "وءٍ");
    text = text.replace(/ūʾaȵ/g, "وءً");

    text = text.replace(/īʾuȵ/g, "يءٌ");
    text = text.replace(/īʾiȵ/g, "يءٍ");
    text = text.replace(/īʾaȵ/g, "يءً");

    text = text.replace(/āʾuȵ/g, "اءٌ");
    text = text.replace(/āʾiȵ/g, "اءٍ");
    text = text.replace(/āʾaȵ/g, "اءً");

    // long, hamza, diptote
    text = text.replace(/āʾu(?:(?=[\s.,!?:])|$)/g, "اءُ");
    text = text.replace(/āʾi(?:(?=[\s.,!?:])|$)/g, "اءِ");
    text = text.replace(/āʾa(?:(?=[\s.,!?:])|$)/g, "اءَ");

    // medial HAMZAs
    text = text.replace(/aʾū/g, "َؤُو");
    text = text.replace(/uʾa/g, "ُؤَ");
    text = text.replace(/uʾi/g, "ُئِ");

    text = text.replace(/ūʾu/g, "ُوؤُ");
    text = text.replace(/ūʾi/g, "ُوئِ");
    text = text.replace(/awʾa/g, "َوْءَ");
    text = text.replace(/awʾu/g, "َوْءُ");

    text = text.replace(/āʾi/g, "ائِ");
    text = text.replace(/aʾī/g, "َئِي");
    text = text.replace(/āʾī/g, "ائِي");
    text = text.replace(/āʾu/g, "اؤُ");
    text = text.replace(/uʾā/g, "ُؤَا");

    text = text.replace(/aʾa/g, "َأَ");
    text = text.replace(/aʾi/g, "َئِ");
    text = text.replace(/aʾu/g, "َؤُ");

    text = text.replace(/iʾu/g, "ِئُ");
    text = text.replace(/iʾi/g, "ِئِ");
    text = text.replace(/iʾa/g, "ِئَ");
    text = text.replace(/īʾa/g, "ِيئَ");
    text = text.replace(/īʾu/g, "ِيؤُ");
    text = text.replace(/iʾā/g, "ِئَا");

    text = text.replace(/([btṯǧčḥḥḫdḏrzsšṣḍṭẓʿġfḳkglmnhwy])ʾa/g, '$1ْأَ');
    text = text.replace(/([btṯǧčḥḥḫdḏrzsšṣḍṭẓʿġfḳkglmnhwy])ʾu/g, '$1ْؤُ');
    text = text.replace(/([btṯǧčḥḥḫdḏrzsšṣḍṭẓʿġfḳkglmnhwy])ʾū/g, '$1ْؤُ');
    text = text.replace(/([btṯǧčḥḥḫdḏrzsšṣḍṭẓʿġfḳkglmnhwy])ʾi/g, '$1ْءٍ');

    text = text.replace(/uʾu/g, "ُؤُ");
    text = text.replace(/uʾū/g, "ُؤُو");

    text = text.replace(/aʾʾā/g, "َأَّا"); // geminnated hamza // dagger alif "َأّٰ", ordinary alif ""
    text = text.replace(/aʾī/g, "َئِي");
    text = text.replace(/āʾī/g, "ائِي");
    text = text.replace(/uʾā/g, "ُؤَا");

    text = text.replace(/uʾ([btṯǧčḥḥḫdḏrzsšṣḍṭẓʿġfḳkglmnhwy])/g, 'ُؤْ$1');
    text = text.replace(/iʾ([btṯǧčḥḥḫdḏrzsšṣḍṭẓʿġfḳkglmnhwy])/g, 'ِئْ$1');
    text = text.replace(/aʾ([btṯǧčḥḥḫdḏrzsšṣḍṭẓʿġfḳkglmnhwy])/g, 'َأْ$1');

    text = text.replace(/aʾā/g, "َآ"); // madda: hamza, long a
    text = text.replace(/([btṯǧčḥḥḫdḏrzsšṣḍṭẓʿġfḳkglmnhwy])ʾā/g, '$1ْآ'); // madda: sukun, hamza, long a

    // pronominal suffixes
    //text = text.replace("-(h[ui]|hā|k[ai]|h[ui]mā?|kumā|h[ui]nna|)\b", r"\1");
    // consonant combinations
    text = text.replace(/([btṯǧčḥḥḫdḏrzsšṣḍṭẓʿġfḳkglmnhwy])\1/g, '$1ّ');
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
    text = text.replace(/aȵ/g, ' ً '.trim());
    text = text.replace(/uȵ/g, ' ٌ '.trim());
    text = text.replace(/iȵ/g, ' ٍ '.trim());

    // silent letters
    text = text.replace(/ů/g, "و");
    text = text.replace(/å/g, "ا");
    text = dictReplace(text, translitArabic);

    text = text.replace(/ْ(?:(?=[\s.,!?:])|$)/g, ""); // replace final sukun
    text = text.replace(/,/g, "،"); // Convert commas
    text = text.replace(/-|_|ـ/g, "")


    return text;
}


function AHCE(dateAH) {
    let data = dateAH - dateAH / 33 + 622;
    return Math.round(data).toString();
}


function CEAH(dateCE) {
    let data = (33 / 32) * (dateCE - 622);
    return Math.round(data).toString();
}


function convertDate(text) {
    const cePattern = /(?<!\d\/)(\d{1,4})CE(?!\/\d)/g;
    const ahPattern = /(\d{1,4})AH(?!\/\d)/g;

    text = text.replace(cePattern, (match, ceYear) => {
        const ahYear = CEAH(parseInt(ceYear, 10));
        return `${ahYear}/${ceYear}`;
    });

    text = text.replace(ahPattern, (match, ahYear) => {
        const ceYear = AHCE(parseInt(ahYear, 10));
        return `${ahYear}/${ceYear}`;
    });

    return text;
}
