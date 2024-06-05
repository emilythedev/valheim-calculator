import { expect } from 'chai';
import { getItemsByPageId } from '../src/item.js';
import { armorSetArray, meatPlatterArray, refinedEitr, weaponArray, wolfArmorArray } from './data/item.js';

const assertItemArray = (result, expectedArray) => {
  expect(result).to.have.length(expectedArray.length);
  expectedArray.forEach((expected, i) => {
    expect(result[i]).to.have.property('title').that.is.eq(expected.title);
    expect(result[i]).to.have.property('upgrades').that.is.empty;
    expect(result[i]).to.have.property('qualityLevels').that.to.deep.equals(expected.qualityLevels);
    expect(result[i]).to.have.property('source').that.to.deep.equals(expected.source);
  });
}

describe('Crawl item data', () => {
  it('crawl simple material recipe', async () => {
    const result = await getItemsByPageId(4118);
    assertItemArray(result, [refinedEitr]);
  });

  it('crawl food recipe', async () => {
    const result = await getItemsByPageId(4147);
    assertItemArray(result, meatPlatterArray);
  });

  it('crawl simple weapon', async () => {
    const result = await getItemsByPageId(1134);
    assertItemArray(result, weaponArray);
  });

  it('crawl armor set', async () => {
    const result = await getItemsByPageId(4169);
    assertItemArray(result, armorSetArray);
  });

  it('crawl armor with different crafting stations', async () => {
    const result = await getItemsByPageId(1496);
    assertItemArray(result, wolfArmorArray);
  });
});
