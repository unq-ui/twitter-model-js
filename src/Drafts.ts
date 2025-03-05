class DraftUser {
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly image: string;
  readonly backgroundImage: string;

  constructor(
    username: string,
    email: string,
    password: string,
    image: string,
    backgroundImage: string
  ) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.image = image;
    this.backgroundImage = backgroundImage;
  }
}

class DraftTweet {
  readonly userId: string;
  readonly content: string;
  readonly image: string | null;
  readonly date: Date;

  constructor(
    userId: string,
    content: string,
    image: string | null,
    date: Date = new Date()
  ) {
    this.userId = userId;
    this.content = content;
    this.image = image;
    this.date = date;
  }
}

class DraftReTweet {
  readonly userId: string;
  readonly tweetId: string;
  readonly content: string;
  readonly date: Date;

  constructor(
    userId: string,
    tweetId: string,
    content: string,
    date: Date = new Date()
  ) {
    this.userId = userId;
    this.tweetId = tweetId;
    this.content = content;
    this.date = date;
  }
}

class DraftReplyTweet {
  readonly userId: string;
  readonly tweetId: string;
  readonly content: string;
  readonly image: string | null;
  readonly date: Date;

  constructor(
    userId: string,
    tweetId: string,
    content: string,
    image: string | null,
    date: Date = new Date()
  ) {
    this.userId = userId;
    this.tweetId = tweetId;
    this.content = content;
    this.image = image;
    this.date = date;
  }
}

export { DraftReplyTweet, DraftReTweet, DraftTweet, DraftUser };
