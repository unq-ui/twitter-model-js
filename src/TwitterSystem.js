import { User, Tweet, NormalTweet, ReTweet, ReplyTweet } from './Model';
import { DraftUser, DraftTweet, DraftReTweet, DraftReplyTweet } from './Drafts';
import { UserException, TweetException } from './Exceptions';
import { IdGenerator } from './IdGenerator';

class TwitterSystem {
  idGenerator = new IdGenerator();
  users = [];
  tweets = [];

  /**
   * Creates a new user.
   * @throws UserException
   *   If the email is already taken.
   *   If the username is already taken.
   */
  addNewUser(user) {
    this.users.forEach(draftUser => {
      if (draftUser.username === user.username) throw new UserException("Username is taken");
      if (draftUser.email === user.email) throw new UserException("Email is taken");
    });
    
    const newUser = new User(
      this.idGenerator.nextUserId(), 
      user.username, 
      user.email, 
      user.password, 
      user.image, 
      user.backgroundImage
    );
    
    this.users.push(newUser);
    return newUser;
  }

  /**
   * Creates a new tweet.
   * @throws UserException
   *  If the userId of the draftTweet doesn't exist.
   */
  addNewTweet(tweet) {
    const user = this.getUser(tweet.userId);
    const newTweet = new Tweet(
      this.idGenerator.nextTweetId(),
      new NormalTweet(tweet.image),
      user,
      tweet.content,
      tweet.date
    );
    
    this.tweets.push(newTweet);
    return newTweet;
  }

  /**
   * Returns the tweet with the tweetId
   * 
   * @throws UserException
   *  If the userId of the DraftReTweet doesn't exist.
   * @throws TweetException
   *  If the tweetId doesn't exist.
   *  If the tweetId belongs to the same user.
   */
  addReTweet(tweet) {
    const user = this.getUser(tweet.userId);
    const originTweet = this.getTweet(tweet.tweetId);
    
    if (originTweet.user === user) throw new TweetException("Cannot retweet your own tweet");
    
    const newTweet = new Tweet(
      this.idGenerator.nextTweetId(),
      new ReTweet(originTweet),
      user,
      tweet.content,
      tweet.date
    );
    
    originTweet.reTweets.push(newTweet);
    this.tweets.push(newTweet);
    return originTweet;
  }

  /**
   * Returns the tweet with the tweetId
   * 
   * @throws UserException
   *  If the userId of the DraftReplyTweet doesn't exist.
   * @throws TweetException
   *  If the tweetId doesn't exist.
   */
  replyTweet(tweet) {
    const user = this.getUser(tweet.userId);
    const originTweet = this.getTweet(tweet.tweetId);
    
    const newTweet = new Tweet(
      this.idGenerator.nextTweetId(),
      new ReplyTweet(tweet.image, originTweet),
      user,
      tweet.content,
      tweet.date
    );
    
    originTweet.replies.push(newTweet);
    this.tweets.push(newTweet);
    return originTweet;
  }

  /**
   * Returns the tweet with the tweetId
   * 
   * @throws UserException
   *  If the userId doesn't exist.
   * @throws TweetException
   *  If the tweetId doesn't exist.
   */
  toggleLike(tweetId, userId) {
    const user = this.getUser(userId);
    const originTweet = this.getTweet(tweetId);
    
    const index = originTweet.likes.indexOf(user);
    if (index !== -1) {
      originTweet.likes.splice(index, 1);
    } else {
      originTweet.likes.push(user);
    }
    
    return originTweet;
  }

  /**
   * Returns the user with the id userId
   * 
   * @throws UserException
   *  If the userId or the userToFollowingId doesn't exist.
   */
  toggleFollow(userId, userToFollowingId) {
    const user = this.getUser(userId);
    const userToFollow = this.getUser(userToFollowingId);

    if (user === userToFollow) throw new UserException("Cannot follow yourself");

    const followingIndex = user.following.indexOf(userToFollow);
    if (followingIndex !== -1) {
      user.following.splice(followingIndex, 1);
      const followerIndex = userToFollow.followers.indexOf(user);
      if (followerIndex !== -1) {
        userToFollow.followers.splice(followerIndex, 1);
      }
    } else {
      user.following.push(userToFollow);
      userToFollow.followers.push(user);
    }

    return user;
  }

  /**
   * Returns the list of tweets where the content contains the `text`
   */
  search(text) {
    return this.tweets.filter(tweet => tweet.content.toLowerCase().includes(text.toLowerCase()));
  }

  /**
   * Returns a list of tweets from the users that the userId follows
   * @throws UserException
   *  If the userId doesn't exist.
   */
  getFollowingTweets(userId) {
    const user = this.getUser(userId);
    return this.tweets
      .filter(tweet => user.following.includes(tweet.user))
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  /**
   * Returns the users with the most followers that the user with the userId doesn't follow
   * @throws UserException
   *  If the userId doesn't exist.
   */
  getUsersToFollow(userId) {
    const user = this.getUser(userId);
    const allUsers = [...this.users].sort((a, b) => a.followers.length - b.followers.length);
    const filteredUsers = allUsers.filter(user => user !== user && !user.following.includes(user));
    return filteredUsers.slice(0, 10);
  }

  /**
   * Returns the posts with the most likes
   */
  getTrendingTopics() {
    return [...this.tweets]
      .sort((a, b) => b.likes.length - a.likes.length)
      .slice(0, 10)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  /**
   * Returns the user with the userId
   * @throws UserException
   *  If the userId doesn't exist.
   */
  getUser(userId) {
    const user = this.users.find(user => user.id === userId);
    if (!user) throw new UserException("User not found");
    return user;
  }

  /**
   * Returns the tweet with the tweetId
   * @throws TweetException
   *  If the tweetId doesn't exist.
   */
  getTweet(tweetId) {
    const tweet = this.tweets.find(tweet => tweet.id === tweetId);
    if (!tweet) throw new TweetException("Tweet not found");
    return tweet;
  }
}

export { TwitterSystem };