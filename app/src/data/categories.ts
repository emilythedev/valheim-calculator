import { uniq } from 'lodash-es';
import data from './categories.json';
const mapping: { [id: CategoryId]: string } = data;

export const categories: CategoryList = {
  '': [
    'Armor',
    'Weapon',
    'CraftingStation',
    'Food',
    'Furniture',
    'Material',
    'Mead',
    'Misc',
    'Tool',
  ],
  'Weapon': [
    'Axe',
    'Bomb',
    'Bow',
    'Club',
    'Crossbow',
    'Knife',
    'Magic',
    'DamageStructure',
    'DefenseStructure',
    'Pickaxe',
    'Polearm',
    'Shield',
    'Spear',
    'Sword',
  ],
  'Armor': [
    'Cape',
    'FlametalArmor',
    'AskSet',
    'EmblaSet',
    'CarapaceArmor',
    'EitrWeaveSet',
    'PaddedArmor',
    'WolfArmor',
    'FenrisSet',
    'IronArmor',
    'RootSet',
    'BronzeArmor',
    'TrollSet',
    'LeatherArmor',
    'RagArmor',
    'OdinSet',
    'Hat',
  ],
};

export const getCategoryName = (category: CategoryId) => {
  return mapping[category] || `#${category}#`;
};

const catogoryEntities: { [categoryId: CategoryId]: EntityId[] } = {};

export const getCategoryEntities = (categoryId: CategoryId) => {
  return catogoryEntities[categoryId] || [];
};

const addToCateogries = (categories: CategoryId[], entities: EntityId[]) => {
  categories.forEach((cat) => {
    if (!catogoryEntities[cat]) {
      catogoryEntities[cat] = [];
    }

    catogoryEntities[cat] = uniq(catogoryEntities[cat].concat([...entities]));
  });
};

addToCateogries(['CraftingStation'], [
  'Adze',
  'Anvils',
  'ArtisanPress',
  'ArtisanTable',
  'BarberStation',
  'Beehive',
  'BlackForge',
  'BlackForgeCooler',
  'BlastFurnace',
  'ButchersTable',
  'Cauldron',
  'CharcoalKiln',
  'ChoppingBlock',
  'CookingStation',
  'EitrRefinery',
  'FeatheryWreath',
  'Fermenter',
  'Forge',
  'ForgeBellows',
  'ForgeCooler',
  'ForgeToolrack',
  'GaldrTable',
  'GemCutter',
  'GrindingWheel',
  'IronCookingStation',
  'MetalCutter',
  'MortarAndPestle',
  'Obliterator',
  'PotsAndPans',
  'RollingPinsAndCuttingBoards',
  'RuneTable',
  'SapExtractor',
  'ShieldGenerator',
  'Smelter',
  'SmithsAnvil',
  'SpiceRack',
  'SpinningWheel',
  'StoneOven',
  'Stonecutter',
  'TanningRack',
  'ToolShelf',
  'UnfadingCandles',
  'Vice',
  'Windmill',
  'WispFountain',
  'Workbench',
]);

addToCateogries(['Food'], [
  'BlackSoup',
  'BoarJerky',
  'Bread',
  'BreadDough',
  'CarrotSoup',
  'CookedChickenMeat',
  'CookedEgg',
  'CookedFish',
  'CookedLoxMeat',
  'CookedSerpentMeat',
  'DeerStew',
  'FierySvinstew',
  'FishNBread',
  'HoneyGlazedChicken',
  'LoxMeatPie',
  'MarinatedGreens',
  'MashedMeat',
  'MeatPlatter',
  'MincedMeatSauce',
  'MisthareSupreme',
  'Muckshake',
  'MushroomOmelette',
  'OnionSoup',
  'PiquantPie',
  'QueensJam',
  'RoastedCrustPie',
  'Salad',
  'Sausages',
  'ScorchingMedley',
  'SeekerAspic',
  'SerpentStew',
  'SizzlingBerryBroth',
  'SparklingShroomshake',
  'SpicyMarmalade',
  'StuffedMushroom',
  'TurnipStew',
  'UnbakedLoxPie',
  'UncookedFishNBread',
  'UncookedHoneyGlazedChicken',
  'UncookedMeatPlatter',
  'UncookedMisthareSupreme',
  'UncookedPiquantPie',
  'UncookedRoastedCrustPie',
  'UncookedStuffedMushroom',
  'YggdrasilPorridge',
]);

