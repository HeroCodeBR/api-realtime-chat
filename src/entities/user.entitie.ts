class User {
  private email: string;
  constructor(email: string) {
    this.email = email;
  }
  validadeEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }
}

export { User };
