import Web3 from 'web3';
import EthLandSale_ABI from '../../constants/EthLandSale.abi';

class Web3Helper {
  account: any;

  getEthLandSaleContract(web3: any, proxyAddress: String) {
    return new web3.eth.Contract(EthLandSale_ABI, proxyAddress);
  }
  
  async getInstance() {
    const provider = 'https://data-seed-prebsc-1-s1.binance.org:8545';

    const web3 = new Web3(new Web3.providers.HttpProvider(provider));
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    this.account = account;
    return web3;
  }
}
export default new Web3Helper();
