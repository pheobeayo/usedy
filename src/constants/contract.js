import { ethers } from "ethers";
import earnAbi from "./earnAbi.json"
import tokenAbi from './tokenAbi.json'

export const getGreenTokenContract = (providerOrSigner) =>
    new ethers.Contract(
        import.meta.env.VITE_GREENTOKEN_ADDRESS,
        tokenAbi,
        providerOrSigner
    );

export const getGreenEarnContract = (providerOrSigner) =>
    new ethers.Contract(
        import.meta.env.VITE_GREENEARN_ADDRESS,
        earnAbi,
        providerOrSigner
    );
