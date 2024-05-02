import { ethers } from 'hardhat';

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log('Deploying contracts with the account:', deployer.address);

    const SimpleContract = await ethers.getContractFactory('SimpleContract');
    const simpleContract = await SimpleContract.deploy('Hello, World!');

    console.log('SimpleContract address:', simpleContract.address);
}

main().then(() => process.exit(0)).catch((error) => {
    console.error(error);
    process.exit(1);
});
