const tokenPath = "token";

export class Token {
  static get() {
    return localStorage.getItem(tokenPath);
  }
  static set(nextToken: string) {
    return localStorage.setItem(tokenPath, nextToken);
  }
  static remove() {
    localStorage.removeItem(tokenPath);
  }
}
