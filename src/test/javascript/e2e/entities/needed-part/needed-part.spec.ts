import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { NeededPartComponentsPage, NeededPartDeleteDialog, NeededPartUpdatePage } from './needed-part.page-object';

const expect = chai.expect;

describe('NeededPart e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let neededPartComponentsPage: NeededPartComponentsPage;
  let neededPartUpdatePage: NeededPartUpdatePage;
  let neededPartDeleteDialog: NeededPartDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load NeededParts', async () => {
    await navBarPage.goToEntity('needed-part');
    neededPartComponentsPage = new NeededPartComponentsPage();
    await browser.wait(ec.visibilityOf(neededPartComponentsPage.title), 5000);
    expect(await neededPartComponentsPage.getTitle()).to.eq('bikehouseordersApp.neededPart.home.title');
    await browser.wait(ec.or(ec.visibilityOf(neededPartComponentsPage.entities), ec.visibilityOf(neededPartComponentsPage.noResult)), 1000);
  });

  it('should load create NeededPart page', async () => {
    await neededPartComponentsPage.clickOnCreateButton();
    neededPartUpdatePage = new NeededPartUpdatePage();
    expect(await neededPartUpdatePage.getPageTitle()).to.eq('bikehouseordersApp.neededPart.home.createOrEditLabel');
    await neededPartUpdatePage.cancel();
  });

  it('should create and save NeededParts', async () => {
    const nbButtonsBeforeCreate = await neededPartComponentsPage.countDeleteButtons();

    await neededPartComponentsPage.clickOnCreateButton();

    await promise.all([neededPartUpdatePage.setNameInput('name')]);

    expect(await neededPartUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');

    await neededPartUpdatePage.save();
    expect(await neededPartUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await neededPartComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last NeededPart', async () => {
    const nbButtonsBeforeDelete = await neededPartComponentsPage.countDeleteButtons();
    await neededPartComponentsPage.clickOnLastDeleteButton();

    neededPartDeleteDialog = new NeededPartDeleteDialog();
    expect(await neededPartDeleteDialog.getDialogTitle()).to.eq('bikehouseordersApp.neededPart.delete.question');
    await neededPartDeleteDialog.clickOnConfirmButton();

    expect(await neededPartComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
