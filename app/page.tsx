import { Navbar } from "@/components/server/navbar";
import { HomeProductsGrid } from "./home-products-grid";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <section className="relative flex w-full flex-col items-center justify-center bg-white dark:bg-[#1f2937] py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px]"></div>
        <div className="absolute left-[-5%] top-[-10%] size-125 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute right-[-5%] bottom-[-10%] size-100 rounded-full bg-blue-500/5 blur-3xl"></div>
        <div className="container relative z-10 flex max-w-200 flex-col items-center gap-10 text-center">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-text-main dark:text-white md:text-6xl">
            Buy &amp; sell anything<br /> <span className="text-primary relative inline-block">near you
              <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 200 9" xmlns="http://www.w3.org/2000/svg"><path d="M2.00025 6.99997C25.7501 2.99972 84.8547 1.63611 200 3.00002" stroke="#13C1AC" strokeLinecap="round" strokeWidth="3"></path></svg>
            </span>
          </h1>
          <p className="max-w-2xl text-lg text-text-secondary dark:text-gray-400">
            Join millions of people discovering unique items, vintage treasures, and great deals in your local community.
          </p>
          <div className="flex w-full flex-col rounded-2xl bg-white p-2 shadow-[0_8px_30px_rgb(0,0,0,0.08)] ring-1 ring-black/5 dark:bg-surface-dark dark:ring-white/10 md:flex-row md:items-center md:rounded-full">
            <div className="flex flex-1 items-center px-4 py-2">
              <span className="material-symbols-outlined text-gray-400">search</span>
              <input className="w-full border-none bg-transparent p-3 text-base text-text-main placeholder-gray-400 focus:ring-0 dark:text-white dark:placeholder-gray-500 font-medium" placeholder="What are you looking for?" type="text" />
            </div>
            <div className="hidden h-8 w-px bg-gray-200 dark:bg-gray-600 md:block"></div>
            <div className="flex flex-1 items-center px-4 py-2">
              <span className="material-symbols-outlined text-gray-400">location_on</span>
              <input className="w-full border-none bg-transparent p-3 text-base text-text-main placeholder-gray-400 focus:ring-0 dark:text-white dark:placeholder-gray-500 font-medium" placeholder="Current Location" type="text" />
            </div>
            <button className="flex h-12 w-full items-center justify-center rounded-xl md:rounded-full bg-primary px-8 font-bold text-white transition-colors hover:bg-primary-hover shadow-lg shadow-primary/20 md:w-auto md:min-w-35">
              Search
            </button>
          </div>
        </div>
      </section>
      <section className="w-full border-b border-gray-100 bg-white py-6 dark:border-gray-800 dark:bg-[#1f2937]">
        <div className="mx-auto max-w-350 px-6">
          <div className="no-scrollbar flex gap-6 overflow-x-auto py-2 md:grid md:grid-cols-8 md:place-items-center md:overflow-visible">
            <a className="group flex min-w-22.5 flex-col items-center gap-3 transition-transform hover:-translate-y-1" href="#">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-gray-50 text-gray-600 ring-1 ring-gray-100 transition-colors group-hover:bg-primary/10 group-hover:text-primary group-hover:ring-primary/20 dark:bg-surface-dark dark:text-gray-300 dark:ring-gray-700 dark:group-hover:bg-primary/20 dark:group-hover:text-primary">
                <span className="material-symbols-outlined">directions_car</span>
              </div>
              <span className="text-xs font-semibold text-text-secondary group-hover:text-primary dark:text-gray-400">Cars</span>
            </a>
            <a className="group flex min-w-22.5 flex-col items-center gap-3 transition-transform hover:-translate-y-1" href="#">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-gray-50 text-gray-600 ring-1 ring-gray-100 transition-colors group-hover:bg-primary/10 group-hover:text-primary group-hover:ring-primary/20 dark:bg-surface-dark dark:text-gray-300 dark:ring-gray-700 dark:group-hover:bg-primary/20 dark:group-hover:text-primary">
                <span className="material-symbols-outlined">two_wheeler</span>
              </div>
              <span className="text-xs font-semibold text-text-secondary group-hover:text-primary dark:text-gray-400">Motorbikes</span>
            </a>
            <a className="group flex min-w-22.5 flex-col items-center gap-3 transition-transform hover:-translate-y-1" href="#">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-gray-50 text-gray-600 ring-1 ring-gray-100 transition-colors group-hover:bg-primary/10 group-hover:text-primary group-hover:ring-primary/20 dark:bg-surface-dark dark:text-gray-300 dark:ring-gray-700 dark:group-hover:bg-primary/20 dark:group-hover:text-primary">
                <span className="material-symbols-outlined">styler</span>
              </div>
              <span className="text-xs font-semibold text-text-secondary group-hover:text-primary dark:text-gray-400">Fashion</span>
            </a>
            <a className="group flex min-w-22.5 flex-col items-center gap-3 transition-transform hover:-translate-y-1" href="#">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-gray-50 text-gray-600 ring-1 ring-gray-100 transition-colors group-hover:bg-primary/10 group-hover:text-primary group-hover:ring-primary/20 dark:bg-surface-dark dark:text-gray-300 dark:ring-gray-700 dark:group-hover:bg-primary/20 dark:group-hover:text-primary">
                <span className="material-symbols-outlined">real_estate_agent</span>
              </div>
              <span className="text-xs font-semibold text-text-secondary group-hover:text-primary dark:text-gray-400">Real Estate</span>
            </a>
            <a className="group flex min-w-22.5 flex-col items-center gap-3 transition-transform hover:-translate-y-1" href="#">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-gray-50 text-gray-600 ring-1 ring-gray-100 transition-colors group-hover:bg-primary/10 group-hover:text-primary group-hover:ring-primary/20 dark:bg-surface-dark dark:text-gray-300 dark:ring-gray-700 dark:group-hover:bg-primary/20 dark:group-hover:text-primary">
                <span className="material-symbols-outlined">speaker</span>
              </div>
              <span className="text-xs font-semibold text-text-secondary group-hover:text-primary dark:text-gray-400">Audio &amp; TV</span>
            </a>
            <a className="group flex min-w-22.5 flex-col items-center gap-3 transition-transform hover:-translate-y-1" href="#">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-gray-50 text-gray-600 ring-1 ring-gray-100 transition-colors group-hover:bg-primary/10 group-hover:text-primary group-hover:ring-primary/20 dark:bg-surface-dark dark:text-gray-300 dark:ring-gray-700 dark:group-hover:bg-primary/20 dark:group-hover:text-primary">
                <span className="material-symbols-outlined">sports_soccer</span>
              </div>
              <span className="text-xs font-semibold text-text-secondary group-hover:text-primary dark:text-gray-400">Sports</span>
            </a>
            <a className="group flex min-w-22.5 flex-col items-center gap-3 transition-transform hover:-translate-y-1" href="#">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-gray-50 text-gray-600 ring-1 ring-gray-100 transition-colors group-hover:bg-primary/10 group-hover:text-primary group-hover:ring-primary/20 dark:bg-surface-dark dark:text-gray-300 dark:ring-gray-700 dark:group-hover:bg-primary/20 dark:group-hover:text-primary">
                <span className="material-symbols-outlined">videogame_asset</span>
              </div>
              <span className="text-xs font-semibold text-text-secondary group-hover:text-primary dark:text-gray-400">Gaming</span>
            </a>
            <a className="group flex min-w-22.5 flex-col items-center gap-3 transition-transform hover:-translate-y-1" href="#">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-gray-50 text-gray-600 ring-1 ring-gray-100 transition-colors group-hover:bg-primary/10 group-hover:text-primary group-hover:ring-primary/20 dark:bg-surface-dark dark:text-gray-300 dark:ring-gray-700 dark:group-hover:bg-primary/20 dark:group-hover:text-primary">
                <span className="material-symbols-outlined">chair</span>
              </div>
              <span className="text-xs font-semibold text-text-secondary group-hover:text-primary dark:text-gray-400">Home</span>
            </a>
          </div>
        </div>
      </section>
      <main className="mx-auto flex w-full max-w-350 flex-1 gap-10 px-6 py-12">
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-28 flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-text-main dark:text-white">Filters</h3>
              <button className="text-sm font-semibold text-primary hover:text-primary-hover hover:underline">Reset all</button>
            </div>
            <div className="flex flex-col gap-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-surface-dark">
              <div className="flex flex-col gap-3">
                <label className="text-sm font-bold text-text-main dark:text-gray-200">Price Range</label>
                <div className="flex items-center gap-3">
                  <div className="relative w-full">
                    <span className="absolute left-3 top-2.5 text-gray-400">€</span>
                    <input className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-7 pr-3 py-2.5 text-sm font-medium focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-background-dark dark:text-white" placeholder="Min" type="number" />
                  </div>
                  <span className="text-gray-400 font-medium">-</span>
                  <div className="relative w-full">
                    <span className="absolute left-3 top-2.5 text-gray-400">€</span>
                    <input className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-7 pr-3 py-2.5 text-sm font-medium focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-background-dark dark:text-white" placeholder="Max" type="number" />
                  </div>
                </div>
              </div>
              <div className="h-px bg-gray-100 dark:bg-gray-700"></div>
              <div className="flex flex-col gap-3">
                <label className="text-sm font-bold text-text-main dark:text-gray-200">Condition</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 text-sm text-text-secondary hover:text-text-main dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer">
                    <input className="size-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-background-dark" type="checkbox" />
                    <span className="font-medium">New</span>
                  </label>
                  <label className="flex items-center gap-3 text-sm text-text-secondary hover:text-text-main dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer">
                    <input className="size-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-background-dark" type="checkbox" />
                    <span className="font-medium">Like New</span>
                  </label>
                  <label className="flex items-center gap-3 text-sm text-text-secondary hover:text-text-main dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer">
                    <input className="size-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-background-dark" type="checkbox" />
                    <span className="font-medium">Good</span>
                  </label>
                  <label className="flex items-center gap-3 text-sm text-text-secondary hover:text-text-main dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer">
                    <input className="size-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-background-dark" type="checkbox" />
                    <span className="font-medium">Fair</span>
                  </label>
                </div>
              </div>
              <div className="h-px bg-gray-100 dark:bg-gray-700"></div>
              <div className="flex flex-col gap-3">
                <label className="text-sm font-bold text-text-main dark:text-gray-200">Date Listed</label>
                <select className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-medium focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-background-dark dark:text-white">
                  <option>Any time</option>
                  <option>Last 24 hours</option>
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                </select>
              </div>
            </div>
          </div>
        </aside>
        <div className="flex flex-1 flex-col gap-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-text-main dark:text-white">Fresh finds</h2>
            <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-semibold text-text-secondary hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-surface-dark lg:hidden">
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
              Filters
            </button>
          </div>
          <HomeProductsGrid />
          <div className="flex justify-center pt-8">
            <Link href="/search" className="rounded-full bg-white px-8 py-3.5 text-sm font-bold text-primary shadow-sm ring-1 ring-gray-200 transition-all hover:bg-gray-50 hover:ring-primary dark:bg-surface-dark dark:text-white dark:ring-gray-700 dark:hover:bg-gray-700">
              Load more items
            </Link>
          </div>
        </div>
      </main>
      <footer className="border-t border-gray-100 bg-white py-16 dark:border-gray-800 dark:bg-surface-dark">
        <div className="mx-auto flex max-w-350 flex-col gap-12 px-6 md:flex-row md:justify-between">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <div className="flex size-9 items-center justify-center rounded-full bg-primary text-white">
                <span className="material-symbols-outlined text-xl">storefront</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-text-main dark:text-white">Wikka.lk</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-text-secondary dark:text-gray-400">
              The leading platform for buying and selling locally. Safe, simple, and sustainable commerce for everyone.
            </p>
            <div className="flex gap-4">
              <a className="text-gray-400 transition-colors hover:text-primary" href="#"><span className="material-symbols-outlined">thumb_up</span></a>
              <a className="text-gray-400 transition-colors hover:text-primary" href="#"><span className="material-symbols-outlined">photo_camera</span></a>
              <a className="text-gray-400 transition-colors hover:text-primary" href="#"><span className="material-symbols-outlined">mail</span></a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:gap-16">
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-text-main dark:text-white">About</h4>
              <a className="text-sm font-medium text-text-secondary transition-colors hover:text-primary dark:text-gray-400 dark:hover:text-primary" href="#">How it works</a>
              <a className="text-sm font-medium text-text-secondary transition-colors hover:text-primary dark:text-gray-400 dark:hover:text-primary" href="#">Careers</a>
              <a className="text-sm font-medium text-text-secondary transition-colors hover:text-primary dark:text-gray-400 dark:hover:text-primary" href="#">Press</a>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-text-main dark:text-white">Support</h4>
              <a className="text-sm font-medium text-text-secondary transition-colors hover:text-primary dark:text-gray-400 dark:hover:text-primary" href="#">Help Center</a>
              <a className="text-sm font-medium text-text-secondary transition-colors hover:text-primary dark:text-gray-400 dark:hover:text-primary" href="#">Safety Tips</a>
              <a className="text-sm font-medium text-text-secondary transition-colors hover:text-primary dark:text-gray-400 dark:hover:text-primary" href="#">Contact Us</a>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-text-main dark:text-white">Legal</h4>
              <a className="text-sm font-medium text-text-secondary transition-colors hover:text-primary dark:text-gray-400 dark:hover:text-primary" href="#">Privacy</a>
              <a className="text-sm font-medium text-text-secondary transition-colors hover:text-primary dark:text-gray-400 dark:hover:text-primary" href="#">Terms</a>
              <a className="text-sm font-medium text-text-secondary transition-colors hover:text-primary dark:text-gray-400 dark:hover:text-primary" href="#">Cookies</a>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-350 border-t border-gray-100 pt-8 text-center text-xs text-gray-400 dark:border-gray-800 dark:text-gray-600 px-6">
          © 2023 Wikka.lk Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