addToCateogries(['Mead'], [
  'BarleyWineBaseFireResistance',
  'FireResistanceBarleyWine',
  'FrostResistanceMead',
  'LingeringEitrMead',
  'LingeringHealingMead',
  'LingeringStaminaMead',
  'MajorHealingMead',
  'MeadBaseFrostResistance',
  'MeadBaseLingeringEitr',
  'MeadBaseLingeringHealth',
  'MeadBaseLingeringStamina',
  'MeadBaseMajorHealing',
  'MeadBaseMediumHealing',
  'MeadBaseMediumStamina',
  'MeadBaseMinorEitr',
  'MeadBaseMinorHealing',
  'MeadBaseMinorStamina',
  'MeadBasePoisonResistance',
  'MeadBaseTasty',
  'MediumHealingMead',
  'MediumStaminaMead',
  'MinorEitrMead',
  'MinorHealingMead',
  'MinorStaminaMead',
  'PoisonResistanceMead',
  'TastyMead',
]);

addToCateogries(['Material'], [
  'BarleyFlour',
  'Bell',
  'BronzeNails',
  'CeramicPlate',
  'IronNails',
  'LinenThread',
  'MechanicalSpring',
  'RefinedEitr',
  'SharpeningStone',
  'ShieldCore',
]);

addToCateogries(['Tool'], [
  'AntlerPickaxe',
  'BlackMetalPickaxe',
  'BlackmetalAxe',
  'BronzeAxe',
  'BronzePickaxe',
  'Cultivator',
  'FlintAxe',
  'Hammer',
  'Hoe',
  'HornOfCelebration',
  'IronPickaxe',
  'StoneAxe',
  'Tankard',
  'Torch',
]);

addToCateogries(['Furniture'], [
  'ArmorStand',
  'AshwoodBed',
  'AsksvinSkeleton',
  'Bed',
  'Bench',
  'BlackBanner',
  'BlackMarbleBench',
  'BlackMarbleTable',
  'BlackMarbleThrone',
  'BlackMetalChest',
  'BlueBanner',
  'BlueJuteCarpet',
  'BlueJuteCurtain',
  'BlueJuteDrapes',
  'BlueRedAndWhiteBanner',
  'Chair',
  'Chest',
  'DarkwoodChair',
  'DeerRug',
  'DragonBed',
  'DvergrLanternPole',
  'DvergrWallLantern',
  'GreenBanner',
  'HangingBrazier',
  'HareRug',
  'HotTub',
  'ItemStandHorizontal',
  'ItemStandVertical',
  'JackOTurnip',
  'LavaLantern',
  'LongHeavyTable',
  'LoxRug',
  'Maypole',
  'Mistletoe',
  'OrangeBanner',
  'PersonalChest',
  'PurpleBanner',
  'RavenThrone',
  'RedBanner',
  'RedJuteCarpet',
  'RedJuteCurtain',
  'ReinforcedChest',
  'RoundTable',
  'Sconce',
  'Sign',
  'StandingBlueBurningIronTorch',
  'StandingBrazier',
  'StandingGreenBurningIronTorch',
  'StandingIronTorch',
  'StandingWoodTorch',
  'StoneThrone',
  'Stool',
  'Table',
  'WhiteAndBlueStripedBanner',
  'WhiteAndRedStripedBanner',
  'WhiteBanner',
  'WispTorch',
  'WolfRug',
  'YellowBanner',
  'YuleGarland',
  'YuleTree',
  'YuleWreath',
  'YuleklappLarge',
  'YuleklappMedium',
  'YuleklappSmall',
]);

