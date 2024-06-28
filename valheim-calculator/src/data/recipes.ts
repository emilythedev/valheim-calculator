import { keys } from 'lodash-es';
import { getEntityName } from './entity';

const createRecipe = (
  quality: QualityLevel,
  amount: number,
  craftingStation: CraftingStation | null,
  materials: RecipeMaterials,
): Recipe => ({
  quality,
  amount,
  craftingStation,
  materials,
});

const entities: {
  [id: EntityId]: Entity,
} = {};

const createEntity = (id: EntityId, recipes: Recipe[]) => {
  entities[id] = {
    id,
    recipes,
    upgradable: recipes.length > 1,
    maxQuality: recipes.length,
  } as Entity;
};

export const isEntityUpgradable = (id: EntityId) => {
  return entities[id]?.upgradable || false;
};

export const getEntityMaxQuality = (id: EntityId) => {
  return entities[id]?.maxQuality || 0;
};

export const getRecipe = (id: EntityId, quality: QualityLevel) => {
  return entities[id] ?
    (entities[id].recipes[quality - 1] || null) :
    null;
};

export const getCraftableEntityList = () => {
  return keys(entities).map((id) => ({
    key: id,
    label: getEntityName(id),
  }));
};

// Armor
createEntity('AshenCape',[createRecipe(1,1,{'BlackForge':3},{'AsksvinHide':6,'MorgenSinew':2,'Flametal':5}),createRecipe(2,1,{'BlackForge':4},{'AsksvinHide':2}),createRecipe(3,1,{'BlackForge':5},{'AsksvinHide':4}),createRecipe(4,1,{'BlackForge':6},{'AsksvinHide':6})]);
createEntity('AsksvinCloak',[createRecipe(1,1,{"GaldrTable":2},{"AsksvinHide":6,"MorgenSinew":2}),createRecipe(2,1,{"GaldrTable":3},{"AsksvinHide":2}),createRecipe(3,1,{"GaldrTable":4},{"AsksvinHide":4}),createRecipe(4,1,{"GaldrTable":5},{"AsksvinHide":6})]);
createEntity('BreastplateOfAsk',[createRecipe(1,1,{'BlackForge':3},{'LinenThread':15,'LoxPelt':4,'AsksvinHide':10}),createRecipe(2,1,{'BlackForge':4},{'LinenThread':10,'LoxPelt':2,'AsksvinHide':5}),createRecipe(3,1,{'BlackForge':5},{'LinenThread':20,'LoxPelt':4,'AsksvinHide':10}),createRecipe(4,1,{'BlackForge':6},{'LinenThread':30,'LoxPelt':6,'AsksvinHide':15})]);
createEntity('BronzeHelmet',[createRecipe(1,1,{'Forge':1},{'Bronze':5,'DeerHide':2}),createRecipe(2,1,{'Forge':2},{'Bronze':3}),createRecipe(3,1,{'Forge':3},{'Bronze':6}),createRecipe(4,1,{'Forge':4},{'Bronze':9})]);
createEntity('BronzePlateCuirass',[createRecipe(1,1,{'Forge':1},{'Bronze':5,'DeerHide':2}),createRecipe(2,1,{'Forge':2},{'Bronze':3}),createRecipe(3,1,{'Forge':3},{'Bronze':6}),createRecipe(4,1,{'Forge':4},{'Bronze':9})]);
createEntity('BronzePlateLeggings',[createRecipe(1,1,{'Forge':1},{'Bronze':5,'DeerHide':2}),createRecipe(2,1,{'Forge':2},{'Bronze':3}),createRecipe(3,1,{'Forge':3},{'Bronze':6}),createRecipe(4,1,{'Forge':4},{'Bronze':9})]);
createEntity('CapeOfOdin',[createRecipe(1,1,{'Workbench':1},{'LeatherScraps':10,'Coal':4}),createRecipe(2,1,{'Workbench':2},{'LeatherScraps':5,'Coal':2}),createRecipe(3,1,{'Workbench':3},{'LeatherScraps':10,'Coal':4}),createRecipe(4,1,{'Workbench':4},{'LeatherScraps':15,'Coal':6})]);
createEntity('CarapaceBreastplate',[createRecipe(1,1,{'BlackForge':1},{'Carapace':20,'ScaleHide':3,'Iron':5,'RefinedEitr':4}),createRecipe(2,1,{'BlackForge':2},{'Carapace':10,'ScaleHide':1,'RefinedEitr':2}),createRecipe(3,1,{'BlackForge':3},{'Carapace':20,'ScaleHide':2,'RefinedEitr':4}),createRecipe(4,1,{'BlackForge':4},{'Carapace':30,'ScaleHide':3,'RefinedEitr':6})]);
createEntity('CarapaceGreaves',[createRecipe(1,1,{'BlackForge':1},{'Carapace':20,'ScaleHide':3,'Iron':5,'RefinedEitr':4}),createRecipe(2,1,{'BlackForge':2},{'Carapace':10,'ScaleHide':1,'RefinedEitr':2}),createRecipe(3,1,{'BlackForge':3},{'Carapace':20,'ScaleHide':2,'RefinedEitr':4}),createRecipe(4,1,{'BlackForge':4},{'Carapace':30,'ScaleHide':3,'RefinedEitr':6})]);
createEntity('CarapaceHelmet',[createRecipe(1,1,{'BlackForge':1},{'Carapace':16,'ScaleHide':3,'Mandible':2,'RefinedEitr':4}),createRecipe(2,1,{'BlackForge':2},{'Carapace':8,'ScaleHide':1,'RefinedEitr':2}),createRecipe(3,1,{'BlackForge':3},{'Carapace':16,'ScaleHide':2,'RefinedEitr':4}),createRecipe(4,1,{'BlackForge':4},{'Carapace':24,'ScaleHide':3,'RefinedEitr':6})]);
createEntity('DeerHideCape',[createRecipe(1,1,{'Workbench':2},{'DeerHide':4,'BoneFragments':5}),createRecipe(2,1,{'Workbench':3},{'DeerHide':4,'BoneFragments':5}),createRecipe(3,1,{'Workbench':4},{'DeerHide':8,'BoneFragments':10}),createRecipe(4,1,{'Workbench':5},{'DeerHide':12,'BoneFragments':15})]);
createEntity('DrakeHelmet',[createRecipe(1,1,{'Forge':1},{'Silver':20,'WolfPelt':2,'DrakeTrophy':2}),createRecipe(2,1,{'Forge':2},{'Silver':5}),createRecipe(3,1,{'Forge':4},{'Silver':10}),createRecipe(4,1,{'Forge':4},{'Silver':15})]);
createEntity('DvergerLantern',[createRecipe(1,1,{'BlackForge':1},{'Bronze':2,'SurtlingCore':1,'Crystal':1})]);
createEntity('EitrWeaveHood',[createRecipe(1,1,{'GaldrTable':1},{'LinenThread':16,'RefinedEitr':15,'Iron':2}),createRecipe(2,1,{'GaldrTable':2},{'LinenThread':8,'RefinedEitr':5}),createRecipe(3,1,{'GaldrTable':3},{'LinenThread':16,'RefinedEitr':10}),createRecipe(4,1,{'GaldrTable':4},{'LinenThread':24,'RefinedEitr':15})]);
createEntity('EitrWeaveRobe',[createRecipe(1,1,{'GaldrTable':1},{'LinenThread':20,'RefinedEitr':20,'Feathers':10,'ScaleHide':5}),createRecipe(2,1,{'GaldrTable':2},{'LinenThread':10,'RefinedEitr':5}),createRecipe(3,1,{'GaldrTable':3},{'LinenThread':20,'RefinedEitr':10}),createRecipe(4,1,{'GaldrTable':4},{'LinenThread':30,'RefinedEitr':15})]);
createEntity('EitrWeaveTrousers',[createRecipe(1,1,{'GaldrTable':1},{'LinenThread':20,'RefinedEitr':20,'ScaleHide':10}),createRecipe(2,1,{'GaldrTable':2},{'LinenThread':10,'RefinedEitr':5}),createRecipe(3,1,{'GaldrTable':3},{'LinenThread':20,'RefinedEitr':10}),createRecipe(4,1,{'GaldrTable':4},{'LinenThread':30,'RefinedEitr':15})]);
createEntity('FeatherCape',[createRecipe(1,1,{'GaldrTable':1},{'Feathers':10,'ScaleHide':5,'RefinedEitr':20}),createRecipe(2,1,{'GaldrTable':2},{'Feathers':2,'ScaleHide':5,'RefinedEitr':3}),createRecipe(3,1,{'GaldrTable':3},{'Feathers':4,'ScaleHide':10,'RefinedEitr':6}),createRecipe(4,1,{'GaldrTable':4},{'Feathers':6,'ScaleHide':15,'RefinedEitr':9})]);
createEntity('FenrisCoat',[createRecipe(1,1,{'Workbench':2},{'FenrisHair':20,'WolfPelt':5,'LeatherScraps':10}),createRecipe(2,1,{'Workbench':3},{'FenrisHair':5,'WolfPelt':3,'LeatherScraps':4}),createRecipe(3,1,{'Workbench':4},{'FenrisHair':10,'WolfPelt':6,'LeatherScraps':8}),createRecipe(4,1,{'Workbench':5},{'FenrisHair':15,'WolfPelt':9,'LeatherScraps':12})]);
createEntity('FenrisHood',[createRecipe(1,1,{'Workbench':2},{'FenrisHair':20,'WolfPelt':2,'CultistTrophy':1}),createRecipe(2,1,{'Workbench':3},{'FenrisHair':5,'WolfPelt':4}),createRecipe(3,1,{'Workbench':4},{'FenrisHair':10,'WolfPelt':8}),createRecipe(4,1,{'Workbench':5},{'FenrisHair':15,'WolfPelt':12})]);
createEntity('FenrisLeggings',[createRecipe(1,1,{'Workbench':2},{'FenrisHair':20,'WolfPelt':5,'LeatherScraps':10}),createRecipe(2,1,{'Workbench':3},{'FenrisHair':5,'WolfPelt':3,'LeatherScraps':4}),createRecipe(3,1,{'Workbench':4},{'FenrisHair':10,'WolfPelt':6,'LeatherScraps':8}),createRecipe(4,1,{'Workbench':5},{'FenrisHair':15,'WolfPelt':9,'LeatherScraps':12})]);
createEntity('FishingHat',[createRecipe(1,1,{'Workbench':4},{'Perch':1,'Pike':1,'Tuna':1,'Tetra':1,'Trollfish':1,'GiantHerring':1,'Grouper':1,'CoralCod':1,'Anglerfish':1,'NorthernSalmon':1,'Magmafish':1,'Pufferfish':1}),createRecipe(2,1,{'Workbench':5},{'Perch':1,'Pike':1,'Tuna':1,'Tetra':1,'Trollfish':1,'GiantHerring':1,'Grouper':1,'CoralCod':1,'Anglerfish':1,'NorthernSalmon':1,'Magmafish':1,'Pufferfish':1}),createRecipe(3,1,{'Workbench':6},{'Perch':2,'Pike':2,'Tuna':2,'Tetra':2,'Trollfish':2,'GiantHerring':2,'Grouper':2,'CoralCod':2,'Anglerfish':2,'NorthernSalmon':2,'Magmafish':2,'Pufferfish':2}),createRecipe(4,1,{'Workbench':7},{'Perch':3,'Pike':3,'Tuna':3,'Tetra':3,'Trollfish':3,'GiantHerring':3,'Grouper':3,'CoralCod':3,'Anglerfish':3,'NorthernSalmon':3,'Magmafish':3,'Pufferfish':3})]);
createEntity('FlametalBreastplate',[createRecipe(1,1,{'BlackForge':3},{'Flametal':20,'AsksvinHide':3,'CharredBone':5,'MorgenHeart':1}),createRecipe(2,1,{'BlackForge':4},{'Flametal':10,'AsksvinHide':1}),createRecipe(3,1,{'BlackForge':5},{'Flametal':20,'AsksvinHide':2}),createRecipe(4,1,{'BlackForge':6},{'Flametal':30,'AsksvinHide':3})]);
createEntity('FlametalGreaves',[createRecipe(1,1,{'BlackForge':3},{'Flametal':20,'AsksvinHide':3,'CharredBone':5}),createRecipe(2,1,{'BlackForge':4},{'Flametal':10,'AsksvinHide':1}),createRecipe(3,1,{'BlackForge':5},{'Flametal':20,'AsksvinHide':2}),createRecipe(4,1,{'BlackForge':6},{'Flametal':30,'AsksvinHide':3})]);
createEntity('FlametalHelmet',[createRecipe(1,1,{'BlackForge':3},{'Flametal':16,'AsksvinHide':3,'CharredBone':2,'RefinedEitr':4}),createRecipe(2,1,{'BlackForge':4},{'Flametal':8,'AsksvinHide':1,'RefinedEitr':2}),createRecipe(3,1,{'BlackForge':5},{'Flametal':16,'AsksvinHide':2,'RefinedEitr':4}),createRecipe(4,1,{'BlackForge':6},{'Flametal':24,'AsksvinHide':3,'RefinedEitr':6})]);
createEntity('HoodOfAsk',[createRecipe(1,1,{'BlackForge':3},{'LinenThread':15,'LoxPelt':4,'AsksvinHide':10}),createRecipe(2,1,{'BlackForge':4},{'LinenThread':10,'LoxPelt':2,'AsksvinHide':5}),createRecipe(3,1,{'BlackForge':5},{'LinenThread':20,'LoxPelt':4,'AsksvinHide':10}),createRecipe(4,1,{'BlackForge':6},{'LinenThread':30,'LoxPelt':6,'AsksvinHide':15})]);
createEntity('HoodOfEmbla',[createRecipe(1,1,{'GaldrTable':2},{'LinenThread':16,'RefinedEitr':15,'AsksvinHide':2}),createRecipe(2,1,{'GaldrTable':3},{'LinenThread':8,'RefinedEitr':5}),createRecipe(3,1,{'GaldrTable':4},{'LinenThread':16,'RefinedEitr':10}),createRecipe(4,1,{'GaldrTable':5},{'LinenThread':24,'RefinedEitr':15})]);
createEntity('HoodOfOdin',[createRecipe(1,1,{'Workbench':1},{'LeatherScraps':10,'Coal':4}),createRecipe(2,1,{'Workbench':2},{'LeatherScraps':5,'Coal':2}),createRecipe(3,1,{'Workbench':3},{'LeatherScraps':10,'Coal':4}),createRecipe(4,1,{'Workbench':4},{'LeatherScraps':15,'Coal':6})]);
createEntity('IronGreaves',[createRecipe(1,1,{'Forge':2},{'Iron':20,'DeerHide':2}),createRecipe(2,1,{'Forge':3},{'Iron':5}),createRecipe(3,1,{'Forge':4},{'Iron':10}),createRecipe(4,1,{'Forge':5},{'Iron':15})]);
createEntity('IronHelmet',[createRecipe(1,1,{'Forge':1},{'Iron':20,'DeerHide':2}),createRecipe(2,1,{'Forge':2},{'Iron':5}),createRecipe(3,1,{'Forge':3},{'Iron':10}),createRecipe(4,1,{'Forge':4},{'Iron':15})]);
createEntity('IronScaleMail',[createRecipe(1,1,{'Forge':2},{'Iron':20,'DeerHide':2}),createRecipe(2,1,{'Forge':3},{'Iron':5}),createRecipe(3,1,{'Forge':4},{'Iron':10}),createRecipe(4,1,{'Forge':5},{'Iron':15})]);
createEntity('LeatherHelmet',[createRecipe(1,1,{'Workbench':2},{'DeerHide':6}),createRecipe(2,1,{'Workbench':3},{'DeerHide':6,'BoneFragments':5}),createRecipe(3,1,{'Workbench':4},{'DeerHide':12,'BoneFragments':10}),createRecipe(4,1,{'Workbench':5},{'DeerHide':18,'BoneFragments':15})]);
createEntity('LeatherPants',[createRecipe(1,1,{'Workbench':2},{'DeerHide':6}),createRecipe(2,1,{'Workbench':3},{'DeerHide':6,'BoneFragments':5}),createRecipe(3,1,{'Workbench':4},{'DeerHide':12,'BoneFragments':10}),createRecipe(4,1,{'Workbench':5},{'DeerHide':18,'BoneFragments':15})]);
createEntity('LeatherTunic',[createRecipe(1,1,{'Workbench':2},{'DeerHide':6}),createRecipe(2,1,{'Workbench':3},{'DeerHide':6,'BoneFragments':5}),createRecipe(3,1,{'Workbench':4},{'DeerHide':12,'BoneFragments':10}),createRecipe(4,1,{'Workbench':5},{'DeerHide':18,'BoneFragments':15})]);
createEntity('LinenCape',[createRecipe(1,1,{'Workbench':2},{'LinenThread':20,'Silver':1}),createRecipe(2,1,{'Workbench':3},{'LinenThread':4}),createRecipe(3,1,{'Workbench':4},{'LinenThread':8}),createRecipe(4,1,{'Workbench':5},{'LinenThread':12})]);
createEntity('LoxCape',[createRecipe(1,1,{'Workbench':2},{'LoxPelt':6,'Silver':2}),createRecipe(2,1,{'Workbench':3},{'LoxPelt':2}),createRecipe(3,1,{'Workbench':4},{'LoxPelt':4}),createRecipe(4,1,{'Workbench':5},{'LoxPelt':6})]);
createEntity('MidsummerCrown',[createRecipe(1,1,{'Workbench':1},{'Dandelion':10})]);
createEntity('PaddedCuirass',[createRecipe(1,1,{'Forge':2},{'Iron':10,'LinenThread':20}),createRecipe(2,1,{'Forge':2},{'Iron':3,'LinenThread':10}),createRecipe(3,1,{'Forge':3},{'Iron':6,'LinenThread':20}),createRecipe(4,1,{'Forge':4},{'Iron':9,'LinenThread':30})]);
createEntity('PaddedGreaves',[createRecipe(1,1,{'Forge':2},{'Iron':10,'LinenThread':20}),createRecipe(2,1,{'Forge':2},{'Iron':3,'LinenThread':10}),createRecipe(3,1,{'Forge':3},{'Iron':6,'LinenThread':20}),createRecipe(4,1,{'Forge':4},{'Iron':9,'LinenThread':30})]);
createEntity('PaddedHelmet',[createRecipe(1,1,{'Forge':1},{'Iron':10,'LinenThread':15}),createRecipe(2,1,{'Forge':2},{'Iron':5,'LinenThread':10}),createRecipe(3,1,{'Forge':3},{'Iron':10,'LinenThread':20}),createRecipe(4,1,{'Forge':4},{'Iron':15,'LinenThread':30})]);
createEntity('PointyHat',[createRecipe(1,1,{'Workbench':1},{'DeerHide':3,'Coal':5,'Bronze':1})]);
createEntity('RagPants',[createRecipe(1,1,{'Workbench':1},{'LeatherScraps':5}),createRecipe(2,1,{'Workbench':2},{'LeatherScraps':5})]);
createEntity('RagTunic',[createRecipe(1,1,{'Workbench':1},{'LeatherScraps':5}),createRecipe(2,1,{'Workbench':2},{'LeatherScraps':5})]);
createEntity('RobesOfEmbla',[createRecipe(1,1,{'GaldrTable':2},{'LinenThread':20,'RefinedEitr':20,'AsksvinHide':10,'Flametal':5}),createRecipe(2,1,{'GaldrTable':3},{'LinenThread':10,'RefinedEitr':5,'Flametal':2}),createRecipe(3,1,{'GaldrTable':4},{'LinenThread':20,'RefinedEitr':10,'Flametal':4}),createRecipe(4,1,{'GaldrTable':5},{'LinenThread':30,'RefinedEitr':15,'Flametal':6})]);
createEntity('RootHarnesk',[createRecipe(1,1,{'Workbench':2},{'Root':10,'AncientBark':10,'DeerHide':2}),createRecipe(2,1,{'Workbench':3},{'Root':2,'AncientBark':5}),createRecipe(3,1,{'Workbench':4},{'Root':4,'AncientBark':10}),createRecipe(4,1,{'Workbench':5},{'Root':6,'AncientBark':15})]);
createEntity('RootLeggings',[createRecipe(1,1,{'Workbench':2},{'Root':10,'AncientBark':10,'DeerHide':2}),createRecipe(2,1,{'Workbench':3},{'Root':2,'AncientBark':5}),createRecipe(3,1,{'Workbench':4},{'Root':4,'AncientBark':10}),createRecipe(4,1,{'Workbench':5},{'Root':6,'AncientBark':15})]);
createEntity('RootMask',[createRecipe(1,1,{'Workbench':2},{'Root':10,'AncientBark':10,'LeatherScraps':4}),createRecipe(2,1,{'Workbench':3},{'Root':2,'AncientBark':5}),createRecipe(3,1,{'Workbench':4},{'Root':4,'AncientBark':10}),createRecipe(4,1,{'Workbench':5},{'Root':6,'AncientBark':15})]);
createEntity('TrollHideCape',[createRecipe(1,1,{'Workbench':2},{'TrollHide':10,'BoneFragments':10}),createRecipe(2,1,{'Workbench':3},{'TrollHide':5,'BoneFragments':5}),createRecipe(3,1,{'Workbench':4},{'TrollHide':10,'BoneFragments':10}),createRecipe(4,1,{'Workbench':5},{'TrollHide':15,'BoneFragments':15})]);
createEntity('TrollLeatherHelmet',[createRecipe(1,1,{'Workbench':2},{'TrollHide':5,'BoneFragments':3}),createRecipe(2,1,{'Workbench':3},{'TrollHide':2,'BoneFragments':1}),createRecipe(3,1,{'Workbench':4},{'TrollHide':4,'BoneFragments':2}),createRecipe(4,1,{'Workbench':5},{'TrollHide':6,'BoneFragments':3})]);
createEntity('TrollLeatherPants',[createRecipe(1,1,{'Workbench':2},{'TrollHide':5}),createRecipe(2,1,{'Workbench':3},{'TrollHide':2}),createRecipe(3,1,{'Workbench':4},{'TrollHide':4}),createRecipe(4,1,{'Workbench':5},{'TrollHide':6})]);
createEntity('TrollLeatherTunic',[createRecipe(1,1,{'Workbench':2},{'TrollHide':5}),createRecipe(2,1,{'Workbench':3},{'TrollHide':2}),createRecipe(3,1,{'Workbench':4},{'TrollHide':4}),createRecipe(4,1,{'Workbench':5},{'TrollHide':6})]);
createEntity('TrousersOfAsk',[createRecipe(1,1,{'BlackForge':3},{'LinenThread':15,'LoxPelt':4,'AsksvinHide':10}),createRecipe(2,1,{'BlackForge':4},{'LinenThread':10,'LoxPelt':2,'AsksvinHide':5}),createRecipe(3,1,{'BlackForge':5},{'LinenThread':20,'LoxPelt':4,'AsksvinHide':10}),createRecipe(4,1,{'BlackForge':6},{'LinenThread':30,'LoxPelt':6,'AsksvinHide':15})]);
createEntity('TrousersOfEmbla',[createRecipe(1,1,{'GaldrTable':2},{'LinenThread':20,'RefinedEitr':20,'AsksvinHide':10}),createRecipe(2,1,{'GaldrTable':3},{'LinenThread':10,'RefinedEitr':5}),createRecipe(3,1,{'GaldrTable':4},{'LinenThread':20,'RefinedEitr':10}),createRecipe(4,1,{'GaldrTable':5},{'LinenThread':30,'RefinedEitr':15})]);
createEntity('WolfArmorChest',[createRecipe(1,1,{'Forge':2},{'Silver':20,'WolfPelt':5,'Chain':1}),createRecipe(2,1,{'Forge':2},{'Silver':5,'WolfPelt':2}),createRecipe(3,1,{'Forge':4},{'Silver':10,'WolfPelt':4}),createRecipe(4,1,{'Forge':4},{'Silver':15,'WolfPelt':6})]);
createEntity('WolfArmorLegs',[createRecipe(1,1,{'Forge':2},{'Silver':20,'WolfPelt':5,'WolfFang':4}),createRecipe(2,1,{'Forge':2},{'Silver':5,'WolfPelt':2,'WolfFang':1}),createRecipe(3,1,{'Forge':4},{'Silver':10,'WolfPelt':4,'WolfFang':2}),createRecipe(4,1,{'Forge':4},{'Silver':15,'WolfPelt':6,'WolfFang':3})]);
createEntity('WolfFurCape',[createRecipe(1,1,{'Workbench':2},{'WolfPelt':6,'Silver':4,'WolfTrophy':1}),createRecipe(2,1,{'Workbench':3},{'WolfPelt':4,'Silver':2}),createRecipe(3,1,{'Workbench':4},{'WolfPelt':8,'Silver':4}),createRecipe(4,1,{'Workbench':5},{'WolfPelt':12,'Silver':6})]);

