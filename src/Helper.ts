import axios from "axios";
import Web3 from "web3";
import minAbiJSON from "./abi.json";
import { AbiItem } from "web3-utils";

const web3 = new Web3("https://bsc-dataseed1.binance.org:443");

export function api(params: string, v?: string) {
  if (!v) v = "v1";
  if (!params) params = "";
  // return 'http://localhost:8000/api/'+v+'/'+params;
  return "https://api.ariva.game/api/" + params;
}

export function oGet(url: string) {
  const result = axios(
    // url+'?auth='+token(),
    url
  );
  return result;
}
export function sep(a: any) {
  if (!a) {
    a = 0;
  }
  var value = parseInt(a);
  var num = value.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  return num;
}

export function shortName(a: string) {
  if (a) {
    var b = a.substring(0, 8);
    b += "...";
    b += a.substring(a.length - 4, a.length);
    return b;
  }
  return a;
}
export async function getArvBalance(account: string) {
  // let minABI = [
  //   {
  //     constant: true,
  //     inputs: [{ name: "_owner", type: "address" }],
  //     name: "balanceOf",
  //     outputs: [{ name: "balance", type: "uint256" }],
  //     type: "function",
  //   },
  // ];

  const token = new web3.eth.Contract(
    minAbiJSON as AbiItem[],
    "0x6679eb24f59dfe111864aec72b443d1da666b360"
  ) as any;

  const bal = await token.methods.balanceOf(account).call();
  var balance = { balance: parseFloat(String(bal / Math.pow(10, 8))) };
  return Promise.resolve(balance);
}
