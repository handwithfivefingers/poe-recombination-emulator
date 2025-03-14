import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import { parsePoEItem } from "../../helpers/parseStringToPOEItem";
import { getModGroup } from "../../helpers/splitModifier";
import { BaseProps } from "../../types/common";
import { IItemProps } from "../../types/item";
import { IModiferItemStat } from "../../types/modifier";
import { Button } from "../Button";
import { Icon } from "../Icon/shaper";
import { Modal } from "../Modal";

const Item = (props: IItemProps) => {
  const [show, setShow] = useState<boolean>(false);
  const [itemDetails, setItemDetails] = useState<any>(props?.value || {});

  const handleImport = () => {
    setShow(true);
  };

  const handleImportItem = (v: string) => {
    const itemJSON = parsePoEItem(v);
    const listModifers = itemJSON.mods;
    const prefix: any = [];
    const suffix: any = [];
    for (let i = 0; i < listModifers.length; i++) {
      const mod = listModifers[i];
      if (mod.affix === "prefix") {
        prefix.push(mod);
      } else if (mod.affix === "suffix") {
        suffix.push(mod);
      }
    }
    setItemDetails({ ...itemJSON, prefix, suffix });
    props?.onImport?.({ ...itemJSON, prefix, suffix });
  };

  useEffect(() => {
    console.log("itemDetails", itemDetails);
  }, [itemDetails]);
  return (
    <div className="flex flex-col gap-4 justify-start items-center">
      <div className="box border-2 relative rounded w-80  border-slate-500 bg-black flex  gap-2 items-start justify-center flex-col overflow-hidden flex-1">
        <div className="flex justify-between w-full items-center px-2 border-b border-slate-500 relative">
          {itemDetails?.base?.[0] && (
            <div className="absolute top-1/2 left-2 -translate-y-1/2">
              <Icon name={itemDetails?.base?.[0]} />
            </div>
          )}

          <h2 className="font-bold w-full flex justify-center py-2">{itemDetails.name}</h2>

          {itemDetails?.base?.[1] && (
            <div className="absolute top-1/2 right-2 -translate-y-1/2">
              <Icon name={itemDetails?.base?.[1]} />
            </div>
          )}
        </div>

        <div className="h-full overflow-auto my-4 px-4">
          {(itemDetails.prefix?.length && (
            <ul>
              {itemDetails.prefix?.map((detail: IModiferItemStat, i: number) => {
                return (
                  <ModiferItem
                    {...detail}
                    key={detail?.modgroup + i}
                    isLast={i === itemDetails.prefix.length - 1}
                    className={clsx("", {
                      ["fadeOut"]: props.animate,
                      ["opacity-0 fadeIn"]: props?.revertAnimate,
                    })}
                    style={{
                      animationDelay: `${i * 0.35}s`,
                    }}
                  />
                );
              })}
            </ul>
          )) ||
            ""}

          {(itemDetails.suffix?.length && (
            <ul>
              {itemDetails.suffix?.map((detail: IModiferItemStat, i: number) => {
                return (
                  <ModiferItem
                    {...detail}
                    key={detail?.modgroup + i}
                    isLast={i === itemDetails.suffix.length - 1}
                    className={clsx({
                      ["fadeOut"]: props.animate,
                      ["opacity-0 fadeIn"]: props?.revertAnimate,
                    })}
                    style={{
                      animationDelay: `${i * 0.35 + 1}s`,
                    }}
                  />
                );
              })}
            </ul>
          )) ||
            ""}
        </div>
        <Modal show={show}>
          <ImportModal onClose={() => setShow(false)} onSubmit={handleImportItem} />
        </Modal>
      </div>

      <div className="flex gap-2 flex-0 mt-auto">
        {!props?.hideButton && <Button onClick={handleImport}>Import</Button>}
      </div>
    </div>
  );
};

interface ICreateModal {
  onClose?: () => void;
  onSubmit?: (v: string) => void;
}
const ImportModal = ({ onClose, onSubmit }: ICreateModal) => {
  const [value, setValue] = useState<any>();

  return (
    <div className="flex flex-col gap-2">
      <textarea
        className="w-80 h-40 outline outline-slate-400 rounded text-neutral-800 p-2 text-sm"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setValue(e.target.value);
        }}
      />
      <div className="flex gap-2 justify-end">
        <Button onClick={onClose}>Close</Button>
        <Button
          onClick={() => {
            onSubmit?.(value);
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

// Item Class: Wands
// Rarity: Rare
// Golem Bite
// Demon's Horn
// --------
// Wand
// Physical Damage: 65-120 (augmented)
// Critical Strike Chance: 9.50%
// Attacks per Second: 1.40
// --------
// Requirements:
// Level: 66
// Int: 179
// --------
// Sockets: B-B
// --------
// Item Level: 86
// --------
// Adds 19 to 59 Fire Damage to Spells and Attacks (implicit)
// --------
// Socketed Gems are Supported by Level 16 Added Fire Damage
// Socketed Skills deal 40% more Spell Damage
// 110% increased Physical Damage
// 25% increased Fire Damage
// 41% increased Mana Regeneration Rate
// --------
// Shaper Item

// Rarity: Rare;
// Crafted Item
// Calling Wand
// --------
// Quality: +20% (augmented)
// Physical Damage: 15-27
// Critical Strike Chance: 8.30%
// Attacks Per Second: 1.50
// --------
// Requirements:
// Int: 81
// Level: 20
// --------
// Item Level: 100
// --------
// Minions deal 15% increased Damage (implicit)
// --------
// Damage Penetrates 4% Elemental Resistances
// Socketed Gems are Supported by Level 16 Lightning Penetration
// 52% increased Lightning Damage
// Socketed Gems are supported by Level 18 Elemental Damage with Attacks
// 29% increased Elemental Damage with Attack Skills
// --------
// Shaper Item

interface IModiferItem extends BaseProps, IModiferItemStat {}
const ModiferItem = (props: IModiferItem) => {
  const groups: any = useCallback(() => {
    return getModGroup(props?.id_mgroup) || false;
  }, [props]);
  return (
    <div
      className={clsx(props?.className, `flex gap-2 p-2`, {
        ["border-b border-neutral-500"]: !props.isLast,
      })}
      style={props?.style}
    >
      <div className="flex flex-col gap-1">
        <div className="flex gap-2">
          {groups()?.name_mgroup ? (
            <div className="w-6 flex-shrink-0 flex">
              <Icon name={groups()?.name_mgroup} />
            </div>
          ) : (
            ""
          )}
          <p className={`text-xs text-slate-300 ${props?.id_mgroup === "11" ? "text-white font-medium" : ""}`}>
            {props.name_modifier}{" "}
            <span className="text-white bg-neutral-500 rounded-full px-1">{props.affix === "prefix" ? "P" : "S"}</span>
          </p>
        </div>
        <div className="flex gap-1">
          {props?.id_mgroup !== "11" &&
            props.tag.map((item) => <Badge name={item.name_mtype} key={item.name_mtype + item.id_mtype} />)}
        </div>
      </div>
    </div>
  );
};
const Badge = ({ name }: { name: string }) => {
  return <span className="text-xs font-bold text-indigo-400 bg-neutral-300/20 px-2 rounded">{name}</span>;
};
export { Item };
