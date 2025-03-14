import clsx from "clsx";
import { useRef, useState } from "react";
import { Button } from "../components/Button";
import { Item } from "../components/Item";
import { sampleItem1, sampleItem2 } from "../components/Item/mock";
import { Recombination } from "../helpers/combine";

function App() {
  const [itemCombine, setItemCombine] = useState<any>(undefined);
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [item1, setItem1] = useState(sampleItem1);
  const [item2, setItem2] = useState(sampleItem2);

  const combine = async () => {
    setLoading(true);
    const itemCombined = await new Recombination({
      item1,
      item2,
    } as any).combine();

    setItemCombine(itemCombined);
    setLoading(false);
    setToggle(true);
    setTimeout(() => {
      ref1.current.classList.add("fadeOut");
      ref2.current.classList.add("fadeOut");
    }, 2000);
  };

  const reload = () => {
    setItemCombine(undefined);
    ref1.current.classList.remove("fadeOut");
    ref2.current.classList.remove("fadeOut");
    setToggle(false);
  };

  const ref1 = useRef<any>(null);
  const ref2 = useRef<any>(null);
  return (
    <div className="w-full px-12 pt-12">
      <div className="flex mx-auto py-4 gap-4">
        <ul className="list-disc">
          <h5 className="text-sm font-bold">Important:</h5>
          <li className="font-medium text-sm">Not support base . Example Dex/Str Combine with Str/Int</li>
          <li className="font-medium text-sm">
            Elevated Mod may not working as expected. Using craftofexile.com to create similar item with same stats
          </li>
          <li className="font-medium text-sm">
            For better perform experience, please using same Base Type ( Weapon, Body Armour ){" "}
          </li>
          <li className="font-medium text-sm">
            All logic are being created by my knowledge. So, if you have any feedback, issue, please contact me
          </li>
          <li className="font-medium text-sm">Know what you are doing. If you have any problem, please contact me</li>
          <li className="font-medium text-sm">Re-produce item on craftofexile.com. Copy and paste into this</li>

          <li className="font-medium text-sm">
            Crafting information:
            <a
              className="text-blue-400 underline underline-offset-4"
              href="https://maxroll.gg/poe/resources/recombination-guide"
            >
              https://maxroll.gg/poe/resources/recombination-guide
            </a>
          </li>
        </ul>
        <div className="flex flex-col gap-4 p-2 w-1/2 ">
          <h4>Recombination Information: </h4>
          <div className="flex gap-4 p-2 shadow-xl bg-slate-600 rounded w-full ">
            <ul className="px-4 w-1/4">
              <h5 className="text-sm font-bold">Prefix hit: {itemCombine?.maximumPrefix || "n/a"}</h5>
              <li className="text-xs list-decimal">0 Mod: {itemCombine?.prefixChance[0]}</li>
              <li className="text-xs list-decimal">1 Mod: {itemCombine?.prefixChance[1]}</li>
              <li className="text-xs list-decimal">2 Mod: {itemCombine?.prefixChance[2]}</li>
              <li className="text-xs list-decimal">3 Mod: {itemCombine?.prefixChance[3]}</li>
            </ul>
            <ul className="px-4  w-1/4">
              <h5 className="text-sm font-bold">Suffix hit: {itemCombine?.maximumSuffix || "n/a"}</h5>
              <li className="text-xs list-decimal">0 Mod: {itemCombine?.suffixChance[0]}</li>
              <li className="text-xs list-decimal">1 Mod: {itemCombine?.suffixChance[1]}</li>
              <li className="text-xs list-decimal">2 Mod: {itemCombine?.suffixChance[2]}</li>
              <li className="text-xs list-decimal">3 Mod: {itemCombine?.suffixChance[3]}</li>
            </ul>

            <ul className="px-4  w-1/2">
              <h5 className="text-sm font-bold">Step produce:</h5>
              {itemCombine?.history?.map((item: any) => {
                return (
                  <li className="text-xs list-decimal">
                    {item.affix?.toUpperCase()}: {item.mod?.name_modifier}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 justify-between mx-auto gap-4">
        <div
          className={clsx({
            // ["fadeOut"]: itemConbine,
            ["animate-pulse"]: loading,
          })}
          ref={ref1}
        >
          <Item value={sampleItem1} animate={toggle} onImport={(item: any) => setItem1(item)} />
        </div>
        <div
          className={clsx("opacity-0", {
            ["fadeIn"]: itemCombine,
            ["animate-pulse"]: loading,
          })}
        >
          {itemCombine && <Item value={itemCombine} hideButton revertAnimate />}{" "}
        </div>
        <div
          className={clsx({
            // ["fadeOut"]: itemCombine,
            ["animate-pulse"]: loading,
          })}
          ref={ref2}
        >
          <Item value={sampleItem2} animate={toggle} onImport={(item: any) => setItem2(item)} />
        </div>
      </div>
      <div className="flex justify-center">
        {(!itemCombine && (
          <Button
            onClick={combine}
            className="hover:bg-white transition-colors hover:text-slate-800"
            disabled={loading}
          >
            Combine
          </Button>
        )) || (
          <Button onClick={reload} className="hover:bg-white transition-colors hover:text-slate-800" disabled={loading}>
            Restart
          </Button>
        )}
      </div>
    </div>
  );
}
export default App;
