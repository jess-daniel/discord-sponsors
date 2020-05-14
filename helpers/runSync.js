const runSync = (message) => {
  // interval set to 5 minutes
  const interval = 1000 * 60 * 5;

  // console.log('status', status);
  const syncInterval = message.client.setInterval(() => {
    // sends _sync on set timer
    message.channel.send('_sync');
  }, interval);
  // console.log('syncInterval in run', syncInterval);

  return syncInterval;
};

module.exports = runSync;
