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

export class NotNullOrUndefinedValueError extends Error {
  constructor(value: string) {
    super(`Unexpected error: ${value} cannot be null or undefined`);
    this.name = "NotNullOrUndefinedValueError";
  }
}