

## [1.0.9](https://github.com/fangwenzheng88/utils/compare/v1.0.8...v1.0.9) (2024-09-04)


### Bug Fixes

* 更新ts版本处理hasOwn生成的ts类型不正确 ([8ab53d7](https://github.com/fangwenzheng88/utils/commit/8ab53d727d0a46decb0f58ad0864b46e5359b292))


### Features

* [@category](https://github.com/category) tree分类下函数参数非数组时正常返回数据(之前代码会报错) ([e95ff31](https://github.com/fangwenzheng88/utils/commit/e95ff31ae87f8f319381dd853d3bc3943ac8f71d))
* 新增convertTreeData函数 ([e185c1b](https://github.com/fangwenzheng88/utils/commit/e185c1b11cb937a2337a2ee7f28a0a6d5b4b33d5))

## [1.0.8](https://github.com/fangwenzheng88/utils/compare/v1.0.7...v1.0.8) (2024-08-07)


### Bug Fixes

* sortTreeArray会修改原数组children字段的问题 ([1634550](https://github.com/fangwenzheng88/utils/commit/16345507500561d798dcd2bb4826803025854b79))
* ts读取types异常 ([b7df92b](https://github.com/fangwenzheng88/utils/commit/b7df92b3a2b2f41846364d65047ec8ac59395758))


### Features

* 删除filterTreeArray/traverseTreeDFS/traverseTreeDFSCallbackAfter/traverseTreeBFS函数callback第二个参数 ([86425f2](https://github.com/fangwenzheng88/utils/commit/86425f28f8784390296921926b7f91c23bf7cfa9))
* 新增filterTreeArray2/filterTreeArray3两个函数 ([df0677b](https://github.com/fangwenzheng88/utils/commit/df0677b53e9e271a99358e63a70ea676f44cd4d3))

## [1.0.7](https://github.com/fangwenzheng88/utils/compare/v1.0.6...v1.0.7) (2024-05-21)


### Features

* **dom:** 增加一些dom工具函数 ([611401d](https://github.com/fangwenzheng88/utils/commit/611401dec3896d4ec4527a7b17eb469293c74f70))

## [1.0.6](https://github.com/fangwenzheng88/utils/compare/v1.0.5...v1.0.6) (2024-05-09)


### Features

* **fallback:** 修改fallbackNumber/fallbackString的实现 ([41dcb76](https://github.com/fangwenzheng88/utils/commit/41dcb766d97306ab71a435f7765391a06817a484))


### BREAKING CHANGES

* **fallback:** 删除fallbackString.DEFAULT_FALLBACK全局配置

## [1.0.5](https://github.com/fangwenzheng88/utils/compare/v1.0.4...v1.0.5) (2024-03-08)


### Features

* 新增filterTreeWithoutEmptyChildren函数 ([41bf667](https://github.com/fangwenzheng88/utils/commit/41bf6673b82a5580df3a23e8cf39765a56fd508a))
* 新增treeArrayToMap函数 ([8383fa1](https://github.com/fangwenzheng88/utils/commit/8383fa15c96d99e15af6ee756d0c275188895e7a))

## [1.0.4](https://github.com/fangwenzheng88/utils/compare/v1.0.3...v1.0.4) (2024-01-31)


### Features

* 修改isFunction的实现方式 ([71cb42b](https://github.com/fangwenzheng88/utils/commit/71cb42b975cdbe68a5c82645525f6d55434bf78a))
* 增加isNumeric函数 ([1d4bf92](https://github.com/fangwenzheng88/utils/commit/1d4bf9229268f678d6c8f7e022442f7c64218cda))
* 增加isSymbol函数 ([0677220](https://github.com/fangwenzheng88/utils/commit/067722099d50aa31276eedcab28281e3a379d040))
* isDate/isRegExp增加类型谓词 ([c5f2016](https://github.com/fangwenzheng88/utils/commit/c5f20169e0464c5f9e607d30b34618c6d156b4e2))

## [1.0.3](https://github.com/fangwenzheng88/utils/compare/v1.0.2...v1.0.3) (2024-01-30)


### Features

* 新增dom操作工具函数 ([76d9808](https://github.com/fangwenzheng88/utils/commit/76d9808fca28924b3f91741ff1ebda4f7e64726b))
* 新增isClient/isIOS/isNotEmptyArray函数 ([4fac0ce](https://github.com/fangwenzheng88/utils/commit/4fac0ce6d0b35093a68047ee8a058dd6ad2b78c4))

## [1.0.2](https://github.com/fangwenzheng88/utils/compare/v1.0.1...v1.0.2) (2023-12-27)


### Features

* 完善toArray和isStringNumber参数的ts类型 ([4dfb965](https://github.com/fangwenzheng88/utils/commit/4dfb9653e47ae693b7ea2c01358091a723df45c2))

## [1.0.1](https://github.com/fangwenzheng88/utils/compare/v1.0.0...v1.0.1) (2023-11-06)


### Features

* 删除export * from './array'导出，保留ArrayUtils导出 ([68c7a23](https://github.com/fangwenzheng88/utils/commit/68c7a2362c670855dd5f80bfe91fd2df001caec4))
* 新增getObjectValue函数 ([76dc1f8](https://github.com/fangwenzheng88/utils/commit/76dc1f8d70d448842566a0751f44cc2bc3e568e6))

# 1.0.0 (2023-10-26)

### Features

- 提交uttils@1.0.0版本 ([31696a7](https://github.com/fangwenzheng88/utils/commit/31696a7647aaec4236f4df6eb5a6fad99e6cd4ec))