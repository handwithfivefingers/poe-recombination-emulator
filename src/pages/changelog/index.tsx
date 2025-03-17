const Changelog = () => {
  return (
    <div className="flex w-full flex-col gap-12 items-center justify-center container max-w-[990px] mx-auto">
      <h1 className="font-bold text-xl lg:text-3xl">Changelog</h1>
      <div className="shadow bg-slate-800 rounded p-12 w-full">
        <ul className="relative">
          <h3 className="font-bold">v0.1.2</h3>
          <li className="list-disc ml-4 text-sm lg:text-base ">Update import item. Now support multi-line craft mod</li>
          <li className="list-disc ml-4 text-sm lg:text-base">
            Base item now are supported with limit ( exclude Covoking wand or some item have same group mod )
          </li>
          <li className="list-disc ml-4 text-sm lg:text-base">Update veiled icon and igconize veil mod</li>

          <li className="text-xs text-slate-300 pt-2 absolute right-4">
            <i>17/03/2025</i>
          </li>
        </ul>
      </div>
      <div className="shadow w-full bg-slate-800 rounded p-12">
        <ul className="w-full relative">
          <h3 className="font-bold">v0.1.1</h3>
          <li className="list-disc ml-4 text-sm lg:text-base ">Introduce Recombinator Emulator</li>
          <li className="text-xs text-slate-300 pt-2 absolute right-4">
            <i>14/03/2025</i>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Changelog;