// Food
createEntity('BlackSoup',[createRecipe(1,1,{'Cauldron':1},{'Bloodbag':1,'Honey':1,'Turnip':1})]);
createEntity('BoarJerky',[createRecipe(1,2,{'Cauldron':1},{'BoarMeat':1,'Honey':1})]);
createEntity('Bread',[createRecipe(1,1,{'StoneOven':1},{'BreadDough':1})]);
createEntity('BreadDough',[createRecipe(1,2,{'Cauldron':1},{'BarleyFlour':10})]);
createEntity('CarrotSoup',[createRecipe(1,1,{'Cauldron':1},{'Mushroom':1,'Carrot':3})]);
createEntity('CookedChickenMeat',[createRecipe(1,1,{'CookingStation':1},{'ChickenMeat':1})]);
createEntity('CookedEgg',[createRecipe(1,1,{'Cauldron':1},{'Egg':1})]);
createEntity('CookedFish',[createRecipe(1,1,{'CookingStation':1},{'RawFish':1})]);
createEntity('CookedLoxMeat',[createRecipe(1,1,{'IronCookingStation':1},{'LoxMeat':1})]);
createEntity('CookedSerpentMeat',[createRecipe(1,1,{'IronCookingStation':1},{'SerpentMeat':1})]);
createEntity('DeerStew',[createRecipe(1,1,{'Cauldron':1},{'Blueberries':1,'Carrot':1,'CookedDeerMeat':1})]);
createEntity('FierySvinstew',[createRecipe(1,1,{'Cauldron':1},{'AsksvinTail':1,'VineberryCluster':2,'SmokePuff':1})]);
createEntity('FishNBread',[createRecipe(1,1,{'StoneOven':1},{'Bread':1})]);
createEntity('HoneyGlazedChicken',[createRecipe(1,1,{'StoneOven':1},{'UncookedHoneyGlazedChicken':1})]);
createEntity('LoxMeatPie',[createRecipe(1,1,{'StoneOven':1},{'UnbakedLoxPie':1})]);
createEntity('MarinatedGreens',[createRecipe(1,1,{'Cauldron':1},{'Sap':3,'Magecap':2,'Fiddlehead':2,'SmokePuff':2})]);
createEntity('MashedMeat',[createRecipe(1,1,{'Cauldron':1},{'AsksvinTail':1,'VoltureMeat':1,'Fiddlehead':1})]);
createEntity('MeatPlatter',[createRecipe(1,1,{'StoneOven':1},{'UncookedMeatPlatter':1})]);
createEntity('MincedMeatSauce',[createRecipe(1,1,{'Cauldron':1},{'BoarMeat':1,'NeckTail':1,'Carrot':1})]);
createEntity('MisthareSupreme',[createRecipe(1,1,{'StoneOven':1},{'UncookedMisthareSupreme':1})]);
createEntity('Muckshake',[createRecipe(1,1,{'Cauldron':1},{'Ooze':1,'Raspberries':2,'Blueberries':2})]);
createEntity('MushroomOmelette',[createRecipe(1,1,{'Cauldron':1},{'Egg':3,'JotunPuffs':3})]);
createEntity('OnionSoup',[createRecipe(1,1,{'Cauldron':1},{'Onion':3})]);
createEntity('PiquantPie',[createRecipe(1,1,{'StoneOven':1},{'UncookedPiquantPie':1})]);
createEntity('QueensJam',[createRecipe(1,4,{'Cauldron':1},{'Raspberries':8,'Blueberries':6})]);
createEntity('RoastedCrustPie',[createRecipe(1,1,{'StoneOven':1},{'UncookedRoastedCrustPie':1})]);
createEntity('Salad',[createRecipe(1,3,{'Cauldron':1},{'JotunPuffs':3,'Onion':3,'Cloudberries':3})]);
createEntity('Sausages',[createRecipe(1,4,{'Cauldron':1},{'Entrails':4,'BoarMeat':1,'Thistle':1})]);
createEntity('ScorchingMedley',[createRecipe(1,3,{'Cauldron':1},{'JotunPuffs':3,'Onion':3,'Fiddlehead':3})]);
createEntity('SeekerAspic',[createRecipe(1,2,{'Cauldron':1},{'SeekerMeat':2,'Magecap':2,'RoyalJelly':2})]);
createEntity('SerpentStew',[createRecipe(1,1,{'Cauldron':1},{'Mushroom':1,'CookedSerpentMeat':1,'Honey':2})]);
createEntity('SizzlingBerryBroth',[createRecipe(1,1,{'Cauldron':1},{'Sap':3,'Fiddlehead':2,'VineberryCluster':2})]);
createEntity('SparklingShroomshake',[createRecipe(1,1,{'Cauldron':1},{'Sap':4,'VineberryCluster':2,'SmokePuff':2,'Magecap':2})]);
createEntity('SpicyMarmalade',[createRecipe(1,1,{'Cauldron':1},{'VineberryCluster':3,'Honey':1,'Fiddlehead':1})]);
createEntity('StuffedMushroom',[createRecipe(1,1,{'StoneOven':1},{'UncookedStuffedMushroom':1})]);
createEntity('TurnipStew',[createRecipe(1,1,{'Cauldron':1},{'BoarMeat':1,'Turnip':3})]);
createEntity('UnbakedLoxPie',[createRecipe(1,1,{'Cauldron':1},{'BarleyFlour':4,'Cloudberries':2,'LoxMeat':2})]);
createEntity('UncookedFishNBread',[createRecipe(1,1,{'Cauldron':1},{'Anglerfish':1,'BreadDough':2})]);
createEntity('UncookedHoneyGlazedChicken',[createRecipe(1,1,{'Cauldron':1},{'ChickenMeat':1,'Honey':3,'JotunPuffs':2})]);
createEntity('UncookedMeatPlatter',[createRecipe(1,1,{'Cauldron':1},{'SeekerMeat':1,'LoxMeat':1,'HareMeat':1})]);
createEntity('UncookedMisthareSupreme',[createRecipe(1,1,{'Cauldron':1},{'HareMeat':1,'JotunPuffs':3,'Carrot':2})]);
createEntity('UncookedPiquantPie',[createRecipe(1,1,{'Cauldron':1},{'AsksvinTail':2,'VineberryCluster':2,'BarleyFlour':4})]);
createEntity('UncookedRoastedCrustPie',[createRecipe(1,1,{'Cauldron':1},{'VoltureEgg':1,'VineberryCluster':2,'BarleyFlour':4})]);
createEntity('UncookedStuffedMushroom',[createRecipe(1,1,{'Cauldron':1},{'Magecap':3,'BloodClot':1,'Turnip':2})]);
createEntity('YggdrasilPorridge',[createRecipe(1,1,{'Cauldron':1},{'Sap':4,'Barley':3,'RoyalJelly':2})]);

