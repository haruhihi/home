# How to develop

## Presuites

1. [Install VS Code](https://code.visualstudio.com/)
2. [Install WSL](https://learn.microsoft.com/en-us/windows/wsl/install-manual)
3. [Install Ubuntu 22.04.3 LTS WSL](https://www.microsoft.com/store/productId/9PN20MSR04DW?ocid=pdpshare)
4. [Setup SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
5. [install nvm](https://github.com/nvm-sh/nvm), install nodejs using nvm

## Create project

```bash
npx create-next-app@latest ./ # Create projects in current path

```

## server config

```bash
sudo systemctl restart nginx
sudo systemctl start nginx
sudo systemctl stop nginx
sudo systemctl status nginx
sudo systemctl reload nginx
```

- reverse access in /etc/nginx/sites-enabled/reverse-proxy.conf
- project in ~/home
- pm2 start npm --name "next-js" -- start
