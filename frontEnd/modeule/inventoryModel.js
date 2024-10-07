export function InventoryModel(size, qty, maxQty, colour,
                               status, itemCode, itemDescription,  itemCategory,
                               itemPriceBuy,itemPriceSell,itemImage) {
    this.size = size;
    this.qty = qty;
    this.maxQty = maxQty;
    this.colour = colour;
    this.status = status;
    this.itemCode = itemCode;
    this.itemDescription = itemDescription;
    this.itemCategory = itemCategory;
    this.itemPriceBuy = itemPriceBuy;
    this.itemPriceSell = itemPriceSell;
    this.itemImage = itemImage;
}