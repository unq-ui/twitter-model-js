class User {
  readonly id: string;
  readonly username: string;
  email: string;
  password: string;
  image: string;
  backgroundImage: string;
  readonly following: User[];
  readonly followers: User[];

  constructor(
    id: string,
    username: string,
    email: string,
    password: string,
    image: string,
    backgroundImage: string,
    following: User[] = [],
    followers: User[] = []
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
  readonly id: string;
  readonly type: TweetType;
  readonly user: User;
  readonly content: string;
  readonly date: Date;
  readonly replies: Tweet[];
  readonly reTweets: Tweet[];
  readonly likes: User[];

  constructor(
    id: string,
    type: TweetType,
    user: User,
    content: string,
    date: Date = new Date(),
    replies: Tweet[] = [],
    reTweets: Tweet[] = [],
    likes: User[] = []
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

abstract class TweetType {
  readonly tweet: Tweet | null;
  readonly image: string | null;

  constructor(tweet: Tweet | null, image: string | null) {
    this.tweet = tweet;
    this.image = image;
  }

  isReTweet(): boolean {
    return false;
  }

  isReplayTweet(): boolean {
    return false;
  }

  isNormalTweet(): boolean {
    return false;
  }
}

class ReTweet extends TweetType {
  constructor(tweet: Tweet) {
    super(tweet, null);
  }

  override isReTweet(): boolean {
    return true;
  }
}

class ReplyTweet extends TweetType {
  constructor(image: string | null, tweet: Tweet) {
    super(tweet, image);
  }

  override isReplayTweet(): boolean {
    return true;
  }
}

class NormalTweet extends TweetType {
  constructor(image: string | null) {
    super(null, image);
  }

  override isNormalTweet(): boolean {
    return true;
  }
}

export { User, Tweet, TweetType, ReTweet, ReplyTweet, NormalTweet };