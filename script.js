let ku_lili_ike = [
  'ju', 'lu', 'nu', 'su', 'u', // reserved
  'suke', 'toma', // typo
  'kalamARR', 'kamalawala', 'ke', 'kulijo', 'mulapisu', 'Pingo',
  'po', 'polinpin', 'tuli', 'umesu', 'wasoweli', 'yupekosi',
]

let nimi_inli_ike = [
  'non-cute animal',
  '[~ ala ~]',
  '{~ suli}',
  'body (of person or animal)',
]

let nimi_inli_nanpa_wan = {
  ala: 'not', anpa: 'below', esun: 'shop', insa: 'inside', jaki: 'yucky',
  jan: 'person', kalama: 'sound', kama: 'coming', ken: 'can', kepeken: 'using',
  kulupu: 'group', lape: 'sleep', linja: 'line', lipu: 'document', luka: 'hand',
  ma: 'place', mi: 'me', misa: 'rat', mu: '<animal sound>', musi: 'art',
  n: 'um', nanpa: 'number', nasa: 'strange', ni: 'this', oke: 'okay',
  ona: 'they', pan: 'bread', pata: 'sibling', pini: 'past', poka: 'side',
  powe: 'false', selo: 'shell', sewi: 'above', sijelo: 'body', sike: 'circle',
  supa: 'surface', tan: 'from', tawa: 'toward', te: '<quote:>', telo: 'liquid',
  to: '<unquote>', toki: 'talk', tomo: 'room', unpa: 'sex', wa: 'wow',
  wan: 'one', weka: 'away',
}

let ante_ku = {
  a: ['!'],
  e: ['<obj:>'],
  en: ['and'],
  kijetesantakalu: ['raccoon', 'weasel', 'otter', 'skunk', 'red panda',
    'coati', 'kinkajou', 'olingo', 'ringtail', 'cacomistle'],
  kokosila: ['speak non-Toki-Pona'],
  ku: ['dictionary'],
  la: ['<? Then,>'],
  li: ['is'],
  o: ['<imp:>'],
  pi: ['of'],
  pilin: ['heart', 'feeling'],
  pu: ['Toki-Pona-book'],
  seme: ['what', 'which'],
}

// o jaki ala e sona ku 'data'
let ku =
  _(data)
    .omitBy(nimi => nimi.book == 'none')
    .omit(ku_lili_ike)
    .mapValues((sona_nimi, nimi) => {
      let inli = 
        _(sona_nimi.def.en)
          .split(/,|;|\|/g)
          .map(_.trim)
          .map(nimi => nimi.replace(/^ALT (\(.*\) )?/, ''))
          .map(nimi => nimi.replace(/^to /, ''))
          .map(nimi => nimi.replace(/ {cf\. .*}$/, ''))
          .map(nimi => nimi.replace(/^\(.*\) /, ''))
          .filter(nimi =>
            _.every(nimi_inli_ike, inli => !_.startsWith(nimi, inli))
          )
          .filter(nimi => !/{see .*}/.test(nimi))
          .value()
      if (nimi_inli_nanpa_wan[nimi]) {
        _.remove(inli, nimi_inli => nimi_inli == nimi_inli_nanpa_wan[nimi])
        inli.unshift(nimi_inli_nanpa_wan[nimi])
      } else if (ante_ku[nimi]) {
        inli = ante_ku[nimi]
      }
      return inli
    })
    .value()

ku['ali'] = ku['ale']

let inli_tan_tp = linja_nimi_mute =>
  _(linja_nimi_mute.toLowerCase())
    .split(/\b/)
    .map(nimi => ku[nimi] ? ku[nimi][0] : nimi)
    .join('')

console.log(ku)

let input  = document.getElementById('input')
let output = document.getElementById('output')

input.onkeyup = e => output.innerText = inli_tan_tp(input.value)
