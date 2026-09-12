# 📋 وثيقة متطلبات الـ API للباك إند (Backend API Requirements)
### عيادة د. علي ياقوت لطب وتجميل الأسنان (Dr. Ali Yakout Dental Clinic)

تهدف هذه الوثيقة إلى توضيح جميع البيانات والسكاشن الثابتة المطلوب تحويلها إلى بيانات ديناميكية بالكامل (Dynamic Data) عبر الـ API لدعم اللغتين (العربية `ar` والإنجليزية `en`) مع إمكانية التحكم الكامل فيها من لوحة التحكم (Dashboard).

---

## 🌐 1. الهيكل العام للـ API (General API Design)

- **Base URL**: `https://your-domain.com/api/v1`
- **Language Header / Route**:
  - إما عبر مسار: `GET /api/{locale}/home` (حيث `{locale}` هو `ar` أو `en`)
  - أو عبر هيدر: `Accept-Language: ar` / `Accept-Language: en`
- **Response Format**: `JSON` موحد لجميع الـ Endpoints:

```json
{
  "success": true,
  "data": { ... },
  "message": "Data retrieved successfully"
}
```

---

## 📌 2. الـ Endpoints المطلوبة بالتفصيل

---

### 🟢 1. الـ Endpoint الرئيسي للصفحة الرئيسية: `GET /api/{lang}/home`

يُفضل أن يُرجع هذا الـ Endpoint كائن يحتوي على جميع سكاشن الصفحة الرئيسية لتسريع التحميل بطلب واحد (Single Request)، أو تقسيمه لعدة Endpoints مخصصة.

#### هيكل الـ JSON المتوقع (Full JSON Schema):

