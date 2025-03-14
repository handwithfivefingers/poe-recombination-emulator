
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

const DefaultIcon = () => {
  return <div className="w-6 h-6 bg-indigo-900 rounded-full"></div>;
};

export const Icon = ({ name }: { name: string }) => {
  console.log("name", name);
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
    case "Crafted":
      return <CraftIcon />;
    default:
      return <DefaultIcon />;
  }
};
