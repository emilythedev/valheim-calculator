import { expect } from 'chai';
import { describe, it } from 'mocha';
import { getEntitiesByPageId } from '../src/api/entity.js';
import { armorSetArray, meatPlatterArray, refinedEitr, weaponArray, wolfArmorArray } from './data/entity.js';

const assertItemArray = (result, expectedArray) => {
  expect(result).to.have.length(expectedArray.length);
  expectedArray.forEach((expected, i) => {
    expect(result[i]).to.have.property('title').that.is.eq(expected.title);
    expect(result[i]).to.have.property('upgrades').that.is.empty;
    expect(result[i]).to.have.property('recipes').that.to.deep.equals(expected.recipes);
  });
};

describe('Crawl item data', () => {
  it('crawl simple material recipe', async () => {
    const result = await getEntitiesByPageId(4118);
    assertItemArray(result, [refinedEitr]);
  });

  it('crawl food recipe', async () => {
    const result = await getEntitiesByPageId(4147);
    assertItemArray(result, meatPlatterArray);
  });

  it('crawl simple weapon', async () => {
    const result = await getEntitiesByPageId(1134);
    assertItemArray(result, weaponArray);
  });

  it('crawl armor set', async () => {
    const result = await getEntitiesByPageId(4169);
    assertItemArray(result, armorSetArray);
  });

  it('crawl armor with different crafting stations', async () => {
    const result = await getEntitiesByPageId(1496);
    assertItemArray(result, wolfArmorArray);
  });
});
