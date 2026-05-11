const requests = new Map();

export function rateLimit(
  ip: string,
  limit = 10,
  windowMs = 60 * 1000
) {

  const now = Date.now();

  const userRequests =
    requests.get(ip) || [];

  /*
    REMOVE OLD REQUESTS
  */

  const recentRequests =
    userRequests.filter(
      (time: number) =>
        now - time < windowMs
    );

  /*
    BLOCK
  */

  if (
    recentRequests.length >= limit
  ) {

    return false;
  }

  recentRequests.push(now);

  requests.set(
    ip,
    recentRequests
  );

  return true;
}