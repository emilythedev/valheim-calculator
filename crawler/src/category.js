import axios from 'axios';
import { apiBaseUrl } from './constants.js';

export const getItems = async (categoryName, continueValue) => {
  const params = {
    action: 'query',
    list: 'categorymembers',
    cmtitle: `Category:${categoryName}`,
    cmlimit: 20,
    format: 'json',
    cmcontinue: continueValue || null,
  };

  const { data } = await axios.get(apiBaseUrl, { params });

  let list = data.query.categorymembers.map(page => {
    if (page.ns !== 0) return; // the page is in main namespace

    return {
      title: page.title,
      pageId: page.pageid,
    };
  });

  if (data.continue) {
    // continue reading data
    list = list.concat(await getItems(categoryName, data.continue.cmcontinue));
  }

  return list;
};
