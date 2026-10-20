"use client";

import { useMemo, useState } from "react";

const products = [
  { id: 1, name: "هاتف ذكي", category: "إلكترونيات", price: 2500000, icon: "📱" },
  { id: 2, name: "سماعات لاسلكية", category: "إلكترونيات", price: 180000, icon: "🎧" },
  { id: 3, name: "حذاء رياضي", category: "أزياء", price: 350000, icon: "👟" },
  { id: 4, name: "حقيبة أنيقة", category: "أزياء", price: 220000, icon: "👜" },
  { id: 5, name: "ساعة يد", category: "إكسسوارات", price: 275000, icon: "⌚" },
  { id: 6, name: "مصباح مكتبي", category: "المنزل", price: 95000, icon: "💡" },
  { id: 7, name: "خلاط كهربائي", category: "المنزل", price: 420000, icon: "🥤" },
  { id: 8, name: "كرة قدم", category: "رياضة", price: 125000, icon: "⚽" },
];

const categories = ["الكل", "إلكترونيات", "أزياء", "إكسسوارات", "المنزل", "رياضة"];

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("الكل");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.includes(search.trim());
      const matchesCategory =
        category === "الكل" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("ar-SY").format(price) + " ل.س";

  function toggleFavorite(id: number) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  return (
    <main dir="rtl" className="min-h-screen bg-[#f7f8fa] text-gray-900">
      <header className="bg-white border-b border-gray-100">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <a href="/" className="text-3xl font-black text-emerald-700">
            وَفْر
          </a>

          <span className="hidden text-sm text-gray-500 sm:block">
            سوق واحد.. خيارات بلا حدود
          </span>

          <button
            onClick={() => alert("سلة التسوق: " + cart.length + " منتج")}
            className="rounded-xl bg-emerald-700 px-4 py-2 font-bold text-white"
          >
            🛒 السلة ({cart.length})
          </button>
        </div>
      </header>

      <section className="bg-emerald-800 text-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <p className="mb-3 text-sm font-semibold text-emerald-200">
            أهلاً بك في وَفْر
          </p>
          <h1 className="max-w-2xl text-3xl font-black leading-tight sm:text-5xl">
            كل ما تبحث عنه، في مكان واحد
          </h1>
          <p className="mt-4 max-w-xl text-emerald-100">
            اكتشف المنتجات وقارن خياراتك وتسوق بسهولة.
          </p>

          <div className="mt-7 flex max-w-2xl overflow-hidden rounded-2xl bg-white">
            <span className="flex items-center px-4 text-xl">🔎</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="ما الذي تبحث عنه؟"
              className="w-full min-w-0 py-4 text-gray-900 outline-none"
              aria-label="ابحث عن منتج"
            />
            <button
              onClick={() => setSearch("")}
              className="px-4 font-bold text-emerald-700"
            >
              مسح
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between gap-3">
          <h2 className="text-xl font-black sm:text-2xl">تسوق حسب التصنيف</h2>
          <span className="text-sm text-gray-500">
            {filteredProducts.length} منتجات
          </span>
        </div>

        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`shrink-0 rounded-full border px-5 py-2 text-sm font-bold transition ${
                category === item
                  ? "border-emerald-700 bg-emerald-700 text-white"
                  : "border-gray-200 bg-white text-gray-700"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <h2 className="mb-5 text-xl font-black sm:text-2xl">
          منتجات مختارة
        </h2>

        {filteredProducts.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center text-gray-500">
            لا توجد منتجات مطابقة لبحثك.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
              >
                <div className="relative flex h-32 items-center justify-center bg-gray-50 text-6xl sm:h-44">
                  {product.icon}
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    aria-label="إضافة إلى المفضلة"
                    className="absolute left-3 top-3 rounded-full bg-white px-2 py-1 text-xl shadow-sm"
                  >
                    {favorites.includes(product.id) ? "❤️" : "♡"}
                  </button>
                </div>

                <div className="p-3 sm:p-4">
                  <p className="mb-2 text-xs text-gray-500">
                    {product.category}
                  </p>
                  <h3 className="min-h-12 font-bold">{product.name}</h3>
                  <p className="mt-2 text-sm font-black text-emerald-700">
                    {formatPrice(product.price)}
                  </p>
                  <button
                    onClick={() => setCart((current) => [...current, product.id])}
                    className="mt-4 w-full rounded-xl bg-emerald-700 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-800"
                  >
                    أضف إلى السلة +
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <footer className="mt-10 bg-gray-900 px-4 py-8 text-center text-sm text-gray-300">
        <p className="text-xl font-black text-white">وَفْر</p>
        <p className="mt-2">سوق واحد.. خيارات بلا حدود</p>
        <p className="mt-4 text-gray-500">
          © {new Date().getFullYear()} وَفْر. جميع الحقوق محفوظة.
        </p>
      </footer>
    </main>
  );
          }
