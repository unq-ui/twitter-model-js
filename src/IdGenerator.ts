class IdGenerator {
  private currentUserId: number = 0;
  private currentTweetId: number = 0;

  nextUserId(): string {
    return `u_${++this.currentUserId}`;
  }

  nextTweetId(): string {
    return `t_${++this.currentTweetId}`;
  }
}

export { IdGenerator };