import { element, by, ElementFinder } from 'protractor';

export class ActionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-action div table .btn-danger'));
  title = element.all(by.css('jhi-action div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class ActionUpdatePage {
  pageTitle = element(by.id('jhi-action-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  actionNameInput = element(by.id('field_actionName'));
  priceInput = element(by.id('field_price'));

  orderSelect = element(by.id('field_order'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setActionNameInput(actionName: string): Promise<void> {
    await this.actionNameInput.sendKeys(actionName);
  }

  async getActionNameInput(): Promise<string> {
    return await this.actionNameInput.getAttribute('value');
  }

  async setPriceInput(price: string): Promise<void> {
    await this.priceInput.sendKeys(price);
  }

  async getPriceInput(): Promise<string> {
    return await this.priceInput.getAttribute('value');
  }

  async orderSelectLastOption(): Promise<void> {
    await this.orderSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async orderSelectOption(option: string): Promise<void> {
    await this.orderSelect.sendKeys(option);
  }

  getOrderSelect(): ElementFinder {
    return this.orderSelect;
  }

  async getOrderSelectedOption(): Promise<string> {
    return await this.orderSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class ActionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-action-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-action'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
