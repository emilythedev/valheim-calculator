// MediaWiki Action API endpoint
export const apiBaseUrl = 'https://valheim.fandom.com/api.php';

export const csvKeyMappings = [
  ['title'],
  ['page_id', 'pageId'],
  ['internal_id', 'internalId'],
  ['page_categories', 'pageCategories'],
  ['source'],
  ['upgrades', 'upgrades', (list) => list.join('\n')],
].concat([1,2,3,4].map((level, i) => {
  return [
    [`level_${level}_crafting_level`, `levels[${i}].craftingLevel`],
    [`level_${level}_materials`, `levels[${i}].materials`, materials => {
      return materials.map((mat) => {
        if (typeof mat === 'string') return mat;

        const { quantity, title } = mat;
        return `${quantity}x ${title}`;
      }).join('\n');
    }],
  ];
}).flat());

export const categoryMappings = {
  'Weapons': 'weapons',
  'Tools': 'tools',
  'Armor': 'armor',
  'Building_Structures': 'building_struct',
  'Crafting_Structures': 'crafting_struct',
  'Misc_Structures': 'misc_struct',
  'Furniture': 'furniture',
  'Cooking_recipes': 'food',
  'Fermenter_recipes': 'mead',
};
