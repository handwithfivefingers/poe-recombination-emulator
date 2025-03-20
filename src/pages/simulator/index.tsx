import clsx from "clsx";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { getBaseItems, getModBaseOnItem } from "../../helpers/common";
import { Icon } from "../../components/Icon/shaper";

const INFLUENCE = ["Shaper", "Elder", "Crusader", "Hunter", "Warlord", "Redeemer"];
export const Simulator = () => {
  const BASE_ITEM = getBaseItems();

  const [disabled, setDisabled] = useState(true);
  const [base, setBase] = useState<string>("");
  const [infl, setInfl] = useState<string[]>([]);
  const options = useMemo(() => {
    const modifiers = (base && getModBaseOnItem(base as any)) || new Map();
    console.log("modifiers", modifiers);
    const baseModifier = modifiers?.get("Base") || [];
    const infl1 = modifiers?.get(infl[0]) || [];
    const infl2 = modifiers?.get(infl[1]) || [];
    console.log("baseModifier", baseModifier);
    return [...baseModifier, ...infl1, ...infl2].map((item) => ({
      label: item.name_modifier,
      value: item.name_modifier,
      affix: item.affix,
    }));
  }, [base, infl]);

  console.log("options", options);
  return (
    <div className="flex mx-auto py-12 flex-col gap-4">
      <h1 className="font-bold text-3xl">Simulator</h1>
      <div className="flex mx-auto w-full shadow border rounded border-indigo-600 p-4">
        <div className="flex gap-2 flex-col w-[450px]">
          <div className="grid grid-cols-12">
            <div className="col-span-3">
              <Select
                label="Influence"
                options={INFLUENCE?.map((item) => ({
                  label: (
                    <div className="flex gap-2 text-black items-center text-xs">
                      <Icon name={item} />
                      <span>{item}</span>
                    </div>
                  ),
                  value: item,
                }))}
                onChange={(v) => {
                  setInfl([v, infl[1]]);
                }}
              />
            </div>

            <div className="col-span-6">
              <Select
                label="Base"
                options={BASE_ITEM.map((item: any) => {
                  return {
                    label: item.name_bitem,
                    value: item.id_base,
                  };
                })}
                onChange={(v: string) => {
                  setDisabled(false);
                  setBase(v);
                }}
              />
            </div>
            <div className="col-span-3">
              <Select
                label="Influence"
                options={INFLUENCE?.map((item) => ({
                  label: (
                    <div className="flex gap-2 text-black items-center text-xs">
                      <Icon name={item} />
                      <span>{item}</span>
                    </div>
                  ),
                  value: item,
                }))}
                onChange={(v) => setInfl([infl[0], v])}
              />
            </div>
          </div>
          <Select label="Prefix" disabled={disabled} options={options.filter((item) => item.affix === "prefix")} />
          <Select label="Prefix" disabled={disabled} options={options.filter((item) => item.affix === "prefix")} />
          <Select label="Prefix" disabled={disabled} options={options.filter((item) => item.affix === "prefix")} />
          <Select label="Suffix" disabled={disabled} options={options.filter((item) => item.affix === "suffix")} />
          <Select label="Suffix" disabled={disabled} options={options.filter((item) => item.affix === "suffix")} />
          <Select label="Suffix" disabled={disabled} options={options.filter((item) => item.affix === "suffix")} />
        </div>
      </div>
    </div>
  );
};

interface ISelect {
  label?: string;
  onChange?: (v: string) => void;
  options?: IOption[];
  disabled?: boolean;
}
interface IOption {
  label: string | React.ReactNode;
  value: string;
}
const Select = ({ label, onChange, options, disabled }: ISelect) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>("");
  const [displayValue, setDisplayValue] = useState<string>("");
  const [s, setS] = useState<string>("");
  const [filterOptions, setFilterOptions] = useState(options);

  useEffect(() => {
    if (value) onChange?.(value);
  }, [value]);
  const onSelect = (v: IOption) => {
    setValue(v.value);
    setDisplayValue(v.label as any);
    setOpen(false);
  };
  const activeRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (value && open) {
      activeRef?.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [open, value]);

  useEffect(() => {
    let t: number;
    const maskClose = (e: any) => {
      clearTimeout(t);
      if (!e.target?.closest("#dropdown")) {
        setOpen(false);
      }
    };
    if (open) {
      t = setTimeout(() => {
        window.addEventListener("click", maskClose);
      }, 250);
    }
    return () => {
      window.removeEventListener("click", maskClose);
    };
  }, [open]);

  useEffect(() => {
    if (s.trim()) {
      const newOptions = options?.filter((item) => {
        if (typeof item.label === "string") {
          return item.label.toLowerCase().includes(s.toLowerCase());
        }
        return getNodeText(item.label).includes(s.toLowerCase());
      });
      setFilterOptions(newOptions);
    } else {
      setFilterOptions(options);
    }
  }, [s]);

  const getNodeText = (node: any): any => {
    if (["string", "number"].includes(typeof node)) return node;
    if (node instanceof Array) return node.map(getNodeText).join("");
    if (typeof node === "object" && node) return getNodeText(node.props.children);
    return undefined;
  };

  useEffect(() => {
    setFilterOptions(options);
  }, [options]);
  return (
    <div className="flex gap-1 flex-col border-b pt-1 pb-2 border-neutral-500 px-4">
      <label>{label}</label>
      <div
        className={clsx("text-black rounded relative ", {
          ["bg-white/80"]: disabled,
          ["bg-white"]: !disabled,
        })}
      >
        <div className="relative">
          <input
            onClick={() => setOpen(true)}
            className="w-full py-1 px-2  cursor-pointer z-[1] relative"
            readOnly
            disabled={disabled}
            value=""
          />
          <div className="absolute top-0 left-0 px-2 py-2 rounded bottom-0 flex items-center text-xs">
            {displayValue}
          </div>
        </div>
        {(open && (
          <div
            className="absolute top-10 w-full left-0 z-10 bg-white rounded shadow min-w-[200px]"
            id="dropdown"
          >
            <div className="cursor-pointer text-black  sticky top-0 bg-white p-2 pt-1 w-full ">
              <input
                value={s}
                className={clsx("hover:bg-neutral-200 border mt-2 py-1 rounded w-full px-2")}
                id={"a1"}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setS(e.target?.value)}
              />
            </div>
            <ul className="max-h-80 overflow-auto py-2 px-2 ">
              {filterOptions?.map((item, index) => {
                return (
                  <li
                    key={item.value + "_" + index}
                    value={item.value}
                    className={clsx("hover:bg-neutral-200 px-2 rounded py-1 cursor-pointer text-black", {
                      ["bg-neutral-200"]: item.value === value,
                    })}
                    onClick={() => onSelect(item)}
                    ref={item.value === value ? activeRef : null}
                  >
                    {item.label}
                  </li>
                );
              })}
            </ul>
          </div>
        )) ||
          ""}
      </div>
    </div>
  );
};
