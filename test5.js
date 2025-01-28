// invoice.js
class Invoice {
    constructor(id, date, amount, description) {
      this.id = id;
      this.date = date;
      this.amount = amount;
      this.description = description;
    }
  }
  
  module.exports = Invoice;

// invoiceManager.js
const Invoice = require("./invoice");

class InvoiceManager {
  constructor() {
    this.invoices = [];
  }

  // Create
  addInvoice(date, amount, description) {
    const id = this.invoices.length + 1;
    const invoice = new Invoice(id, date, amount, description);
    this.invoices.push(invoice);
    return invoice;
  }

  // Read
  getInvoice(id) {
    return this.invoices.find((invoice) => invoice.id === id);
  }

  // Update
  updateInvoice(id, date, amount, description) {
    const index = this.invoices.findIndex((invoice) => invoice.id === id);
    if (index !== -1) {
      this.invoices[index] = new Invoice(id, date, amount, description);
      return this.invoices[index];
    }
    return null;
  }

  // Delete
  deleteInvoice(id) {
    const index = this.invoices.findIndex((invoice) => invoice.id === id);
    if (index !== -1) {
      return this.invoices.splice(index, 1)[0];
    }
    return null;
  }

  // Get all invoices
  getAllInvoices() {
    return this.invoices;
  }
}

module.exports = InvoiceManager;

// invoiceManager.test.js
const InvoiceManager = require("./invoiceManager");

describe("InvoiceManager", () => {
  let manager;

  beforeEach(() => {
    manager = new InvoiceManager();
  });

  test("addInvoice should add a new invoice", () => {
    const invoice = manager.addInvoice("2025-01-01", 100, "Test Invoice");
    expect(invoice.id).toBe(1);
    expect(invoice.date).toBe("2025-01-01");
    expect(invoice.amount).toBe(100);
    expect(invoice.description).toBe("Test Invoice");
  });

  test("getInvoice should return the correct invoice", () => {
    manager.addInvoice("2025-01-01", 100, "Test Invoice");
    const invoice = manager.getInvoice(1);
    expect(invoice.id).toBe(1);
  });

  test("updateInvoice should update an existing invoice", () => {
    manager.addInvoice("2025-01-01", 100, "Test Invoice");
    const updatedInvoice = manager.updateInvoice(1, "2025-01-02", 200, "Updated Invoice");
    expect(updatedInvoice.id).toBe(1);
    expect(updatedInvoice.date).toBe("2025-01-02");
    expect(updatedInvoice.amount).toBe(200);
    expect(updatedInvoice.description).toBe("Updated Invoice");
  });

  test("deleteInvoice should delete the correct invoice", () => {
    manager.addInvoice("2025-01-01", 100, "Test Invoice");
    const deletedInvoice = manager.deleteInvoice(1);
    expect(deletedInvoice.id).toBe(1);
    expect(manager.getAllInvoices().length).toBe(0);
  });

  test("getAllInvoices should return all invoices", () => {
    manager.addInvoice("2025-01-01", 100, "Test Invoice");
    manager.addInvoice("2025-01-02", 200, "Another Invoice");
    expect(manager.getAllInvoices().length).toBe(2);
  });
});
