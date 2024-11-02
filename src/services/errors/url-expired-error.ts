export class UrlExpiredError extends Error {
    constructor() {
      super("Url already expired");
    }
  }
  