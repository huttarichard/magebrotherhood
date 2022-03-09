const ConnectToBitski = async (Bitski, opts) => {
  const bitski = new Bitski(opts.clientId, opts.callbackUrl, opts.extraBitskiOptions);
  await bitski.signIn();
  const provider = bitski.getProvider(opts.extraProviderOptions);
  return provider;
};
export default ConnectToBitski;
