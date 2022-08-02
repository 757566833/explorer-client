#基于哪个镜像
FROM node:14.17.3
#容器内创建目录
RUN mkdir -p /home/client
#设置工作目录
WORKDIR /home/client
#复制文件到容器里面
COPY ./package.json /home/client/package.json
COPY ./yarn.lock /home/client/yarn.lock
COPY ./tsconfig.json /home/client/tsconfig.json
COPY ./next.config.js /home/client/next.config.js
COPY ./next-env.d.ts /home/client/next-env.d.ts
COPY ./.eslintrc /home/client/.eslintrc
COPY ./.env /home/client/.env
COPY ./src /home/client/src


# RUN yarn config get registry
# RUN yarn config set registry https://registry.npm.taobao.org
RUN yarn config list

#执行命令
RUN yarn install

#执行命令
RUN yarn build
##执行命令

# 对外开放的端口设置
EXPOSE 3000
# 启动时命令 可被docker run 提供的参数覆盖
CMD ["yarn","run","start"]
## 启动后明亮 不可被docker run 提供的参数覆盖
## ENTRYPOINT ["npm", "run"]
