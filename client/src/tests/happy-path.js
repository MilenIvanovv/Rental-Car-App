const elementIdTestPromisified = (browser, id) => new Promise((res, rej) => browser.elementIdText(id, res));

const searchModel = (browser, selector, model, noSearch) => {
  if (!noSearch) {
    browser
      .clearValue('input[type=search]')
      .setValue('input[type=search]', 'Ford')
      .click('button[type=submit]');
  }

  return new Promise((resolve, reject) => {
    browser.elements('css selector', selector, (result) => {
      const promises = result.value.map((jsonWebElement) => elementIdTestPromisified(browser, jsonWebElement['element-6066-11e4-a52e-4f735466cecf']));

      Promise.all(promises).then((data) => {
        if (data.some((elText) => elText.value.includes(model))) {
          resolve();
        } else {
          reject();
        }
      });
    });
  });
};

module.exports = {
  HappyPath(browser) {
    browser
      .url('http://localhost:3000/current-rentals')
      .waitForElementVisible('body')
      .click('[data=cars_link]');

    const cardListSelector = '[data=model]';
    const curRentedTaleSelector = '[data=current_rentals_model]';

    searchModel(browser, cardListSelector, 'Lada')
      .then(() => browser.assert.equal(false, true, 'Lada found'))
      .catch(() => browser.assert.equal(true, true, 'Lada not found'));

    searchModel(browser, cardListSelector, 'Ford')
      .then(() => browser.assert.equal(true, true, 'Ford found'))
      .catch(() => browser.assert.equal(false, true, 'Ford not found'));

    browser
      .click('css selector', '[data=card_checkout]')
      .setValue('input[name=firstName]', 'RandomName')
      .setValue('input[name=lastName]', 'RandomName')
      .setValue('input[name=age]', '25')
      .setValue('input[name=date]', '2020-03-31')
      .click('button[name=confirm]');

    searchModel(browser, curRentedTaleSelector, 'Ford', true)
      .then(() => browser.assert.equal(true, true, 'Contract found'))
      .catch(() => browser.assert.equal(false, true, 'Contract not found'));

    browser
      .click('[data=cars_link]');

    searchModel(browser, cardListSelector, 'Ford')
      .then(() => browser.assert.equal(false, true, 'Ford found'))
      .catch(() => browser.assert.equal(true, true, 'Ford not found'));
  },
};