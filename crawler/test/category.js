import { expect } from 'chai';
import { getItems } from '../src/category.js';

describe('Get pages in category', () => {
  it('has page ID, page title and url', async () => {
    const result = await getItems('Arrows');
    expect(result).not.empty;
    expect(result[0]).has.property('title').that.is.a('string');
    expect(result[0]).has.property('pageId').that.is.a('number');
    expect(result[0]).has.property('canonicalUrl').that.match(/^https?:\/\//);
  });
});