addToCateogries(['Misc'], [
  'AshwoodStack',
  'BlackMarblePile',
  'BoneStack',
  'Bonfire',
  'Campfire',
  'Cart',
  'CartographyTable',
  'CoalPile',
  'CoinPile',
  'CoinStack',
  'ColdFishingBait',
  'CoreWoodStack',
  'Drakkar',
  'DvergerLantern',
  'FineWoodStack',
  'FirepitIron',
  'FrostyFishingBait',
  'GraustenPile',
  'Hearth',
  'HeavyFishingBait',
  'HotFishingBait',
  'Karve',
  'Longship',
  'MistyFishingBait',
  'MossyFishingBait',
  'PavedRoad',
  'PileOfSkulls',
  'Portal',
  'PortalStone',
  'Raft',
  'StickyFishingBait',
  'StingyFishingBait',
  'StonePile',
  'Trap',
  'TreasureChest',
  'Ward',
  'WoodStack',
  'YggdrasilWoodStack',
]);

addToCateogries(['Weapon', 'Bow'], [
  'AshFang',
  'BloodFang',
  'BronzeheadArrow',
  'CarapaceArrow',
  'CharredArrow',
  'CrudeBow',
  'DraugrFang',
  'FinewoodBow',
  'FireArrow',
  'FlintheadArrow',
  'FrostArrow',
  'HuntsmanBow',
  'IronheadArrow',
  'NeedleArrow',
  'ObsidianArrow',
  'PoisonArrow',
  'RootFang',
  'SilverArrow',
  'Spinesnap',
  'StormFang',
  'WoodArrow',
]);

addToCateogries(['Weapon', 'Crossbow'], [
  'Arbalest',
  'BlackmetalBolt',
  'BoneBolt',
  'CarapaceBolt',
  'CharredBolt',
  'IronBolt',
  'Ripper',
  'RootRipper',
  'StormRipper',
  'WoundRipper',
]);

addToCateogries(['Weapon', 'DefenseStructure'], [
  'Ballista',
  'BlackMetalMissile',
  'FlametalMissile',
  'WoodenMissile',
]);


addToCateogries(['Weapon', 'DamageStructure'], [
  'BatteringRam',
  'Catapult',
  'ExplosivePayload',
]);

addToCateogries(['Weapon', 'Bomb'], [
  'BasaltBomb',
  'BileBomb',
  'OozeBomb',
  'SmokeBomb',
]);

addToCateogries(['Weapon', 'Axe'], [
  'Battleaxe',
  'BlackmetalAxe',
  'BronzeAxe',
  'CrystalBattleaxe',
  'FlintAxe',
  'IronAxe',
  'JotunBane',
  'StoneAxe',
]);

addToCateogries(['Weapon', 'Club'], [
  'Bloodgeon',
  'BronzeMace',
  'Club',
  'Demolisher',
  'FlametalMace',
  'Frostner',
  'IronMace',
  'IronSledge',
  'Klossen',
  'Porcupine',
  'Stagbreaker',
  'StormStar',
  'Torch',
]);

addToCateogries(['Weapon', 'Knife'], [
  'AbyssalRazor',
  'BlackmetalKnife',
  'ButcherKnife',
  'CopperKnife',
  'FlintKnife',
  'SilverKnife',
]);

addToCateogries(['Weapon', 'Magic'], [
  'DeadRaiser',
  'Dundr',
  'StaffOfEmbers',
  'StaffOfFracturing',
  'StaffOfFrost',
  'StaffOfProtection',
  'StaffOfTheWild',
  'Trollstav',
]);

addToCateogries(['Weapon', 'Pickaxe'], [
  'AntlerPickaxe',
  'BlackMetalPickaxe',
  'BronzePickaxe',
  'IronPickaxe',
]);

