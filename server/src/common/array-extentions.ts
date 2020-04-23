/* eslint-disable no-extend-native */

declare global {
  interface MapEntry<T, K> {
    key: T;
    value: K;
  }
  

  interface Array<T> {

    aggregateBy(x:
      {
        groupByFn: (a: T) => any,
        calcFn: (a: T) => number,
        aggFn: (x: { count: number, sum: number }) => number
      }): Array<MapEntry<any, number>>

    averageBy(x: { groupByFn: (a: T) => any, calcFn: (a: T) => number }): Array<MapEntry<any, number>>

    totalBy(x: { groupByFn: (a: T) => any, calcFn: (a: T) => number }): Array<MapEntry<any, number>>

    percentBy(x: { groupByFn: (a: T) => any, percentFn: (a: T) => boolean }): Array<MapEntry<any, number>>

    groupBy(groupByFn: (a: T) => any): Array<MapEntry<any, Array<T>>>
  }
}

export enum Aggregation {
  average = 'averageBy',
  total = 'totalBy',
}

Array.prototype.groupBy = function (groupByFn: (a: any) => any) {

  const groupByResult: Array<MapEntry<any, any>> = [];

  this.forEach(element => {
    const key = groupByFn(element);
    const mapEntry = groupByResult.find(r => r.key === key);
    if (!mapEntry) {
      groupByResult.push({ key, value: [element] })
    } else {
      mapEntry.value.push(element);
    }
  });

  return groupByResult;
}


Array.prototype.aggregateBy = function (x: {
  groupByFn: (a: any) => any,
  calcFn: (a: any) => number,
  aggFn: (x: { count: number, sum: number }) => number
}
) {

  const groupByResult = this.groupBy(x.groupByFn);

  return groupByResult.map(({ key, value }) => {
    const sum = value.reduce((sum, current) => {
      return sum + x.calcFn(current);
    }, 0)

    return { key, value: x.aggFn({ count: value.length, sum }) }
  });
}

Array.prototype.averageBy = function (x: {
  groupByFn: (a: any) => any,
  calcFn: (a: any) => number
}
) {

  return this.aggregateBy({ groupByFn: x.groupByFn, calcFn: x.calcFn, aggFn: ({ count, sum }) => +(sum / count).toFixed(2) })
}

Array.prototype.totalBy = function (x: {
  groupByFn: (a: any) => any,
  calcFn: (a: any) => number
}
) {

  return this.aggregateBy({ groupByFn: x.groupByFn, calcFn: x.calcFn, aggFn: ({ count, sum }) => +sum.toFixed(2) })
}

Array.prototype.percentBy = function (x: {
  groupByFn: (a: any) => any,
  percentFn: (a: any) => boolean
}
) {
  const groupByResult = this.groupBy(x.groupByFn);

  return groupByResult.map(({ key, value }) => {
    const countTrue = value.filter(v => x.percentFn(v)).length
    return {
      key,
      value: countTrue / value.length * 100
    }
  });
}

export {};