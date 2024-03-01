// MediaWiki Action API endpoint
export const apiBaseUrl = 'https://valheim.fandom.com/api.php';

export const csvKeyMappings = [
  ['title'],
  ['page_id', 'pageId'],
  ['internal_id', 'internalId'],
  ['categories', 'categories', (cat) => cat.join(', ')],
  ['item_level', 'itemLevel'],
  ['source'],
  ['crafting_level', 'craftingLevel'],
  ['upgrades', 'upgrades', (list) => list.join('\n')],
  ['materials', 'materials', materials => {
    return materials.map((mat) => {
      const { quantity, title } = mat;
      return `${quantity}x ${title}`;
    }).join('\n');
  }],
];
