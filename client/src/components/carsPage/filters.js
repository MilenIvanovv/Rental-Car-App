// eslint-disable-next-line import/prefer-default-export
export const filters = [{
  category: 'Class',
  property: (c) => c.class,
  inState: 'class',
},
{
  category: 'Model',
  property: (c) => c.model,
  inState: 'model',
},
{
  category: 'Brand',
  property: (c) => c.brand,
  inState: 'brand',
}];
