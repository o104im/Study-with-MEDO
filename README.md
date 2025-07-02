# تلخيصك الدراسي - موقع معالجة الملفات التعليمية

موقع ويب شامل لرفع الملفات (PDF, PowerPoint, Docs, TXT) مع ميزات تلخيص وإنشاء أسئلة وخرائط ذهنية، بتصميم عصري مخصص للطلاب.

## المميزات

- **تلخيص الملفات**: تلخيص محتوى الملفات التعليمية بسرعة وكفاءة
- **توليد الأسئلة**: إنشاء أسئلة متنوعة (اختيار من متعدد، إجابات قصيرة، صح/خطأ) من محتوى الملفات
- **إنشاء خرائط ذهنية**: توليد خرائط ذهنية تفاعلية لتسهيل فهم المعلومات
- **دعم أنواع متعددة من الملفات**: PDF, PowerPoint, Word, TXT
- **واجهة مستخدم عصرية**: تصميم سهل الاستخدام ومخصص للطلاب

## هيكل المشروع

المشروع مقسم إلى جزأين رئيسيين:

1. **الواجهة الأمامية (Frontend)**: مبنية باستخدام React
2. **الخادم الخلفي (Backend)**: مبني باستخدام Flask

### هيكل الواجهة الأمامية

```
edufile-processor/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Layout.jsx
│   │   └── ui/
│   │       └── MindMapComponent.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── UploadPage.jsx
│   │   ├── SummaryResultPage.jsx
│   │   ├── QuestionsResultPage.jsx
│   │   ├── MindMapResultPage.jsx
│   │   ├── FeaturesPage.jsx
│   │   └── HowToUsePage.jsx
│   ├── utils/
│   │   └── api.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

### هيكل الخادم الخلفي

```
edufile-api/
├── src/
│   ├── models/
│   ├── routes/
│   │   ├── file_upload.py
│   │   ├── summary.py
│   │   ├── questions.py
│   │   ├── mindmap.py
│   │   └── user.py
│   ├── static/
│   ├── uploads/
│   ├── utils/
│   │   ├── file_processor.py
│   │   ├── pdf_processor.py
│   │   ├── docx_processor.py
│   │   ├── pptx_processor.py
│   │   └── txt_processor.py
│   ├── database/
│   └── main.py
├── venv/
└── requirements.txt
```

## متطلبات التشغيل

### الواجهة الأمامية

- Node.js (الإصدار 18 أو أحدث)
- npm أو pnpm

### الخادم الخلفي

- Python 3.8 أو أحدث
- pip
- المكتبات المذكورة في ملف requirements.txt

## طريقة التثبيت والتشغيل

### 1. تثبيت وتشغيل الخادم الخلفي

```bash
# إنشاء بيئة افتراضية
python -m venv venv

# تفعيل البيئة الافتراضية
# في نظام Windows
venv\Scripts\activate
# في نظام Linux/Mac
source venv/bin/activate

# تثبيت المكتبات المطلوبة
pip install -r requirements.txt

# تشغيل الخادم
cd src
python main.py
```

سيعمل الخادم على المنفذ 5000: http://localhost:5000

### 2. تثبيت وتشغيل الواجهة الأمامية

```bash
# تثبيت المكتبات المطلوبة
npm install
# أو
pnpm install

# تشغيل خادم التطوير
npm run dev
# أو
pnpm run dev
```

سيعمل خادم التطوير على المنفذ 5173: http://localhost:5173

### 3. بناء المشروع للإنتاج

```bash
# بناء الواجهة الأمامية
cd edufile-processor
npm run build
# أو
pnpm run build

# نسخ ملفات الواجهة الأمامية إلى مجلد static في الخادم الخلفي
cp -r dist/* ../edufile-api/src/static/
```

## نشر المشروع على Netlify

لنشر المشروع على Netlify، يمكنك اتباع الخطوات التالية:

1. قم بتسجيل الدخول إلى حسابك على Netlify
2. اختر "New site from Git" أو "Import an existing project"
3. قم برفع ملف ZIP الذي يحتوي على مجلد `dist` من الواجهة الأمامية
4. قم بتكوين إعدادات النشر:
   - Build command: `npm run build` أو `pnpm run build`
   - Publish directory: `dist`
   - Environment variables: قم بإضافة متغير `VITE_API_URL` وتعيينه لعنوان URL الخاص بالخادم الخلفي

ملاحظة: يجب نشر الخادم الخلفي بشكل منفصل على خدمة استضافة تدعم Python/Flask مثل Heroku أو PythonAnywhere أو Render.

## المساهمة في المشروع

نرحب بمساهماتكم في تطوير هذا المشروع. يمكنكم المساهمة من خلال:

1. إضافة ميزات جديدة
2. تحسين الأداء
3. إصلاح الأخطاء
4. تحسين واجهة المستخدم

## الترخيص

هذا المشروع مرخص تحت رخصة MIT.

