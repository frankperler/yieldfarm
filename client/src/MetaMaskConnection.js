import React from 'react'
import { useWallet, UseWalletProvider } from 'use-wallet'
import App from './App'

function Connection () {
  const wallet = useWallet()

  return (
    <>
      {wallet.status === 'connected' ? (
        <App />
      ) : (
        <div>
          Connect:
          <button onClick={() => wallet.connect()}>MetaMask</button>
        </div>
      )}
    </>
  )
}

export default () => (
  <UseWalletProvider
    chainId={1337}
    connectors={{
      provided: { provider: window.ethereum },
  }}>
    <Connection />
  </UseWalletProvider>
)