// Furniture
createEntity('ArmorStand',[createRecipe(1,1,{'Workbench':1},{'FineWood':8,'IronNails':4,'LeatherScraps':2})]);
createEntity('AshwoodBed',[createRecipe(1,1,{'Workbench':1},{'Ashwood':8,'LoxPelt':2,'AsksvinHide':2})]);
createEntity('AsksvinSkeleton',[createRecipe(1,1,{'Workbench':1},{'BoneFragments':50,'AsksvinNeck':1,'AsksvinPelvis':1,'AsksvinRibcage':1,'AsksvinSkull':1})]);
createEntity('Bed',[createRecipe(1,1,{'Workbench':1},{'Wood':8})]);
createEntity('Bench',[createRecipe(1,1,{'Workbench':1},{'FineWood':6})]);
createEntity('BlackBanner',[createRecipe(1,1,{'Workbench':1},{'FineWood':2,'LeatherScraps':6,'Coal':4})]);
createEntity('BlackMarbleBench',[createRecipe(1,1,{'Stonecutter':1},{'BlackMarble':6,'Copper':3})]);
createEntity('BlackMarbleTable',[createRecipe(1,1,{'Stonecutter':1},{'BlackMarble':6,'Copper':3})]);
createEntity('BlackMarbleThrone',[createRecipe(1,1,{'Stonecutter':1},{'BlackMarble':20,'ScaleHide':4,'DeerHide':2,'Copper':5})]);
createEntity('BlackMetalChest',[createRecipe(1,1,{'Workbench':1},{'Wood':10,'Tar':2,'BlackMetal':6})]);
createEntity('BlueBanner',[createRecipe(1,1,{'Workbench':1},{'FineWood':2,'LeatherScraps':6,'Blueberries':4})]);
createEntity('BlueJuteCarpet',[createRecipe(1,1,{'Workbench':1},{'BlueJute':4})]);
createEntity('BlueJuteCurtain',[createRecipe(1,1,{'Workbench':1},{'BlueJute':4,'FineWood':1})]);
createEntity('BlueJuteDrapes',[createRecipe(1,1,{'Workbench':1},{'BlueJute':4,'FineWood':1})]);
createEntity('BlueRedAndWhiteBanner',[createRecipe(1,1,{'Workbench':1},{'FineWood':2,'LeatherScraps':6,'Blueberries':2,'Raspberries':2,'Cloudberries':1})]);
createEntity('Chair',[createRecipe(1,1,{'Workbench':1},{'FineWood':4})]);
createEntity('Chest',[createRecipe(1,1,{'Workbench':1},{'Wood':10})]);
createEntity('DarkwoodChair',[createRecipe(1,1,{'Workbench':1},{'FineWood':4,'Tar':1,'IronNails':5,'DeerHide':1})]);
createEntity('DeerRug',[createRecipe(1,1,{'Workbench':1},{'DeerHide':4})]);
createEntity('DragonBed',[createRecipe(1,1,{'Workbench':1},{'FineWood':40,'DeerHide':7,'WolfPelt':4,'Feathers':10,'IronNails':15})]);
createEntity('DvergrLanternPole',[createRecipe(1,1,{'BlackForge':1},{'Copper':3,'DvergrLantern':1,'Chain':1})]);
createEntity('DvergrWallLantern',[createRecipe(1,1,{'BlackForge':1},{'Copper':3,'DvergrLantern':1,'Chain':1})]);
createEntity('GreenBanner',[createRecipe(1,1,{'Workbench':1},{'FineWood':2,'LeatherScraps':6,'Guck':1})]);
createEntity('HangingBrazier',[createRecipe(1,1,{'Forge':1},{'Bronze':5,'Coal':2,'Chain':1})]);
createEntity('HareRug',[createRecipe(1,1,{'Workbench':1},{'ScaleHide':4})]);
createEntity('HotTub',[createRecipe(1,1,{'Workbench':1},{'Wood':20,'Tar':6,'Iron':10,'Stone':8})]);
createEntity('ItemStandHorizontal',[createRecipe(1,1,{'Workbench':1},{'FineWood':4,'BronzeNails':1})]);
createEntity('ItemStandVertical',[createRecipe(1,1,{'Workbench':1},{'FineWood':4,'BronzeNails':1})]);
createEntity('JackOTurnip',[createRecipe(1,1,{'Workbench':1},{'Turnip':4,'Resin':2})]);
createEntity('LavaLantern',[createRecipe(1,1,{'BlackForge':1},{'Flametal':1,'ProustitePowder':1,'Sulfur':1})]);
createEntity('LongHeavyTable',[createRecipe(1,1,{'Workbench':1},{'FineWood':20,'Tar':2,'IronNails':20})]);
createEntity('LoxRug',[createRecipe(1,1,{'Workbench':1},{'LoxPelt':4})]);
createEntity('Maypole',[createRecipe(1,1,{'Workbench':1},{'Wood':10,'Dandelion':4,'Thistle':4})]);
createEntity('Mistletoe',[createRecipe(1,1,{'Workbench':1},{'FineWood':1,'RedJute':1})]);
createEntity('OrangeBanner',[createRecipe(1,1,{'Workbench':1},{'FineWood':2,'LeatherScraps':6,'Carrot':2,'Cloudberries':3})]);
createEntity('PersonalChest',[createRecipe(1,1,{'Workbench':1},{'FineWood':10,'Iron':8})]);
createEntity('PurpleBanner',[createRecipe(1,1,{'Workbench':1},{'FineWood':2,'LeatherScraps':6,'Blueberries':2,'Raspberries':3})]);
createEntity('RavenThrone',[createRecipe(1,1,{'Workbench':1},{'FineWood':20,'IronNails':10})]);
createEntity('RedBanner',[createRecipe(1,1,{'Workbench':1},{'FineWood':2,'LeatherScraps':6,'Bloodbag':1})]);
createEntity('RedJuteCarpet',[createRecipe(1,1,{'Workbench':1},{'RedJute':4})]);
createEntity('RedJuteCurtain',[createRecipe(1,1,{'Workbench':1},{'RedJute':4,'FineWood':1})]);
createEntity('ReinforcedChest',[createRecipe(1,1,{'Workbench':1},{'FineWood':10,'Iron':2})]);
createEntity('RoundTable',[createRecipe(1,1,{'Workbench':1},{'FineWood':10,'Tar':2,'IronNails':20})]);
createEntity('Sconce',[createRecipe(1,1,{'Forge':1},{'Wood':2,'Copper':2,'Resin':2})]);
createEntity('Sign',[createRecipe(1,1,null,{'Coal':1,'Wood':2})]);
createEntity('StandingBlueBurningIronTorch',[createRecipe(1,1,{'Forge':1},{'Iron':2,'GreydwarfEye':2})]);
createEntity('StandingBrazier',[createRecipe(1,1,{'Forge':1},{'Bronze':5,'Coal':2,'FenrisClaw':3})]);
createEntity('StandingGreenBurningIronTorch',[createRecipe(1,1,{'Forge':1},{'Iron':2,'Guck':2})]);
createEntity('StandingIronTorch',[createRecipe(1,1,{'Forge':1},{'Iron':2,'Resin':2})]);
createEntity('StandingWoodTorch',[createRecipe(1,1,{'Workbench':1},{'Wood':2,'Resin':2})]);
createEntity('StoneThrone',[createRecipe(1,1,{'Stonecutter':1},{'Stone':20,'DeerHide':2,'WolfPelt':2})]);
createEntity('Stool',[createRecipe(1,1,{'Workbench':1},{'FineWood':4})]);
createEntity('Table',[createRecipe(1,1,{'Workbench':1},{'FineWood':6})]);
createEntity('WhiteAndBlueStripedBanner',[createRecipe(1,1,{'Workbench':1},{'FineWood':2,'LeatherScraps':6,'Blueberries':2,'Cloudberries':3})]);
createEntity('WhiteAndRedStripedBanner',[createRecipe(1,1,{'Workbench':1},{'FineWood':2,'LeatherScraps':6,'Raspberries':4})]);
createEntity('WhiteBanner',[createRecipe(1,1,{'Workbench':1},{'FineWood':2,'LeatherScraps':6,'Coal':2,'Cloudberries':4})]);
createEntity('WispTorch',[createRecipe(1,1,null,{'YggdrasilWood':1,'Wisp':1})]);
createEntity('WolfRug',[createRecipe(1,1,{'Workbench':1},{'WolfPelt':4})]);
createEntity('YellowBanner',[createRecipe(1,1,{'Workbench':1},{'FineWood':2,'LeatherScraps':6,'Coal':2,'Dandelion':4})]);
createEntity('YuleGarland',[createRecipe(1,1,{'Workbench':1},{'FineWood':2,'PineCone':1})]);
createEntity('YuleTree',[createRecipe(1,1,{'Workbench':1},{'Wood':10,'FirCone':1})]);
createEntity('YuleWreath',[createRecipe(1,1,{'Workbench':1},{'PineCone':4,'RedJute':1,'FineWood':1})]);
createEntity('YuleklappLarge',[createRecipe(1,1,{'Workbench':1},{'FineWood':4,'Raspberries':1})]);
createEntity('YuleklappMedium',[createRecipe(1,1,{'Workbench':1},{'FineWood':3,'Dandelion':1})]);
createEntity('YuleklappSmall',[createRecipe(1,1,{'Workbench':1},{'FineWood':2,'BoneFragments':1})]);

