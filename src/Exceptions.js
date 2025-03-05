class UserException extends Error {
  constructor(msg) {
    super(msg);
    this.name = "UserException";
  }
}

class TweetException extends Error {
  constructor(msg) {
    super(msg);
    this.name = "TweetException";
  }
}

export { UserException, TweetException };