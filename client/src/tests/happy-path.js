const moment = require('moment');

module.exports = {
  HappyPath(browser) {

    const afterOneMonth = (moment(new Date(), 'YYYY-MM-DDTHH:mm').add(5, 'days')).format('YYYY-MM-DDTHH:mm');

    browser.searchModel = function (selector, model) {
      const self = this;

      self
        .clearValue(selector)
        .setValue(selector, model);

      return self;
    }

    browser
      .url('http://localhost:3000/current-rentals')
      .waitForElementVisible('body')
      .click('[data=cars_link]')
      .waitForElementVisible('[data=model]')
      .searchModel('input[data=search]', 'Lada')
      .assert.not.containsText("[data=no-cars]", 'Lada')
      .searchModel('input[data=search]', 'Ford')
      .assert.containsText('[data=model]', 'Ford')
      .click('css selector', '[data=card_checkout]')
      .setValue('input[data=firstName]', 'RandomName')
      .setValue('input[data=lastName]', 'RandomName')
      .setValue('input[data=age]', '25')
      .setValue('input[data=date]', afterOneMonth)
      .click('button[data=confirm]')
      .waitForElementVisible('[data=current_rentals_model]')
      .assert.containsText('[data=current_rentals_model]', 'Ford')
      .click('[data=cars_link]')
      .waitForElementVisible("input[data=search]")
      .searchModel('input[data=search]', 'Ford')
      .assert.not.containsText("[data=no-cars]", 'Ford');
  },
};