// Material
createEntity('BarleyFlour',[createRecipe(1,1,{'Windmill':1},{'Barley':1})]);
createEntity('Bell',[createRecipe(1,1,{'BlackForge':1},{'BellFragment':3})]);
createEntity('BronzeNails',[createRecipe(1,20,{'Forge':1},{'Bronze':1})]);
createEntity('CeramicPlate',[createRecipe(1,5,{'ArtisanTable':2},{'BlackMarble':5})]);
createEntity('IronNails',[createRecipe(1,10,{'Forge':1},{'Iron':1})]);
createEntity('LinenThread',[createRecipe(1,1,{'SpinningWheel':1},{'Flax':1})]);
createEntity('MechanicalSpring',[createRecipe(1,1,{'ArtisanTable':1},{'RefinedEitr':1,'Iron':3})]);
createEntity('RefinedEitr',[createRecipe(1,1,{'EitrRefinery':1},{'Sap':1,'SoftTissue':1})]);
createEntity('SharpeningStone',[createRecipe(1,1,{'Stonecutter':1},{'Stone':5})]);
createEntity('ShieldCore',[createRecipe(1,1,{'ArtisanTable':2},{'BlackCore':1,'SurtlingCore':1,'CeramicPlate':5})]);

// Mead
createEntity('BarleyWineBaseFireResistance',[createRecipe(1,1,{'Cauldron':1},{'Barley':10,'Cloudberries':10})]);
createEntity('FireResistanceBarleyWine',[createRecipe(1,6,{'Fermenter':1},{'BarleyWineBaseFireResistance':1})]);
createEntity('FrostResistanceMead',[createRecipe(1,6,{'Fermenter':1},{'MeadBaseFrostResistance':1})]);
createEntity('LingeringEitrMead',[createRecipe(1,6,{'Fermenter':1},{'MeadBaseLingeringEitr':1})]);
createEntity('LingeringHealingMead',[createRecipe(1,6,{'Fermenter':1},{'MeadBaseLingeringHealth':1})]);
createEntity('LingeringStaminaMead',[createRecipe(1,6,{'Fermenter':1},{'MeadBaseLingeringStamina':1})]);
createEntity('MajorHealingMead',[createRecipe(1,6,{'Fermenter':1},{'MeadBaseMajorHealing':1})]);
createEntity('MeadBaseFrostResistance',[createRecipe(1,1,{'Cauldron':1},{'Honey':10,'Thistle':5,'Bloodbag':2,'GreydwarfEye':1})]);
createEntity('MeadBaseLingeringEitr',[createRecipe(1,1,{'Cauldron':1},{'Sap':10,'VineberryCluster':10,'Magecap':10})]);
createEntity('MeadBaseLingeringHealth',[createRecipe(1,1,{'Cauldron':1},{'Sap':10,'VineberryCluster':10,'SmokePuff':10})]);
createEntity('MeadBaseLingeringStamina',[createRecipe(1,1,{'Cauldron':1},{'Sap':10,'Cloudberries':10,'JotunPuffs':10})]);
createEntity('MeadBaseMajorHealing',[createRecipe(1,1,{'Cauldron':1},{'Honey':10,'BloodClot':4,'RoyalJelly':5})]);
createEntity('MeadBaseMediumHealing',[createRecipe(1,1,{'Cauldron':1},{'Honey':10,'Bloodbag':4,'Raspberries':10,'Dandelion':1})]);
createEntity('MeadBaseMediumStamina',[createRecipe(1,1,{'Cauldron':1},{'Honey':10,'Cloudberries':10,'YellowMushroom':10})]);
createEntity('MeadBaseMinorEitr',[createRecipe(1,1,{'Cauldron':1},{'Honey':10,'Sap':5,'JotunPuffs':2,'Magecap':5})]);
createEntity('MeadBaseMinorHealing',[createRecipe(1,1,{'Cauldron':1},{'Honey':10,'Blueberries':5,'Raspberries':10,'Dandelion':1})]);
createEntity('MeadBaseMinorStamina',[createRecipe(1,1,{'Cauldron':1},{'Honey':10,'Raspberries':10,'YellowMushroom':10})]);
createEntity('MeadBasePoisonResistance',[createRecipe(1,1,{'Cauldron':1},{'Honey':10,'Thistle':5,'NeckTail':1,'Coal':10})]);
createEntity('MeadBaseTasty',[createRecipe(1,1,{'Cauldron':1},{'Honey':10,'Raspberries':10,'Blueberries':5})]);
createEntity('MediumHealingMead',[createRecipe(1,6,{'Fermenter':1},{'MeadBaseMediumHealing':1})]);
createEntity('MediumStaminaMead',[createRecipe(1,6,{'Fermenter':1},{'MeadBaseMediumStamina':1})]);
createEntity('MinorEitrMead',[createRecipe(1,6,{'Fermenter':1},{'MeadBaseMinorEitr':1})]);
createEntity('MinorHealingMead',[createRecipe(1,6,{'Fermenter':1},{'MeadBaseMinorHealing':1})]);
createEntity('MinorStaminaMead',[createRecipe(1,6,{'Fermenter':1},{'MeadBaseMinorStamina':1})]);
createEntity('PoisonResistanceMead',[createRecipe(1,6,{'Fermenter':1},{'MeadBasePoisonResistance':1})]);
createEntity('TastyMead',[createRecipe(1,6,{'Fermenter':1},{'MeadBaseTasty':1})]);

// Station
createEntity('Adze',[createRecipe(1,1,{'Forge':1},{'FineWood':10,'Bronze':3})]);
createEntity('Anvils',[createRecipe(1,1,{'Workbench':1},{'Wood':5,'Bronze':2})]);
createEntity('ArtisanPress',[createRecipe(1,1,{'ArtisanTable':1},{'BlackMarble':5,'Bronze':5,'MajesticCarapace':1})]);
createEntity('ArtisanTable',[createRecipe(1,1,null,{'DragonTear':2,'Wood':10})]);
createEntity('BarberStation',[createRecipe(1,1,{'Workbench':1},{'FineWood':10,'BarberKit':1,'BronzeNails':5,'TrollHide':5})]);
createEntity('Beehive',[createRecipe(1,1,{'Workbench':1},{'Wood':10,'QueenBee':1})]);
createEntity('BlackForge',[createRecipe(1,1,{'Workbench':1},{'BlackMarble':10,'YggdrasilWood':10,'BlackCore':5})]);
createEntity('BlackForgeCooler',[createRecipe(1,1,{'BlackForge':1},{'Iron':5,'Copper':5,'BlackMarble':4})]);
createEntity('BlastFurnace',[createRecipe(1,1,{'ArtisanTable':1},{'Stone':20,'SurtlingCore':5,'Iron':10,'FineWood':20})]);
createEntity('ButchersTable',[createRecipe(1,1,{'Workbench':1},{'AncientBark':2,'CoreWood':4,'FineWood':4,'Silver':2})]);
createEntity('Cauldron',[createRecipe(1,1,{'Forge':1},{'Tin':10})]);
createEntity('CharcoalKiln',[createRecipe(1,1,{'Workbench':1},{'Stone':20,'SurtlingCore':5})]);
createEntity('ChoppingBlock',[createRecipe(1,1,{'Workbench':1},{'Wood':10,'Flint':10})]);
createEntity('CookingStation',[createRecipe(1,1,null,{'Wood':2})]);
createEntity('EitrRefinery',[createRecipe(1,1,{'Workbench':1},{'BlackMarble':20,'BlackMetal':5,'YggdrasilWood':10,'BlackCore':5,'Sap':3})]);
createEntity('FeatheryWreath',[createRecipe(1,1,{'GaldrTable':1},{'CelestialFeather':8,'AsksvinTrophy':1,'RefinedEitr':10,'Ashwood':3})]);
createEntity('Fermenter',[createRecipe(1,1,{'Forge':1},{'FineWood':30,'Bronze':5,'Resin':10})]);
createEntity('Forge',[createRecipe(1,1,{'Workbench':1},{'Stone':4,'Coal':4,'Wood':10,'Copper':6})]);
createEntity('ForgeBellows',[createRecipe(1,1,{'Workbench':1},{'Wood':5,'DeerHide':5,'Chain':4})]);
createEntity('ForgeCooler',[createRecipe(1,1,{'Forge':1},{'FineWood':25,'Copper':10})]);
createEntity('ForgeToolrack',[createRecipe(1,1,{'Forge':1},{'Iron':15,'Wood':10})]);
createEntity('GaldrTable',[createRecipe(1,1,{'Workbench':1},{'BlackMetal':10,'YggdrasilWood':20,'BlackCore':5,'RefinedEitr':5})]);
createEntity('GemCutter',[createRecipe(1,1,{'BlackForge':1},{'Flametal':5,'Ashwood':8,'MorgenSinew':2,'Bloodstone':1})]);
createEntity('GrindingWheel',[createRecipe(1,1,{'Workbench':1},{'Wood':25,'SharpeningStone':1})]);
createEntity('IronCookingStation',[createRecipe(1,1,{'Workbench':1},{'Chain':3,'Iron':3})]);
createEntity('MetalCutter',[createRecipe(1,1,{'BlackForge':1},{'BlackMarble':5,'Flametal':5,'Ashwood':5,'CharredBone':4})]);
createEntity('MortarAndPestle',[createRecipe(1,1,{'Workbench':1},{'CoreWood':4,'FineWood':6,'BlackMarble':8})]);
createEntity('Obliterator',[createRecipe(1,1,{'Forge':1},{'Iron':8,'Copper':4,'ThunderStone':1})]);
createEntity('PotsAndPans',[createRecipe(1,1,{'Workbench':1},{'Iron':5,'Copper':5,'BlackMetal':5,'FineWood':10})]);
createEntity('RollingPinsAndCuttingBoards',[createRecipe(1,1,{'Workbench':1},{'Ashwood':8,'FineWood':6,'Flametal':4})]);
createEntity('RuneTable',[createRecipe(1,1,null,{'BlackMarble':10,'YggdrasilWood':5,'RefinedEitr':10})]);
createEntity('SapExtractor',[createRecipe(1,1,{'Workbench':1},{'YggdrasilWood':10,'BlackMetal':5,'DvergrExtractor':1})]);
createEntity('ShieldGenerator',[createRecipe(1,1,{'Workbench':1},{'Iron':5,'Copper':5,'ShieldCore':1})]);
createEntity('Smelter',[createRecipe(1,1,{'Workbench':1},{'Stone':20,'SurtlingCore':5})]);
createEntity('SmithsAnvil',[createRecipe(1,1,{'Workbench':1},{'Iron':20,'Wood':5})]);
createEntity('SpiceRack',[createRecipe(1,1,{'Workbench':1},{'Dandelion':3,'Carrot':2,'Mushroom':5,'Thistle':3,'Turnip':3})]);
createEntity('SpinningWheel',[createRecipe(1,1,{'ArtisanTable':1},{'FineWood':20,'IronNails':10,'LeatherScraps':5})]);
createEntity('StoneOven',[createRecipe(1,1,{'ArtisanTable':1},{'Iron':15,'Stone':20,'SurtlingCore':4})]);
createEntity('Stonecutter',[createRecipe(1,1,{'Workbench':1},{'Wood':10,'Iron':2,'Stone':4})]);
createEntity('TanningRack',[createRecipe(1,1,{'Workbench':1},{'Wood':10,'Flint':15,'LeatherScraps':20,'DeerHide':5})]);
createEntity('ToolShelf',[createRecipe(1,1,{'Forge':1},{'Iron':4,'FineWood':10,'Obsidian':4})]);
createEntity('UnfadingCandles',[createRecipe(1,1,{'GaldrTable':1},{'BlackMarble':10,'SkeletonTrophy':3,'RefinedEitr':10,'Resin':15})]);
createEntity('Vice',[createRecipe(1,1,{'BlackForge':1},{'Iron':5,'Copper':8,'MechanicalSpring':2})]);
createEntity('Windmill',[createRecipe(1,1,{'ArtisanTable':1},{'Stone':20,'Wood':30,'IronNails':30})]);
createEntity('WispFountain',[createRecipe(1,1,{'Stonecutter':1},{'Stone':10,'TornSpirit':1})]);
createEntity('Workbench',[createRecipe(1,1,null,{'Wood':10})]);

// Tool
createEntity('Cultivator',[createRecipe(1,1,{'Forge':1},{'CoreWood':5,'Bronze':5}),createRecipe(2,1,{'Forge':2},{'CoreWood':1,'Bronze':1}),createRecipe(3,1,{'Forge':3},{'CoreWood':2,'Bronze':2})]);
createEntity('Hammer',[createRecipe(1,1,null,{'Wood':3,'Stone':2}),createRecipe(2,1,{'Workbench':2},{'Wood':1,'Stone':1}),createRecipe(3,1,{'Workbench':3},{'Wood':2,'Stone':2})]);
createEntity('Hoe',[createRecipe(1,1,{'Workbench':1},{'Wood':5,'Stone':2}),createRecipe(2,1,{'Workbench':2},{'Wood':1,'Stone':1}),createRecipe(3,1,{'Workbench':3},{'Wood':2,'Stone':2})]);
createEntity('HornOfCelebration',[createRecipe(1,1,{'Workbench':1},{'Bronze':2,'TrollHide':2,'Iron':2})]);
createEntity('Tankard',[createRecipe(1,1,{'Workbench':1},{'FineWood':5,'Resin':2})]);

