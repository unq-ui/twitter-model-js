class UserException extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "UserException";
  }
}

class TweetException extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "TweetException";
  }
}

export { UserException, TweetException };