# activiti

本專案使用 Angular - v17 + TypeScript + Angular CLI開發

- Node 18 or >=20


## 目錄
- [使用技術](#使用技術)
- [開發流程](#開發流程)
- [Commit規範](#Commit規範)
- [i18n國際化語系](#i18n國際化語系)

## 使用技術

- [Angular - v17](https://angular.io)
  - 前端框架
- [TypeScript](https://www.typescriptlang.org)
  - 靜態型別檢查
- [RxJS - v7](https://rxjs.dev)
  - Reactive Extensions Library
- [SCSS](https://sass-lang.com)
  - CSS Preprocessor
- [PRIMENG](https://primeng.org/)
  - 適用於Angular的UI套件
- [BPMN](https://github.com/bpmn-io/bpmn-js-example-angular)
  - 流程圖編輯器
- [BPMN-form](https://github.com/bpmn-io/form-js)
  - 表單編輯器

## 開發流程

 修改一律開新分支，base branch 依據開發功能。

 `TODO` 、 `FIXME`: 等註解標籤完成請移除。

 `console.log` 非正式需顯示用的，請在功能完成後移除。

## Commit規範

Commit 訊息依照 [約定式提交 (Conventional Commits)](https://www.conventionalcommits.org/zh-hant/v1.0.0/)。

```text
<類型 type>[可選的作用範圍 scope]: <描述 description>

[可選的正文 body]

[可選的頁腳 footer]
```

### Type

- chore: 其他，並且也不會修改原始碼或是測試。
- revert: 回復前一個提交的 commit。
- build: 影響構建系統或外部依賴項的更改。
- ci: 更改我們的 CI 配置文件和腳本。
- docs: 文檔的修改。
- feat: 功能新增修改。
- fix: 修復 Bug。
- perf: 提升效能的改進。
- refactor: 重構現有程式碼，不屬於新增新功能或是修 bug。
- style: 不影響功能的更改（空格、格式、缺少分號等）。
- test: 測試。

# i18n國際化語系

- [i18n](https://ngneat.github.io/transloco/docs/getting-started/installation)
  - 多語系套件

## [模板翻譯](https://ngneat.github.io/transloco/docs/translation-in-the-template)

使用以下功能前需先導入i18n模組**TranslocoModule**

### 管道 (Pipe)

```html
<span>{{ 'i18nKey' | transloco }}</span>
```

### 裝飾器 (Directive)

```html
<span transloco="i18nKey"></span>
```

### 語法糖

```html
<ng-container *transloco="let t">
  <p>{{ t('i18nKey') }}</p>

  <example-component [title]="t('i18nKey')"></example-component>
</ng-container>
```
