import './array-extentions';

describe(('Array help functions'), () => {
  it('groupBy should return expected', () => {
    const arrToGroup = [
      { class: "A", otherProp: 'text' },
      { class: "B", otherProp: 'text' },
      { class: "C", otherProp: 'text' },
      { class: "D", otherProp: 'text' },
    ];

    const result = arrToGroup.groupBy((x) => x.class);

    const expectedGroup = [
      { key: "A", value: [{ class: "A", otherProp: 'text' }] },
      { key: "B", value: [{ class: "B", otherProp: 'text' }] },
      { key: "C", value: [{ class: "C", otherProp: 'text' }] },
      { key: "D", value: [{ class: "D", otherProp: 'text' }] },
    ]

    expect(result).toEqual(expectedGroup);
  });

  it('aggregateBy should return expected', () => {
    const arrToGroup = [
      { class: "A", otherProp: 5 },
      { class: "B", otherProp: 5 },
      { class: "C", otherProp: 5 },
      { class: "D", otherProp: 5 },
    ];

    const result = arrToGroup.aggregateBy({
      groupByFn: (x) => x.class,
      calcFn: (x) => x.otherProp,
      aggFn: (x) => x.sum / x.count,
    });

    const expected = [
      { key: "A", value: 5 },
      { key: "B", value: 5 },
      { key: "C", value: 5 },
      { key: "D", value: 5 },
    ]

    expect(result).toEqual(expected);
  });

  it('percentBy should return expected', () => {
    const arrToGroup = [
      { class: "A", otherProp: 4 },
      { class: "A", otherProp: 2 },
      { class: "B", otherProp: 4 },
      { class: "C", otherProp: 2 },
    ];

    const result = arrToGroup.percentBy({
      groupByFn: (x) => x.class,
      percentFn: (x) => x.otherProp > 3,
    });

    const expected = [
      { key: "A", value: 50 },
      { key: "B", value: 100 },
      { key: "C", value: 0 },
    ]

    expect(result).toEqual(expected);
  });
});