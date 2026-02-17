import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, MapPin, Phone, Mail, Send, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * TITAN JOY VIP - Luxury Beauty Clinic Website
 * Design Philosophy: Premium, luxurious, elegant aesthetic with warm gold/pink tones
 * Typography: Bold headers with elegant body text, Arabic-optimized
 * Color Palette: Dark background (#030303), Pink/Orange gradients (#FF0080 to #FF8C00), White accents
 * Animations: Smooth micro-interactions, scroll-triggered reveals, hover effects
 */

const HERO_IMAGE = "https://private-us-east-1.manuscdn.com/sessionFile/95fSCDVILBjB0N0rBZ7UBi/sandbox/XthBtkG5HL6MJGAvS3KE75-img-1_1770877145000_na1fn_aGVyby1iYW5uZXI.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvOTVmU0NEVklMQmpCME4wckJaN1VCaS9zYW5kYm94L1h0aEJ0a0c1SEw2TUpHQXZTM0tFNzUtaW1nLTFfMTc3MDg3NzE0NTAwMF9uYTFmbl9hR1Z5YnkxaVlXNXVaWEkucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Pv0rmlBCx9-i18XKNpgonvyzMx5Nrnk0pCXEsoVFSiNX7MgI6bhYlJDm4GuEBwU5El41MTmlJ26fdf4llZ1JRY5ybBW3lxpmu5TDEj7xn0B5ARB13q2QvhWunMB30Qh1zLkX7xPU1iCMTgG1KNk71YjxmCnziAJZTMQu7J5Ou-nl3cgHX~pMvltOvOem-IABFWxFkSkXLv9aEHd5kgKB2JhMtu5sAn7LPnj-vqiCqcmH8~Yns35mset7b9Hd5Uf0PsK7H~YR8tgDdm81p7T-MEQIviGutXeuInkq1fH0F2kt1i7~vAexX83VJBmVIQxtjrPQcB037qGiznzxN4VMkw__";

const BEFORE_AFTER_IMAGE = "https://private-us-east-1.manuscdn.com/sessionFile/95fSCDVILBjB0N0rBZ7UBi/sandbox/XthBtkG5HL6MJGAvS3KE75-img-2_1770877154000_na1fn_YmVmb3JlLWFmdGVyLTE.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvOTVmU0NEVklMQmpCME4wckJaN1VCaS9zYW5kYm94L1h0aEJ0a0c1SEw2TUpHQXZTM0tFNzUtaW1nLTJfMTc3MDg3NzE1NDAwMF9uYTFmbl9ZbVZtYjNKbExXRm1kR1Z5TFRFLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=IHKuOh-~DuyEJgtqUJ5ALx6A2ADKeOVrAvzUAiQTi0oANXjIwszfim5BGcuSgFM~TR5xtVNj8kaFA-yvMtLcubEEpYvWGHvHRYrWkvzVe9-e1LdFeTQd4PEOb~gqjgLiaMtg3AV-zfHr0i11FgttOzC0cI8nMZR7bppxcfJVV2gxvI5iqMzUpQ0bPhUURUDJFXLIWVYldasF6ESnQUVTxy8~twmeKzvGBD3RknEVLzfI2o6OLdAWo2g9BP2v9cL2kb-5vvBBOEbLnw9uW6MK-5i6LRCOdNbwgIYKGZ2~ijN2c2O-nx00Pw3AZbYVI7OUKvSwByQuXULeX4h-gzXqkg__";

const SERVICES = [
  {
    id: 1,
    name: "Laser Care",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/95fSCDVILBjB0N0rBZ7UBi/sandbox/XthBtkG5HL6MJGAvS3KE75-img-3_1770877152000_na1fn_bGFzZXItdHJlYXRtZW50.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvOTVmU0NEVklMQmpCME4wckJaN1VCaS9zYW5kYm94L1h0aEJ0a0c1SEw2TUpHQXZTM0tFNzUtaW1nLTNfMTc3MDg3NzE1MjAwMF9uYTFmbl9iR0Z6WlhJdGRISmxZWFJ0Wlc1MC5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=IIfgtY5e86Jx~jCuRqPodk6v8dFTMaXETk-g~27NTXR3QUNP0QXjuRTGqwx0iniY9I13p5-AzK6okzfgYDE2xR8m96ltPBV1kgjeVbEWbcsqfPElPS-8D8WjXcSJzqbskIu3h0AXVh9G2cPio7PGaeROxjS1gcxZ51c86TUkJJgNnfwCTAhQctaZZUSbmoOjiFByaSk78w2DYcHXjdYSGZ7Y5IZe8GLAJhMoxBoCS1Ee89vIM9jenq8AdkXoF5Ft4W2it9Rov~Mj2WskedXt7ptjJls5YrJ66y-15MqxkNfpEQcHc1U4syrR5kLNIpWH1FqfIY3XmrJR1Nt0gsWeCg__",
    description: "Advanced laser technology for skin rejuvenation and treatment"
  },
  {
    id: 2,
    name: "HydraFacial",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/95fSCDVILBjB0N0rBZ7UBi/sandbox/XthBtkG5HL6MJGAvS3KE75-img-4_1770877153000_na1fn_aHlkcmFmYWNpYWwtdHJlYXRtZW50.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvOTVmU0NEVklMQmpCME4wckJaN1VCaS9zYW5kYm94L1h0aEJ0a0c1SEw2TUpHQXZTM0tFNzUtaW1nLTRfMTc3MDg3NzE1MzAwMF9uYTFmbl9hSGxrY21GbVlXTnBZV3d0ZEhKbFlYUnRaVzUwLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=TJzI3FVI9GdcP40amFGyoAnOSH78usNZ0lT-U9QUfuMStsD8XuwtUyjHWLZ3gZN0xOqwHkkz4qEPpgPSfq0fMLwfpwGIrqb-2Gqc0arIx-fgkQQHuDT1G-ujNdJmSEJDr-NUxxnNL4YHE2WSMDtJE9bAKbB4rcM6lIYYdxgyWQPTxpASK8VVvpFblrUGzw53O-bZVxkhMG4ebdAymSkdh19Ctzbpm1N8pF5DtQfuR-sBXKA4fmDaCrj-C5MDMru-JgiEZ9niQWmbwoNQOhsYGxTAfuSOooHETkhoAbHPnGyWRVbu~0ZzC9MsjinmWtjr~6MrLH2alqlKhIR7-hhScg__",
    description: "Deep hydrating facial treatment for ultimate skin radiance"
  },
  {
    id: 3,
    name: "Skin Glow",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/95fSCDVILBjB0N0rBZ7UBi/sandbox/XthBtkG5HL6MJGAvS3KE75-img-5_1770877154000_na1fn_c2tpbi1nbG93LXJlc3VsdHM.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvOTVmU0NEVklMQmpCME4wckJaN1VCaS9zYW5kYm94L1h0aEJ0a0c1SEw2TUpHQXZTM0tFNzUtaW1nLTVfMTc3MDg3NzE1NDAwMF9uYTFmbl9jMnRwYmkxbmJHOTNMWEpsYzNWc2RITS5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Yn3b2Owfw14~QHOQiMFe3-lih7hIqdtMQj5m63BqhRuYLYUVud0bdw7xJXzMbh-Y1dHSMn53yq4kR8l1XEhqHyYbgWVc~l-RFKGC3EigOtlBOdqxdRICaLo9ADeGphFJZ~v6ntP7K5ChaPfhvgAY4NaJT~A6j1lLiF6YKZn2TIdjGgIVYBsWfr5Ap8cuft7lR4qrY0VsOA-TXu~o17e2S86Ub2~kOzHjr4EjggLrSEDnGR4r5-Rl9T4k2i-4YUxul4dOy5EJpIbsuuAiX-hzxSHAXhyOuYjwuffjJO7qD7ndZdS7rAIektNGJol5px5R5rDct4WlgwA5tIbJ9bCDww__",
    description: "Professional brightening treatment for luminous skin"
  }
];

const PACKAGES = [
  {
    id: 1,
    name: "باقة العروس",
    price: "2500",
    features: ["تنظيف عميق", "تقشير احترافي", "ترطيب مكثف", "مساج مريح"],
    popular: true
  },
  {
    id: 2,
    name: "باقة النضارة",
    price: "999",
    features: ["تنظيف لطيف", "ترطيب أساسي", "حماية من الشمس"],
    popular: false
  },
  {
    id: 3,
    name: "باقة الشباب",
    price: "1800",
    features: ["تقشير كيميائي", "علاج حب الشباب", "ترطيب عميق", "حماية"],
    popular: false
  },
  {
    id: 4,
    name: "باقة الـ VIP",
    price: "4000",
    features: ["كل الخدمات", "جلسات متعددة", "منتجات علاجية", "استشارة مجانية"],
    popular: false
  }
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "فاطمة محمد",
    text: "تجربة رائعة جداً! البشرة أصبحت متوهجة وناعمة. الفريق احترافي جداً وودود.",
    rating: 5,
    image: "👩‍🦰"
  },
  {
    id: 2,
    name: "ليلى أحمد",
    text: "أفضل عيادة تجميل زرتها. النتائج فوق التوقعات والخدمة ممتازة جداً.",
    rating: 5,
    image: "👩"
  },
  {
    id: 3,
    name: "سارة علي",
    text: "استخدموا أحدث التقنيات والمنتجات الطبية. بشرتي تحسنت كثيراً.",
    rating: 5,
    image: "👩‍🦱"
  }
];

