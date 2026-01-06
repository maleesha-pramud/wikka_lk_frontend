import Image from "next/image";
import { Navbar } from "@/components/server/navbar";

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
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 xl:grid-cols-4">
            <div className="group relative flex flex-col gap-3 rounded-2xl bg-white p-2.5 shadow-soft transition-all hover:shadow-hover dark:bg-surface-dark">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-gray-100">
                <Image fill className="object-cover transition-transform duration-500 group-hover:scale-105" alt="Close up of a modern smartphone on a desk" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6iiFYNJBDuujFd8ZLBO5t0KWWOb0N8g3b1eaU-rtWdeGPOZNP4BAd9jhyRSs1-4-3d2HpsaWRXUaRiMWtj1l2RMSONz3MFyR_BtslXso_WVeVoWXgmGJFIGAx-zuwwQ5SY6VAsuYH8L7M3b77EYbAOBwvGNE6gs73tNprqB5fvCo3gp2NRnn6skpfTBwvtBfcMXZjKOc7bn-8MvO-CZxReelO9SoJOfV8BeXjd3nBJOIFi8WU0uQ6tEUgr3_tU2Igj-3QDAYe00Q" unoptimized />
                <button className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-white text-gray-400 shadow-sm transition-colors hover:text-red-500 dark:bg-background-dark/80 dark:text-gray-200">
                  <span className="material-symbols-outlined text-[20px]">favorite</span>
                </button>
                <span className="absolute bottom-2 left-2 rounded-md bg-white/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-text-main shadow-sm backdrop-blur-sm dark:bg-black/80 dark:text-white">Like New</span>
              </div>
              <div className="px-1 pb-2">
                <div className="mb-1 flex items-baseline justify-between">
                  <span className="text-lg font-bold text-text-main dark:text-white">€650</span>
                </div>
                <h3 className="line-clamp-1 text-sm font-medium text-text-main dark:text-gray-200">iPhone 13 Pro - 128GB Sierra Blue</h3>
                <div className="mt-2 flex items-center gap-1 text-xs font-medium text-gray-400">
                  <span className="material-symbols-outlined text-[14px]">location_on</span>
                  <span>Downtown · 2km</span>
                </div>
              </div>
            </div>
            <div className="group relative flex flex-col gap-3 rounded-2xl bg-white p-2.5 shadow-soft transition-all hover:shadow-hover dark:bg-surface-dark">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-gray-100">
                <Image fill className="object-cover transition-transform duration-500 group-hover:scale-105" alt="Brown leather jacket hanging against a wall" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbC99mddpwHOFNX5HnbGJJX7v4jsuzy78MCg4hl2zQP0ebKn_oAdqptsCD74dwh0zvoQvAQ8qkFoJ_rO9a87H-Op2iE4cpxxe3PT9EmwgwHczL9igR4ew4AuHtPH6OTVbBe4eZD_J0ppcRwvrBYA3ktud-dgr8B_GQinwwc98sJnWQZxwkUCq62dq7xAbyI2Y64JUzZC7J31fTX1vh8CJOx6Y6EJ4ixp4BQ4AosvCoiR_Qjsq8UD4vGlMCnvgN9wWPZE-oW9m0V9w" unoptimized />
                <button className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-white text-gray-400 shadow-sm transition-colors hover:text-red-500 dark:bg-background-dark/80 dark:text-gray-200">
                  <span className="material-symbols-outlined text-[20px]">favorite</span>
                </button>
              </div>
              <div className="px-1 pb-2">
                <div className="mb-1 flex items-baseline justify-between">
                  <span className="text-lg font-bold text-text-main dark:text-white">€45</span>
                </div>
                <h3 className="line-clamp-1 text-sm font-medium text-text-main dark:text-gray-200">Vintage Leather Jacket</h3>
                <div className="mt-2 flex items-center gap-1 text-xs font-medium text-gray-400">
                  <span className="material-symbols-outlined text-[14px]">location_on</span>
                  <span>West End · 5km</span>
                </div>
              </div>
            </div>
            <div className="group relative flex flex-col gap-3 rounded-2xl bg-white p-2.5 shadow-soft transition-all hover:shadow-hover dark:bg-surface-dark">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-gray-100">
                <Image fill className="object-cover transition-transform duration-500 group-hover:scale-105" alt="Professional camera with lens on a table" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsu5Bu3QZwgF2OEKgi7EK0qpWBUXztvjJM9Kxdcsl43vToTNNpE8hquBhYDfJO_Bf4F2dHw8GFI-9b_OHav6qu1T4nx2_ysTugSj5slDGGTOEAFnHiCZhC6jD0wknA7I9f7vHMQWX--SY9FunxSdp4opR5mbU7TAI-6FsgbiPV6NoguJ5B4rBmHNMJIpEVxTRNCuKf7oIL6AnI6eQ7WmN36KJeNReA-4cTZ4C0RsWgxrvmu1_IrEuXfyzqWNO7_UtybFUI-TNXLbA" unoptimized />
                <button className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-white text-gray-400 shadow-sm transition-colors hover:text-red-500 dark:bg-background-dark/80 dark:text-gray-200">
                  <span className="material-symbols-outlined text-[20px]">favorite</span>
                </button>
                <span className="absolute bottom-2 left-2 rounded-md bg-white/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-text-main shadow-sm backdrop-blur-sm dark:bg-black/80 dark:text-white">Good</span>
              </div>
              <div className="px-1 pb-2">
                <div className="mb-1 flex items-baseline justify-between">
                  <span className="text-lg font-bold text-text-main dark:text-white">€1,400</span>
                </div>
                <h3 className="line-clamp-1 text-sm font-medium text-text-main dark:text-gray-200">Sony A7III Camera Kit</h3>
                <div className="mt-2 flex items-center gap-1 text-xs font-medium text-gray-400">
                  <span className="material-symbols-outlined text-[14px]">location_on</span>
                  <span>Uptown · 1km</span>
                </div>
              </div>
            </div>
            <div className="group relative flex flex-col gap-3 rounded-2xl bg-white p-2.5 shadow-soft transition-all hover:shadow-hover dark:bg-surface-dark">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-gray-100">
                <Image fill className="object-cover transition-transform duration-500 group-hover:scale-105" alt="Mountain bike parked on a trail" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcuCK8bKy_-3Z5S_uPT1XRH916LfkiiS6cKIkgbenk_QiAy_gNeEik9T219IXbnsXlV3cac_kV0V4Cc391rj3usqOKlMbLJw-R5VPHUMSs08Fq2Cm4BHJFP4J5UqQVjICY8cwc4HwIsLRPQO3G_sIMgB4O7B6VG3aShBozE32VmS8TYoPgJwkhvjwIE9r7WNBTTODenB4j2UNfvGg7lqQ-wU4_gJW1Nve20YZfTN_buzsUWql0ChSv4XkETrqQ8YlhXxPueHGaPug" unoptimized />
                <button className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-white text-gray-400 shadow-sm transition-colors hover:text-red-500 dark:bg-background-dark/80 dark:text-gray-200">
                  <span className="material-symbols-outlined text-[20px]">favorite</span>
                </button>
              </div>
              <div className="px-1 pb-2">
                <div className="mb-1 flex items-baseline justify-between">
                  <span className="text-lg font-bold text-text-main dark:text-white">€350</span>
                </div>
                <h3 className="line-clamp-1 text-sm font-medium text-text-main dark:text-gray-200">Trek Marlin Mountain Bike</h3>
                <div className="mt-2 flex items-center gap-1 text-xs font-medium text-gray-400">
                  <span className="material-symbols-outlined text-[14px]">location_on</span>
                  <span>Suburbs · 10km</span>
                </div>
              </div>
            </div>
            <div className="group relative flex flex-col gap-3 rounded-2xl bg-white p-2.5 shadow-soft transition-all hover:shadow-hover dark:bg-surface-dark">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-gray-100">
                <Image fill className="object-cover transition-transform duration-500 group-hover:scale-105" alt="Green velvet sofa in a modern living room" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlAi_aqHaz79RreZqiDmUOUPpBDKcsadpsMpZY6LBSlYxVDUIf5XhVmzYwjhYLpmB8UPLtN6U6gnrm_mVwm9tWlOqH1LxjTnf_nfufWOPbMsbrhYzQunkFbcjwOu6FFJ1tF3h_IDCtzEQwlC-vadxM6g1X47gXlZayuMLcYKs-gcGUEez2Mg1CXmxmwxlPK8cG8NeEQ1pSOs-apFmnRUs59E7HSVtELwr33laSAanQrIpPf7f8Q-p1tsc4m7KCihX-RgGVw-i2DA" unoptimized />
                <button className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-white text-gray-400 shadow-sm transition-colors hover:text-red-500 dark:bg-background-dark/80 dark:text-gray-200">
                  <span className="material-symbols-outlined text-[20px]">favorite</span>
                </button>
              </div>
              <div className="px-1 pb-2">
                <div className="mb-1 flex items-baseline justify-between">
                  <span className="text-lg font-bold text-text-main dark:text-white">€200</span>
                </div>
                <h3 className="line-clamp-1 text-sm font-medium text-text-main dark:text-gray-200">Green Velvet Sofa</h3>
                <div className="mt-2 flex items-center gap-1 text-xs font-medium text-gray-400">
                  <span className="material-symbols-outlined text-[14px]">location_on</span>
                  <span>North End · 8km</span>
                </div>
              </div>
            </div>
            <div className="group relative flex flex-col gap-3 rounded-2xl bg-white p-2.5 shadow-soft transition-all hover:shadow-hover dark:bg-surface-dark">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-gray-100">
                <Image fill className="object-cover transition-transform duration-500 group-hover:scale-105" alt="Gaming console controller on a dark background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFVKsmLa8GoDSlhdMXxI_8bkj-6xNgxnsRR31sG2jK6s1gZrN6UNRUk_FXDed92M0zcDOz3einqOiPIZCg7_qff9rp8K9pt4DxnpD9YBd_ZZwfmCONkbVRgZ5Qf5PIaurFU7ztO79M1smDOmU7LT2ZV1_QDLBKMBHPoeghqTna-kFz22ydT3HPOpvw0Nbd27qUvbsSyLmEv0iNDFBZZpkNL8829t29IxhtbUa7ssQr4Jb13iUuZ1uQrYbrLYNjzbIFixb5Sw81GwE" unoptimized />
                <button className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-white text-gray-400 shadow-sm transition-colors hover:text-red-500 dark:bg-background-dark/80 dark:text-gray-200">
                  <span className="material-symbols-outlined text-[20px]">favorite</span>
                </button>
                <span className="absolute bottom-2 left-2 rounded-md bg-white/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-text-main shadow-sm backdrop-blur-sm dark:bg-black/80 dark:text-white">Used</span>
              </div>
              <div className="px-1 pb-2">
                <div className="mb-1 flex items-baseline justify-between">
                  <span className="text-lg font-bold text-text-main dark:text-white">€300</span>
                </div>
                <h3 className="line-clamp-1 text-sm font-medium text-text-main dark:text-gray-200">PS5 Controller + Games Bundle</h3>
                <div className="mt-2 flex items-center gap-1 text-xs font-medium text-gray-400">
                  <span className="material-symbols-outlined text-[14px]">location_on</span>
                  <span>City Center · 3km</span>
                </div>
              </div>
            </div>
            <div className="group relative flex flex-col gap-3 rounded-2xl bg-white p-2.5 shadow-soft transition-all hover:shadow-hover dark:bg-surface-dark">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-gray-100">
                <Image fill className="object-cover transition-transform duration-500 group-hover:scale-105" alt="Red nike sneakers on white background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAl--e2Iq-cuPQiRpZiUWrH7_0e_43bfx_6ikQ0Rio8CkzoUZW_mNCHEhDxIVp44bqRirjGb5wSwLr-cgq2mjdDZwcx2T-mNBBuj2o-Pa0UkgykPqdOyok3vHvCUmSY6T7QmhhkAfiNyArC-zo8_gFVSZJIIuBpwvn0RggH-RJnw0x5q_3aqH6ZcaFbe6g5GhtIO9VLdo4zG9UYECPbzAtlG9h17-pAaRbS8nCI6elvZNwKi3AiOLqnS6gFTOFTOr49fGdnBwUmA7k" unoptimized />
                <button className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-white text-gray-400 shadow-sm transition-colors hover:text-red-500 dark:bg-background-dark/80 dark:text-gray-200">
                  <span className="material-symbols-outlined text-[20px]">favorite</span>
                </button>
              </div>
              <div className="px-1 pb-2">
                <div className="mb-1 flex items-baseline justify-between">
                  <span className="text-lg font-bold text-text-main dark:text-white">€85</span>
                </div>
                <h3 className="line-clamp-1 text-sm font-medium text-text-main dark:text-gray-200">Nike Air Max - Size 42</h3>
                <div className="mt-2 flex items-center gap-1 text-xs font-medium text-gray-400">
                  <span className="material-symbols-outlined text-[14px]">location_on</span>
                  <span>East Side · 4km</span>
                </div>
              </div>
            </div>
            <div className="group relative flex flex-col gap-3 rounded-2xl bg-white p-2.5 shadow-soft transition-all hover:shadow-hover dark:bg-surface-dark">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-gray-100">
                <Image fill className="object-cover transition-transform duration-500 group-hover:scale-105" alt="Vintage record player on wooden table" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwEdbtiq2-Mj3THOr1N9lEkGlgS2mVGJCD-ppE2MU5Jcn1Evzqh9A_pN39aisOdKjys_27iq1kRhUyMWqtwvkH_pYDC34Q4Wse5mYVlcSzibkRN9RxTNmWl2ZmNgyj_gq-WkxtZ40Os4Ioe_1MIhIqasaySUl5LllOg7H8rBAzEhyWHcywDP8BihNjFV9-B4t0ZONurnEtJ0yefIi-5t8NtlUPhnTc3wRb8YhPtggyZdidSed_zPF1wMsBgGP1SbsW1pwt_RF1fuE" unoptimized />
                <button className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-white text-gray-400 shadow-sm transition-colors hover:text-red-500 dark:bg-background-dark/80 dark:text-gray-200">
                  <span className="material-symbols-outlined text-[20px]">favorite</span>
                </button>
                <span className="absolute bottom-2 left-2 rounded-md bg-white/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-text-main shadow-sm backdrop-blur-sm dark:bg-black/80 dark:text-white">Vintage</span>
              </div>
              <div className="px-1 pb-2">
                <div className="mb-1 flex items-baseline justify-between">
                  <span className="text-lg font-bold text-text-main dark:text-white">€120</span>
                </div>
                <h3 className="line-clamp-1 text-sm font-medium text-text-main dark:text-gray-200">Audio Technica Turntable</h3>
                <div className="mt-2 flex items-center gap-1 text-xs font-medium text-gray-400">
                  <span className="material-symbols-outlined text-[14px]">location_on</span>
                  <span>Downtown · 1.5km</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center pt-8">
            <button className="rounded-full bg-white px-8 py-3.5 text-sm font-bold text-primary shadow-sm ring-1 ring-gray-200 transition-all hover:bg-gray-50 hover:ring-primary dark:bg-surface-dark dark:text-white dark:ring-gray-700 dark:hover:bg-gray-700">
              Load more items
            </button>
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
