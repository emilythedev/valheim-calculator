export const getExtensions = (id: EntityId) => {
  return extensions[id];
};

export const isExtendable = (id: EntityId) => {
  return extendableIds.indexOf(id) > -1;
};

const extensions: { [id: EntityId]: Upgrades } = {
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

const extendableIds = Object.keys(extensions);
