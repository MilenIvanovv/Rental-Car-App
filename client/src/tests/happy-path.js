const elementIdTestPromisified = (browser, id) => new Promise((res, rej) => browser.elementIdText(id, res));

const searchModel = (browser, selector, model, noSearch) => {
  if (!noSearch) {
    browser
      .clearValue('input[type=search]')
      .setValue('input[type=search]', 'Ford')
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
    const today = new Date();
    const me = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate()).toISOString().slice(0, 16);
    // const me = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate()).toISOString().split('T')[0];
    // const me = "asasdkjf;lkasd ;alkdjf lkajsdlfj aldkjsflakdjs fa;ldksjf";

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
      .setValue('input[data=firstName]', 'RandomName')
      .setValue('input[data=lastName]', 'RandomName')
      .setValue('input[data=age]', '25')
      .setValue('input[data=date]', me)
      .click('button[data=confirm]')
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
