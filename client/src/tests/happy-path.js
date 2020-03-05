const elementIdTestPromisified = (browser, id) => new Promise((res, rej) => browser.elementIdText(id, res));

const searchModel = (browser, selector, model, noSearch) => {
  if (!noSearch) {
    browser
      .clearValue('input[type=search]')
      .setValue('input[type=search]', 'Ford')
      .click('button[type=submit]')
      .pause(500);
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

    const cardListSelector = '[data=model]';
    const curRentedTaleSelector = '[data=current_rentals_model]';

    browser
      .url('http://localhost:3000/current-rentals')
      .waitForElementVisible('body')
      .click('[data=cars_link]')
      .waitForElementVisible(cardListSelector);


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
      .setValue('input[name=date]', '2020-04-30')
      .click('button[name=confirm]')
      .waitForElementVisible(curRentedTaleSelector);

    searchModel(browser, curRentedTaleSelector, 'Ford', true)
      .then(() => browser.assert.equal(true, true, 'Contract found'))
      .catch(() => browser.assert.equal(false, true, 'Contract not found'));

    browser
      .click('[data=cars_link]')
      .waitForElementVisible(cardListSelector);

    searchModel(browser, cardListSelector, 'Ford')
      .then(() => browser.assert.equal(false, true, 'Ford found'))
      .catch(() => browser.assert.equal(true, true, 'Ford not found'));
  },
};
