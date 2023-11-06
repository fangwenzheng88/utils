## 发版流程

release-it它做了什么？

- 同步提交git远端内容
- 更新版本号
- 产出changelog
- 提交变动
- 增加git tag
- 推送tag更新至远端

```sh
# 升级 major 版本号
npx release-it major

# 升级 minor 版本号
npx release-it minor

# 升级 patch 版本号
npx release-it patch

# 升级一个 beta 版本
npx release-it patch --preRelease=beta

```


```sh
npx release-it major --preRelease=beta
# 实际执行了三步
# 1.版本号从 0.2.0 更新至 1.0.0-beta.0
# 2.npm发布版本会打上beta标签，可以通过 npm i xxxx@beta 安装
# 3.github release会打上pre-release标识

# 综合起来就是
release-it premajor --preReleaseId=beta --npm.tag=beta --github.preRelease
```
