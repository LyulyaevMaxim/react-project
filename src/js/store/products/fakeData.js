export const paymentTypes = {
  options: [
    {
      value: 0,
      label: 'Other',
    },
    {
      value: 1,
      label: 'Cash',
    },
    {
      value: 2,
      label: 'Credit',
    },
    {
      value: 3,
      label: 'Check',
    },
    {
      value: 4,
      label: 'Gift',
    },
  ],
  optionsMap: {
    '0': 'Other',
    '1': 'Cash',
    '2': 'Credit',
    '3': 'Check',
    '4': 'Gift',
  },
}

export const productGroups = {
  options: [
    {
      value: 0,
      label: 'None',
    },
    {
      value: 1,
      label: 'Food',
    },
    {
      value: 2,
      label: 'Clothes',
    },
    {
      value: 3,
      label: 'Instruments',
    },
  ],
  optionsMap: {
    '0': 'None',
    '1': 'Food',
    '2': 'Clothes',
    '3': 'Instruments',
  },
}

export const productsData = [
  {
    productId: 'id0',
    name: { value: 'Product 0' },
    description: { value: 'Desc.0' },
    productGroups: { value: [0] },
    paymentTypes: { value: [1] },
    picture: { value: 'https://pluralsight.imgix.net/paths/path-icons/nodejs-601628d09d.png' },
    active: { value: false },
  },
  {
    productId: 'id1',
    name: { value: 'Product 1', readonly: true },
    description: { value: 'Desc.1' },
    productGroups: { value: [0] },
    paymentTypes: { value: [1] },
    picture: { value: require('~img/content/equipment-01.jpg') },
    active: { value: false },
  },
  {
    productId: 'id2',
    name: { value: 'Product 2' },
    description: { value: 'Desc.2', readonly: true },
    productGroups: { value: [] },
    paymentTypes: { value: [3] },
    picture: { value: require('~img/content/equipment-02.jpg') },
    active: { value: false },
  },
  {
    productId: 'id3',
    name: { value: 'Product 3' },
    description: { value: '' },
    productGroups: { value: [2], readonly: true },
    paymentTypes: { value: [4] },
    picture: { value: require('~img/content/equipment-03.jpg') },
    active: { value: false },
  },
  {
    productId: 'id4',
    name: { value: 'Product 4' },
    description: { value: 'Desc.4' },
    productGroups: { value: [3, 0, 2] },
    paymentTypes: { value: [], readonly: true },
    picture: { value: require('~img/content/equipment-04.jpg') },
    active: { value: false },
  },
  {
    productId: 'id5',
    name: { value: 'Product 5' },
    description: { value: 'Desc.5' },
    productGroups: { value: [3, 1, 2] },
    paymentTypes: { value: [3] },
    picture: { value: require('~img/content/equipment-05.jpg') },
    active: { value: false, readonly: true },
  },
  {
    productId: 'id6',
    name: { value: 'Product 6' },
    description: { value: 'Desc.6' },
    productGroups: { value: [] },
    paymentTypes: { value: [] },
    picture: { value: require('~img/content/equipment-06.jpg') },
    active: { value: false },
  },
  {
    productId: 'id7',
    name: { value: 'Product 7' },
    description: { value: 'Desc.7' },
    productGroups: { value: [] },
    paymentTypes: { value: [] },
    picture: {
      value: 'https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2017/04/1493235373large_react_apps_A-01.png',
    },
    active: { value: false },
  },
]
