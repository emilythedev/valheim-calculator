// MediaWiki Action API endpoint
export const apiBaseUrl = 'https://valheim.fandom.com/api.php';

export const keyMappings = [
  ['title'],
  ['page_id', 'pageId'],
  ['internal_id', 'internalId'],
  ['source'],
  ['upgrades', 'upgrades', (list) => list.join('\n')],
].concat([1,2,3,4].map((level, i) => {
  return [
    [`level_${level}_crafting_level`, `materials[${i}].craftingLevel`],
    [`level_${level}_materials`, `materials[${i}].materials`, list => {
      return list.map(({ quantity, title }) => {
        return `${quantity}x ${title}`;
      }).join('\n');
    }],
  ];
}).flat());

export const omitPageIds = [
  1447, // Mead horn of Odin
];
