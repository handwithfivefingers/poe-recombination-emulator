/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { Button } from "../components/Button";
import { Item } from "../components/Item";
import { sampleItem1, sampleItem2 } from "../components/Item/mock";
import { Recombination } from "../helpers/combine";
import { getModBaseOnItem } from "../helpers/common";
// import { COVOKING_BASE_GROUP } from "../constants/covoking";
// import data from "../constants/data.json";

function App() {
  const [itemCombine, setItemCombine] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [item1, setItem1] = useState(sampleItem1);
  const [item2, setItem2] = useState(sampleItem2);
  const [times, setTimes] = useState(1);

  const combine = async () => {
    setLoading(true);
    const itemPromise = [];

    for (let i = 0; i < times; i++) {
      itemPromise.push(
        new Recombination({
          item1,
          item2,
        } as any).combine()
      );
    }

    const items = await Promise.all(itemPromise);

    setItemCombine(items);
    setLoading(false);
    setToggle(true);
    setTimeout(() => {
      ref1.current.classList.add("fadeOut");
      ref2.current.classList.add("fadeOut");
    }, 2000);
  };

  const reload = () => {
    setItemCombine([]);
    ref1.current.classList.remove("fadeOut");
    ref2.current.classList.remove("fadeOut");
    setToggle(false);
  };

  const ref1 = useRef<any>(null);
  const ref2 = useRef<any>(null);

  useEffect(() => {
    const CONVOKING_ID = 67;
    const newMod = getModBaseOnItem(CONVOKING_ID);
    console.log("newMod", newMod);
  }, []);

  return (
    <div className="flex flex-col mx-auto gap-2">
      <h1 className="md:text-2xl text-xl lg:text-3xl font-bold text-center">Recombinator</h1>

      <div className="w-full px-12 pt-12">
        <div className="flex mx-auto py-4 gap-4">
          <ul className="list-disc">
            <h5 className="text-sm font-bold">Important:</h5>
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
            {(itemCombine?.length &&
              itemCombine.map((itemC) => {
                return (
                  <div className="flex gap-4 p-2 shadow-xl bg-slate-600 rounded w-full ">
                    <ul className="px-4 w-1/4">
                      <h5 className="text-sm font-bold">Prefix hit: {itemC?.maximumPrefix || "n/a"}</h5>
                      <li className="text-xs list-decimal">0 Mod: {itemC?.prefixChance[0]}</li>
                      <li className="text-xs list-decimal">1 Mod: {itemC?.prefixChance[1]}</li>
                      <li className="text-xs list-decimal">2 Mod: {itemC?.prefixChance[2]}</li>
                      <li className="text-xs list-decimal">3 Mod: {itemC?.prefixChance[3]}</li>
                    </ul>
                    <ul className="px-4  w-1/4">
                      <h5 className="text-sm font-bold">Suffix hit: {itemC?.maximumSuffix || "n/a"}</h5>
                      <li className="text-xs list-decimal">0 Mod: {itemC?.suffixChance[0]}</li>
                      <li className="text-xs list-decimal">1 Mod: {itemC?.suffixChance[1]}</li>
                      <li className="text-xs list-decimal">2 Mod: {itemC?.suffixChance[2]}</li>
                      <li className="text-xs list-decimal">3 Mod: {itemC?.suffixChance[3]}</li>
                    </ul>

                    <ul className="px-4  w-1/2">
                      <h5 className="text-sm font-bold">Step produce:</h5>
                      {itemC?.history?.map((item: any) => {
                        return (
                          <li className="text-xs list-decimal">
                            {item.affix?.toUpperCase()}: {item.mod?.name_modifier}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })) ||
              ""}
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
            <GroupCombineItem data={itemCombine} />
            {/* {itemCombine?.map((item: any) => {
              return <Item value={item} hideButton revertAnimate />;
            })} */}
          </div>
          <div
            className={clsx({
              ["animate-pulse"]: loading,
            })}
            ref={ref2}
          >
            <Item value={sampleItem2} animate={toggle} onImport={(item: any) => setItem2(item)} />
          </div>
        </div>
        <div className="flex justify-center">
          {(!itemCombine?.length && (
            <div className="flex gap-2">
              <input
                className="w-12 text-black pl-1 bg-white border rounded"
                value={times}
                type="number"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTimes(Number(e.target.value))}
              />
              <Button
                onClick={combine}
                className="hover:bg-white transition-colors hover:text-slate-800"
                disabled={loading}
              >
                Combine
              </Button>
            </div>
          )) || (
            <Button
              onClick={reload}
              className="hover:bg-white transition-colors hover:text-slate-800"
              disabled={loading}
            >
              Restart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
export default App;

const GroupCombineItem = ({ data }: { data: any[] }) => {
  const group6 = data.filter((item) => item.prefix.length + item.suffix.length == 6);
  const group5 = data.filter((item) => item.prefix.length + item.suffix.length == 5);
  const group4 = data.filter((item) => item.prefix.length + item.suffix.length == 4);
  const group3 = data.filter((item) => item.prefix.length + item.suffix.length == 3);
  const group2 = data.filter((item) => item.prefix.length + item.suffix.length == 2);
  const group1 = data.filter((item) => item.prefix.length + item.suffix.length == 1);

  const [tab, setTab] = useState(6);
  if (!data.length) return <></>;
  return (
    <div className="flex flex-col gap-2">
      <div>
        Total {tab} mod:
        {tab === 6
          ? group6.length
          : tab == 5
          ? group5.length
            ? group5.length
            : 0
          : tab == 4
          ? group4.length
          : tab == 3
          ? group3.length
          : tab == 2
          ? group2.length
          : tab == 1
          ? group1.length
          : 0}
      </div>
      <div>
        <Button onClick={() => setTab(6)}>6</Button>
        <Button onClick={() => setTab(5)}>5</Button>
        <Button onClick={() => setTab(4)}>4</Button>
        <Button onClick={() => setTab(3)}>3</Button>
        <Button onClick={() => setTab(2)}>2</Button>
        <Button onClick={() => setTab(1)}>1</Button>
      </div>

      <div className="flex flex-row gap-4 overflow-auto">
        {tab == 1 &&
          group1?.map((item: any) => {
            return <Item value={item} hideButton revertAnimate />;
          })}
        {tab == 2 &&
          group2?.map((item: any) => {
            return <Item value={item} hideButton revertAnimate />;
          })}
        {tab == 3 &&
          group3?.map((item: any) => {
            return <Item value={item} hideButton revertAnimate />;
          })}
        {tab == 4 &&
          group4?.map((item: any) => {
            return <Item value={item} hideButton revertAnimate />;
          })}
        {tab == 5 &&
          group5?.map((item: any) => {
            return <Item value={item} hideButton revertAnimate />;
          })}
        {tab == 6 &&
          group6?.map((item: any) => {
            return <Item value={item} hideButton revertAnimate />;
          })}
      </div>
    </div>
  );
};
