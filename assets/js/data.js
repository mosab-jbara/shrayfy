/* ============================================================ PRODUCTS DATA ============================================================ */
const PRODUCTS = [
  {key:1, img:"/assets/textures/shanoon-beige.jpg", finishes:["prod.finish.polished","prod.finish.honed","prod.finish.brushed"]},
  {key:2, img:"/assets/textures/shanoon-sand.jpg",  finishes:["prod.finish.honed","prod.finish.brushed"]},
  {key:3, img:"/assets/textures/desert-gold.jpg",   finishes:["prod.finish.polished","prod.finish.natural"]},
  {key:4, img:"/assets/textures/perlato.jpg",       finishes:["prod.finish.polished","prod.finish.honed"]},
  {key:5, img:"/assets/textures/thorontia.jpg",     finishes:["prod.finish.honed","prod.finish.tumbled","prod.finish.natural"]}
];

/* ============================================================ PROJECT GALLERIES ============================================================
   Each project (keyed by data-project on the .proj card) opens an in-page
   gallery of images. catKey / titleKey reuse the i18n dictionary so the
   gallery header matches the card; each image carries its own bilingual
   title + short description. */
const PROJECT_GALLERIES = {
  1:{ catKey:"projects.cat.villa", titleKey:"projects.t1", images:[
    {src:"/assets/images/project-02.jpg",
      title:{en:"Pool & Sea View", ar:"إطلالة المسبح والبحر"},
      desc:{en:"A honed shell-stone deck wrapping an infinity pool above the bay.", ar:"سطح من حجر الأصداف المصقول يحيط بمسبح لا متناهٍ يطل على الخليج."}},
    {src:"/assets/images/project-01.jpg",
      title:{en:"Garden Steps", ar:"أدراج الحديقة"},
      desc:{en:"Solid stone treads leading from the terrace down to the gardens.", ar:"درجات حجرية صلبة تمتد من التراس إلى الحدائق."}},
    {src:"/assets/images/project-04.jpg",
      title:{en:"Shaded Loggia", ar:"الرواق المظلل"},
      desc:{en:"A columned loggia clad in warm beige stone for cool summer shade.", ar:"رواق بأعمدة مكسوّ بالحجر البيج الدافئ لظلٍّ لطيف في الصيف."}}
  ]},
  2:{ catKey:"projects.cat.facade", titleKey:"projects.t2", images:[
    {src:"/assets/images/project-07.jpg",
      title:{en:"Main Portico", ar:"الرواق الرئيسي"},
      desc:{en:"Hand-carved columns and capitals framing the grand entrance.", ar:"أعمدة وتيجان منحوتة يدويًا تؤطر المدخل الكبير."}},
    {src:"/assets/images/project-08.jpg",
      title:{en:"Capital Detail", ar:"تفاصيل التاج"},
      desc:{en:"Acanthus capitals cut from a single block of cream stone.", ar:"تيجان بزخارف أوراق الأقنثة منحوتة من كتلة واحدة من الحجر الكريمي."}},
    {src:"/assets/images/project-11.jpg",
      title:{en:"Curved Arcade", ar:"الرواق المقوّس"},
      desc:{en:"A sweeping arcade tying the entrance to the side wings.", ar:"رواق منحنٍ يربط المدخل بالجناحين الجانبيين."}}
  ]},
  3:{ catKey:"projects.cat.interior", titleKey:"projects.t3", images:[
    {src:"/assets/images/project-04.jpg",
      title:{en:"Living Hall", ar:"قاعة المعيشة"},
      desc:{en:"Full-height stone walls and a sculpted fireplace surround.", ar:"جدران حجرية بكامل الارتفاع مع موقد منحوت."}},
    {src:"/assets/images/project-12.jpg",
      title:{en:"Inlaid Floor", ar:"أرضية مطعّمة"},
      desc:{en:"A geometric floor inlay mixing beige and grey shell stone.", ar:"أرضية بزخرفة هندسية تمزج حجر الأصداف البيج والرمادي."}},
    {src:"/assets/images/project-06.jpg",
      title:{en:"Carved Niche", ar:"كوّة منحوتة"},
      desc:{en:"A classical niche carved to display sculpture and light.", ar:"كوّة كلاسيكية منحوتة لعرض المنحوتات والإضاءة."}}
  ]},
  4:{ catKey:"projects.cat.detail", titleKey:"projects.t4", images:[
    {src:"/assets/images/project-05.jpg",
      title:{en:"Balcony Balustrade", ar:"درابزين الشرفة"},
      desc:{en:"Turned stone balusters supporting a moulded handrail.", ar:"أعمدة حجرية مخروطة تحمل مقبضًا مزخرفًا."}},
    {src:"/assets/images/project-03.jpg",
      title:{en:"Bracket Corbels", ar:"الكوابيل الزخرفية"},
      desc:{en:"Decorative corbels carrying the projecting balcony slab.", ar:"كوابيل مزخرفة تحمل بلاطة الشرفة البارزة."}},
    {src:"/assets/images/project-09.jpg",
      title:{en:"Window Surround", ar:"إطار النافذة"},
      desc:{en:"A profiled stone surround crowning the arched window.", ar:"إطار حجري مشكّل يتوّج النافذة المقوّسة."}}
  ]},
  5:{ catKey:"projects.cat.pool", titleKey:"projects.t5", images:[
    {src:"/assets/images/project-01.jpg",
      title:{en:"Pavilion Paving", ar:"تبليط الجناح"},
      desc:{en:"Large-format slabs laid around the open garden pavilion.", ar:"ألواح كبيرة الحجم مرصوفة حول جناح الحديقة المفتوح."}},
    {src:"/assets/images/project-10.jpg",
      title:{en:"Fountain Court", ar:"ساحة النافورة"},
      desc:{en:"A central fountain ringed by radial stone paving.", ar:"نافورة مركزية يحيط بها تبليط حجري شعاعي."}},
    {src:"/assets/images/project-02.jpg",
      title:{en:"Pool Coping", ar:"حافة المسبح"},
      desc:{en:"Bullnose coping finishing the edge of the reflecting pool.", ar:"حافة دائرية تُنهي حدّ المسبح العاكس."}}
  ]},
  6:{ catKey:"projects.cat.facade", titleKey:"projects.t6", images:[
    {src:"/assets/images/project-11.jpg",
      title:{en:"Curved Portico", ar:"الرواق المقوّس"},
      desc:{en:"A semicircular portico built from precisely cut voussoirs.", ar:"رواق نصف دائري مبنيّ من أحجار مقطوعة بدقة."}},
    {src:"/assets/images/project-07.jpg",
      title:{en:"Column Row", ar:"صف الأعمدة"},
      desc:{en:"A colonnade of monolithic columns along the façade.", ar:"صفّ من الأعمدة الأحادية على طول الواجهة."}},
    {src:"/assets/images/project-08.jpg",
      title:{en:"Cornice Run", ar:"خط الكورنيش"},
      desc:{en:"A deep moulded cornice crowning the curved wall.", ar:"كورنيش عميق مزخرف يتوّج الجدار المنحني."}}
  ]},
  7:{ catKey:"projects.cat.interior", titleKey:"projects.t7", images:[
    {src:"/assets/images/project-12.jpg",
      title:{en:"Central Medallion", ar:"الميدالية المركزية"},
      desc:{en:"A radial floor medallion inlaid from five stone tones.", ar:"ميدالية أرضية شعاعية مطعّمة من خمسة ألوان حجرية."}},
    {src:"/assets/images/project-04.jpg",
      title:{en:"Hall Borders", ar:"حدود القاعة"},
      desc:{en:"Running borders that frame each room of the hall.", ar:"حدود ممتدة تؤطر كل غرفة من القاعة."}},
    {src:"/assets/images/project-06.jpg",
      title:{en:"Threshold Detail", ar:"تفصيل العتبة"},
      desc:{en:"A carved threshold marking the passage between rooms.", ar:"عتبة منحوتة تحدّد الممر بين الغرف."}}
  ]},
  8:{ catKey:"projects.cat.facade", titleKey:"projects.t8", images:[
    {src:"/assets/images/project-08.jpg",
      title:{en:"Carved Capital", ar:"تاج منحوت"},
      desc:{en:"An ornate capital finished entirely by hand.", ar:"تاج مزخرف منجز بالكامل يدويًا."}},
    {src:"/assets/images/project-09.jpg",
      title:{en:"Entablature", ar:"العتب العلوي"},
      desc:{en:"Architrave, frieze and cornice cut to classical proportions.", ar:"عتب وإفريز وكورنيش بنِسب كلاسيكية دقيقة."}},
    {src:"/assets/images/project-11.jpg",
      title:{en:"Pilaster Detail", ar:"تفصيل الأكتاف"},
      desc:{en:"Fluted pilasters articulating the upper façade.", ar:"أكتاف مخدّدة تُبرز الجزء العلوي من الواجهة."}}
  ]}
};
