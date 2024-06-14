export const getUpgrades = (id: EntityId) => {
  return stationUpgrades[id];
};

export const isUpgradable = (id: EntityId) => {
  return upgradableIds.indexOf(id) > -1;
};

const stationUpgrades: { [id: EntityId]: Upgrades } = {
  'Workbench': [
    'ChoppingBlock',
    'TanningRack',
    'Adze',
    'ToolShelf',
  ],
  'Forge': [
    'ForgeCooler',
    'Anvils',
    'SmithsAnvil',
    'ForgeToolrack',
    'ForgeBellows',
    'GrindingWheel',
  ],
  'Cauldron': [
    'SpiceRack',
    'ButchersTable',
    'PotsAndPans',
    'MortarAndPestle',
    'RollingPinsAndCuttingBoards',
  ],
  'BlackForge': [
    'BlackForgeCooler',
    'Vice',
    'MetalCutter',
    'GemCutter',
  ],
  'ArtisanTable': [
    'ArtisanPress',
  ],
  'GaldrTable': [
    'RuneTable',
    'UnfadingCandles',
    'FeatheryWreath',
  ],
};

const upgradableIds = Object.keys(stationUpgrades);
