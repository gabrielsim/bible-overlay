// Shared Bible reference parser
// Supports: "John 3:16", "Ps 23:1-3", "Gen 1", "1 Cor 13:4-7", "Gen 1:1,3", etc.

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

  return { text: texts.join(' '), reference: ref };
}
