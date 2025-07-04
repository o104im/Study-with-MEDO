# تعليمات تثبيت وتشغيل موقع تلخيصك الدراسي

## متطلبات النظام

- نظام تشغيل: Windows أو macOS أو Linux
- Node.js (الإصدار 18 أو أحدث)
- Python 3.8 أو أحدث
- مساحة تخزين: 500 ميجابايت على الأقل

## خطوات التثبيت

### 1. استخراج الملفات

قم بفك ضغط ملف ZIP الذي استلمته إلى مجلد على جهازك.

### 2. تثبيت وتشغيل الخادم الخلفي (Backend)

1. افتح نافذة Terminal أو Command Prompt
2. انتقل إلى مجلد `edufile-api`:

```bash
cd path/to/edufile-api
```

3. قم بإنشاء بيئة افتراضية Python:

```bash
# في نظام Windows
python -m venv venv

# في نظام macOS/Linux
python3 -m venv venv
```

4. قم بتفعيل البيئة الافتراضية:

```bash
# في نظام Windows
venv\Scripts\activate

# في نظام macOS/Linux
source venv/bin/activate
```

5. قم بتثبيت المكتبات المطلوبة:

```bash
pip install -r requirements.txt
```

6. قم بتشغيل الخادم الخلفي:

```bash
cd src
python main.py
```

سيعمل الخادم على المنفذ 5000: http://localhost:5000

### 3. تثبيت وتشغيل الواجهة الأمامية (Frontend)

#### خيار 1: تشغيل نسخة التطوير

1. افتح نافذة Terminal أو Command Prompt جديدة
2. انتقل إلى مجلد `edufile-processor`:

```bash
cd path/to/edufile-processor
```

3. قم بتثبيت المكتبات المطلوبة:

```bash
# باستخدام npm
npm install

# أو باستخدام pnpm
pnpm install
```

4. قم بتشغيل خادم التطوير:

```bash
# باستخدام npm
npm run dev

# أو باستخدام pnpm
pnpm run dev
```

سيعمل خادم التطوير على المنفذ 5173: http://localhost:5173

#### خيار 2: استخدام نسخة الإنتاج المبنية مسبقاً

النسخة المبنية مسبقاً موجودة في مجلد `dist` داخل `edufile-processor`. يمكنك استخدام أي خادم ويب ثابت لتشغيلها:

```bash
# باستخدام npm
npx serve -s dist

# أو باستخدام Python
cd dist
python -m http.server 8080
```

ثم قم بفتح المتصفح على العنوان: http://localhost:8080

## نشر الموقع على Netlify

لنشر الموقع على Netlify، اتبع الخطوات التالية:

1. قم بتسجيل الدخول إلى حسابك على [Netlify](https://www.netlify.com/)
2. اختر "Add new site" ثم "Deploy manually"
3. قم بسحب وإفلات مجلد `dist` من `edufile-processor` إلى منطقة الرفع
4. انتظر حتى يكتمل النشر

ملاحظة: ستحتاج إلى نشر الخادم الخلفي بشكل منفصل على خدمة استضافة تدعم Python/Flask مثل Heroku أو PythonAnywhere أو Render.

## استكشاف الأخطاء وإصلاحها

### مشكلة: الخادم الخلفي لا يعمل

- تأكد من تفعيل البيئة الافتراضية
- تأكد من تثبيت جميع المكتبات المطلوبة
- تحقق من عدم استخدام المنفذ 5000 من قبل تطبيق آخر

### مشكلة: الواجهة الأمامية لا تتصل بالخادم الخلفي

- تأكد من تشغيل الخادم الخلفي
- تحقق من إعدادات CORS في الخادم الخلفي
- تأكد من أن عنوان API في ملف `src/utils/api.js` يشير إلى العنوان الصحيح للخادم الخلفي

### مشكلة: خطأ في تثبيت المكتبات

- حاول حذف مجلد `node_modules` وإعادة تثبيت المكتبات
- تأكد من استخدام إصدار Node.js المناسب

## للمساعدة والدعم

إذا واجهتك أي مشكلة أثناء التثبيت أو التشغيل، يرجى التواصل معنا عبر البريد الإلكتروني أو فتح issue على GitHub.

