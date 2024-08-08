import data from './entities.json';
const mapping: { [id: EntityId]: string } = data;

export const getEntityName = (id: EntityId) => {
  return mapping[id] || `#${id}#`;
};
