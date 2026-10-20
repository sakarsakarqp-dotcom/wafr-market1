"use client";

import { useMemo, useState } from "react";

const categories = [
  { name: "الكل", icon: "▦" },
  { name: "المنزل", icon: "⌂" },
  { name: "الإلكترونيات", icon: "▣" },
  { name: "الألبسة", icon: "◇" },
  { name: "مواد البناء", icon: "▤" },
  { name: "قطع السيارات", icon: "⚙" },
  { name: "الزراعة", icon: "♧" }
];

const products = [
  { id: 1, name: "مصباح LED موفّر للطاقة", category: "المنزل", shop: "متجر النور", icon: "💡", description: "منتج تجريبي لعرض شكل بطاقة المنتج." },
  { id: 2, name: "سماعات لاسلكية", category: "الإلكترونيات", shop: "تقنيات الشام", icon: "🎧", description: "منتج تجريبي قابل للاستبدال ببيانات حقيقية." },
  { id: 3, name: "حقيبة يومية", category: "الألبسة", shop: "أناقتك", icon: "🎒", description: "تصميم مبدئي للواجهة فقط." },
  { id: 4, name: "عدة أدوات منزلية", category: "المنزل", shop: "بيت الأدوات", icon: "🧰", description: "الأسعار والمخزون غير موصولين بقاعدة بيانات بعد." },
  { id: 5, name: "مستلزمات ريّ", category: "الزراعة", shop: "مستلزمات الغاب", icon: "🌱", description: "مثال تجريبي ضمن تصنيفات وَفْر." },
  { id: 6, name: "أدوات صيانة", category: "مواد البناء", shop: "أساس للبناء", icon: "🔧", description: "واجهة تجريبية للمرحلة الأولى." }
];

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("الكل");

  const visibleProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = activeCategory === "الكل" || product.category === activeCategory;
      const matchesQuery = !q || `${product.name} ${product.category} ${product.shop}`.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  return (
    <main>
      <header className="border-b border-neutral-200">
        <div className="container flex items-center justify-between gap-4 py-4">
          <a href="#" className="text-2xl font-black tracking-tight">وَفْر<span className="mr-1 text-sm font-normal">WAFR</span></a>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            <a href="#categories" className="hover:underline">التصنيفات</a>
            <a href="#products" className="hover:underline">المنتجات</a>
            <a href="#about" className="hover:underline">عن وَفْر</a>
          </nav>
          <button className="rounded-full border border-black px-4 py-2 text-sm font-bold" onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}>
            تصفّح السوق
          </button>
        </div>
        <div className="container pb-4">
          <label htmlFor="search" className="sr-only">ابحث عن منتج أو متجر</label>
          <input id="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="ابحث عن منتج، قطعة، أو متجر..." className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 outline-none transition focus:border-black" />
        </div>
      </header>

      <section className="container grid items-center gap-8 py-12 md:grid-cols-2 md:py-20">
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-widest text-neutral-500">منصّة تسوّق متعددة المتاجر</p>
          <h1 className="max-w-xl text-4xl font-black leading-tight sm:text-5xl">سوق واحد.. <span className="underline decoration-4 underline-offset-8">خيارات بلا حدود.</span></h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-600">اكتشف منتجات ومتاجر متنوعة من مكان واحد. وَفْر يجمع خياراتك ويسهّل عليك الوصول لما تبحث عنه.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#products" className="rounded-full bg-black px-6 py-3 font-bold text-white">اكتشف المنتجات</a>
            <a href="#categories" className="rounded-full border border-neutral-300 px-6 py-3 font-bold">استكشف التصنيفات</a>
          </div>
          <p className="mt-5 text-xs text-neutral-500">هذه نسخة تجريبية أولية؛ المنتجات والأسعار المعروضة أمثلة وليست عروض بيع حقيقية.</p>
        </div>
        <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8">
          <div className="mb-5 flex items-center justify-between">
            <span className="text-sm font-bold">تجربة وَفْر</span>
            <span className="rounded-full border border-neutral-300 px-3 py-1 text-xs">نسخة تجريبية</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white p-5"><div className="text-3xl">⌕</div><p className="mt-4 font-bold">بحث أسهل</p><p className="mt-1 text-sm text-neutral-500">اعثر على ما تحتاجه</p></div>
            <div className="rounded-2xl bg-white p-5"><div className="text-3xl">▦</div><p className="mt-4 font-bold">متاجر متعددة</p><p className="mt-1 text-sm text-neutral-500">خيارات في مكان واحد</p></div>
            <div className="rounded-2xl bg-white p-5"><div className="text-3xl">◇</div><p className="mt-4 font-bold">تصنيفات واضحة</p><p className="mt-1 text-sm text-neutral-500">تصفّح حسب حاجتك</p></div>
            <div className="rounded-2xl bg-white p-5"><div className="text-3xl">↗</div><p className="mt-4 font-bold">قابل للتوسع</p><p className="mt-1 text-sm text-neutral-500">قاعدة لبناء المنصة</p></div>
          </div>
        </div>
      </section>

      <section id="categories" className="border-y border-neutral-200 bg-neutral-50 py-8">
        <div className="container">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div><p className="text-sm text-neutral-500">تسوّق بطريقتك</p><h2 className="mt-1 text-2xl font-black">التصنيفات</h2></div>
            <span className="text-sm text-neutral-500">اختر تصنيفًا لعرض المنتجات</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button key={category.name} onClick={() => setActiveCategory(category.name)} className={`pill flex items-center gap-2 ${activeCategory === category.name ? "border-black bg-black text-white" : "bg-white"}`}>
                <span>{category.icon}</span>{category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="container py-12">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div><p className="text-sm text-neutral-500">مختارة للتجربة</p><h2 className="mt-1 text-2xl font-black">منتجات مقترحة</h2></div>
          <p className="text-sm text-neutral-500">{visibleProducts.length} منتجات تجريبية</p>
        </div>
        {visibleProducts.length ? <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {visibleProducts.map((product) => (
            <article key={product.id} className="rounded-2xl border border-neutral-200 p-3 transition hover:border-neutral-500">
              <div className="product-art">{product.icon}</div>
              <div className="px-1 pb-1 pt-4">
                <p className="text-xs text-neutral-500">{product.category} · {product.shop}</p>
                <h3 className="mt-2 min-h-12 font-bold leading-6">{product.name}</h3>
                <p className="mt-2 text-sm text-neutral-500">السعر يُضاف لاحقًا</p>
                <button className="mt-4 w-full rounded-xl border border-black px-3 py-2 text-sm font-bold" onClick={() => alert(product.description)}>تفاصيل المنتج</button>
              </div>
            </article>
          ))}
        </div> : <div className="rounded-2xl border border-dashed border-neutral-300 p-10 text-center text-neutral-500">ما لقينا منتجات مطابقة. جرّب كلمة بحث أو تصنيفًا آخر.</div>}
      </section>

      <section id="about" className="bg-black py-10 text-white">
        <div className="container flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div><h2 className="text-2xl font-black">وَفْر | WAFR</h2><p className="mt-2 text-neutral-300">سوق واحد.. خيارات بلا حدود.</p></div>
          <p className="max-w-xl text-sm leading-7 text-neutral-300">المرحلة الحالية واجهة أولية ببيانات تجريبية فقط. ربط الحسابات والمتاجر وقاعدة البيانات والطلبات والدفع سيأتي في مراحل لاحقة بعد الاختبار.</p>
        </div>
      </section>
      <footer className="border-t border-neutral-800 bg-black py-4 text-center text-xs text-neutral-400">© {new Date().getFullYear()} وَفْر — نسخة تطويرية أولية</footer>
    </main>
  );
}
