export class NoFormDataError extends Error {
  constructor() {
    super("Unexpected error: there are no data in FormData event");
    this.name = "NoFormDataError";
  }
}

export class NoProductsOnTheCartError extends Error {
  constructor() {
    super("Unexpected error: there are no products in the cart!");
    this.name = "NoProductsOnTheCartError";
  }
}