// Weapon
createEntity('AbyssalHarpoon',[createRecipe(1,1,{'Workbench':2},{'FineWood':8,'Chitin':30,'LeatherScraps':3})]);
createEntity('AbyssalRazor',[createRecipe(1,1,{'Workbench':2},{'FineWood':4,'Chitin':20,'LeatherScraps':2}),createRecipe(2,1,{'Workbench':3},{'Chitin':10}),createRecipe(3,1,{'Workbench':4},{'Chitin':20}),createRecipe(4,1,{'Workbench':5},{'Chitin':30})]);
createEntity('AncientBarkSpear',[createRecipe(1,1,{'Forge':3},{'TrollHide':4,'Iron':10,'AncientBark':10}),createRecipe(2,1,{'Forge':4},{'TrollHide':1,'Iron':5,'AncientBark':5}),createRecipe(3,1,{'Forge':5},{'TrollHide':2,'Iron':10,'AncientBark':10}),createRecipe(4,1,{'Forge':6},{'TrollHide':3,'Iron':15,'AncientBark':15})]);
createEntity('AntlerPickaxe',[createRecipe(1,1,{'Workbench':1},{'Wood':10,'HardAntler':1})]);
createEntity('Arbalest',[createRecipe(1,1,{'BlackForge':1},{'Wood':10,'Iron':8,'Root':4}),createRecipe(2,1,{'BlackForge':2},{'Wood':5,'Iron':4,'Root':1}),createRecipe(3,1,{'BlackForge':3},{'Wood':10,'Iron':8,'Root':2}),createRecipe(4,1,{'BlackForge':4},{'Wood':15,'Iron':12,'Root':3})]);
createEntity('AshFang',[createRecipe(1,1,{'BlackForge':3},{'Ashwood':10,'CharredBone':16,'Flametal':5,'BonemawTooth':5}),createRecipe(2,1,{'BlackForge':4},{'Ashwood':5,'CharredBone':10,'Flametal':5,'BonemawTooth':5}),createRecipe(3,1,{'BlackForge':5},{'Ashwood':10,'CharredBone':20,'Flametal':10,'BonemawTooth':10}),createRecipe(4,1,{'BlackForge':6},{'Ashwood':15,'CharredBone':30,'Flametal':15,'BonemawTooth':15})]);
createEntity('BandedShield',[createRecipe(1,1,{'Forge':2},{'FineWood':10,'Iron':8}),createRecipe(2,1,{'Forge':3},{'FineWood':10,'Iron':4}),createRecipe(3,1,{'Forge':4},{'FineWood':20,'Iron':8})]);
createEntity('BasaltBomb',[createRecipe(1,5,{'Workbench':1},{'AsksvinHide':1,'AsksvinBladder':1,'ProustitePowder':3})]);
createEntity('Battleaxe',[createRecipe(1,1,{'Forge':2},{'AncientBark':30,'Iron':35,'LeatherScraps':4}),createRecipe(2,1,{'Forge':3},{'AncientBark':5,'Iron':15}),createRecipe(3,1,{'Forge':4},{'AncientBark':10,'Iron':30}),createRecipe(4,1,{'Forge':5},{'AncientBark':15,'Iron':45})]);
createEntity('BerserkirAxes',[createRecipe(1,1,{'BlackForge':3},{'CharredBone':15,'Flametal':24,'AsksvinHide':3}),createRecipe(2,1,{'BlackForge':4},{'Flametal':15,'AsksvinHide':1}),createRecipe(3,1,{'BlackForge':5},{'Flametal':30,'AsksvinHide':2}),createRecipe(4,1,{'BlackForge':6},{'Flametal':45,'AsksvinHide':3})]);
createEntity('BileBomb',[createRecipe(1,3,{'Workbench':1},{'Sap':1,'Bilebag':1,'Resin':3})]);
createEntity('BlackMetalMissile',[createRecipe(1,20,{'ArtisanTable':1},{'Wood':10,'BlackMetal':1})]);
createEntity('BlackMetalPickaxe',[createRecipe(1,1,{'Forge':2},{'YggdrasilWood':3,'BlackMetal':25}),createRecipe(2,1,{'Forge':3},{'YggdrasilWood':1,'BlackMetal':15}),createRecipe(3,1,{'Forge':4},{'YggdrasilWood':2,'BlackMetal':30}),createRecipe(4,1,{'Forge':5},{'YggdrasilWood':3,'BlackMetal':45})]);
createEntity('BlackMetalShield',[createRecipe(1,1,{'Forge':3},{'FineWood':10,'BlackMetal':8,'Chain':5}),createRecipe(2,1,{'Forge':4},{'FineWood':10,'BlackMetal':4,'Chain':2}),createRecipe(3,1,{'Forge':5},{'FineWood':20,'BlackMetal':8,'Chain':4})]);
createEntity('BlackMetalTowerShield',[createRecipe(1,1,{'Forge':3},{'FineWood':15,'BlackMetal':10,'Chain':7}),createRecipe(2,1,{'Forge':4},{'FineWood':15,'BlackMetal':6,'Chain':2}),createRecipe(3,1,{'Forge':5},{'FineWood':20,'BlackMetal':8,'Chain':4})]);
createEntity('BlackmetalAtgeir',[createRecipe(1,1,{'Forge':4},{'FineWood':10,'BlackMetal':30,'LinenThread':5}),createRecipe(2,1,{'Forge':5},{'BlackMetal':15,'LinenThread':5}),createRecipe(3,1,{'Forge':6},{'BlackMetal':30,'LinenThread':10}),createRecipe(4,1,{'Forge':7},{'BlackMetal':45,'LinenThread':15})]);
createEntity('BlackmetalAxe',[createRecipe(1,1,{'Forge':4},{'FineWood':6,'BlackMetal':20,'LinenThread':5}),createRecipe(2,1,{'Forge':5},{'BlackMetal':10,'LinenThread':5}),createRecipe(3,1,{'Forge':6},{'BlackMetal':20,'LinenThread':10}),createRecipe(4,1,{'Forge':7},{'BlackMetal':30,'LinenThread':15})]);
createEntity('BlackmetalBolt',[createRecipe(1,20,{'BlackForge':2},{'Wood':8,'BlackMetal':2,'Feathers':2})]);
createEntity('BlackmetalKnife',[createRecipe(1,1,{'Forge':4},{'FineWood':4,'BlackMetal':10,'LinenThread':5}),createRecipe(2,1,{'Forge':5},{'BlackMetal':4,'LinenThread':5}),createRecipe(3,1,{'Forge':6},{'BlackMetal':8,'LinenThread':10}),createRecipe(4,1,{'Forge':7},{'BlackMetal':12,'LinenThread':15})]);
createEntity('BlackmetalSword',[createRecipe(1,1,{'Forge':4},{'FineWood':2,'BlackMetal':20,'LinenThread':5}),createRecipe(2,1,{'Forge':5},{'BlackMetal':10,'LinenThread':5}),createRecipe(3,1,{'Forge':6},{'BlackMetal':20,'LinenThread':10}),createRecipe(4,1,{'Forge':7},{'BlackMetal':30,'LinenThread':15})]);
createEntity('BleedingBerserkirAxes',[createRecipe(1,1,{'BlackForge':4},{'BerserkirAxes':1,'Flametal':5,'Bloodstone':1}),createRecipe(2,1,{'BlackForge':5},{'Flametal':5,'Bloodstone':1}),createRecipe(3,1,{'BlackForge':6},{'Flametal':10,'Bloodstone':2}),createRecipe(4,1,{'BlackForge':7},{'Flametal':15,'Bloodstone':3})]);
createEntity('BloodFang',[createRecipe(1,1,{'BlackForge':4},{'AshFang':1,'Flametal':5,'Bloodstone':1}),createRecipe(2,1,{'BlackForge':5},{'Flametal':5,'Bloodstone':1}),createRecipe(3,1,{'BlackForge':6},{'Flametal':10,'Bloodstone':2}),createRecipe(4,1,{'BlackForge':7},{'Flametal':15,'Bloodstone':3})]);
createEntity('Bloodgeon',[createRecipe(1,1,{'BlackForge':4},{'FlametalMace':1,'Flametal':8,'Bloodstone':1}),createRecipe(2,1,{'BlackForge':5},{'Flametal':8,'Bloodstone':1}),createRecipe(3,1,{'BlackForge':6},{'Flametal':16,'Bloodstone':2}),createRecipe(4,1,{'BlackForge':7},{'Flametal':24,'Bloodstone':3})]);
createEntity('BoneBolt',[createRecipe(1,20,{'BlackForge':1},{'BoneFragments':8,'Feathers':2})]);
createEntity('BoneTowerShield',[createRecipe(1,1,{'Workbench':3},{'Wood':10,'BoneFragments':10,'SkeletonTrophy':3}),createRecipe(2,1,{'Workbench':4},{'Wood':5,'BoneFragments':5}),createRecipe(3,1,{'Workbench':5},{'Wood':10,'BoneFragments':10})]);
createEntity('BronzeAtgeir',[createRecipe(1,1,{'Forge':1},{'Wood':10,'Bronze':8,'LeatherScraps':2}),createRecipe(2,1,{'Forge':2},{'Bronze':4}),createRecipe(3,1,{'Forge':3},{'Bronze':8}),createRecipe(4,1,{'Forge':4},{'Bronze':12})]);
createEntity('BronzeAxe',[createRecipe(1,1,{'Forge':1},{'Wood':4,'Bronze':8,'LeatherScraps':2}),createRecipe(2,1,{'Forge':2},{'Bronze':4,'LeatherScraps':1}),createRecipe(3,1,{'Forge':3},{'Bronze':8,'LeatherScraps':2}),createRecipe(4,1,{'Forge':4},{'Bronze':12,'LeatherScraps':3})]);
createEntity('BronzeBuckler',[createRecipe(1,1,{'Forge':1},{'Bronze':10,'Wood':4}),createRecipe(2,1,{'Forge':2},{'Bronze':5,'Wood':1}),createRecipe(3,1,{'Forge':3},{'Bronze':10,'Wood':2})]);
createEntity('BronzeMace',[createRecipe(1,1,{'Forge':1},{'Wood':4,'Bronze':8,'LeatherScraps':3}),createRecipe(2,1,{'Forge':2},{'Bronze':4}),createRecipe(3,1,{'Forge':3},{'Bronze':8}),createRecipe(4,1,{'Forge':4},{'Bronze':12})]);
createEntity('BronzePickaxe',[createRecipe(1,1,{'Forge':1},{'CoreWood':3,'Bronze':10}),createRecipe(2,1,{'Forge':2},{'CoreWood':1,'Bronze':5}),createRecipe(3,1,{'Forge':3},{'CoreWood':2,'Bronze':10}),createRecipe(4,1,{'Forge':4},{'CoreWood':3,'Bronze':15})]);
createEntity('BronzeSpear',[createRecipe(1,1,{'Forge':1},{'Wood':5,'Bronze':6,'DeerHide':2}),createRecipe(2,1,{'Forge':2},{'Wood':3,'Bronze':4,'DeerHide':1}),createRecipe(3,1,{'Forge':3},{'Wood':6,'Bronze':8,'DeerHide':2}),createRecipe(4,1,{'Forge':4},{'Wood':9,'Bronze':12,'DeerHide':3})]);
createEntity('BronzeSword',[createRecipe(1,1,{'Forge':1},{'Wood':2,'Bronze':8,'LeatherScraps':2}),createRecipe(2,1,{'Forge':2},{'Wood':1,'Bronze':4,'LeatherScraps':1}),createRecipe(3,1,{'Forge':3},{'Wood':2,'Bronze':8,'LeatherScraps':2}),createRecipe(4,1,{'Forge':4},{'Wood':3,'Bronze':12,'LeatherScraps':3})]);
createEntity('BronzeheadArrow',[createRecipe(1,20,{'Forge':1},{'Wood':8,'Bronze':1,'Feathers':2})]);
createEntity('BrutalSlayer',[createRecipe(1,1,{'BlackForge':4},{'Slayer':1,'Flametal':15,'Bloodstone':1}),createRecipe(2,1,{'BlackForge':5},{'Flametal':15,'Bloodstone':1}),createRecipe(3,1,{'BlackForge':6},{'Flametal':30,'Bloodstone':2}),createRecipe(4,1,{'BlackForge':7},{'Flametal':45,'Bloodstone':3})]);
createEntity('ButcherKnife',[createRecipe(1,1,{'Forge':1},{'Wood':2,'Tin':4})]);
createEntity('CarapaceArrow',[createRecipe(1,20,{'BlackForge':1},{'Carapace':4,'Feathers':2,'Wood':8})]);
createEntity('CarapaceBolt',[createRecipe(1,20,{'BlackForge':1},{'Wood':8,'Carapace':2,'Feathers':2})]);
createEntity('CarapaceBuckler',[createRecipe(1,1,{'BlackForge':1},{'Carapace':16,'ScaleHide':3,'RefinedEitr':10}),createRecipe(2,1,{'BlackForge':2},{'Carapace':8,'ScaleHide':3,'RefinedEitr':3}),createRecipe(3,1,{'BlackForge':3},{'Carapace':16,'ScaleHide':6,'RefinedEitr':6})]);
createEntity('CarapaceShield',[createRecipe(1,1,{'BlackForge':1},{'Carapace':20,'ScaleHide':3,'RefinedEitr':10}),createRecipe(2,1,{'BlackForge':2},{'Carapace':10,'ScaleHide':3,'RefinedEitr':3}),createRecipe(3,1,{'BlackForge':3},{'Carapace':20,'ScaleHide':6,'RefinedEitr':6})]);
createEntity('CarapaceSpear',[createRecipe(1,1,{'BlackForge':1},{'YggdrasilWood':10,'Carapace':4,'Mandible':2}),createRecipe(2,1,{'BlackForge':2},{'YggdrasilWood':5,'Carapace':4,'Mandible':1}),createRecipe(3,1,{'BlackForge':3},{'YggdrasilWood':10,'Carapace':8,'Mandible':2}),createRecipe(4,1,{'BlackForge':4},{'YggdrasilWood':15,'Carapace':12,'Mandible':3})]);
createEntity('CharredArrow',[createRecipe(1,20,{'BlackForge':1},{'CharredBone':4,'Feathers':2,'Ashwood':8})]);
createEntity('CharredBolt',[createRecipe(1,20,{'BlackForge':1},{'CharredBone':2,'Ashwood':8,'Feathers':2})]);
createEntity('Club',[createRecipe(1,1,null,{'Wood':6}),createRecipe(2,1,{'Workbench':2},{'BoneFragments':5}),createRecipe(3,1,{'Workbench':3},{'BoneFragments':10}),createRecipe(4,1,{'Workbench':4},{'BoneFragments':15})]);
createEntity('CopperKnife',[createRecipe(1,1,{'Forge':1},{'Wood':2,'Copper':8}),createRecipe(2,1,{'Forge':2},{'GreydwarfEye':8,'Copper':4}),createRecipe(3,1,{'Forge':3},{'GreydwarfEye':16,'Copper':8}),createRecipe(4,1,{'Forge':4},{'GreydwarfEye':24,'Copper':12})]);
createEntity('CrudeBow',[createRecipe(1,1,{'Workbench':1},{'Wood':10,'LeatherScraps':8}),createRecipe(2,1,{'Workbench':2},{'Wood':5,'LeatherScraps':4,'DeerHide':1}),createRecipe(3,1,{'Workbench':3},{'Wood':10,'LeatherScraps':8,'DeerHide':2}),createRecipe(4,1,{'Workbench':4},{'Wood':15,'LeatherScraps':12,'DeerHide':3})]);
createEntity('CrystalBattleaxe',[createRecipe(1,1,{'Forge':3},{'AncientBark':40,'Silver':30,'Crystal':10}),createRecipe(2,1,{'Forge':4},{'AncientBark':5,'Silver':15}),createRecipe(3,1,{'Forge':5},{'AncientBark':10,'Silver':30}),createRecipe(4,1,{'Forge':6},{'AncientBark':15,'Silver':45})]);
createEntity('DeadRaiser',[createRecipe(1,1,{'GaldrTable':1},{'BoneFragments':10,'RefinedEitr':16,'SkeletonTrophy':4}),createRecipe(2,1,{'GaldrTable':2},{'BoneFragments':5,'RefinedEitr':8,'SkeletonTrophy':2})]);
createEntity('Demolisher',[createRecipe(1,1,{'BlackForge':1},{'YggdrasilWood':10,'Iron':20,'RefinedEitr':10}),createRecipe(2,1,{'BlackForge':2},{'YggdrasilWood':2,'Iron':15,'RefinedEitr':2}),createRecipe(3,1,{'BlackForge':3},{'YggdrasilWood':4,'Iron':30,'RefinedEitr':4}),createRecipe(4,1,{'BlackForge':4},{'YggdrasilWood':6,'Iron':45,'RefinedEitr':6})]);
createEntity('DraugrFang',[createRecipe(1,1,{'Forge':2},{'AncientBark':10,'Silver':20,'DeerHide':2,'Guck':10}),createRecipe(2,1,{'Forge':3},{'AncientBark':5,'Silver':10,'DeerHide':2,'Guck':2}),createRecipe(3,1,{'Forge':4},{'AncientBark':10,'Silver':20,'DeerHide':4,'Guck':4}),createRecipe(4,1,{'Forge':5},{'AncientBark':15,'Silver':30,'DeerHide':6,'Guck':6})]);
createEntity('Dundr',[createRecipe(1,1,{'GaldrTable':2},{'Ashwood':10,'Flametal':4,'CelestialFeather':3,'Bloodstone':1}),createRecipe(2,1,{'GaldrTable':3},{'Ashwood':5,'Flametal':2,'CelestialFeather':3,'Bloodstone':1}),createRecipe(3,1,{'GaldrTable':4},{'Ashwood':10,'Flametal':4,'CelestialFeather':6,'Bloodstone':2}),createRecipe(4,1,{'GaldrTable':5},{'Ashwood':15,'Flametal':6,'CelestialFeather':9,'Bloodstone':3})]);
createEntity('ExplosivePayload',[createRecipe(1,5,{"Workbench":1},{"AsksvinHide":2,"Sulfur":2,"ProustitePowder":3})]);
createEntity('FangSpear',[createRecipe(1,1,{'Forge':3},{'AncientBark':10,'WolfFang':4,'LeatherScraps':2,'Silver':2}),createRecipe(2,1,{'Forge':4},{'AncientBark':5,'WolfFang':2,'LeatherScraps':1,'Silver':1}),createRecipe(3,1,{'Forge':5},{'AncientBark':10,'WolfFang':4,'LeatherScraps':2,'Silver':2}),createRecipe(4,1,{'Forge':6},{'AncientBark':15,'WolfFang':6,'LeatherScraps':3,'Silver':3})]);
createEntity('FinewoodBow',[createRecipe(1,1,{'Workbench':1},{'FineWood':10,'CoreWood':10,'DeerHide':2}),createRecipe(2,1,{'Workbench':2},{'FineWood':5,'CoreWood':5,'DeerHide':2}),createRecipe(3,1,{'Workbench':3},{'FineWood':10,'CoreWood':10,'DeerHide':4}),createRecipe(4,1,{'Workbench':4},{'FineWood':15,'CoreWood':15,'DeerHide':6})]);
createEntity('FireArrow',[createRecipe(1,20,{'Workbench':2},{'Wood':8,'Resin':8,'Feathers':2})]);
createEntity('FlametalMace',[createRecipe(1,1,{'BlackForge':3},{'CharredBone':10,'Flametal':15,'Sulfur':5,'AsksvinHide':3}),createRecipe(2,1,{'BlackForge':4},{'CharredBone':5,'Flametal':8,'Sulfur':3,'AsksvinHide':2}),createRecipe(3,1,{'BlackForge':5},{'CharredBone':10,'Flametal':16,'Sulfur':6,'AsksvinHide':4}),createRecipe(4,1,{'BlackForge':6},{'CharredBone':15,'Flametal':24,'Sulfur':9,'AsksvinHide':6})]);
createEntity('FlametalMissile',[createRecipe(1,20,{'ArtisanTable':1},{'Ashwood':10,'Flametal':1})]);
createEntity('FlametalShield',[createRecipe(1,1,{'BlackForge':3},{'Ashwood':10,'Flametal':8,'AsksvinHide':2}),createRecipe(2,1,{'BlackForge':4},{'Ashwood':10,'Flametal':4,'AsksvinHide':2}),createRecipe(3,1,{'BlackForge':5},{'Ashwood':20,'Flametal':8,'AsksvinHide':4})]);
createEntity('FlametalTowerShield',[createRecipe(1,1,{'BlackForge':3},{'Ashwood':15,'Flametal':10,'AsksvinHide':5}),createRecipe(2,1,{'BlackForge':4},{'Ashwood':10,'Flametal':4,'AsksvinHide':2}),createRecipe(3,1,{'BlackForge':5},{'Ashwood':20,'Flametal':8,'AsksvinHide':4})]);
createEntity('FleshRippers',[createRecipe(1,1,{'Forge':3},{'FenrisHair':10,'FenrisClaw':6,'Silver':10}),createRecipe(2,1,{'Forge':4},{'FenrisHair':1,'FenrisClaw':1,'Silver':1}),createRecipe(3,1,{'Forge':5},{'FenrisHair':2,'FenrisClaw':2,'Silver':2}),createRecipe(4,1,{'Forge':6},{'FenrisHair':3,'FenrisClaw':3,'Silver':3})]);
createEntity('FlintAxe',[createRecipe(1,1,{'Workbench':1},{'Wood':4,'Flint':6}),createRecipe(2,1,{'Workbench':2},{'Flint':3,'LeatherScraps':2}),createRecipe(3,1,{'Workbench':3},{'Flint':6,'LeatherScraps':4}),createRecipe(4,1,{'Workbench':4},{'Flint':9,'LeatherScraps':6})]);
createEntity('FlintKnife',[createRecipe(1,1,{'Workbench':1},{'Wood':2,'Flint':4,'LeatherScraps':2}),createRecipe(2,1,{'Workbench':2},{'Flint':2}),createRecipe(3,1,{'Workbench':3},{'Flint':4}),createRecipe(4,1,{'Workbench':4},{'Flint':6})]);
createEntity('FlintSpear',[createRecipe(1,1,{'Workbench':1},{'Wood':5,'Flint':10,'LeatherScraps':2}),createRecipe(2,1,{'Workbench':2},{'Wood':3,'Flint':5,'LeatherScraps':1}),createRecipe(3,1,{'Workbench':3},{'Wood':6,'Flint':10,'LeatherScraps':2}),createRecipe(4,1,{'Workbench':4},{'Wood':9,'Flint':15,'LeatherScraps':3})]);
createEntity('FlintheadArrow',[createRecipe(1,20,{'Workbench':2},{'Wood':8,'Flint':2,'Feathers':2})]);
createEntity('FrostArrow',[createRecipe(1,20,{'Workbench':4},{'Wood':8,'Obsidian':4,'Feathers':2,'FreezeGland':1})]);
createEntity('Frostner',[createRecipe(1,1,{'Forge':3},{'AncientBark':10,'Silver':30,'YmirFlesh':5,'FreezeGland':5}),createRecipe(2,1,{'Forge':4},{'Silver':15}),createRecipe(3,1,{'Forge':5},{'Silver':30}),createRecipe(4,1,{'Forge':6},{'Silver':45})]);
createEntity('Himminafl',[createRecipe(1,1,{'BlackForge':1},{'YggdrasilWood':10,'RefinedEitr':15,'Silver':5,'Mandible':2}),createRecipe(2,1,{'BlackForge':2},{'RefinedEitr':15,'Silver':5,'Mandible':2}),createRecipe(3,1,{'BlackForge':3},{'RefinedEitr':30,'Silver':10,'Mandible':4}),createRecipe(4,1,{'BlackForge':4},{'RefinedEitr':45,'Silver':15,'Mandible':6})]);
createEntity('HuntsmanBow',[createRecipe(1,1,{'Forge':1},{'FineWood':10,'Iron':20,'Feathers':10,'DeerHide':2}),createRecipe(2,1,{'Forge':2},{'FineWood':5,'Iron':10,'Feathers':5,'DeerHide':2}),createRecipe(3,1,{'Forge':3},{'FineWood':10,'Iron':20,'Feathers':10,'DeerHide':4}),createRecipe(4,1,{'Forge':4},{'FineWood':15,'Iron':30,'Feathers':15,'DeerHide':6})]);
createEntity('IronAtgeir',[createRecipe(1,1,{'Forge':2},{'Wood':10,'Iron':30,'LeatherScraps':2}),createRecipe(2,1,{'Forge':3},{'Iron':15,'LeatherScraps':1}),createRecipe(3,1,{'Forge':4},{'Iron':30,'LeatherScraps':2}),createRecipe(4,1,{'Forge':5},{'Iron':45,'LeatherScraps':3})]);
createEntity('IronAxe',[createRecipe(1,1,{'Forge':2},{'Wood':4,'Iron':20,'LeatherScraps':2}),createRecipe(2,1,{'Forge':3},{'Iron':10,'LeatherScraps':1}),createRecipe(3,1,{'Forge':4},{'Iron':20,'LeatherScraps':2}),createRecipe(4,1,{'Forge':5},{'Iron':30,'LeatherScraps':3})]);
createEntity('IronBolt',[createRecipe(1,20,{'BlackForge':1},{'Wood':8,'Feathers':2,'Iron':1})]);
createEntity('IronBuckler',[createRecipe(1,1,{'Forge':2},{'Iron':10,'AncientBark':4}),createRecipe(2,1,{'Forge':3},{'Iron':5,'AncientBark':1}),createRecipe(3,1,{'Forge':4},{'Iron':10,'AncientBark':2})]);
createEntity('IronMace',[createRecipe(1,1,{'Forge':2},{'Wood':4,'Iron':20,'LeatherScraps':3}),createRecipe(2,1,{'Forge':3},{'Iron':10}),createRecipe(3,1,{'Forge':4},{'Iron':20}),createRecipe(4,1,{'Forge':5},{'Iron':30})]);
createEntity('IronPickaxe',[createRecipe(1,1,{'Forge':2},{'CoreWood':3,'Iron':20}),createRecipe(2,1,{'Forge':3},{'CoreWood':1,'Iron':10}),createRecipe(3,1,{'Forge':4},{'CoreWood':2,'Iron':20}),createRecipe(4,1,{'Forge':5},{'CoreWood':3,'Iron':30})]);
createEntity('IronSledge',[createRecipe(1,1,{'Forge':2},{'AncientBark':10,'Iron':30,'YmirFlesh':4,'DraugrEliteTrophy':1}),createRecipe(2,1,{'Forge':3},{'AncientBark':2,'Iron':15,'YmirFlesh':2}),createRecipe(3,1,{'Forge':4},{'AncientBark':4,'Iron':30,'YmirFlesh':4}),createRecipe(4,1,{'Forge':5},{'AncientBark':6,'Iron':45,'YmirFlesh':6})]);
createEntity('IronSword',[createRecipe(1,1,{'Forge':2},{'Wood':2,'Iron':20,'LeatherScraps':3}),createRecipe(2,1,{'Forge':3},{'Wood':1,'Iron':10,'LeatherScraps':2}),createRecipe(3,1,{'Forge':4},{'Wood':2,'Iron':20,'LeatherScraps':4}),createRecipe(4,1,{'Forge':5},{'Wood':3,'Iron':30,'LeatherScraps':6})]);
createEntity('IronTowerShield',[createRecipe(1,1,{'Forge':2},{'FineWood':15,'Iron':10}),createRecipe(2,1,{'Forge':3},{'FineWood':10,'Iron':5}),createRecipe(3,1,{'Forge':4},{'FineWood':20,'Iron':10})]);
createEntity('IronheadArrow',[createRecipe(1,20,{'Forge':2},{'Wood':8,'Iron':1,'Feathers':2})]);
createEntity('JotunBane',[createRecipe(1,1,{'BlackForge':1},{'YggdrasilWood':5,'Iron':15,'Bilebag':3,'RefinedEitr':10}),createRecipe(2,1,{'BlackForge':2},{'Iron':10,'Bilebag':1,'RefinedEitr':1}),createRecipe(3,1,{'BlackForge':3},{'Iron':20,'Bilebag':2,'RefinedEitr':2}),createRecipe(4,1,{'BlackForge':4},{'Iron':30,'Bilebag':3,'RefinedEitr':3})]);
createEntity('Klossen',[createRecipe(1,1,{'BlackForge':4},{'FlametalMace':1,'Flametal':8,'Jade':1}),createRecipe(2,1,{'BlackForge':5},{'Flametal':8,'Jade':1}),createRecipe(3,1,{'BlackForge':6},{'Flametal':16,'Jade':2}),createRecipe(4,1,{'BlackForge':7},{'Flametal':24,'Jade':3})]);
createEntity('Krom',[createRecipe(1,1,{'BlackForge':1},{'Iron':30,'Bronze':20,'ScaleHide':5}),createRecipe(2,1,{'BlackForge':2},{'Iron':15,'Bronze':10,'ScaleHide':5}),createRecipe(3,1,{'BlackForge':3},{'Iron':30,'Bronze':20,'ScaleHide':10}),createRecipe(4,1,{'BlackForge':4},{'Iron':45,'Bronze':30,'ScaleHide':15})]);
createEntity('Mistwalker',[createRecipe(1,1,{'BlackForge':1},{'FineWood':3,'Iron':15,'RefinedEitr':10,'Wisp':3}),createRecipe(2,1,{'BlackForge':2},{'Iron':10,'RefinedEitr':5,'Wisp':1}),createRecipe(3,1,{'BlackForge':3},{'Iron':20,'RefinedEitr':10,'Wisp':2}),createRecipe(4,1,{'BlackForge':4},{'Iron':30,'RefinedEitr':15,'Wisp':3})]);
createEntity('NeedleArrow',[createRecipe(1,20,{'Workbench':4},{'Needle':4,'Feathers':2})]);
createEntity('Nidhogg',[createRecipe(1,1,{'BlackForge':3},{'CharredBone':3,'Flametal':12,'AsksvinHide':2}),createRecipe(2,1,{'BlackForge':4},{'Flametal':10,'AsksvinHide':2}),createRecipe(3,1,{'BlackForge':5},{'Flametal':20,'AsksvinHide':4}),createRecipe(4,1,{'BlackForge':6},{'Flametal':30,'AsksvinHide':6})]);
createEntity('NidhoggTheBleeding',[createRecipe(1,1,{'BlackForge':4},{'Nidhogg':1,'Flametal':6,'Bloodstone':1}),createRecipe(2,1,{'BlackForge':5},{'Flametal':6,'Bloodstone':1}),createRecipe(3,1,{'BlackForge':6},{'Flametal':12,'Bloodstone':2}),createRecipe(4,1,{'BlackForge':7},{'Flametal':18,'Bloodstone':3})]);
createEntity('NidhoggThePrimal',[createRecipe(1,1,{'BlackForge':4},{'Nidhogg':1,'Flametal':6,'Jade':1}),createRecipe(2,1,{'BlackForge':5},{'Flametal':6,'Jade':1}),createRecipe(3,1,{'BlackForge':6},{'Flametal':12,'Jade':2}),createRecipe(4,1,{'BlackForge':7},{'Flametal':18,'Jade':3})]);
createEntity('NidhoggTheThundering',[createRecipe(1,1,{'BlackForge':4},{'Nidhogg':1,'Flametal':6,'Iolite':1}),createRecipe(2,1,{'BlackForge':5},{'Flametal':6,'Iolite':1}),createRecipe(3,1,{'BlackForge':6},{'Flametal':12,'Iolite':2}),createRecipe(4,1,{'BlackForge':7},{'Flametal':18,'Iolite':3})]);
createEntity('ObsidianArrow',[createRecipe(1,20,{'Workbench':3},{'Wood':8,'Obsidian':4,'Feathers':2})]);
createEntity('OozeBomb',[createRecipe(1,5,{'Workbench':1},{'LeatherScraps':5,'Ooze':5,'Resin':3})]);
createEntity('PoisonArrow',[createRecipe(1,20,{'Workbench':3},{'Wood':8,'Obsidian':4,'Feathers':2,'Ooze':2})]);
createEntity('Porcupine',[createRecipe(1,1,{'Forge':4},{'FineWood':5,'Iron':20,'Needle':5,'LinenThread':10}),createRecipe(2,1,{'Forge':5},{'Iron':2,'Needle':2}),createRecipe(3,1,{'Forge':6},{'Iron':4,'Needle':4}),createRecipe(4,1,{'Forge':7},{'Iron':6,'Needle':6})]);
createEntity('PrimalBerserkirAxes',[createRecipe(1,1,{'BlackForge':4},{'BerserkirAxes':1,'Flametal':5,'Iolite':1}),createRecipe(2,1,{'BlackForge':5},{'Flametal':5,'Iolite':1}),createRecipe(3,1,{'BlackForge':6},{'Flametal':10,'Iolite':2}),createRecipe(4,1,{'BlackForge':7},{'Flametal':15,'Iolite':3})]);
createEntity('PrimalSlayer',[createRecipe(1,1,{'BlackForge':4},{'Slayer':1,'Flametal':15,'Jade':1}),createRecipe(2,1,{'BlackForge':5},{'Flametal':15,'Jade':1}),createRecipe(3,1,{'BlackForge':6},{'Flametal':30,'Jade':2}),createRecipe(4,1,{'BlackForge':7},{'Flametal':45,'Jade':3})]);
createEntity('Ripper',[createRecipe(1,1,{'BlackForge':3},{'Ashwood':10,'Flametal':8,'MorgenSinew':2,'BonemawTooth':4}),createRecipe(2,1,{'BlackForge':4},{'Ashwood':5,'Flametal':4,'MorgenSinew':1,'BonemawTooth':4}),createRecipe(3,1,{'BlackForge':5},{'Ashwood':10,'Flametal':8,'MorgenSinew':2,'BonemawTooth':8}),createRecipe(4,1,{'BlackForge':6},{'Ashwood':15,'Flametal':12,'MorgenSinew':3,'BonemawTooth':12})]);
createEntity('RootFang',[createRecipe(1,1,{'BlackForge':2},{'Ashwood':10,'CharredBone':16,'Flametal':5,'BonemawTooth':5}),createRecipe(2,1,{'BlackForge':3},{'Ashwood':5,'CharredBone':10,'Flametal':5,'BonemawTooth':5}),createRecipe(3,1,{'BlackForge':4},{'Ashwood':10,'CharredBone':20,'Flametal':10,'BonemawTooth':10}),createRecipe(4,1,{'BlackForge':5},{'Ashwood':15,'CharredBone':30,'Flametal':15,'BonemawTooth':15})]);
createEntity('RootRipper',[createRecipe(1,1,{'BlackForge':1},{'Ripper':1,'Flametal':8,'Jade':1}),createRecipe(2,1,{'BlackForge':2},{'Flametal':8,'Jade':1}),createRecipe(3,1,{'BlackForge':3},{'Flametal':16,'Jade':2}),createRecipe(4,1,{'BlackForge':4},{'Flametal':24,'Jade':3})]);
createEntity('SerpentScaleShield',[createRecipe(1,1,{'Forge':3},{'FineWood':10,'Iron':4,'SerpentScale':8}),createRecipe(2,1,{'Forge':4},{'FineWood':10,'Iron':2,'SerpentScale':4}),createRecipe(3,1,{'Forge':5},{'FineWood':20,'Iron':4,'SerpentScale':8})]);
createEntity('SilverArrow',[createRecipe(1,20,{'Forge':3},{'Wood':8,'Silver':1,'Feathers':2})]);
createEntity('SilverKnife',[createRecipe(1,1,{'Forge':3},{'Wood':2,'Silver':10,'LeatherScraps':3,'Iron':2}),createRecipe(2,1,{'Forge':4},{'Wood':1,'Silver':5,'LeatherScraps':1,'Iron':1}),createRecipe(3,1,{'Forge':5},{'Wood':2,'Silver':10,'LeatherScraps':2,'Iron':2}),createRecipe(4,1,{'Forge':6},{'Wood':3,'Silver':15,'LeatherScraps':3,'Iron':3})]);
createEntity('SilverShield',[createRecipe(1,1,{'Forge':3},{'FineWood':10,'Silver':8}),createRecipe(2,1,{'Forge':4},{'FineWood':10,'Silver':4}),createRecipe(3,1,{'Forge':5},{'FineWood':20,'Silver':8})]);
createEntity('SilverSword',[createRecipe(1,1,{'Forge':3},{'Wood':2,'Silver':40,'LeatherScraps':3,'Iron':5}),createRecipe(2,1,{'Forge':4},{'Wood':1,'Silver':20,'LeatherScraps':1,'Iron':3}),createRecipe(3,1,{'Forge':5},{'Wood':2,'Silver':40,'LeatherScraps':2,'Iron':6}),createRecipe(4,1,{'Forge':6},{'Wood':3,'Silver':60,'LeatherScraps':3,'Iron':9})]);
createEntity('SkollAndHati',[createRecipe(1,1,{'BlackForge':1},{'FineWood':4,'Iron':10,'BlackMetal':10}),createRecipe(2,1,{'BlackForge':2},{'Iron':4,'BlackMetal':4}),createRecipe(3,1,{'BlackForge':3},{'Iron':8,'BlackMetal':8}),createRecipe(4,1,{'BlackForge':4},{'Iron':12,'BlackMetal':12})]);
createEntity('Slayer',[createRecipe(1,1,{'BlackForge':3},{'Flametal':30,'AsksvinHide':5,'MorgenSinew':3}),createRecipe(2,1,{'BlackForge':4},{'Flametal':15,'AsksvinHide':5,'MorgenSinew':3}),createRecipe(3,1,{'BlackForge':5},{'Flametal':30,'AsksvinHide':10,'MorgenSinew':6}),createRecipe(4,1,{'BlackForge':6},{'Flametal':45,'AsksvinHide':15,'MorgenSinew':9})]);
createEntity('SmokeBomb',[createRecipe(1,10,{'Workbench':1},{'SmokePuff':1,'AsksvinBladder':1})]);
createEntity('Spinesnap',[createRecipe(1,1,{'BlackForge':1},{'FineWood':10,'BoneFragments':40,'RefinedEitr':10}),createRecipe(2,1,{'BlackForge':2},{'FineWood':5,'BoneFragments':20}),createRecipe(3,1,{'BlackForge':3},{'FineWood':10,'BoneFragments':40}),createRecipe(4,1,{'BlackForge':4},{'FineWood':15,'BoneFragments':60})]);
createEntity('Splitnir',[createRecipe(1,1,{'BlackForge':3},{'Ashwood':10,'Flametal':6,'AsksvinHide':2,'BonemawTooth':3}),createRecipe(2,1,{'BlackForge':4},{'Ashwood':5,'Flametal':6,'AsksvinHide':1,'BonemawTooth':3}),createRecipe(3,1,{'BlackForge':5},{'Ashwood':10,'Flametal':12,'AsksvinHide':2,'BonemawTooth':6}),createRecipe(4,1,{'BlackForge':6},{'Ashwood':15,'Flametal':18,'AsksvinHide':3,'BonemawTooth':9})]);
createEntity('SplitnirTheBleeding',[createRecipe(1,1,{'BlackForge':4},{'Splitnir':1,'Flametal':6,'Bloodstone':1}),createRecipe(2,1,{'BlackForge':5},{'Flametal':6,'Bloodstone':1}),createRecipe(3,1,{'BlackForge':6},{'Flametal':12,'Bloodstone':2}),createRecipe(4,1,{'BlackForge':7},{'Flametal':18,'Bloodstone':3})]);
createEntity('SplitnirThePrimal',[createRecipe(1,1,{'BlackForge':4},{'Splitnir':1,'Flametal':6,'Iolite':1}),createRecipe(2,1,{'BlackForge':5},{'Flametal':6,'Iolite':1}),createRecipe(3,1,{'BlackForge':6},{'Flametal':12,'Iolite':2}),createRecipe(4,1,{'BlackForge':7},{'Flametal':18,'Iolite':3})]);
createEntity('SplitnirTheStorming',[createRecipe(1,1,{'BlackForge':4},{'Splitnir':1,'Flametal':6,'Iolite':1}),createRecipe(2,1,{'BlackForge':5},{'Flametal':6,'Iolite':1}),createRecipe(3,1,{'BlackForge':6},{'Flametal':12,'Iolite':2}),createRecipe(4,1,{'BlackForge':7},{'Flametal':18,'Iolite':3})]);
createEntity('StaffOfEmbers',[createRecipe(1,1,{'GaldrTable':1},{'YggdrasilWood':20,'SurtlingCore':4,'RefinedEitr':16}),createRecipe(2,1,{'GaldrTable':2},{'YggdrasilWood':10,'SurtlingCore':2,'RefinedEitr':8}),createRecipe(3,1,{'GaldrTable':3},{'YggdrasilWood':20,'SurtlingCore':4,'RefinedEitr':16}),createRecipe(4,1,{'GaldrTable':4},{'YggdrasilWood':30,'SurtlingCore':6,'RefinedEitr':24})]);
createEntity('StaffOfFracturing',[createRecipe(1,1,{'GaldrTable':2},{'CharredBone':15,'Ashwood':5,'ProustitePowder':8}),createRecipe(2,1,{'GaldrTable':3},{'CharredBone':5,'Ashwood':3,'ProustitePowder':1}),createRecipe(3,1,{'GaldrTable':4},{'CharredBone':10,'Ashwood':6,'ProustitePowder':2}),createRecipe(4,1,{'GaldrTable':5},{'CharredBone':15,'Ashwood':9,'ProustitePowder':3})]);
createEntity('StaffOfFrost',[createRecipe(1,1,{'GaldrTable':1},{'YggdrasilWood':20,'FreezeGland':4,'RefinedEitr':16}),createRecipe(2,1,{'GaldrTable':2},{'YggdrasilWood':10,'FreezeGland':2,'RefinedEitr':8}),createRecipe(3,1,{'GaldrTable':3},{'YggdrasilWood':20,'FreezeGland':4,'RefinedEitr':16}),createRecipe(4,1,{'GaldrTable':4},{'YggdrasilWood':30,'FreezeGland':6,'RefinedEitr':24})]);
createEntity('StaffOfProtection',[createRecipe(1,1,{'GaldrTable':1},{'YggdrasilWood':20,'BloodClot':4,'RefinedEitr':16}),createRecipe(2,1,{'GaldrTable':2},{'YggdrasilWood':10,'BloodClot':2,'RefinedEitr':8}),createRecipe(3,1,{'GaldrTable':3},{'YggdrasilWood':20,'BloodClot':4,'RefinedEitr':16})]);
createEntity('StaffOfTheWild',[createRecipe(1,1,{'GaldrTable':2},{'Ashwood':15,'Fiddlehead':10,'CelestialFeather':3,'Jade':1}),createRecipe(2,1,{'GaldrTable':3},{'Ashwood':5,'Fiddlehead':2,'CelestialFeather':3,'Jade':1}),createRecipe(3,1,{'GaldrTable':4},{'Ashwood':10,'Fiddlehead':4,'CelestialFeather':6,'Jade':2}),createRecipe(4,1,{'GaldrTable':5},{'Ashwood':15,'Fiddlehead':6,'CelestialFeather':9,'Jade':3})]);
createEntity('Stagbreaker',[createRecipe(1,1,{'Workbench':2},{'CoreWood':20,'DeerTrophy':5,'LeatherScraps':2}),createRecipe(2,1,{'Workbench':3},{'CoreWood':5,'DeerTrophy':2,'LeatherScraps':1,'BoneFragments':10}),createRecipe(3,1,{'Workbench':4},{'CoreWood':10,'DeerTrophy':4,'LeatherScraps':2,'BoneFragments':20}),createRecipe(4,1,{'Workbench':5},{'CoreWood':15,'DeerTrophy':6,'LeatherScraps':3,'BoneFragments':30})]);
createEntity('StoneAxe',[createRecipe(1,1,null,{'Wood':5,'Stone':4}),createRecipe(2,1,{'Workbench':2},{'Stone':2}),createRecipe(3,1,{'Workbench':3},{'Stone':4}),createRecipe(4,1,{'Workbench':4},{'Stone':6})]);
createEntity('StormFang',[createRecipe(1,1,{'BlackForge':4},{'AshFang':1,'Flametal':5,'Iolite':1}),createRecipe(2,1,{'BlackForge':5},{'Flametal':5,'Iolite':1}),createRecipe(3,1,{'BlackForge':6},{'Flametal':10,'Iolite':2}),createRecipe(4,1,{'BlackForge':7},{'Flametal':15,'Iolite':3})]);
createEntity('StormRipper',[createRecipe(1,1,{'BlackForge':1},{'Ripper':1,'Flametal':8,'Iolite':1}),createRecipe(2,1,{'BlackForge':2},{'Flametal':8,'Iolite':1}),createRecipe(3,1,{'BlackForge':3},{'Flametal':16,'Iolite':2}),createRecipe(4,1,{'BlackForge':4},{'Flametal':24,'Iolite':3})]);
createEntity('StormStar',[createRecipe(1,1,{'BlackForge':4},{'FlametalMace':1,'Flametal':8,'Iolite':1}),createRecipe(2,1,{'BlackForge':5},{'Flametal':8,'Iolite':1}),createRecipe(3,1,{'BlackForge':6},{'Flametal':16,'Iolite':2}),createRecipe(4,1,{'BlackForge':7},{'Flametal':24,'Iolite':3})]);
createEntity('ThunderingBerserkirAxes',[createRecipe(1,1,{'BlackForge':4},{'BerserkirAxes':1,'Flametal':5,'Iolite':1}),createRecipe(2,1,{'BlackForge':5},{'Flametal':5,'Iolite':1}),createRecipe(3,1,{'BlackForge':6},{'Flametal':10,'Iolite':2}),createRecipe(4,1,{'BlackForge':7},{'Flametal':15,'Iolite':3})]);
createEntity('Torch',[createRecipe(1,1,null,{'Wood':1,'Resin':1})]);
createEntity('Trollstav',[createRecipe(1,1,{'GaldrTable':2},{'CharredBone':15,'TrollTrophy':1,'Flametal':3,'Bloodstone':1}),createRecipe(2,1,{'GaldrTable':3},{'CharredBone':5,'TrollTrophy':1,'Flametal':3,'Bloodstone':1}),createRecipe(3,1,{'GaldrTable':4},{'CharredBone':10,'TrollTrophy':2,'Flametal':6,'Bloodstone':2}),createRecipe(4,1,{'GaldrTable':5},{'CharredBone':15,'TrollTrophy':3,'Flametal':9,'Bloodstone':3})]);
createEntity('WoodArrow',[createRecipe(1,20,{'Workbench':1},{'Wood':8})]);
createEntity('WoodShield',[createRecipe(1,1,{'Workbench':1},{'Wood':10,'Resin':4,'LeatherScraps':4}),createRecipe(2,1,{'Workbench':2},{'Wood':5,'Resin':2,'LeatherScraps':2}),createRecipe(3,1,{'Workbench':3},{'Wood':10,'Resin':4,'LeatherScraps':4})]);
createEntity('WoodTowerShield',[createRecipe(1,1,{'Workbench':1},{'Wood':10,'LeatherScraps':4}),createRecipe(2,1,{'Workbench':2},{'Wood':5,'LeatherScraps':3}),createRecipe(3,1,{'Workbench':3},{'Wood':10,'LeatherScraps':6})]);
createEntity('WoodenMissile',[createRecipe(1,20,{'ArtisanTable':1},{'CoreWood':5,'Feathers':2})]);
createEntity('WoundRipper',[createRecipe(1,1,{'BlackForge':1},{'Ripper':1,'Flametal':8,'Bloodstone':1}),createRecipe(2,1,{'BlackForge':2},{'Flametal':8,'Bloodstone':1}),createRecipe(3,1,{'BlackForge':3},{'Flametal':16,'Bloodstone':2}),createRecipe(4,1,{'BlackForge':4},{'Flametal':24,'Bloodstone':3})]);