export default function Home() {
  const [baSliderValue, setBASliderValue] = useState(50);
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleBAChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBASliderValue(Number(e.target.value));
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send data to a backend
    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", phone: "", message: "" });
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-black tracking-tighter"
          >
            TITAN<span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">JOY</span>
          </motion.div>
          <span className="text-[10px] border border-pink-500/50 text-pink-500 px-3 py-1 rounded-full uppercase tracking-widest font-bold">
            VIP Pro
          </span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-500/10 to-transparent opacity-40 pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto relative z-10"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight">
            بشرتِك تستحق
            <br />
            <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
              الرفاهية
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-300 mb-10 leading-relaxed">
            اكتشفي أحدث تقنيات العناية بالبشرة في عيادتنا الفاخرة. نقدم لك تجربة فريدة من نوعها بأيدي متخصصين.
          </p>

          {/* Before & After Slider */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="max-w-sm mx-auto mb-12"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-pink-500/20">
              <img
                src={BEFORE_AFTER_IMAGE}
                alt="Before and After"
                className="w-full h-auto block"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `linear-gradient(to right, rgba(0,0,0,0.3) 0%, transparent ${baSliderValue}%, transparent 100%)`,
                }}
              />
              <input
                type="range"
                min="0"
                max="100"
                value={baSliderValue}
                onChange={handleBAChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-col-resize z-10"
              />
              <div
                className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-pink-500 to-orange-500 transition-all"
                style={{ left: `${baSliderValue}%` }}
              >
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg">
                  <ChevronDown className="w-4 h-4 text-pink-500 rotate-90" />
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-4">اسحبي لترى الفرق</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              size="lg"
              className="bg-white text-black hover:bg-pink-500 hover:text-white font-bold text-base px-10 py-6 rounded-full transition-all duration-300"
              onClick={() => window.open("https://wa.me/201000000000", "_blank")}
            >
              احجزي موعدكِ الآن
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs sm:text-sm font-bold tracking-[0.3em] text-pink-500 mb-12 uppercase"
        >
          خدماتنا المتميزة
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <div className="relative rounded-2xl overflow-hidden h-64 sm:h-72 mb-4">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">{service.name}</h3>
              <p className="text-sm text-gray-300">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white/[0.02] backdrop-blur">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-xs sm:text-sm font-bold tracking-[0.3em] text-pink-500 mb-12 uppercase"
          >
            باقاتنا الفاخرة
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PACKAGES.map((pkg, idx) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`rounded-3xl p-6 sm:p-8 border transition-all duration-300 ${
                  pkg.popular
                    ? "bg-gradient-to-br from-pink-500/20 to-orange-500/20 border-pink-500/50 ring-2 ring-pink-500/30 scale-105"
                    : "bg-white/5 border-white/10 hover:border-pink-500/30"
                }`}
              >
                {pkg.popular && (
                  <div className="inline-block bg-gradient-to-r from-pink-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                    الأكثر طلباً
                  </div>
                )}
                <h3 className="text-xl sm:text-2xl font-bold mb-2">{pkg.name}</h3>
                <div className="text-3xl sm:text-4xl font-black text-transparent bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text mb-6">
                  {pkg.price} LE
                </div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="text-sm text-gray-300 flex items-center">
                      <span className="w-2 h-2 bg-pink-500 rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold rounded-full"
                  onClick={() => window.open("https://wa.me/201000000000", "_blank")}
                >
                  احجزي الآن
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs sm:text-sm font-bold tracking-[0.3em] text-pink-500 mb-12 uppercase"
        >
          آراء عملائنا
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-pink-500/30 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{testimonial.image}</span>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{testimonial.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white/[0.02] backdrop-blur">
        <div className="max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-xs sm:text-sm font-bold tracking-[0.3em] text-pink-500 mb-4 uppercase"
          >
            تواصلي معنا
          </motion.h2>

          <p className="text-center text-gray-300 mb-10">لديك أسئلة؟ نحن هنا للإجابة عليها</p>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleFormSubmit}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="الاسم"
                value={formData.name}
                onChange={handleFormChange}
                required
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/50 transition-colors"
              />
              <input
                type="tel"
                name="phone"
                placeholder="رقم الهاتف"
                value={formData.phone}
                onChange={handleFormChange}
                required
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/50 transition-colors"
              />
            </div>
            <textarea
              name="message"
              placeholder="رسالتك"
              value={formData.message}
              onChange={handleFormChange}
              required
              rows={5}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/50 transition-colors resize-none"
            />
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              إرسال الرسالة
            </Button>
            {isSubmitted && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-green-400 text-sm"
              >
                ✓ تم استقبال رسالتك بنجاح. سنتواصل معك قريباً!
              </motion.p>
            )}
          </motion.form>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
            <div className="text-center">
              <Phone className="w-8 h-8 text-pink-500 mx-auto mb-3" />
              <p className="text-gray-300 text-sm">+20 100 000 0000</p>
            </div>
            <div className="text-center">
              <Mail className="w-8 h-8 text-pink-500 mx-auto mb-3" />
              <p className="text-gray-300 text-sm">info@titanjoy.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-white/5">
        <p className="text-xs tracking-widest text-gray-600 uppercase">
          © 2026 TITAN JOY VIP | جميع الحقوق محفوظة
        </p>
      </footer>
    </div>
  );
}
