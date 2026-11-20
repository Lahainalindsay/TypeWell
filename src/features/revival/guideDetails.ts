export type CharacterNote = { forms: string; meaning: string; entry: string };
export type GuideDetails = { script: string; keyboard: string; method: string; characters: CharacterNote[]; example: string; checklist: string[]; resource?: {title: string; url: string} };
export const guideDetails: Record<string, GuideDetails> = {
 hawaiian: {
  script:'Latin alphabet with the ʻokina and kahakō. These marks belong to the spelling and can distinguish meaning; they are not optional decoration.',
  keyboard:'Hawaiian input, when available, or a Unicode character-entry method',
  method:'If Hawaiian does not appear in your keyboard list, you can still write correctly. Use Windows Character Map or Mac Character Viewer to insert the marks below. For frequent writing, choose a Hawaiian-capable input method and learn its own layout rather than assuming every keyboard uses the same shortcut.',
  characters:[{forms:'ʻ',meaning:'ʻOkina — modifier letter turned comma, U+02BB.',entry:'Copy this ʻ for setup, or select U+02BB in a Unicode character picker. A straight apostrophe, curly quotation mark, and grave accent are different characters.'},{forms:'ā ē ī ō ū',meaning:'Lowercase vowels with kahakō (macrons).',entry:'Choose a vowel with a macron in Character Map/Character Viewer, or use the macron function in your selected input method.'},{forms:'Ā Ē Ī Ō Ū',meaning:'Uppercase vowels with kahakō.',entry:'Use the uppercase marked character when the source calls for it; retaining the accent matters in capitals too.'}],
  example:'Hawaiʻi · ʻōlelo Hawaiʻi · kahakō',checklist:['Check that Hawaiʻi contains ʻ, not an apostrophe.','Confirm that the macron remains visible after copying text between apps.','Try both lowercase and uppercase marked vowels before timing yourself.'],
  resource:{title:'Hawaiian Basic layout documentation (Keyman)',url:'https://help.keyman.com/keyboard/basic_kbdhaw/1.0/basic_kbdhaw'}
 },
 maori: {
  script:'Latin alphabet with macrons, called tohutō, marking long vowels.',keyboard:'Māori or Aotearoa NZ input, or a Māori-capable Unicode keyboard',
  method:'On the Māori Windows layout described by the University of Canterbury, press the backtick key (`), release it, then press the vowel: ` followed by a produces ā. This sequence depends on the selected layout; it is not a shortcut for every English keyboard.',
  characters:[{forms:'ā ē ī ō ū',meaning:'Long-vowel forms with tohutō.',entry:'With the documented Māori Windows layout selected, use backtick then the vowel. Other layouts may use different combinations.'},{forms:'Ā Ē Ī Ō Ū',meaning:'Uppercase macron vowels.',entry:'Check uppercase support in the layout preview, or choose the uppercase character in a Unicode character picker.'}],
  example:'Māori · ā ē ī ō ū',checklist:['Check which layout is active before using the backtick sequence.','Retain macrons exactly as supplied.','Do not assume an English autocorrect dictionary knows the intended spelling.'],resource:{title:'Māori keyboard instructions — University of Canterbury',url:'https://www.canterbury.ac.nz/study/study-support-info/study-and-discussion-rooms/computer-workrooms/maori-language-keyboard'}
 },
 cherokee: {
  script:'Cherokee syllabary. Its characters represent syllables rather than individual Latin letters.',keyboard:'A Unicode Cherokee syllabary or Cherokee phonetic input method',
  method:'Cherokee Nation provides keyboard resources and instructions. Choose between a one-key/one-character layout and a phonetic method; these are different workflows. Follow the chosen keyboard’s chart rather than typing Latin letters and changing the font.',
  characters:[{forms:'Ꮳ Ꮃ Ꭹ',meaning:'The three syllabary characters in the language-name form ᏣᎳᎩ.',entry:'Locate each character in the selected syllabary layout, or use its documented phonetic conversion. Do not assume the English key label is the output.'},{forms:'ᏣᎳᎩ',meaning:'The complete language-name form used in this introductory copying drill.',entry:'Enter the characters consecutively, without the spaces used to separate symbols in the first row.'}],example:'ᏣᎳᎩ',
  checklist:['Choose a Unicode keyboard, not a legacy font substitution.','Check the keyboard chart and output before beginning.','If boxes appear, check font support as well as the input method.'],resource:{title:'Cherokee Nation — Fonts and Keyboards',url:'https://language.cherokee.gov/fonts-and-keyboards/'}
 },
 basque: {
  script:'Latin alphabet. This introductory pathway uses ordinary letters and ñ where the source requires it.',keyboard:'A Latin layout with access to ñ; a Spanish layout is one practical option',
  method:'An ordinary Latin keyboard is enough for many Basque words. If ñ is not on a key, use a supporting layout, an available long-press character menu, or a Unicode character picker. Follow Basque spelling rather than adding accents by analogy with Spanish.',
  characters:[{forms:'ñ Ñ',meaning:'N with tilde, in lowercase and uppercase.',entry:'Select ñ/Ñ on a supporting layout, or insert the exact character with your device’s character picker.'},{forms:'tx tz ts',meaning:'Letter sequences encountered in Basque writing.',entry:'Type each Latin letter in order. These sequences do not require a special single-character key.'}],example:'Euskara · ñ Ñ · tx tz ts',checklist:['Keep ñ distinct from n.','Copy letter sequences in the given order.','Preserve capitalization and punctuation from the source.']
 },
 welsh: {
  script:'Latin alphabet with accented vowels, including w and y used as vowels.',keyboard:'Welsh (CYM) on Windows, or a Welsh-capable input method',
  method:'On the Welsh Windows layout documented by the UK legislation service, press AltGr + 6, release both keys, then type the vowel for a circumflex. This applies to a, e, i, o, u, w and y. Use the keyboard’s own documentation on other layouts.',
  characters:[{forms:'â ê î ô û ŵ ŷ',meaning:'Vowels carrying the circumflex, often called the to bach.',entry:'On the documented Welsh Windows layout: AltGr + 6, release, then the vowel.'},{forms:'ŵ ŷ',meaning:'Two Welsh forms that can be missing from generic accent menus.',entry:'Test w and y explicitly; support for â alone does not establish support for the Welsh set.'}],example:'Cymraeg · ŵ ŷ · â ê î ô û',checklist:['Switch to the Welsh layout before using its shortcut.','Confirm that ŵ and ŷ are available.','Match the accent in the passage rather than using any available accented vowel.'],resource:{title:'Typing Welsh vowels — UK legislation service',url:'https://help.lawmaker.legislation.gov.uk/help/live/typing-welsh-vowels-with-diacritics'}
 },
 irish: {
  script:'Latin alphabet with the síneadh fada on long vowels.',keyboard:'Irish input or another Latin layout that supports acute-accented vowels',
  method:'Select Irish where your device offers it. Otherwise use a documented accent-capable layout or a Unicode character picker. Long-press menus may provide the vowel you need on touchscreens; check the actual output rather than relying on an unlabeled modifier-key shortcut.',
  characters:[{forms:'á é í ó ú',meaning:'Lowercase vowels with the síneadh fada.',entry:'Choose the acute-accented form, with the mark rising to the right.'},{forms:'Á É Í Ó Ú',meaning:'Uppercase vowels with the fada retained.',entry:'Use the uppercase marked vowel instead of dropping the accent when capitalizing.'}],example:'Gaeilge · á é í ó ú',checklist:['Use an acute accent, not the Scottish Gaelic grave accent.','Keep accents when using capitals.','Check autocorrect before copying a longer passage.']
 },
 'scottish-gaelic': {
  script:'Latin alphabet; modern Scottish Gaelic uses grave accents on long vowels.',keyboard:'A Latin input method with grave-accented vowels',
  method:'Choose a layout with the grave-accented forms below. Character Map, Character Viewer, or an available long-press menu can supply individual vowels when your usual layout lacks them. Follow the source: modern Scottish Gaelic and modern Irish do not use the same accent set.',
  characters:[{forms:'à è ì ò ù',meaning:'Lowercase grave-accented vowels.',entry:'Select the mark sloping down to the right; á and à are different characters.'},{forms:'À È Ì Ò Ù',meaning:'Uppercase grave-accented vowels.',entry:'Use a supporting uppercase character or a character picker; do not replace it with an unmarked capital.'}],example:'Gàidhlig · à è ì ò ù',checklist:['Keep à distinct from á.','Retain accents in capitals.','Do not let a different language’s spellchecker silently replace the forms.']
 },
 manx: {
  script:'Latin alphabet. The introductory language-name drill can be entered on an ordinary English Latin layout.',keyboard:'Your usual Latin keyboard for this drill',
  method:'You do not need to install a new keyboard for the current name-copy exercise. Keep your Latin layout, then check spaces and capital letters. If a later verified passage contains additional marks, use the forms required by that source.',
  characters:[{forms:'Gaelg',meaning:'Language-name form used in the introductory drill.',entry:'Type the Latin letters directly, preserving the initial capital.'},{forms:'Ellan Vannin',meaning:'A two-word name included in the copying material.',entry:'Enter the space between the words; do not join them or add accents.'}],example:'Gaelg Ellan Vannin',checklist:['Use the source’s capitalization.','Retain spaces between words.','Treat this as name-copy practice, not a full Manx reading lesson.']
 },
 'taiwanese-taigi': {
  script:'This guide uses Latin-script Pe̍h-ōe-jī examples. Taigi also has other writing traditions; their input conventions are not interchangeable.',keyboard:'A Pe̍h-ōe-jī-capable input method, such as PhahTaigi POJ',
  method:'Choose the writing convention before choosing a keyboard. The provider’s PhahTaigi POJ guide documents a Pe̍h-ōe-jī layout and mobile character choices. Use its chart for tone marks and combining marks instead of assembling a passage from unrelated spelling conventions.',
  characters:[{forms:'â í ō',meaning:'Examples of circumflex, acute and macron forms in the displayed material.',entry:'Use the selected POJ input method’s documented accent choices.'},{forms:'e̍',meaning:'E followed by a combining vertical line above; the mark is part of the displayed written form.',entry:'Use a POJ-capable method. Some marks combine with a base character rather than existing as one precomposed letter.'}],example:'Tâi-gí · Pe̍h-ōe-jī',checklist:['Confirm that the keyboard supports the chosen romanization.','Keep tone marks and hyphens as provided.','Do not relabel Mandarin sentences as Taigi practice.'],resource:{title:'PhahTaigi POJ keyboard documentation',url:'https://help.keyman.com/keyboard/taigi_poj/1.4.1/taigi_poj'}
 },
 'sorani-kurdish': {
  script:'An Arabic-derived Kurdish writing system, written from right to left, with distinct Kurdish letters.',keyboard:'Central Kurdish (Sorani), not merely a generic Arabic layout',
  method:'Choose Central Kurdish/Sorani when available. A documented alternative is Keyman’s Central Kurdish Basic. Verify the Kurdish-specific letters on the selected chart; an Arabic-only layout may not provide the forms you need.',
  characters:[{forms:'ڕ ڵ ۆ ێ ە',meaning:'Kurdish letters included in the introductory copying material.',entry:'Locate the exact letter in the Central Kurdish layout. Similar-looking letters from another layout can have different code points.'},{forms:'کوردی',meaning:'A connected-script example from the drill.',entry:'Type in reading order and let the text field handle right-to-left display and letter joining. Never manually reverse the sequence.'}],example:'کوردی · ڕ ڵ ۆ ێ ە',checklist:['Use a Central Kurdish layout.','Do not reverse characters to imitate the visual order.','Expect mixed Latin numbers and punctuation to follow bidirectional text rules.'],resource:{title:'Central Kurdish Basic keyboard',url:'https://keyman.com/keyboards/basic_kbdkurd'}
 }
};
export const setupSources = [
 {title:'Windows language and keyboard settings',url:'https://support.microsoft.com/en-us/windows/hardware/input-devices/manage-the-language-and-keyboard-input-layout-settings-in-windows'},
 {title:'Mac input sources',url:'https://support.apple.com/guide/mac-help/write-in-another-language-mchlp1406/mac'},
 {title:'iPhone keyboards',url:'https://support.apple.com/guide/iphone/add-or-change-keyboards-iph73b71eb/ios'},
 {title:'Android / Gboard language settings',url:'https://support.google.com/gboard/answer/7068494'},
 {title:'Windows Character Map and Unicode characters',url:'https://support.microsoft.com/en-us/word/insert-ascii-or-unicode-latin-based-symbols-and-characters'},
 {title:'Mac Character Viewer shortcut',url:'https://support.apple.com/102650'}
];