// Misc
createEntity('AshwoodStack',[createRecipe(1,1,null,{'Ashwood':50})]);
createEntity('Ballista',[createRecipe(1,1,{'Workbench':1},{'BlackMetal':10,'YggdrasilWood':10,'MechanicalSpring':3})]);
createEntity('BatteringRam',[createRecipe(1,1,{'Workbench':1},{'Flametal':10,'SurtlingCore':2,'Ashwood':20})]);
createEntity('BlackMarblePile',[createRecipe(1,1,null,{'BlackMarble':50})]);
createEntity('BoneStack',[createRecipe(1,1,null,{'BoneFragments':50})]);
createEntity('Bonfire',[createRecipe(1,1,null,{'SurtlingCore':1,'AncientBark':5,'CoreWood':5,'FineWood':5})]);
createEntity('Campfire',[createRecipe(1,1,null,{'Stone':5,'Wood':2})]);
createEntity('Cart',[createRecipe(1,1,{'Workbench':1},{'Wood':20,'BronzeNails':10})]);
createEntity('CartographyTable',[createRecipe(1,1,{'Workbench':1},{'FineWood':10,'BoneFragments':10,'Bronze':2,'LeatherScraps':5,'Raspberries':4})]);
createEntity('Catapult',[createRecipe(1,1,{'Workbench':1},{'Flametal':10,'CharredCogwheel':1,'Ashwood':20})]);
createEntity('CoalPile',[createRecipe(1,1,null,{'Coal':50})]);
createEntity('CoinPile',[createRecipe(1,1,null,{'Coins':999})]);
createEntity('CoinStack',[createRecipe(1,1,null,{'Coins':99})]);
createEntity('ColdFishingBait',[createRecipe(1,20,{'Cauldron':1},{'FishingBait':20,'FenringTrophy':1})]);
createEntity('CoreWoodStack',[createRecipe(1,1,null,{'CoreWood':50})]);
createEntity('Drakkar',[createRecipe(1,1,{'Workbench':1},{'IronNails':100,'CeramicPlate':30,'FineWood':50,'YggdrasilWood':25})]);
createEntity('FineWoodStack',[createRecipe(1,1,null,{'FineWood':50})]);
createEntity('FirepitIron',[createRecipe(1,1,null,{'IronPit':1,'Wood':1})]);
createEntity('FrostyFishingBait',[createRecipe(1,20,{'Cauldron':1},{'FishingBait':20,'DrakeTrophy':1})]);
createEntity('GraustenPile',[createRecipe(1,1,null,{'Grausten':50})]);
createEntity('Hearth',[createRecipe(1,1,{'Stonecutter':1},{'Stone':15})]);
createEntity('HeavyFishingBait',[createRecipe(1,20,{'Cauldron':1},{'FishingBait':20,'SerpentTrophy':1})]);
createEntity('HotFishingBait',[createRecipe(1,20,{'Cauldron':1},{'FishingBait':20,'SurtlingTrophy':1})]);
createEntity('Karve',[createRecipe(1,1,{'Workbench':1},{'FineWood':30,'DeerHide':10,'Resin':20,'BronzeNails':80})]);
createEntity('Longship',[createRecipe(1,1,{'Workbench':1},{'IronNails':100,'DeerHide':10,'FineWood':40,'AncientBark':40})]);
createEntity('MistyFishingBait',[createRecipe(1,20,{'Cauldron':1},{'FishingBait':20,'LoxTrophy':1})]);
createEntity('MossyFishingBait',[createRecipe(1,20,{'Cauldron':1},{'FishingBait':20,'TrollTrophy':1})]);
createEntity('PavedRoad',[createRecipe(1,1,{'Stonecutter':1},{'Stone':1})]);
createEntity('PileOfSkulls',[createRecipe(1,1,null,{'CharredSkull':50})]);
createEntity('Portal',[createRecipe(1,1,{'Workbench':1},{'GreydwarfEye':10,'FineWood':20,'SurtlingCore':2})]);
createEntity('PortalStone',[createRecipe(1,1,{'Stonecutter':1},{'GreydwarfEye':10,'Grausten':30,'MoltenCore':2})]);
createEntity('Raft',[createRecipe(1,1,{'Workbench':1},{'Wood':20,'LeatherScraps':6,'Resin':6})]);
createEntity('StickyFishingBait',[createRecipe(1,20,{'Cauldron':1},{'FishingBait':20,'AbominationTrophy':1})]);
createEntity('StingyFishingBait',[createRecipe(1,20,{'Cauldron':1},{'FishingBait':20,'FulingTrophy':1})]);
createEntity('StonePile',[createRecipe(1,1,null,{'Stone':50})]);
createEntity('Trap',[createRecipe(1,1,{'Workbench':1},{'BlackMetal':5,'BronzeNails':10,'MechanicalSpring':1})]);
createEntity('TreasureChest',[createRecipe(1,1,{'Workbench':1},{'Coins':99,'Ruby':5,'SilverNecklace':2,'FineWood':8,'Silver':2})]);
createEntity('Ward',[createRecipe(1,1,null,{'FineWood':5,'GreydwarfEye':5,'SurtlingCore':1})]);
createEntity('WoodStack',[createRecipe(1,1,null,{'Wood':50})]);
createEntity('YggdrasilWoodStack',[createRecipe(1,1,null,{'YggdrasilWood':50})]);