addToCateogries(['Weapon', 'Polearm'], [
  'BlackmetalAtgeir',
  'BronzeAtgeir',
  'Himminafl',
  'IronAtgeir',
]);

addToCateogries(['Weapon', 'Shield'], [
  'BandedShield',
  'BlackMetalShield',
  'BlackMetalTowerShield',
  'BoneTowerShield',
  'BronzeBuckler',
  'CarapaceBuckler',
  'CarapaceShield',
  'FlametalShield',
  'IronBuckler',
  'IronTowerShield',
  'SerpentScaleShield',
  'SilverShield',
  'WoodShield',
  'WoodTowerShield',
]);

addToCateogries(['Weapon', 'Spear'], [
  'AbyssalHarpoon',
  'AncientBarkSpear',
  'BronzeSpear',
  'CarapaceSpear',
  'FangSpear',
  'FlintSpear',
  'SplitnirTheBleeding',
  'SplitnirThePrimal',
  'SplitnirTheStorming',
  'Splitnir',
]);

addToCateogries(['Weapon', 'Sword'], [
  'BlackmetalSword',
  'BronzeSword',
  'IronSword',
  'Mistwalker',
  'NidhoggTheBleeding',
  'NidhoggThePrimal',
  'NidhoggTheThundering',
  'Nidhogg',
  'SilverSword',
]);

addToCateogries(['Armor', 'Hat'], ['FishingHat', 'PointyHat', 'MidsummerCrown']);

addToCateogries(['Armor', 'Cape'], [
  'DeerHideCape',
  'FeatherCape',
  'LinenCape',
  'LoxCape',
  'TrollHideCape',
  'WolfFurCape',
  'AshenCape',
  'AsksvinCloak',
]);

addToCateogries(['Armor', 'AskSet'], ['HoodOfAsk', 'TrousersOfAsk', 'BreastplateOfAsk']);

addToCateogries(['Armor', 'BronzeArmor'], ['BronzeHelmet', 'BronzePlateCuirass', 'BronzePlateLeggings']);

addToCateogries(['Armor', 'CarapaceArmor'], ['CarapaceBreastplate', 'CarapaceGreaves', 'CarapaceHelmet']);

addToCateogries(['Armor', 'EitrWeaveSet'], ['EitrWeaveHood', 'EitrWeaveRobe', 'EitrWeaveTrousers', 'FeatherCape']);

addToCateogries(['Armor', 'EmblaSet'], ['HoodOfEmbla', 'TrousersOfEmbla', 'RobesOfEmbla']);

addToCateogries(['Armor', 'FenrisSet'], ['FenrisCoat', 'FenrisHood', 'FenrisLeggings']);

addToCateogries(['Armor', 'FlametalArmor'], ['FlametalHelmet', 'FlametalBreastplate', 'FlametalGreaves']);

addToCateogries(['Armor', 'IronArmor'], ['IronGreaves', 'IronHelmet', 'IronScaleMail']);

addToCateogries(['Armor', 'LeatherArmor'], ['LeatherHelmet', 'LeatherPants', 'LeatherTunic', 'DeerHideCape']);

addToCateogries(['Armor', 'OdinSet'], ['CapeOfOdin', 'HoodOfOdin']);

addToCateogries(['Armor', 'PaddedArmor'], ['PaddedCuirass', 'PaddedGreaves', 'PaddedHelmet', 'LinenCape']);

addToCateogries(['Armor', 'RagArmor'], ['RagPants', 'RagTunic']);

addToCateogries(['Armor', 'RootSet'], ['RootHarnesk', 'RootLeggings', 'RootMask']);

addToCateogries(['Armor', 'TrollSet'], ['TrollLeatherHelmet', 'TrollLeatherPants', 'TrollLeatherTunic', 'TrollHideCape']);

addToCateogries(['Armor', 'WolfArmor'], ['DrakeHelmet', 'WolfArmorChest', 'WolfArmorLegs', 'WolfFurCape']);