```json
{
  "success": true,
  "data": {
    "clinic_info": {
      "name": "عيادة د. علي ياقوت لطب وتجميل الأسنان",
      "doctor_name": "د. علي ياقوت",
      "doctor_title": "دكتوراه في العلاج التحفظي وتجميل الأسنان",
      "phone": "+201000000000",
      "whatsapp": "+201000000000",
      "email": "info@aliyakout-clinic.com",
      "address": "القاهرة، التجمع الخامس - مصر",
      "google_maps_url": "https://maps.google.com/...",
      "working_hours": "السبت - الخميس: 12:00 م - 9:00 م",
      "social_links": {
        "facebook": "https://facebook.com/...",
        "instagram": "https://instagram.com/...",
        "tiktok": "https://tiktok.com/...",
        "youtube": "https://youtube.com/..."
      }
    },

    "hero_section": {
      "badge": "العلاج التحفظي وتجميل الأسنان المجهري",
      "title_main": "ابتسامة طبيعية متناسقة",
      "title_highlight": "بدون ألم أو برد جائر",
      "description": "نقدم تجربة علاجية استثنائية قائمة على أحدث تقنيات طب الأسنان التحفظي، الحفاظ على بنية السن الطبيعية، وأحدث أجهزة المسح الضوئي الرقمي ثلاثي الأبعاد 3Shape TRIOS®.",
      "doctor_image": "https://backend-domain.com/uploads/doctor-hero.jpg",
      "stats": [
        { "id": 1, "value": "+12", "label": "سنوات خبرة وأبحاث دكتوراه" },
        { "id": 2, "value": "100%", "label": "علاج تحفظي بدون برد جائر" },
        { "id": 3, "value": "1hr", "label": "جلسة هادئة مخصصة لكل مريض" },
        { "id": 4, "value": "3D", "label": "مقاسات رقمية بدون معجون" }
      ],
      "cta_primary_text": "احجز موعد كشف واستشارة",
      "cta_whatsapp_text": "تواصل عبر واتساب"
    },

    "about_section": {
      "label": "فلسفتنا الطبية",
      "title": "دكتوراه متخصصة في طب الأسنان التحفظي والتجميلي",
      "description_1": "نؤمن في عيادتنا بأن السن الطبيعي لا يعوض، لذلك نعتمد نهج الـ Biomimetic Dentistry (محاكاة الطبيعة) الذي يهدف لعلاج وترميم الأسنان بأعلى درجات الدقة دون الإضرار بالأنسجة السليمة.",
      "description_2": "نوفر بيئة علاجية مريحة وخالية من التوتر، ونعتمد على بروتوكولات العزل المطاطي الكامل والتعقيم الأوروبي المتطور لضمان استدامة النتائج لسنوات طويلة.",
      "doctor_image": "https://backend-domain.com/uploads/about-doctor.jpg",
      "features": [
        "الحفاظ على حيوية عصب السن وتجنب علاجات الجذور غير الضرورية",
        "حشوات وتيجان تجميلية متوافقة بيولوجياً تحاكي شفافية السن الطبيعي",
        "استخدام أحدث المجاهر وكاميرات المسح الرقمي ثلاثية الأبعاد",
        "تطبيق أعلى بروتوكولات مكافحة العدوى والتعقيم الأوروبي"
      ],
      "experience_years": 12,
      "satisfied_cases_count": 2500
    },

    "scanner_technology_section": {
      "label": "أحدث التجهيزات الرقمية",
      "title": "ماسح الأسنان ثلاثي الأبعاد 3Shape TRIOS®",
      "subtitle": "دقة ميكرونية فائقة ووداعاً لطبعات المعجون التقليدية المزعجة",
      "description": "نوفر أحدث أجيال المسح الضوئي الداخلي للفم، مما يتيح أخذ قياسات الأسنان بدقة بالغة وفي ثوانٍ معدودة، مع محاكاة فورية لشكل ابتسامتك قبل بدء العلاج.",
      "image": "https://backend-domain.com/uploads/scanner-trios.jpg",
      "features": [
        {
          "id": 1,
          "title": "تصوير ثلاثي الأبعاد فوري",
          "description": "رؤية تفصيلية لجميع زوايا الأسنان وتصميم الابتسامة رقمياً بدقة متناهية."
        },
        {
          "id": 2,
          "title": "راحة تامة بدون غثيان",
          "description": "لا مزيد من وضع قوالب المعجون الكبيرة المزعجة داخل الفم."
        },
        {
          "id": 3,
          "title": "سرعة قياسية في التركيبات",
          "description": "إرسال المقاسات الرقمية للمعمل فوراً لتقليل زمن استلام التيجان والفينير."
        }
      ]
    },

    "services": [
      {
        "id": 1,
        "name": "تجميل الأسنان والعدسات (Veneers & Aesthetics)",
        "short_desc": "تصميم ابتسامة رقمية طبيعية متناسقة مع ملامح الوجه بأقل تدخل جراحي أو برد.",
        "image_url": "https://backend-domain.com/uploads/services/veneers.jpg",
        "alt_image": "تجميل الأسنان والفينير",
        "order": 1
      },
      {
        "id": 2,
        "name": "العلاج التحفظي وترميم الأسنان (Biomimetic Restoration)",
        "short_desc": "معالجة التسوسات وترميم الأسنان بمواد مركبة عالية الجودة تحاكي السن الطبيعي.",
        "image_url": "https://backend-domain.com/uploads/services/restoration.jpg",
        "alt_image": "العلاج التحفظي",
        "order": 2
      },
      {
        "id": 3,
        "name": "المسح الضوئي الرقمي (3D Intra-Oral Scanner)",
        "short_desc": "أخذ مقاسات الأسنان بدقة ميكرونية عبر الماسح الرقمي ثلاثي الأبعاد دون قوالب تقليدية.",
        "image_url": "https://backend-domain.com/uploads/services/scanner.jpg",
        "alt_image": "المسح الضوئي الرقمي",
        "order": 3
      },
      {
        "id": 4,
        "name": "علاج الجذور والتركيبات الثابتة (Endodontics & Crowns)",
        "short_desc": "معالجة دقيقة للجذور وتيجان زركونيا متينة عبر الماسح الرقمي.",
        "image_url": "https://backend-domain.com/uploads/services/roots.jpg",
        "alt_image": "علاج الجذور والتركيبات",
        "order": 4
      }
    ],

    "step_by_step_execution": [
      {
        "id": 1,
        "step_number": "01",
        "title": "الفحص والتشخيص الرقمي الدقيق",
        "description": "فحص شامل مجهري وبالأشعة لتقييم صحة اللثة وبنية السن وتحديد خطة العلاج.",
        "icon_key": "search"
      },
      {
        "id": 2,
        "step_number": "02",
        "title": "العزل الكامل Rubber Dam وتطبيق البروتوكول",
        "description": "عزل السن تماماً لضمان بيئة عمل معقمة ومانعة للبكتيريا بنسبة 100%.",
        "icon_key": "shield"
      },
      {
        "id": 3,
        "step_number": "03",
        "title": "العلاج الميكروني وترميم السن الطبيعي",
        "description": "إزالة التسوس بدقة مجهرية وبناء السن بطبقات متوافقة حيوياً.",
        "icon_key": "layers"
      },
      {
        "id": 4,
        "step_number": "04",
        "title": "المسح ثلاثي الأبعاد والتسليم النهائي",
        "description": "أخذ الطبعة الرقمية وتثبيت التركيبة مع ضبط الإطباق التام والتلميع النهائي.",
        "icon_key": "check"
      }
    ],

    "standards": [
      {
        "id": 1,
        "title": "الفحص المجهري واختبار حيوية العصب (Vitality Test)",
        "description": "تشخيص فائق الدقة لحالة العصب والسن قبل البدء لتحديد أقل خطة علاجية تدخلية ممكنة.",
        "icon_key": "plus"
      },
      {
        "id": 2,
        "title": "العزل المطاطي الشامل (Rubber Dam Isolation)",
        "description": "عزل السن تماماً عن لعاب وبكتيريا الفم لضمان أعلى مستويات التعقيم وقوة التصاق المواد الترميمية.",
        "icon_key": "user"
      },
      {
        "id": 3,
        "title": "المسح الضوئي الرقمي (3D Intra-Oral Scanner)",
        "description": "أخذ مقاسات الأسنان بدقة ميكرونية عبر كاميرا رقمية متطورة دون الحاجة للمعجون والمقاسات التقليدية المزعجة.",
        "icon_key": "card"
      },
      {
        "id": 4,
        "title": "جلسة هادئة ومخصصة (ساعة كاملة لكل مريض)",
        "description": "لا تسرع ولا ازدحام — نمنح كل مريض الوقت الكافي لتحقيق أدق التفاصيل التشريحية والجمالية للسن.",
        "icon_key": "clock"
      },
      {
        "id": 5,
        "title": "المتابعة والضمان طويل الأمد",
        "description": "جلسات مراجعة للتأكد من راحة الإطباق واستقرار الحشوات والتركيبات وصحة اللثة.",
        "icon_key": "target"
      }
    ],

    "quality_control": [
      {
        "id": 1,
        "title": "تعقيم أوتوكلاف طبي من الفئة B",
        "description": "تطبيق أعلى بروتوكولات مكافحة العدوى والتعقيم الأوروبي لكل أداة على حدة."
      },
      {
        "id": 2,
        "title": "استخدام خامات وترميمات أوروبية وأمريكية معتمدة",
        "description": "أفضل أنواع الكومبوزيت والسيراميك ذات المتانة العالية والخصائص البيولوجية المتوافقة."
      },
      {
        "id": 3,
        "title": "عزل بكتيري تام أثناء العمل",
        "description": "منع أي تلوث بكتيري للسن أثناء جلسة العلاج لضمان نجاح الحشو واستقرار العصب."
      },
      {
        "id": 4,
        "title": "فحص الإطباق الدقيق والملمس الطبيعي",
        "description": "صقل وتلميع مجهري للأسنان لضمان الراحة التامة ومحاكاة مظهر السن الأصلي."
      }
    ],

    "risk_prevention": [
      {
        "id": 1,
        "title": "الحفاظ على السن الطبيعي ومنع البرد الجائر"
      },
      {
        "id": 2,
        "title": "تغطية العصب وتفادي علاج الجذور غير الضروري"
      },
      {
        "id": 3,
        "title": "مقاسات رقمية بدون طبعات معجونية تسبب الغثيان"
      },
      {
        "id": 4,
        "title": "مواعيد محددة بدقة وراحة تامة بدون انتظار"
      }
    ]
  }
}
```

