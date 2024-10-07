export function saleHistoryModel(orderId, date, itemSaleList, employee, customer, itemQty, paymentMethod, totalPrice) {
    this.orderId = orderId;
    this.date = date;
    this.itemSaleList = itemSaleList;
    this.employee = employee;
    this.customer = customer;
    this.itemQty = itemQty;
    this.paymentMethod = paymentMethod;
    this.totalPrice = totalPrice;
}
