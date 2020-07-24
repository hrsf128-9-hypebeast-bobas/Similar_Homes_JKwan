const dynamicTags = {
  'price per square foot': {
    type: 'range',
    unit: '$/sqft',
    section: 100,
    tags: {},
  },
  'price range': {
    type: 'range',
    unit: '$',
    section: 100000,
    tags: {},
  },
  bathrooms: {
    type: 'count',
    unit: 'bath',
    tags: {},
  },
  bedrooms: {
    type: 'count',
    unit: 'bed',
    tags: {},
  },
  'lot size': {
    type: 'range',
    unit: 'sqft',
    section: 1000,
    tags: {},
  },
};

// using maps / iterators to allow for proper drain functionality with write
const categorizedTags = new Map([
  ['miscellaneous', [
    'haunted',
    'handicap accessible',
    'colorblind friendly paint job',
    'elevator',
    'fireplace',
    'attic',
    'security system',
    'valted ceiling',
    'great views',
    'library',
  ]],
  ['architechture', [
    'contemporary architecture',
    'modern',
    'Victorian',
    'prehistoric',
    'imaginary',
  ]],
  ['for sale', [
    'resale',
    'for sale by owner',
    'new construction',
    'foreclosures',
    'new listings',
    'open houses',
    'price reduced',
  ]],
  ['floor type', [
    'hardwood',
    'water',
    'friendly',
    'lava',
  ]],
  ['transportation', [
    'garage',
    'parking spaces',
    'parking - attached',
    'valet',
    'walkable to public transit',
  ]],
  ['exterior', [
    'brick vinyl',
    'stucco',
    'shiny',
  ]],
  ['yard', [
    'garden',
    'bbq area',
    'lawn',
    'fire pit',
    'gateway to the underworld',
    'spirling pit of mystery',
  ]],
  ['kitchen', [
    'refrigerator',
    'microwave',
    'dishwasher',
    'gas stove',
  ]],
  ['roof type', [
    'composition',
    'straw',
    'sticks',
    'big bad wolf resistant',
  ]],
  ['laundry facilities', [
    'washer',
    'dryer',
    'enchanted stream',
    'built in clothesline',
  ]],
  ['entertainment', [
    'cable ready',
    'satellite',
    'cable',
    'troupe of talented trapeze artist mice',
    'resident clown',
  ]],
  ['heating', [
    'forced air',
    'central',
    'radiator',
    'radiant',
  ]],
  ['heating fuel', [
    'raccoon tears',
    'gas',
    'electic',
  ]],
  ['cooling system', [
    'central',
    'air conditioning',
    'occassional indoor ice storms',
    'ceiling fan',
  ]],
  ['home types', [
    'house',
    'condo',
    'townhome',
    'multi-family',
    'land',
    'mobile/manufactured',
    'other',
  ]],
]);

module.exports = {
  dynamicTags, categorizedTags,
};
