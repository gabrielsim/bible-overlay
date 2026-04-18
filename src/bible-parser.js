// Shared Bible reference parser
// Supports: "John 3:16", "Ps 23:1-3", "Gen 1", "1 Cor 13:4-7", "Gen 1:1,3", etc.

const ABBREVS = {
  'Genesis': 'Gen.', 'Exodus': 'Ex.', 'Leviticus': 'Lev.', 'Numbers': 'Num.',
  'Deuteronomy': 'Deut.', 'Joshua': 'Josh.', 'Judges': 'Judg.', 'Ruth': 'Ruth',
  '1 Samuel': '1 Sam.', '2 Samuel': '2 Sam.', '1 Kings': '1 Kings', '2 Kings': '2 Kings',
  '1 Chronicles': '1 Chron.', '2 Chronicles': '2 Chron.', 'Ezra': 'Ezra', 'Nehemiah': 'Neh.',
  'Esther': 'Est.', 'Job': 'Job', 'Psalms': 'Ps.', 'Proverbs': 'Prov',
  'Ecclesiastes': 'Eccles.', 'Song of Solomon': 'Song', 'Isaiah': 'Isa.',
  'Jeremiah': 'Jer.', 'Lamentations': 'Lam.', 'Ezekiel': 'Ezek.', 'Daniel': 'Dan.',
  'Hosea': 'Hos.', 'Joel': 'Joel', 'Amos': 'Amos', 'Obadiah': 'Obad.',
  'Jonah': 'Jonah', 'Micah': 'Mic.', 'Nahum': 'Nah.', 'Habakkuk': 'Hab.',
  'Zephaniah': 'Zeph.', 'Haggai': 'Hag.', 'Zechariah': 'Zech.', 'Malachi': 'Mal.',
  'Matthew': 'Matt.', 'Mark': 'Mark', 'Luke': 'Luke', 'John': 'John',
  'Acts': 'Acts', 'Romans': 'Rom.', '1 Corinthians': '1 Cor.', '2 Corinthians': '2 Cor.',
  'Galatians': 'Gal.', 'Ephesians': 'Eph.', 'Philippians': 'Phil.', 'Colossians': 'Col.',
  '1 Thessalonians': '1 Thess.', '2 Thessalonians': '2 Thess.', '1 Timothy': '1 Tim.',
  '2 Timothy': '2 Tim.', 'Titus': 'Titus', 'Philemon': 'Philem.', 'Hebrews': 'Heb.',
  'James': 'James', '1 Peter': '1 Pet.', '2 Peter': '2 Pet.', '1 John': '1 John',
  '2 John': '2 John', '3 John': '3 John', 'Jude': 'Jude', 'Revelation': 'Rev',
};

// Returns an array of individual verse results (splits ranges and comma-separated verses)
function parseRefs(raw) {
  const s = raw.trim();
  const multiRe = /^(.+?\s+\d+):(\d+)[\u2013\-](\d+)$/i;
  const commaRe = /^(.+?\s+\d+):(\d[\d,]*)$/i;

  const rangeMatch = s.match(multiRe);
  if (rangeMatch) {
    const base = rangeMatch[1];
    const start = parseInt(rangeMatch[2]);
    const end = parseInt(rangeMatch[3]);
    const results = [];
    for (let v = start; v <= end; v++) {
      const r = parseRef(`${base}:${v}`);
      if (r) results.push(r);
    }
    return results.length ? results : null;
  }

  const commaMatch = s.match(commaRe);
  if (commaMatch && commaMatch[2].includes(',')) {
    const base = commaMatch[1];
    return commaMatch[2].split(',').map(n => parseRef(`${base}:${n.trim()}`)).filter(Boolean);
  }

  const result = parseRef(s);
  return result ? [result] : null;
}
function parseRef(raw) {
  const s = raw.trim();
  const re = /^(.+?)\s+(\d+)(?::(\d[\d,\-]*))?$/i;
  const m = s.match(re);
  if (!m) return null;

  const bookRaw = m[1].trim().toLowerCase();
  const chapter = parseInt(m[2]);
  const versePart = m[3] || null;

  const canonicalBook = ALIASES[bookRaw];
  if (!canonicalBook || !KJV[canonicalBook]) return null;

  const chData = KJV[canonicalBook][String(chapter)];
  if (!chData) return null;

  if (versePart === null) return null;

  if (versePart.includes(',')) return null; // use parseRefs for comma-separated verses


  // Range or single verse
  const dashIdx = versePart.indexOf('-');
  const startVerse = parseInt(versePart);
  const endVerse = dashIdx !== -1 ? parseInt(versePart.slice(dashIdx + 1)) : startVerse;

  const texts = [];
  for (let v = startVerse; v <= endVerse; v++) {
    const t = chData[String(v)];
    if (!t) break;
    texts.push(t.replace(/\[(.+?)\]/g, '$1').trim());
  }
  if (!texts.length) return null;

  const actualEnd = startVerse + texts.length - 1;
  let ref = `${canonicalBook} ${chapter}:${startVerse}`;
  if (actualEnd > startVerse) ref += `\u2013${actualEnd}`;
  const abbrev = ABBREVS[canonicalBook] || canonicalBook;
  let shortRef = `${abbrev} ${chapter}:${startVerse}`;
  if (actualEnd > startVerse) shortRef += `\u2013${actualEnd}`;

  return { text: texts.join(' '), reference: ref, shortRef };
}
