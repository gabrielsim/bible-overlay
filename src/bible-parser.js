// Shared Bible reference parser
// Supports: "John 3:16", "Ps 23:1-3", "Gen 1", "1 Cor 13:4-7", etc.
function parseRef(raw) {
  const s = raw.trim();
  const re = /^(.+?)\s+(\d+)(?::(\d+)(?:-(\d+))?)?$/i;
  const m = s.match(re);
  if (!m) return null;

  const bookRaw = m[1].trim().toLowerCase();
  const chapter = parseInt(m[2]);
  const startVerse = m[3] ? parseInt(m[3]) : null;
  const endVerse   = m[4] ? parseInt(m[4]) : startVerse;

  const canonicalBook = ALIASES[bookRaw];
  if (!canonicalBook || !KJV[canonicalBook]) return null;

  const chData = KJV[canonicalBook][String(chapter)];
  if (!chData) return null;

  if (startVerse === null) {
    // Whole chapter
    const verses = Object.entries(chData)
      .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
      .map(([, t]) => t.replace(/\[(.+?)\]/g, '$1').trim());
    return { text: verses.join(' '), reference: `${canonicalBook} ${chapter} (KJV)` };
  }

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
  ref += ' (KJV)';

  return { text: texts.join(' '), reference: ref };
}
