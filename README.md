# Komodo Seed to Shibacoin WIF Converter

A standalone offline webpage that converts Komodo seed phrases into private keys and addresses for Shibacoin.

## Usage Options

You have three ways to use the tool:

1. **Online Usage (GitHub Pages)**  
   You can use the tool directly from GitHub Pages without needing to build it locally. Simply visit the following link to access the tool:  
   [CryptoDevelopmentServices.github.io/ks2scwif](https://CryptoDevelopmentServices.github.io/ks2scwif)  
   **Note**: The version hosted on GitHub Pages is automatically built using GitHub Actions from the latest code in the repository.

2. **Offline Usage (Downloaded `index.html`)**  
   You can download the built `index.html` file and use the tool offline. The built file is hosted on the `gh-pages` branch of this repository.  
   Download it directly from here (`Right-Click`, `Save Link As...`): [`index.html`](https://github.com/CryptoDevelopmentServices/ks2scwif/raw/gh-pages/index.html)  
   **Note**: The file on the `gh-pages` branch is automatically built using GitHub Actions from the latest code in the repository.

3. **Manual Build**  
   If you prefer to verify the code yourself, you can manually build the project. This option gives you full control over the build process and ensures you're using the exact code you reviewed. Follow the steps below to clone the repository, install dependencies, and build the project locally.

## Prerequisites for building

To build this project, you need **Node.js** installed on your system. You can download it from [nodejs.org](https://nodejs.org/).  

## Building

```bash
git clone https://github.com/CryptoDevelopmentServices/ks2scwif.git
cd ks2scwif
npm install
npm run build
```