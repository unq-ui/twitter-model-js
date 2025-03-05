class IdGenerator {
  currentUserId = 0;
  currentTweetId = 0;

  nextUserId() {
    return `u_${++this.currentUserId}`;
  }

  nextTweetId() {
    return `t_${++this.currentTweetId}`;
  }
}

export { IdGenerator };