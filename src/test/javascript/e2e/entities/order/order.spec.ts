import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { OrderComponentsPage, OrderDeleteDialog, OrderUpdatePage } from './order.page-object';

const expect = chai.expect;

describe('Order e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let orderComponentsPage: OrderComponentsPage;
  let orderUpdatePage: OrderUpdatePage;
  let orderDeleteDialog: OrderDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Orders', async () => {
    await navBarPage.goToEntity('order');
    orderComponentsPage = new OrderComponentsPage();
    await browser.wait(ec.visibilityOf(orderComponentsPage.title), 5000);
    expect(await orderComponentsPage.getTitle()).to.eq('bikehouseordersApp.order.home.title');
    await browser.wait(ec.or(ec.visibilityOf(orderComponentsPage.entities), ec.visibilityOf(orderComponentsPage.noResult)), 1000);
  });

  it('should load create Order page', async () => {
    await orderComponentsPage.clickOnCreateButton();
    orderUpdatePage = new OrderUpdatePage();
    expect(await orderUpdatePage.getPageTitle()).to.eq('bikehouseordersApp.order.home.createOrEditLabel');
    await orderUpdatePage.cancel();
  });

  it('should create and save Orders', async () => {
    const nbButtonsBeforeCreate = await orderComponentsPage.countDeleteButtons();

    await orderComponentsPage.clickOnCreateButton();

    await promise.all([
      orderUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      orderUpdatePage.setBikeNameInput('bikeName'),
      orderUpdatePage.setPhoneNumberInput('phoneNumber'),
      orderUpdatePage.setStartDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      orderUpdatePage.setCommentsInput('comments'),
      orderUpdatePage.statusSelectLastOption(),
      orderUpdatePage.userSelectLastOption()
    ]);

    expect(await orderUpdatePage.getCreatedDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected createdDate value to be equals to 2000-12-31'
    );
    expect(await orderUpdatePage.getBikeNameInput()).to.eq('bikeName', 'Expected BikeName value to be equals to bikeName');
    expect(await orderUpdatePage.getPhoneNumberInput()).to.eq('phoneNumber', 'Expected PhoneNumber value to be equals to phoneNumber');
    expect(await orderUpdatePage.getStartDateInput()).to.contain('2001-01-01T02:30', 'Expected startDate value to be equals to 2000-12-31');
    expect(await orderUpdatePage.getCommentsInput()).to.eq('comments', 'Expected Comments value to be equals to comments');

    await orderUpdatePage.save();
    expect(await orderUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await orderComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Order', async () => {
    const nbButtonsBeforeDelete = await orderComponentsPage.countDeleteButtons();
    await orderComponentsPage.clickOnLastDeleteButton();

    orderDeleteDialog = new OrderDeleteDialog();
    expect(await orderDeleteDialog.getDialogTitle()).to.eq('bikehouseordersApp.order.delete.question');
    await orderDeleteDialog.clickOnConfirmButton();

    expect(await orderComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
