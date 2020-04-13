const moment = require('moment');

module.exports = {
  HappyPath(browser) {

    // const afterThreeDays = (moment(new Date()).add(3, 'days')).format('dddd, MMMM Do, YYYY');
    const afterThreeDays = (moment().add(3, 'days')).format('MMMM D, YYYY h:mm');

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
      .setValue('input[data=firstName]', 'Petko')
      .setValue('input[data=lastName]', 'Petkov')
      .setValue('input[data=age]', '25')
      .setValue('.react-datepicker-wrapper .react-datepicker__input-container input[type=text]', afterThreeDays)
      .click('button[data=confirm]')
      .waitForElementVisible('[data=current_rentals_model]')
      .pause(2000)
      .assert.containsText('[data=current_rentals_model]', 'Ford')
      .click('[data=cars_link]')
      .waitForElementVisible("input[data=search]")
      .searchModel('input[data=search]', 'Ford')
      .assert.not.containsText("[data=no-cars]", 'Ford');
  },
};