---

### 🟢 2. معرض الحالات وقبل/بعد (Cases & Before-After API):

#### Endpoint: `GET /api/{lang}/cases` (أو `GET /api/{lang}/projects`)

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "إعادة بناء وترميم الأسنان الأمامية",
      "category": "العلاج التحفظي",
      "type": "حشوات تجميلية كمبوزيت مجهرية",
      "short_desc": "معالجة التآكل وتوحيد اللون بدون برد للسن الطبيعي باستخدام أحدث تقنيات الطبقات النانوية.",
      "long_desc": "تمت معالجة الحالة خلال جلسة واحدة مخصصة بالعزل المطاطي الكامل، مع الحفاظ على حيوية الأسنان وإعادتها لمظهرها الطبيعي.",
      "location": "العيادة الرئيسية - التجمع",
      "date": "2025",
      "area": "4 قواطع أمامية",
      "client": "حالة علاجية",
      "thumbnail_url": "https://backend-domain.com/uploads/cases/case-1-thumb.jpg",
      "before_image_url": "https://backend-domain.com/uploads/cases/case-1-before.jpg",
      "after_image_url": "https://backend-domain.com/uploads/cases/case-1-after.jpg",
      "badges": [
        "عزل مطاطي كامل (Rubber Dam)",
        "بدون برد جائر للسن",
        "حشوات نانو تجميلية متطورة",
        "جلسة مخصصة 60 دقيقة"
      ],
      "gallery_images": [
        { "id": 1, "image_url": "https://backend-domain.com/uploads/cases/case-1-img-1.jpg" },
        { "id": 2, "image_url": "https://backend-domain.com/uploads/cases/case-1-img-2.jpg" }
      ]
    }
  ]
}
```

---

### 🟢 3. حجز موعد والتواصل (Appointment Booking API):

#### Endpoint: `POST /api/appointments` أو `POST /api/contact`

**Request Body (JSON)**:
```json
{
  "name": "أحمد محمود",
  "phone": "+201012345678",
  "email": "ahmed@example.com",
  "service_id": 1,
  "preferred_date": "2026-10-15",
  "preferred_time": "evening",
  "notes": "استشارة بخصوص فينير الأسنان وتعديل الفراغات."
}
```

**Response (JSON)**:
```json
{
  "success": true,
  "message": "تم استلام طلب الحجز بنجاح، سيقوم فريق العيادة بالتواصل معك لتأكيد الموعد."
}
```

---

## 🗄️ 3. الجداول المقترحة في قاعدة البيانات (Database Schema Overview)

1. **`clinic_settings`**: يحتوي على بيانات التواصل، ساعات العمل، اسم الطبيب، السوشيال ميديا.
2. **`hero_slides` / `hero_section`**: يحتوي على نصوص الهيرو، الإحصائيات، والصورة الرئيسية.
3. **`services`**: جدول الخدمات (الاسم، الوصف المختصر، الأيقونة/الصورة، الترتيب).
4. **`cases` (الحالات قبل وبعد)**: يحتوي على صور قبل وبعد، التصنيف، الوصف، والمميزات.
5. **`case_images`**: الصور الإضافية لكل حالة داخل المعرض.
6. **`execution_steps`**: خطوات العلاج مرحلة بمرحلة (الرقم، العنوان، الوصف).
7. **`clinical_standards`**: معايير الجودة والأجهزة (العنوان، الشرح، الأيقونة).
8. **`appointments`**: سجل الحجوزات الواردة من المرضى مع إمكانية إدارة حالتها (Pending, Confirmed, Completed).
