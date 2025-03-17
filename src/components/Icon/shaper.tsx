export const ShaperIcon = () => {
  return (
    <div className="w-8 h-8">
      <img src={"/assets/influence_2.png"} />
    </div>
  );
};
export const ElderIcon = () => {
  return (
    <div className="w-8 h-8">
      <img src={"/assets/influence_3.png"} />
    </div>
  );
};

export const CrusaderIcon = () => {
  return (
    <div className="w-8 h-8">
      <img src={"/assets/influence_4.png"} />
    </div>
  );
};
export const HunterIcon = () => {
  return (
    <div className="w-8 h-8">
      <img src={"/assets/influence_5.png"} />
    </div>
  );
};
export const WarlordIcon = () => {
  return (
    <div className="w-8 h-8">
      <img src={"/assets/influence_6.png"} />
    </div>
  );
};
export const RedeemerIcon = () => {
  return (
    <div className="w-8 h-8">
      <img src={"/assets/influence_7.png"} />
    </div>
  );
};
export const CraftIcon = () => {
  return (
    <div className="w-8 h-8">
      <img src={"/assets/vendor.png"} />
    </div>
  );
};
export const Veiled = () => {
  return (
    <div className="w-8 h-8">
      <img src={"/assets/fico_unveil.png"} />
    </div>
  );
};

const DefaultIcon = () => {
  return (
    <div className="w-6 h-6  rounded-full flex items-start pt-1 justify-center">
      <div className="rounded-full h-2 w-2 bg-amber-300/80" />
    </div>
  );
};

export const Icon = ({ name }: { name: string }) => {
  switch (name) {
    case "Shaper":
      return <ShaperIcon />;
    case "Elder":
      return <ElderIcon />;
    case "Crusader":
      return <CrusaderIcon />;
    case "Hunter":
      return <HunterIcon />;
    case "Warlord":
      return <WarlordIcon />;
    case "Redeemer":
      return <RedeemerIcon />;
    case "Veiled":
      return <Veiled />;
    case "Crafted":
      return <CraftIcon />;
    default:
      return <DefaultIcon />;
  }
};
