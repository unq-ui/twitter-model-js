class DraftUser {
  constructor(
    username,
    email,
    password,
    image,
    backgroundImage
  ) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.image = image;
    this.backgroundImage = backgroundImage;
  }
}

class DraftTweet {
  constructor(
    userId,
    content,
    image,
    date = new Date()
  ) {
    this.userId = userId;
    this.content = content;
    this.image = image;
    this.date = date;
  }
}

class DraftReTweet {
  constructor(
    userId,
    tweetId,
    content,
    date = new Date()
  ) {
    this.userId = userId;
    this.tweetId = tweetId;
    this.content = content;
    this.date = date;
  }
}

class DraftReplyTweet {
  constructor(
    userId,
    tweetId,
    content,
    image,
    date = new Date()
  ) {
    this.userId = userId;
    this.tweetId = tweetId;
    this.content = content;
    this.image = image;
    this.date = date;
  }
}

export { DraftReplyTweet, DraftReTweet, DraftTweet, DraftUser };
