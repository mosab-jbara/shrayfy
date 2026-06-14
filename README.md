# SHRAYFY Marble & Granite — Website

موقع شركة شريفي للرخام والغرانيت — صفحة landing واحدة ثنائية اللغة (عربي / إنكليزي).
A single bilingual (Arabic / English) landing page for SHRAYFY Marble & Granite.

---

## How to use — طريقة الاستخدام

Open `index.html` in any modern browser. No build step, no server, no dependencies (fonts load from Google Fonts).
افتح ملف `index.html` في أي متصفح حديث. لا حاجة لأي إعداد أو خادم.

To publish: upload the whole `shrayfy-website` folder to any web host.
للنشر: ارفع المجلد كاملاً إلى أي استضافة.

---

## Structure — الهيكلية

```
shrayfy-website/
├── index.html            ← the whole site (HTML + CSS + JS in one file)
└── assets/
    ├── brand/            ← logo & emblem (الإمبلم/الصخرة)
    ├── images/           ← project photos (صور المشاريع) project-01 … project-12
    └── textures/         ← stone slab swatches (عينات الأحجار)
```

## Sections — الأقسام
Navbar · Hero · About · Stats · Products ("Choose your stone") · Projects · Contact · Footer.
All navbar/footer links scroll to their section on the same page.

---

## Editing common things — تعديلات شائعة

**Text & translations / النصوص والترجمات**
All copy lives in the `I18N` object inside `index.html` (search for `const I18N`).
Each key has an `en` and an `ar` value — edit both to keep the two languages in sync.

**Contact details / معلومات التواصل**
Phone, email, address and website appear in the Contact section and Footer.
Search the HTML for `+963`, `info@shrayfy.com`, and `www.shrayfy.com` to replace them.
(Phone numbers are placeholders — replace with the real ones.)

**Stats numbers / الأرقام**
In the Stats section, edit the `data-count="…"` values (years, projects, factory area, types).

**Products / المنتجات**
Edit the `PRODUCTS` array in `index.html` (image + finishes), and the matching
`prod.1.name` … `prod.5.desc` keys in the `I18N` dictionary.

**Projects / المشاريع**
Each project is an `<a class="proj …">` in the Projects section.
Swap the `src` to any image in `assets/images/`, and edit its `data-i18n` title/category keys.

---

## Notes — ملاحظات
- Fully responsive (desktop / tablet / mobile) with a slide-in mobile menu.
- Language switcher (top-right) flips the entire layout to RTL for Arabic.
- Hover effects and subtle scroll/entrance animations throughout; respects `prefers-reduced-motion`.
- Colors, type and spacing follow the provided Shrayfy Design System tokens.
- The contact form is front-end only (demo). Connect it to your backend/email service before going live.
