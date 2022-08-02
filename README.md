# 区块链浏览器客户端

## 预览地址

<https://explorer.fzcode.com/>

## 服务端项目地址

<https://github.com/757566833/explorer-server>

## 使用方法

### 修改参数

1. 复制.env.example 为 .env
2. 修改参数NEXT_PUBLIC_RESTFUL 为explorer-server的url
3. 修改参数NEXT_PUBLIC_RPC 为你的区块链rpc url

### 部署方式

本项目基于nextjs，部署有两种方式

#### nginx反向代理静态文件

1. 打包

   ```shell
   yarn build
   ```

2. 导出静态文件

   ```shell
   yarn export
   ```

3. 将out重命名为html，并将conf.d和html文件夹复制到你想放置的未知
4. 启动docker，修改docker-compose.yml中volumes，port以及你想改的所有参数，启动docker

#### next.js

采用next.js肯定是为了ssr

1. 取消异步渲染

   ```react
   // src/app.tsx
   const DynamicRender = dynamic<any>(() => import('@mui/material/styles').then(e=>e.ThemeProvider), {

    ssr: false,
    })
    //改为不使用dynamic
  
   ```

2. 启动打包脚本

   ```shell
   ./docker.sh
   ```
