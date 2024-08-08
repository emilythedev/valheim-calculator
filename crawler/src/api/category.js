import axios from 'axios';
import { apiBaseUrl } from '../utils/constants.js';

export const getItems = async (categoryName, continueValue) => {
  const params = {
    action: 'query',
    generator: 'categorymembers',
    gcmtitle: `Category:${categoryName}`,
    gcmtype: 'page',
    gcmlimit: 20,
    prop: 'info',
    inprop: 'url',
    format: 'json',
    gcmcontinue: continueValue || null,
  };

  const { data } = await axios.get(apiBaseUrl, { params });
  if (!data.query) {
    return [];
  }
  const pages = data.query.pages;

  const list = [];

  for (let key in pages) {
    const page = pages[key];
    // skip page that is not in main namespace or is redirected
    if (page.ns !== 0 || typeof page.redirect !== 'undefined') {
      continue;
    }

    list.push({
      title: page.title,
      pageId: page.pageid,
      canonicalUrl: page.canonicalurl,
    });
  }

  if (data.continue) {
    // continue reading data
    return list.concat(await getItems(categoryName, data.continue.gcmcontinue));
  }

  return list;
};
