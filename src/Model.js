class User {
  constructor(
    id,
    username,
    email,
    password,
    image,
    backgroundImage,
    following = [],
    followers = []
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.image = image;
    this.backgroundImage = backgroundImage;
    this.following = following;
    this.followers = followers;
  }
}

class Tweet {
  constructor(
    id,
    type,
    user,
    content,
    date = new Date(),
    replies = [],
    reTweets = [],
    likes = []
  ) {
    this.id = id;
    this.type = type;
    this.user = user;
    this.content = content;
    this.date = date;
    this.replies = replies;
    this.reTweets = reTweets;
    this.likes = likes;
  }
}

class TweetType {
  constructor(tweet, image) {
    this.tweet = tweet;
    this.image = image;
  }

  isReTweet() {
    return false;
  }

  isReplayTweet() {
    return false;
  }

  isNormalTweet() {
    return false;
  }
}

class ReTweet extends TweetType {
  constructor(tweet) {
    super(tweet, null);
  }

  isReTweet() {
    return true;
  }
}

class ReplyTweet extends TweetType {
  constructor(image, tweet) {
    super(tweet, image);
  }

  isReplayTweet() {
    return true;
  }
}

class NormalTweet extends TweetType {
  constructor(image) {
    super(null, image);
  }

  isNormalTweet() {
    return true;
  }
}

export { User, Tweet, TweetType, ReTweet, ReplyTweet, NormalTweet };