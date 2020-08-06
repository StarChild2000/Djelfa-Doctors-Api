const Doctor = require('../models/DoctorModel');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' })

mongoose
    .connect(process.env.DATABASE_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(console.log('DB Connected Succesfully'))
    .catch((err) => {
        console.log(err);
        process.exit(1);
    });

const doctors = [
    {
        "name": "خير الدين منصور",
        "speciality": "general",
        "coordinates": ["34.670185", "3.249006"],
        "gender": "male",
        "adress": "العنوان : حي بن جرمة بجوار حمام الحرفة 67/331",
        "phone": ["0559190213"],
        "description": "طب عام"
    },
    {
        "name": "بورحلة محمد إلياس",
        "speciality": "general",
        "coordinates": ["34.675929", "3.246370"],
        "gender": "male",
        "adress": "حي بن عزيز 74",
        "phone": ["0551360857"],
        "description": "طب عام"
    },
    {
        "name": "العمري الحسن",
        "speciality": "general",
        "coordinates": ["34.667978", "3.247079"],
        "gender": "male",
        "adress": "حي بن جرمة بناية 15/375",
        "phone": ["027871418"],
        "description": "طب عام"
    },
    {
        "name": "بن حدة .س",
        "speciality": "general",
        "coordinates": ["34.674702", "3.266284"],
        "gender": "female",
        "adress": "حي بن تيبة بجوار صيدلية حاجي",
        "phone": ["0540286663"],
        "description": "طب عام"
    },
    {
        "name": "عزي بوعلام",
        "speciality": "general",
        "coordinates": ["34.661563", "3.274324"],
        "gender": "male",
        "adress": "حي 5 جويلية مقابل سوق الفلاح بناية 38/785",
        "phone": ["0672694263", "027915022"],
        "description": "طب عام"
    },
    {
        "name": "الأخذاري فيصل",
        "speciality": "general",
        "coordinates": ["34.659213", "3.273857"],
        "gender": "male",
        "adress": "حي 5 جويلية بجوار المركز التجاري جواف عمارة 14",
        "phone": ["0672694263", "027915022"],
        "description": "طب عام"
    },
    {
        "name": "موفق أحمد",
        "speciality": "general",
        "coordinates": ["34.657580", "3.270339"],
        "gender": "male",
        "adress": "حي الحدائق عمارة 05/29",
        "phone": ["0665100056", "027911313"],
        "description": "طب عام"
    },
    {
        "name": "حبيب .ع",
        "speciality": "general",
        "coordinates": ["34.679835", "3.271639"],
        "gender": "male",
        "adress": "حي سليمان عميرات بجوار مسجد سيدي نايل",
        "phone": ["027913573"],
        "description": "طب عام"
    },
    {
        "name": 'بداوي خديجة',
        "speciality": "gyneco",
        "coordinates": ["34.673452", "3.247076"],
        "gender": "female",
        "adress": "حي باب الشارف 13/179 بجوار مدرسة حنيشي الشمالية",
        "phone": ["027933285", "0560198815"],
        "description": "أمراض النساء "
    },
    {
        "name": 'نايش نصيرة',
        "speciality": "gyneco",
        "coordinates": ["34.679835", "3.271639"],
        "gender": "female",
        "adress": "حي سليمان عميرات بجوار مسجد سيدي نايل",
        "phone": ["0794369221"],
        "description": "أمراض النساء "
    },
    {
        "name": 'عزوزي محمد',
        "speciality": "gyneco",
        "coordinates": ["34.670517", "3.236033"],
        "gender": "male",
        "adress": "حي عين الشيح 05/852",
        "phone": ["0660613161"],
        "description": "أمراض النساء "
    },
    {
        "name": 'يونسي عمار',
        "speciality": "gyneco",
        "coordinates": ["34.661904", "3.246642"],
        "gender": "male",
        "adress": "حي بربيح خلف إقامة الإناث",
        "phone": ["0771242577"],
        "description": "أمراض النساء "
    },
    {
        "name": 'غلاب .س.ز',
        "speciality": "gyneco",
        "coordinates": ["34.670070", "3.248642"],
        "gender": "female",
        "adress": "حي بن جرمة",
        "phone": ["0668123963"],
        "description": "أمراض النساء "
    },
    {
        "name": 'خير الناس براهيم',
        "speciality": "gyneco",
        "coordinates": ["34.667363", "3.250207"],
        "gender": "male",
        "adress": "حي بن جرمة 5/489",
        "phone": ["027938672"],
        "description": "أمراض النساء "
    },
    {
        "name": 'لحرش حسيبة',
        "speciality": "gyneco",
        "coordinates": ["34.670821", "3.256250"],
        "gender": "female",
        "adress": "حي السعادات 29/320 بجوار المسجد",
        "phone": ["0668123963"],
        "description": "أمراض النساء "
    },
    {
        "name": 'زمار خالد',
        "speciality": "gyneco",
        "coordinates": ["34.671849", "3.256567"],
        "gender": "male",
        "adress": "حي السعادات بجوار القطاع العسكري",
        "phone": ["027900788"],
        "description": "أمراض النساء "
    },
    {
        "name": 'بن جدو باديس',
        "speciality": "gyneco",
        "coordinates": ["34.677835", "3.262327"],
        "gender": "male",
        "adress": "حي بلغزال 15/867 بجانب ميدان سباق الخيل",
        "phone": ["0559096605"],
        "description": "أمراض النساء "
    },
    {
        "name": "تونسي نورة",
        "speciality": "gyneco",
        "coordinates": ["34.662909", "3.250087"],
        "gender": "female",
        "adress": "حي النعاس 23/468",
        "phone": ["0790019072"],
        "description": "أمراض النساء "
    },
    {
        "name": "حبيب .ن",
        "speciality": "general",
        "coordinates": ["34.664908", "3.245989"],
        "gender": "female",
        "adress": "boulevard 8 حي بربيح عند مفترق الطرق",
        "phone": ["0551254274"],
        "description": "طب عام"
    },
    {
        "name": "تريكي مصطفى",
        "speciality": "general",
        "coordinates": ["34.661945", "3.254544"],
        "gender": "male",
        "adress": "رقم 171 H حي شيقيفارة عمارة",
        "phone": [],
        "description": "طب عام"
    },
    {
        "name": "عثماني مراد",
        "speciality": "general",
        "coordinates": ["34.678668", "3.244720"],
        "gender": "male",
        "adress": "حي الضاية بجوار الحماية المدنية",
        "phone": ["0698759240"],
        "description": "طب عام"
    },
    {
        "name": "بشار كريم",
        "speciality": "dermato",
        "coordinates": ["34.667976", "3.259206"],
        "gender": "male",
        "adress": "حي المسجد الجديد بجوار وكالة شيفرولي",
        "phone": ["027937189"],
        "description": "أمراض الجلد"
    },
    {
        "name": "حمر العين .ن",
        "speciality": "dermato",
        "coordinates": ["34.673487", "3.248158"],
        "gender": "female",
        "adress": "حي باب الشارف مقابل مسجد بن دنيدينة بجوار دار البارود",
        "phone": ["0551998040"],
        "description": "أمراض الجلد"
    },
    {
        "name": "حنيشي محمد",
        "speciality": "neuro",
        "coordinates": ["34.667179", "3.253924"],
        "gender": "male",
        "adress": "حي المستشفى بجانب الخزينة العمومية",
        "phone": ["0794368282", "027937818"],
        "description": "أمراض الأعصاب"
    },
    {
        "name": "عراشي جمال",
        "speciality": "neuro",
        "coordinates": ["34.664029", "3.244180"],
        "gender": "male",
        "adress": "حي بربيح 7/873",
        "phone": ["027875812"],
        "description": "أمراض الأعصاب"
    },
    {
        "name": "بهلول عبد النور",
        "speciality": "neuro",
        "coordinates": ["34.663940", "3.259535"],
        "gender": "male",
        "adress": "حي شعباني عند مفترق الطرق",
        "phone": ["0550851384"],
        "description": "أمراض الأعصاب"
    },
    {
        "name": "حيسونة موسى",
        "speciality": "neuro",
        "coordinates": ["34.663383", "3.249950"],
        "gender": "male",
        "adress": "حي النعاس بجوار مسجد بلال بن رباح",
        "phone": ["0699297117", "027925858"],
        "description": "أمراض الأعصاب"
    },
    {
        "name": "بوخلخال سهام",
        "speciality": "neuro",
        "coordinates": ["34.659213", "3.273857"],
        "gender": "female",
        "adress": "حي 5 جويلية بالقرب من بزار رياض الفتح عمارة 543",
        "phone": ["0666799498"],
        "description": "أمراض الأعصاب"
    },
    {
        "name": "ميلود .ل",
        "speciality": "orl",
        "coordinates": ["34.682571", "3.267995"],
        "gender": "male",
        "adress": "حي بلغزال بجوار سوق دبي",
        "phone": ["0557401398"],
        "description": "أمراض الأنف و الحنجرة و الرأس"
    },
    {
        "name": "باباسي مراد",
        "speciality": "orl",
        "coordinates": ["34.677537", "3.250802"],
        "gender": "male",
        "adress": "حي محمد بوضياف عمارة 64",
        "phone": ["0779063378"],
        "description": "أمراض الأنف و الحنجرة و الرأس"
    },
    {
        "name": "بن دكن بو حفص",
        "speciality": "orl",
        "coordinates": ["34.667422", "3.254624"],
        "gender": "male",
        "adress": "حي قناني مقابل محافظة السهوب",
        "phone": ["0781990352", "027937706"],
        "description": "أمراض الأنف و الحنجرة و الرأس"
    },
    {
        "name": "بوسنة فريد",
        "speciality": "orl",
        "coordinates": ["34.662597", "3.265750"],
        "gender": "male",
        "adress": "حي شعباني مقابل مستشفى الأم و الطفل",
        "phone": ["027936516"],
        "description": "أمراض الأنف و الحنجرة و الرأس"
    },
    {
        "name": "حناشي امعمر",
        "speciality": "pediatre",
        "coordinates": ["34.679352", "3.264904"],
        "gender": "male",
        "adress": "حي بوتريفيس بجانب محطة الوقود",
        "phone": ["0668852621"],
        "description": "أمراض الأطفال"
    },
    {
        "name": "زياني صلاح الدين",
        "speciality": "pediatre",
        "coordinates": ["34.673681", "3.248593"],
        "gender": "male",
        "adress": "شارع سيدي نايل 99/129",
        "phone": ["0560202772"],
        "description": "أمراض الأطفال"
    },
    {
        "name": "كلام كمال",
        "speciality": "pediatre",
        "coordinates": ["34.672635", "3.244928"],
        "gender": "male",
        "adress": "حي باب الشارف",
        "phone": ["0771558267", "027933211"],
        "description": "أمراض الأطفال"
    },
    {
        "name": "دخينيسة محمد",
        "speciality": "pediatre",
        "coordinates": ["34.664823", "3.249907"],
        "gender": "male",
        "adress": "حي بربيح بجانب سوق السيارات",
        "phone": ["027873778"],
        "description": "أمراض الأطفال"
    },
    {
        "name": "لغراب سليم",
        "speciality": "pediatre",
        "coordinates": ["34.663092", "3.251043"],
        "gender": "male",
        "adress": "حي النعاس عند صيدلية حريزي",
        "phone": ["0772123418"],
        "description": "أمراض الأطفال"
    },
    {
        "name": "يحياوي مراد",
        "speciality": "pediatre",
        "coordinates": ["34.666740", "3.250211"],
        "gender": "male",
        "adress": "حي قناني 13/485 بالقرب من مسجد أبي ذر الغفاري",
        "phone": ["0542713104"],
        "description": "أمراض الأطفال"
    },
    {
        "name": "طالب عبد الكريم",
        "speciality": "pediatre",
        "coordinates": ["34.671435", "3.249980"],
        "gender": "male",
        "adress": "وسط المدينة بجوار صيدلية حميدة",
        "phone": ["0667850026"],
        "description": "أمراض الأطفال"
    },
    {
        "name": "حران محمد",
        "speciality": "pediatre",
        "coordinates": ["34.669568", "3.253875"],
        "gender": "male",
        "adress": "حي المستشفى بالقرب من مركز التكوين الشبه الطبي",
        "phone": ["027914384"],
        "description": "أمراض الأطفال"
    },
    {
        "name": "بن موسى سفيان",
        "speciality": "pediatre",
        "coordinates": ["34.665345", "3.256573"],
        "gender": "male",
        "adress": "حي المسجد الجديد بجوار مفترق الطرق رويني",
        "phone": ["0551072591"],
        "description": "أمراض الأطفال"
    },
    {
        "name": "محي الدين الهاشمي",
        "speciality": "neuro",
        "coordinates": ["34.670326", "3.254275"],
        "gender": "male",
        "adress": "حي المستشفى مقابل مركز التكوين الشبه الطبي",
        "phone": ["0541562262"],
        "description": "أمراض الأعصاب"
    },
    {
        "name": "عمارة .أ",
        "speciality": "general",
        "coordinates": ["34673380", "3.246105"],
        "gender": "female",
        "adress": "حي باب الشارف",
        "phone": ["0771889612"],
        "description": "طب عام"
    },
    {
        "name": "عروي مصطفى كمال",
        "speciality": "general",
        "coordinates": ["34.666391", "3.250895"],
        "gender": "male",
        "adress": "حي قناني بجوار مسجد ابي ذر الغفاري",
        "phone": ["0550885594"],
        "description": "طب عام"
    },
    {
        "name": "خالدي عبد الكريم",
        "speciality": "gyneco",
        "coordinates": ["34.660572", "3.259446"],
        "gender": "male",
        "adress": "عيادة المروج الطبية",
        "phone": ["027936055", "0771475486"],
        "description": "أمراض النساء"
    },
    {
        "name": "سيجري منير",
        "speciality": "cardio",
        "coordinates": ["34.678355", "3.259130"],
        "gender": "male",
        "adress": "حي بوضياف عمارة رقم 1",
        "phone": ["027923535", "0771163189"],
        "description": "أمراض القلب"
    },
    {
        "name": "طالبي محمد",
        "speciality": "cardio",
        "coordinates": ["34.670084", "3.252015"],
        "gender": "male",
        "adress": "حي المستشفى مقابل المجلس الولائي",
        "phone": ["0551489426"],
        "description": "أمراض القلب"
    },
    {
        "name": "عايدي مختار",
        "speciality": "cardio",
        "coordinates": ["34.671652", "3.257533"],
        "gender": "male",
        "adress": "حي الفلاح بيروعرب",
        "phone": ["0559662107"],
        "description": "أمراض القلب"
    },
    {
        "name": "عيسو إبراهيم",
        "speciality": "cardio",
        "coordinates": ["34.661983", "3.265433"],
        "gender": "male",
        "adress": "حي شعباني مقابل مستشفى الأم و الطفل",
        "phone": ["0793785063", "027874135"],
        "description": "أمراض القلب"
    },
    {
        "name": "ماضي يوسف",
        "speciality": "pediatre",
        "coordinates": ["34.664047", "3.266456"],
        "gender": "male",
        "adress": "حي شعباني بجوار مستشفى الأم و الطفل",
        "phone": ["0551563467", "0668722174"],
        "description": "أمراض الأطفال"
    },
    {
        "name": "محند أعمر .ن",
        "speciality": "nephro",
        "coordinates": ["34.664445", "3.263820"],
        "gender": "male",
        "adress": "حي شعباني بجوار مستشفى الأم و الطفل",
        "phone": ["0559705566"],
        "description": "أمراض الكلى"
    },
    {
        "name": "بلقماري .ع",
        "speciality": "nephro",
        "coordinates": ["34.664197", "3.252724"],
        "gender": "female",
        "adress": "حي شيقيفارا بناية 2 باب 12",
        "phone": ["027925180", "0552765490"],
        "description": "أمراض الكلى"
    },
    {
        "name": "بختي .ع",
        "speciality": "nephro",
        "coordinates": ["34.663257", "3.251315"],
        "gender": "male",
        "adress": "حي النعاس طريق التكوين المهني",
        "phone": ["0698987370"],
        "description": "أمراض الكلى"
    },
    {
        "name": "سبتي ناجي",
        "speciality": "nephro",
        "coordinates": ["34.670009", "3.248597"],
        "gender": "male",
        "adress": "حي بن جرمة بالقرب من السوق المغطاة",
        "phone": ["0661566024", "027938550"],
        "description": "أمراض الكلى"
    },
    {
        "name": "بوسهلة .ر",
        "speciality": "nephro",
        "coordinates": ["34.671068", "3.252140"],
        "gender": "male",
        "adress": "حي المستشفى بجانب المجلس الولائي",
        "phone": ["027922992", "0661682901"],
        "description": "أمراض الكلى"
    },
    {
        "name": "بن بلعيش سليم",
        "speciality": "radio",
        "coordinates": ["34.677406", "3.251082"],
        "gender": "male",
        "adress": "حي بوضياف عمارة رقم 4",
        "phone": [],
        "description": "التصوير بالأشعة"
    },
    {
        "name": "يونسي عماد",
        "speciality": "radio",
        "coordinates": ["34.664461", "3.251010"],
        "gender": "male",
        "adress": "حي بربيح طريق التكوين المهني",
        "phone": ["027902237"],
        "description": "التصوير بالأشعة"
    },
    {
        "name": "رعاف مهدي",
        "speciality": "radio",
        "coordinates": ["34.662893", "3.250480"],
        "gender": "male",
        "adress": "حي النعاس بجوار صيدلية حريزي",
        "phone": ["027925730", "0557523873"],
        "description": "التصوير بالأشعة"
    },
    {
        "name": "طارق محمد سعيد",
        "speciality": "radio",
        "coordinates": ["34.666018", "3.255866"],
        "gender": "male",
        "adress": "حي المسجد الجديد 18/479 بجوار وكالة شيفرولي",
        "phone": ["027873261"],
        "description": "التصوير بالأشعة"
    },
    {
        "name": "رزايقية .ع",
        "speciality": "radio",
        "coordinates": ["34.663972", "3.259822"],
        "gender": "male",
        "adress": "حي شعباني عند مفترق الطرق",
        "phone": ["0698173317"],
        "description": "التصوير بالأشعة"
    },
    {
        "name": "زرمان زكية",
        "speciality": "radio",
        "coordinates": ["34.664007", "3.265081"],
        "gender": "female",
        "adress": "حي شعباني مقابل مستشفى الأم و الطفل",
        "phone": ["027936328", "0559161827"],
        "description": "التصوير بالأشعة"
    },
    {
        "name": "رحالي الطاهر",
        "speciality": "ophta",
        "coordinates": ["34.677406", "3.251082"],
        "gender": "male",
        "adress": "حي بوضياف عمارة رقم 4",
        "phone": [],
        "description": "أمراض العين"
    },
    {
        "name": "الحاج عيسى إبراهيم",
        "speciality": "ophta",
        "coordinates": ["34.665739", "3.255934"],
        "gender": "male",
        "adress": "حي المسجد الجديد 5/243",
        "phone": ["027873495", "0666026600"],
        "description": "أمراض العين"
    },
    {
        "name": "اسماوي مصطفى",
        "speciality": "ophta",
        "coordinates": ["34.662358", "3.262435"],
        "gender": "male",
        "adress": "حي شعباني بجوار مركز الضرائب",
        "phone": ["027936305", "0559152111"],
        "description": "أمراض العين"
    },
    {
        "name": "بوصوار عمر",
        "speciality": "ophta",
        "coordinates": ["34.686711", "3.185609"],
        "gender": "male",
        "adress": "حي عين السرار",
        "phone": ["0777701954"],
        "description": "أمراض العين"
    },
    {
        "name": "حاشي جلول",
        "speciality": "cardio",
        "coordinates": ["34.663711", "3.250107"],
        "gender": "male",
        "adress": "حي بربيح",
        "phone": ["0553430093"],
        "description": "أمراض القلب"
    },
    {
        "name": "بن الأطرش .م",
        "speciality": "ophta",
        "coordinates": ["34.660572", "3.259446"],
        "gender": "male",
        "adress": "مصلحة المروج",
        "phone": ["027936055", "0771475486"],
        "description": "أمراض العين"
    },
    {
        "name": "لهطيل .ر",
        "speciality": "pediatre",
        "coordinates": ["34.659076", "3.273457"],
        "gender": "male",
        "adress": "حي 5 جويلية المركز التجاري جواف",
        "phone": ["0550506625"],
        "description": "أمراض الأطفال"
    },
    {
        "name": "كشيدة محمد",
        "speciality": "pneumo",
        "coordinates": ["34.671879", "3.248540"],
        "gender": "male",
        "adress": "حي باب الشارف 06/427 مقابل ملعب شبيرة",
        "phone": ["027879336"],
        "description": "أمراض الصدر و الحساسية"
    },
    {
        "name": "حاكم .أ",
        "speciality": "pneumo",
        "coordinates": ["34.665846", "3.248516"],
        "gender": "female",
        "adress": "حي بربيح بجوار بنك الجزائر الخارجي",
        "phone": ["0558602766"],
        "description": "أمراض الصدر و الحساسية"
    },
    {
        "name": "حمرون حسينة",
        "speciality": "pneumo",
        "coordinates": ["34.666736", "3.257880"],
        "gender": "female",
        "adress": "حي المسجد الجديد 81/330",
        "phone": ["027937500"],
        "description": "أمراض الصدر و الحساسية"
    },
    {
        "name": "بجقينة .س",
        "speciality": "pneumo",
        "coordinates": ["34.661802", "3.263766"],
        "gender": "female",
        "adress": "حي شعباني مقابل ثانوية طهيري عبد الرحمان",
        "phone": ["027920122", "0551500635"],
        "description": "أمراض الصدر و الحساسية"
    },
    {
        "name": "زعيميني محمد",
        "speciality": "rhumato",
        "coordinates": ["34.665846", "3.248516"],
        "gender": "male",
        "adress": "حي بربيح بجوار بنك الجزائر الخارجي",
        "phone": ["0655938195", "0558602766"],
        "description": "أمراض العظام و المفاصل"
    },
    {
        "name": "بن عبد الله باحمد",
        "speciality": "rhumato",
        "coordinates": ["34.662458", "3.250145"],
        "gender": "male",
        "adress": "حي النعاس بجانب البريد",
        "phone": ["0771307591"],
        "description": "أمراض العظام و المفاصل"
    },
    {
        "name": "بن مسعود محمد",
        "speciality": "rhumato",
        "coordinates": ["34.666844", "3.257203"],
        "gender": "male",
        "adress": "حي المسجد الجديد شارع البنك",
        "phone": ["0549183899"],
        "description": "أمراض العظام و المفاصل"
    },
    {
        "name": "قسمي نعيمة",
        "speciality": "rhumato",
        "coordinates": ["34.649625", "3.264894"],
        "gender": "female",
        "adress": "حي البساتين بالقرب من مديرية الصحة",
        "phone": ["0771084121"],
        "description": "أمراض العظام و المفاصل"
    },
    {
        "name": "الأندلسي",
        "speciality": "rhumato",
        "coordinates": ["34.659151", "3.274116"],
        "gender": "male",
        "adress": "حي 5 جويلية المركز التجاري جواف",
        "phone": ["0560340406"],
        "description": "أمراض العظام و المفاصل"
    },
    {
        "name": "أوسعيد مولود",
        "speciality": "rhumato",
        "coordinates": ["34.662031", "3.273138"],
        "gender": "male",
        "adress": "حي 5 جويلية بالقرب من إبتدائية أحمد بن علي",
        "phone": ["0697080660"],
        "description": "أمراض العظام و المفاصل"
    },
    {
        "name": "بونوة فريد",
        "speciality": "rhumato",
        "coordinates": ["34.672058", "3.266730"],
        "gender": "male",
        "adress": "حي بن تيبة بالقرب من مسجد الهداية",
        "phone": ["0556890702"],
        "description": "أمراض العظام و المفاصل"
    },
    {
        "name": "شويحة مختار",
        "speciality": "rhumato",
        "coordinates": ["34.669801", "3.252618"],
        "gender": "male",
        "adress": "حي المستشفى بناية 160 وراء المستشفى القديم",
        "phone": ["0774355341"],
        "description": "أمراض العظام و المفاصل"
    },
    {
        "name": "بوخلخال زكرياء",
        "speciality": "rhumato",
        "coordinates": ["34.664928", "3.251146"],
        "gender": "male",
        "adress": "حي شيقيفارة عند مفترق الطرق",
        "phone": ["0675306078"],
        "description": "أمراض العظام و المفاصل"
    },
    {
        "name": "مخلوفي الأندلسي",
        "speciality": "intern",
        "coordinates": ["34.659151", "3.274116"],
        "gender": "female",
        "adress": "حي 5 جويلية المركز التجاري جواف",
        "phone": ["0557656990"],
        "description": "أمراض داخلية"
    },
    {
        "name": "منصوري .و",
        "speciality": "intern",
        "coordinates": ["34.682325", "3.267300"],
        "gender": "female",
        "adress": "حي بلغزال بالقرب من مسجد عمار بن ياسر",
        "phone": ["0560105094"],
        "description": "أمراض داخلية"
    },
    {
        "name": "بلحرش .ك",
        "speciality": "intern",
        "coordinates": ["34.682325", "3.267300"],
        "gender": "female",
        "adress": "حي بلغزال بالقرب من مسجد عمار بن ياسر",
        "phone": ["0780251105"],
        "description": "أمراض داخلية"
    },
    {
        "name": "كراش .ف",
        "speciality": "intern",
        "coordinates": ["34.682194", "3.266437"],
        "gender": "female",
        "adress": "حي بلغزال بالقرب من مسجد عمار بن ياسر",
        "phone": ["0791457100"],
        "description": "أمراض داخلية"
    },
    {
        "name": "السعودي .ع",
        "speciality": "intern",
        "coordinates": ["34.674454", "3.247821"],
        "gender": "male",
        "adress": "حي باب الشارف مقابل النقل الحضري لعين الشيح",
        "phone": ["027930297", "0559131385"],
        "description": "أمراض داخلية"
    },
    {
        "name": "قزران سالم",
        "speciality": "intern",
        "coordinates": ["34.673802", "3.248999"],
        "gender": "male",
        "adress": "شارع سيدي نايل بالقرب من النقل الحضري لبربيح",
        "phone": ["0555427560"],
        "description": "أمراض داخلية"
    },
    {
        "name": "قيت شوقي",
        "speciality": "intern",
        "coordinates": ["34.666275", "3.256411"],
        "gender": "male",
        "adress": "حي المسجد الجديد بناية 321",
        "phone": ["027900925", "0559283245"],
        "description": "أمراض داخلية"
    },
    {
        "name": "بوزيدي مصطفى",
        "speciality": "intern",
        "coordinates": ["34.661163", "3.264223"],
        "gender": "male",
        "adress": "حي شعباني مقابل ثانوية طهيري",
        "phone": ["0554200649"],
        "description": "أمراض داخلية"
    },
    {
        "name": "عشاب محمد العربي",
        "speciality": "sergeon",
        "coordinates": ["34.664445", "3.263820"],
        "gender": "male",
        "adress": "حي شعباني بالقرب من مستشفى الأم و الطفل",
        "phone": ["0668131151"],
        "description": "جراحة عامة"
    },
    {
        "name": "بن لمان .ج",
        "speciality": "sergeon",
        "coordinates": ["34.674334", "3.272950"],
        "gender": "male",
        "adress": "حي المستقبل 612/156",
        "phone": ["0669767309", "0550689849"],
        "description": "جراحة عامة"
    },
    {
        "name": "مايدي محمد",
        "speciality": "sergeon",
        "coordinates": ["34.661617", "3.274582"],
        "gender": "male",
        "adress": "حي 5 جويلية عمارة 37/761 ",
        "phone": ["07776666660"],
        "description": "جراحة عامة"
    },
    {
        "name": "توادرت علي",
        "speciality": "sergeon",
        "coordinates": ["34.660948", "3.273232"],
        "gender": "male",
        "adress": "حي 5 جويلية مقابل الفرع البلدي",
        "phone": ["0773111303", "0550623018"],
        "description": "جراحة عامة"
    },
    {
        "name": "الأحرش حمزة",
        "speciality": "sergeon",
        "coordinates": ["34.664272", "3.261529"],
        "gender": "male",
        "adress": "حي شعباني بالقرب من مسجد عمر بن عبد العزيز",
        "phone": ["027903110"],
        "description": "جراحة عامة"
    },
    {
        "name": "مريان .ب",
        "speciality": "sergeon",
        "coordinates": ["34.667819", "3.264448"],
        "gender": "male",
        "adress": "حي المستقبل بالقرب من مقر الدائرة",
        "phone": ["0771140614"],
        "description": "جراحة عامة"
    },
    {
        "name": "حزرلاوي رمضان",
        "speciality": "sergeon",
        "coordinates": ["34.664767", "3.250489"],
        "gender": "male",
        "adress": "حي النعاس بناية 13/471",
        "phone": ["0661642952"],
        "description": "جراحة عامة"
    },
    {
        "name": "بن الأحرش عبد الكريم",
        "speciality": "sergeon",
        "coordinates": ["34.664672", "3.249648"],
        "gender": "male",
        "adress": "حي النعاس بناية 19/471",
        "phone": ["027879749"],
        "description": "جراحة عامة"
    },
    {
        "name": "غلاب .م",
        "speciality": "intern",
        "coordinates": ["34.672693", "3.249038"],
        "gender": "male",
        "adress": "حي باب الشارف قرب دار البارود",
        "phone": ["0551815578"],
        "description": "أمراض داخلية"
    }
]

const uploadData = async () => {
    try {
        await Doctor.create(doctors);
        console.log('Data Uploaded !');
        process.exit(1);
    } catch (err) {
        console.error(err)
    }
}

const deleteData = async () => {
    try {
        await Doctor.deleteMany();
        console.log('Data Deleted !');
        process.exit(1);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

if (process.argv[2] === '--import') {
    uploadData()
} else if (process.argv[2] === '--delete') {
    deleteData()
}