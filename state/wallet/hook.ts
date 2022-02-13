import { useCallback, useEffect } from "react";
import { useAppContext } from "../../context/StateProvider";
import { ActionTypes } from "../../reducer";
import { providers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: `${process.env.NEXT_PUBLIC_INFURA_ID}`, // required
    },
  },
};
let web3Modal: any;
if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true,
    providerOptions, // required
  });
}

const useWallet = () => {
  const { state, dispatch } = useAppContext();
  const provider = state.provider;
  const connect = useCallback(async function () {
    const provider = await web3Modal.connect();

    const web3Provider = new providers.Web3Provider(provider);

    const signer = web3Provider.getSigner();
    const account = await signer.getAddress();

    const network = await web3Provider.getNetwork();

    dispatch({
      type: ActionTypes.setWeb3Provider,
      payload: {
        provider,
        web3Provider,
        account,
        chainId: network.chainId,
      },
    });
  }, []);

  const disconnect = useCallback(
    async function () {
      await web3Modal.clearCachedProvider();
      if (
        state.provider?.disconnect &&
        typeof state.provider.disconnect === "function"
      ) {
        await state.provider.disconnect();
      }
      dispatch({
        type: ActionTypes.resetWeb3Provider,
        payload: {},
      });
    },
    [state.provider]
  );

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connect();
    }
  }, []);

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        // eslint-disable-next-line no-console
        console.log("accountsChanged", accounts);
        dispatch({
          type: ActionTypes.setAddress,
          payload: { account: accounts[0] },
        });
      };

      // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
      const handleChainChanged = (_hexChainId: string) => {
        window.location.reload();
      };

      const handleDisconnect = (error: { code: number; message: string }) => {
        // eslint-disable-next-line no-console
        console.log("disconnect", error);
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      // Subscription Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider, disconnect]);
  return {
    connect,
    disconnect,
    ...state,
  };
};

export default useWallet;
